"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { PART_CATEGORIES } from "@/lib/parts";
import { PartComponent } from "./PartComponents";

useGLTF.preload("/models/ferrari.glb");

type MeshInfo = {
  mesh: THREE.Mesh;
  wire: THREE.LineSegments;
  baseMaterial: THREE.MeshStandardMaterial;
  wireMaterial: THREE.LineBasicMaterial;
};

// Hide any mesh whose name matches this regex — used to strip
// manufacturer branding (shield badge, hood/steering-wheel emblem,
// chrome trim pieces that hold badges) so the car reads as a
// neutral silhouette.
const HIDE_MESHES =
  /^(yellow_trim|blue|chrome|logo|badge|emblem|shield|prancing|horse|steering_centre|centre)$/i;

function Car({ activeId }: { activeId: string }) {
  const { scene } = useGLTF("/models/ferrari.glb");
  const root = useRef<THREE.Group>(null);
  const meshesRef = useRef<MeshInfo[]>([]);

  // Clone and convert every mesh to a black base + blue wireframe overlay.
  // Using useMemo keyed on the scene + HIDE_MESHES source so HMR edits to the
  // hide-list force a re-traversal.
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    const meshes: MeshInfo[] = [];

    // First pass: walk the whole tree and hide branding meshes.
    // Traverse BEFORE replacing materials so hidden meshes are skipped cleanly.
    clone.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      const name = mesh.name || "";
      if (HIDE_MESHES.test(name)) {
        mesh.visible = false;
        // also drop geometry so edge generation can't re-add it
        mesh.geometry = new THREE.BufferGeometry();
      }
    });

    clone.traverse((obj) => {
      if (!(obj as THREE.Mesh).isMesh) return;
      const mesh = obj as THREE.Mesh;
      if (!mesh.visible) return;

      const base = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#05070b"),
        metalness: 0.55,
        roughness: 0.5,
        emissive: new THREE.Color("#0a1828"),
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 1,
      });
      mesh.material = base;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      const edges = new THREE.EdgesGeometry(
        (mesh.geometry as THREE.BufferGeometry).clone(),
        15
      );
      const wireMat = new THREE.LineBasicMaterial({
        color: new THREE.Color("#22aaff"),
        transparent: true,
        opacity: 0.5,
        toneMapped: false,
      });
      const wire = new THREE.LineSegments(edges, wireMat);
      wire.renderOrder = 2;
      mesh.add(wire);

      meshes.push({ mesh, wire, baseMaterial: base, wireMaterial: wireMat });
    });

    meshesRef.current = meshes;
    return clone;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, HIDE_MESHES.source]);

  // idle auto-rotate — runs only when no category is active
  useFrame((_, dt) => {
    if (!root.current) return;
    if (activeId !== "idle") return;
    root.current.rotation.y += dt * 0.2;
  });

  // ghost the body while a part is selected; reset the car to its native
  // GLB orientation (rotation.y = 0) whenever a category is active so the
  // pre-tuned camera angles in parts.ts always frame the scene consistently.
  // When returning to idle we keep rotation at 0 and the useFrame auto-spin
  // continues the rotation from there.
  useEffect(() => {
    if (!root.current) return;
    const cat = PART_CATEGORIES.find((c) => c.id === activeId);
    const isIdle = !cat;

    // always normalize rotation to 0 on category change so camera framing
    // works against a consistent car orientation (front of car at -z)
    gsap.to(root.current.rotation, {
      y: 0,
      duration: 0.9,
      ease: "power3.inOut",
    });

    meshesRef.current.forEach(({ baseMaterial, wireMaterial }) => {
      gsap.to(baseMaterial, {
        opacity: isIdle ? 1 : 0,
        emissiveIntensity: isIdle ? 0.25 : 0,
        duration: 0.7,
        ease: "power2.out",
      });
      gsap.to(wireMaterial, {
        opacity: isIdle ? 0.5 : 0.06,
        duration: 0.7,
        ease: "power2.out",
      });
    });
  }, [activeId]);

  return (
    <group ref={root} position={[0, -0.35, 0]} scale={1.6}>
      <primitive object={clonedScene} />
    </group>
  );
}

function PartMarkers({ activeId }: { activeId: string }) {
  const active = PART_CATEGORIES.find((c) => c.id === activeId);

  // shared material + wireframe overlay for all component meshes in the
  // active category so they pulse together
  const material = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#22f0ff"),
      emissive: new THREE.Color("#22f0ff"),
      emissiveIntensity: 2.2,
      metalness: 0.15,
      roughness: 0.35,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
    });
    return m;
  }, []);
  const wireMaterial = useMemo(() => {
    const m = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      opacity: 0,
      wireframe: true,
      depthWrite: false,
      depthTest: false,
      toneMapped: false,
    });
    return m;
  }, []);

  // pulse the fill emissive while the category is active
  useFrame(({ clock }) => {
    if (!active) return;
    const t = clock.getElapsedTime();
    material.emissiveIntensity = 2.0 + Math.sin(t * 3.5) * 0.8;
  });

  // animate opacity in on category change (only rerun when activeId changes)
  useEffect(() => {
    if (activeId === "idle") return;
    material.opacity = 0;
    wireMaterial.opacity = 0;
    gsap.to(material, {
      opacity: 0.92,
      duration: 0.55,
      ease: "power2.out",
    });
    gsap.to(wireMaterial, {
      opacity: 1,
      duration: 0.55,
      ease: "power2.out",
    });
  }, [activeId, material, wireMaterial]);

  if (!active) return null;

  return (
    <group position={[0, -0.35, 0]} scale={1.6} renderOrder={999}>
      {active.markers.map((marker, mIdx) => (
        <group
          key={`${active.id}-${mIdx}`}
          position={marker.position}
          rotation={marker.rotation ?? [0, 0, 0]}
          scale={marker.scale ?? 1}
          renderOrder={999}
        >
          <PartComponent
            kind={marker.kind}
            material={material}
            wireMaterial={wireMaterial}
          />
        </group>
      ))}
    </group>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 40, "#22aaff", "#0a2233"]}
      position={[0, -0.45, 0]}
    />
  );
}

// default "idle" camera view — wide 3/4 front
const IDLE_CAMERA: [number, number, number] = [3.5, 1.4, 4];
const IDLE_TARGET: [number, number, number] = [0, 0, 0];

function CameraRig({ activeId }: { activeId: string }) {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    const cat = PART_CATEGORIES.find((c) => c.id === activeId);
    const pos = cat ? cat.camera : IDLE_CAMERA;
    const look = cat ? cat.target : IDLE_TARGET;
    gsap.to(camera.position, {
      x: pos[0],
      y: pos[1],
      z: pos[2],
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(look[0], look[1], look[2]),
    });
  }, [activeId, camera]);
  return null;
}

export default function CarScene({ activeId }: { activeId: string }) {
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      shadows
      camera={{ position: [3.5, 1.4, 4], fov: 38 }}
      gl={{
        antialias: true,
        alpha: false,
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor("#07090e", 1);
        scene.background = new THREE.Color("#07090e");
        scene.fog = new THREE.Fog("#07090e", 9, 22);
      }}
      style={{ width: "100%", height: "100%", background: "#07090e" }}
    >
      <ambientLight intensity={0.25} />
      <hemisphereLight args={["#22aaff", "#000000", 0.4]} />
      <directionalLight
        position={[5, 7, 5]}
        intensity={1.8}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[5, 6, 5]}
        angle={0.5}
        penumbra={0.8}
        intensity={70}
        color="#22f0ff"
      />
      <spotLight
        position={[-5, 4, -3]}
        angle={0.5}
        penumbra={0.8}
        intensity={45}
        color="#22aaff"
      />
      <spotLight
        position={[0, 4, -6]}
        angle={0.6}
        penumbra={0.8}
        intensity={18}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <Car activeId={activeId} />
        <PartMarkers activeId={activeId} />
        <CameraRig activeId={activeId} />
        <ContactShadows
          position={[0, -0.46, 0]}
          opacity={0.55}
          scale={14}
          blur={2.8}
          far={4}
          color="#000000"
        />
        <GridFloor />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.LARGE}
          mipmapBlur
        />
      </EffectComposer>
    </Canvas>
  );
}
