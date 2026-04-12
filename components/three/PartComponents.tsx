"use client";

import { forwardRef } from "react";
import * as THREE from "three";
import type { ComponentKind } from "@/lib/parts";

/**
 * Each component is a composite assembly of Three.js primitives
 * (cylinders, boxes, tori) arranged to read as a real automotive part.
 * All meshes share a single standard material passed in from the caller
 * so the group fades / highlights uniformly.
 */

type Props = {
  material: THREE.Material;
  wireMaterial: THREE.Material;
};

// helper to create both a solid mesh and a wireframe overlay with one geometry.
// renderOrder 999 + depthTest:false in the materials ensures markers draw on
// top of the car body so they never get occluded by the wireframe.
function Dual({
  geometry,
  material,
  wireMaterial,
  position,
  rotation,
  scale,
}: {
  geometry: React.ReactNode;
  material: THREE.Material;
  wireMaterial: THREE.Material;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh material={material} renderOrder={999}>
        {geometry}
      </mesh>
      <mesh material={wireMaterial} renderOrder={1000}>
        {geometry}
      </mesh>
    </group>
  );
}

// ─── ENGINE COMPONENTS ────────────────────────────────────────────────

function Piston({ material, wireMaterial }: Props) {
  // slightly larger piston that reads clearly at car scale
  return (
    <group>
      {/* piston body */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.11, 0.11, 0.26, 20]} />}
      />
      {/* compression ring */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.1, 0]}
        geometry={<torusGeometry args={[0.11, 0.015, 6, 24]} />}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* second ring */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.04, 0]}
        geometry={<torusGeometry args={[0.11, 0.015, 6, 24]} />}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* connecting rod */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.2, 0]}
        geometry={<boxGeometry args={[0.045, 0.22, 0.09]} />}
      />
      {/* wrist pin */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.018, 0.018, 0.17, 8]} />}
      />
    </group>
  );
}

function EngineBlock({ material, wireMaterial }: Props) {
  // downsized to fit the engine bay — real V8 is ~0.7m × 0.5m × 0.6m
  return (
    <group>
      {/* main block */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.85, 0.45, 0.7]} />}
      />
      {/* valve covers — 2 for a V8 (left + right banks) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[-0.22, 0.28, 0]}
        rotation={[0, 0, 0.2]}
        geometry={<boxGeometry args={[0.22, 0.08, 0.6]} />}
      />
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.22, 0.28, 0]}
        rotation={[0, 0, -0.2]}
        geometry={<boxGeometry args={[0.22, 0.08, 0.6]} />}
      />
      {/* intake plenum on top between the banks */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.36, 0]}
        geometry={<boxGeometry args={[0.2, 0.1, 0.45]} />}
      />
    </group>
  );
}

// ─── BRAKE SYSTEM ────────────────────────────────────────────────

function BrakeDisc({ material, wireMaterial }: Props) {
  // sized to sit inside a car wheel — ~30cm real → 0.18 radius in GLB space
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* main rotor disc */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.18, 0.18, 0.035, 40]} />}
      />
      {/* inner hub */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.06, 0.06, 0.07, 20]} />}
      />
      {/* inner vented disc layer */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.12, 0.12, 0.04, 32]} />}
      />
      {/* 5 lug holes */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2;
        const r = 0.045;
        return (
          <Dual
            key={i}
            material={material}
            wireMaterial={wireMaterial}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            geometry={<cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />}
          />
        );
      })}
      {/* caliper — box clamping the top of the disc */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.17]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<boxGeometry args={[0.11, 0.1, 0.1]} />}
      />
    </group>
  );
}

// ─── SUSPENSION / STEERING ────────────────────────────────────────────────

function ShockAbsorber({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* shock body tube */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.05, 0.05, 0.7, 16]} />}
      />
      {/* coil spring — stacked torus rings */}
      {[0.3, 0.22, 0.14, 0.06, -0.02, -0.1, -0.18, -0.26].map((y) => (
        <Dual
          key={y}
          material={material}
          wireMaterial={wireMaterial}
          position={[0, y, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          geometry={<torusGeometry args={[0.085, 0.008, 6, 20]} />}
        />
      ))}
      {/* top spring perch */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.38, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.12, 0.1, 0.04, 16]} />}
      />
      {/* bottom spring perch */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.34, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.11, 0.11, 0.035, 16]} />}
      />
      {/* top mount with hole */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.44, 0]}
        geometry={<boxGeometry args={[0.16, 0.04, 0.08]} />}
      />
    </group>
  );
}

function SteeringWheel({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* outer rim */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<torusGeometry args={[0.17, 0.018, 8, 32]} />}
      />
      {/* 3 spokes */}
      {[0, Math.PI * 0.67, Math.PI * 1.33].map((angle, i) => (
        <Dual
          key={i}
          material={material}
          wireMaterial={wireMaterial}
          rotation={[0, angle, 0]}
          position={[Math.cos(angle) * 0.08, 0, Math.sin(angle) * 0.08]}
          geometry={<boxGeometry args={[0.16, 0.015, 0.02]} />}
        />
      ))}
      {/* center hub */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />}
      />
      {/* column */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.25, -0.1]}
        rotation={[0.4, 0, 0]}
        geometry={<cylinderGeometry args={[0.025, 0.025, 0.5, 12]} />}
      />
    </group>
  );
}

// ─── TRANSMISSION ────────────────────────────────────────────────

function Gearbox({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main housing */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.55, 0.4, 0.55]} />}
      />
      {/* bellhousing — tapered cylinder on the front */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.35]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.25, 0.22, 0.15, 24]} />}
      />
      {/* shifter tower on top */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.25, 0]}
        geometry={<boxGeometry args={[0.12, 0.1, 0.12]} />}
      />
      {/* output flange on back */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, -0.3]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.1, 0.1, 0.05, 20]} />}
      />
    </group>
  );
}

function Driveshaft({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main shaft tube */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.035, 0.035, 1.8, 16]} />}
      />
      {/* front universal joint */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.9]}
        geometry={<boxGeometry args={[0.1, 0.1, 0.08]} />}
      />
      {/* rear universal joint */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, -0.9]}
        geometry={<boxGeometry args={[0.1, 0.1, 0.08]} />}
      />
      {/* center support bearing */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />}
      />
    </group>
  );
}

function ClutchDisc({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* friction disc */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.22, 0.22, 0.03, 32]} />}
      />
      {/* pressure plate (outer ring) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.03, 0]}
        geometry={<torusGeometry args={[0.2, 0.025, 8, 32]} />}
        rotation={[Math.PI / 2, 0, 0]}
      />
      {/* center spline hub */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />}
      />
      {/* diaphragm spring fingers (8 small boxes radiating from center) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <Dual
            key={i}
            material={material}
            wireMaterial={wireMaterial}
            position={[Math.cos(a) * 0.1, 0.025, Math.sin(a) * 0.1]}
            rotation={[0, -a, 0]}
            geometry={<boxGeometry args={[0.12, 0.01, 0.015]} />}
          />
        );
      })}
    </group>
  );
}

// ─── COOLING ────────────────────────────────────────────────

function Radiator({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* outer frame */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[1.0, 0.5, 0.06]} />}
      />
      {/* horizontal core fins */}
      {[-0.18, -0.09, 0, 0.09, 0.18].map((y) => (
        <Dual
          key={y}
          material={material}
          wireMaterial={wireMaterial}
          position={[0, y, 0.04]}
          geometry={<boxGeometry args={[0.94, 0.012, 0.02]} />}
        />
      ))}
      {/* top tank */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.29, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.04, 0.04, 0.98, 16]} />}
      />
      {/* bottom tank */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.29, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.04, 0.04, 0.98, 16]} />}
      />
      {/* inlet hose stub */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.45, 0.32, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.035, 0.035, 0.08, 12]} />}
      />
    </group>
  );
}

function Fan({ material, wireMaterial }: Props) {
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      {/* center hub */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />}
      />
      {/* 6 blades — thin angled boxes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <Dual
            key={i}
            material={material}
            wireMaterial={wireMaterial}
            position={[Math.cos(a) * 0.1, 0, Math.sin(a) * 0.1]}
            rotation={[0.4, -a, 0]}
            geometry={<boxGeometry args={[0.14, 0.02, 0.055]} />}
          />
        );
      })}
      {/* outer shroud ring */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<torusGeometry args={[0.19, 0.015, 8, 28]} />}
      />
    </group>
  );
}

function AirFilter({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main cylindrical body (pleated) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.14, 0.14, 0.3, 24]} />}
      />
      {/* end cap top */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.16, 0]}
        geometry={<cylinderGeometry args={[0.15, 0.15, 0.02, 24]} />}
      />
      {/* end cap bottom */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.16, 0]}
        geometry={<cylinderGeometry args={[0.15, 0.15, 0.02, 24]} />}
      />
      {/* inlet pipe on top */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.24, 0]}
        geometry={<cylinderGeometry args={[0.05, 0.05, 0.12, 16]} />}
      />
    </group>
  );
}

// ─── RUBBER & BODY ────────────────────────────────────────────────

function Tire({ material, wireMaterial }: Props) {
  // 0.28 radius → ~60cm tire diameter at 1.6× scale, matches the Ferrari's wheels
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      {/* tread band */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<torusGeometry args={[0.28, 0.07, 12, 40]} />}
      />
      {/* inner sidewall */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.28, 0.28, 0.16, 32, 1, true]} />}
      />
      {/* rim disc */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.18, 0.18, 0.09, 20]} />}
      />
    </group>
  );
}

function Belt({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* belt loop */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[0, Math.PI / 2, 0]}
        geometry={<torusGeometry args={[0.18, 0.015, 6, 32]} />}
      />
      {/* upper pulley */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.18, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />}
      />
      {/* lower pulley */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.18, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />}
      />
    </group>
  );
}

// ─── ELECTRICAL ────────────────────────────────────────────────

function SparkPlug({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* ceramic insulator (tapered) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.08, 0]}
        geometry={<cylinderGeometry args={[0.018, 0.028, 0.12, 10]} />}
      />
      {/* hex base */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.01, 0]}
        geometry={<cylinderGeometry args={[0.035, 0.035, 0.04, 6]} />}
      />
      {/* threaded shell */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.08, 0]}
        geometry={<cylinderGeometry args={[0.018, 0.018, 0.08, 10]} />}
      />
      {/* center electrode */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.14, 0]}
        geometry={<cylinderGeometry args={[0.005, 0.005, 0.03, 6]} />}
      />
      {/* ground electrode (L-shaped tip) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.008, -0.15, 0]}
        geometry={<boxGeometry args={[0.012, 0.008, 0.008]} />}
      />
      {/* terminal nut on top */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.16, 0]}
        geometry={<cylinderGeometry args={[0.014, 0.014, 0.02, 8]} />}
      />
    </group>
  );
}

function Battery({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main case */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.36, 0.26, 0.3]} />}
      />
      {/* top lid (slightly inset) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.14, 0]}
        geometry={<boxGeometry args={[0.32, 0.03, 0.26]} />}
      />
      {/* + terminal (bigger) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[-0.11, 0.19, 0]}
        geometry={<cylinderGeometry args={[0.026, 0.026, 0.04, 12]} />}
      />
      {/* - terminal (smaller) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.11, 0.19, 0]}
        geometry={<cylinderGeometry args={[0.022, 0.022, 0.04, 12]} />}
      />
      {/* 6 cell caps across the top */}
      {[-0.12, -0.07, -0.02, 0.03, 0.08, 0.13].map((x) => (
        <Dual
          key={x}
          material={material}
          wireMaterial={wireMaterial}
          position={[x, 0.17, 0.08]}
          geometry={<cylinderGeometry args={[0.012, 0.012, 0.012, 8]} />}
        />
      ))}
    </group>
  );
}

function Headlight({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* outer housing (slightly conical) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.13, 0.1, 0.12, 20]} />}
      />
      {/* reflector bowl */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.04]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<cylinderGeometry args={[0.11, 0.08, 0.06, 20]} />}
      />
      {/* center bulb */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.05]}
        geometry={<sphereGeometry args={[0.025, 12, 12]} />}
      />
      {/* outer bezel ring */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.06]}
        rotation={[Math.PI / 2, 0, 0]}
        geometry={<torusGeometry args={[0.12, 0.01, 8, 24]} />}
      />
    </group>
  );
}

function IgnitionCoil({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main coil body */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.1, 0.14, 0.1]} />}
      />
      {/* HT tower on top */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.11, 0]}
        geometry={<cylinderGeometry args={[0.025, 0.025, 0.08, 10]} />}
      />
      {/* connector on side */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.07, 0, 0]}
        geometry={<boxGeometry args={[0.04, 0.05, 0.04]} />}
      />
    </group>
  );
}

// ─── LUBRICANTS ────────────────────────────────────────────────

function OilPan({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main pan */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.9, 0.15, 0.6]} />}
      />
      {/* drain plug on the bottom */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.1, -0.085, 0]}
        geometry={<cylinderGeometry args={[0.018, 0.018, 0.03, 8]} />}
      />
      {/* dipstick tube */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[-0.3, 0.1, 0.2]}
        geometry={<cylinderGeometry args={[0.01, 0.01, 0.22, 8]} />}
      />
    </group>
  );
}

function OilFilter({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main cylindrical canister */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.08, 0.08, 0.22, 16]} />}
      />
      {/* top (thread end) */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.12, 0]}
        geometry={<cylinderGeometry args={[0.05, 0.07, 0.04, 12]} />}
      />
      {/* ribbed bottom */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, -0.115, 0]}
        geometry={<cylinderGeometry args={[0.082, 0.082, 0.01, 16]} />}
      />
    </group>
  );
}

function FluidReservoir({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* tank */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.16, 0.22, 0.16]} />}
      />
      {/* cap */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0.13, 0]}
        geometry={<cylinderGeometry args={[0.04, 0.04, 0.03, 12]} />}
      />
      {/* output line */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.08, -0.08, 0]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />}
      />
    </group>
  );
}

// ─── RACING ────────────────────────────────────────────────

function RacingDisc({ material, wireMaterial }: Props) {
  // same scale as BrakeDisc but with drilled holes + bigger caliper
  return (
    <group rotation={[0, 0, Math.PI / 2]}>
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.2, 0.2, 0.04, 48]} />}
      />
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<cylinderGeometry args={[0.065, 0.065, 0.08, 20]} />}
      />
      {/* 10 drilled holes */}
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <Dual
            key={i}
            material={material}
            wireMaterial={wireMaterial}
            position={[Math.cos(a) * 0.14, 0, Math.sin(a) * 0.14]}
            geometry={<cylinderGeometry args={[0.012, 0.012, 0.06, 8]} />}
          />
        );
      })}
      {/* 6-piston racing caliper */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0, 0, 0.19]}
        rotation={[0, 0, Math.PI / 2]}
        geometry={<boxGeometry args={[0.15, 0.11, 0.12]} />}
      />
    </group>
  );
}

function RacingWing({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* main wing blade */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[1.6, 0.04, 0.32]} />}
      />
      {/* end plates */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.8, -0.05, 0]}
        geometry={<boxGeometry args={[0.02, 0.2, 0.38]} />}
      />
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[-0.8, -0.05, 0]}
        geometry={<boxGeometry args={[0.02, 0.2, 0.38]} />}
      />
      {/* 2 uprights from the body */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.4, -0.2, -0.1]}
        geometry={<boxGeometry args={[0.03, 0.3, 0.1]} />}
      />
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[-0.4, -0.2, -0.1]}
        geometry={<boxGeometry args={[0.03, 0.3, 0.1]} />}
      />
    </group>
  );
}

function RacingStripe({ material, wireMaterial }: Props) {
  return (
    <group>
      {/* centerline stripe */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        geometry={<boxGeometry args={[0.28, 0.015, 3.4]} />}
      />
      {/* 2 thin outer stripes */}
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[0.18, 0, 0]}
        geometry={<boxGeometry args={[0.06, 0.014, 3.4]} />}
      />
      <Dual
        material={material}
        wireMaterial={wireMaterial}
        position={[-0.18, 0, 0]}
        geometry={<boxGeometry args={[0.06, 0.014, 3.4]} />}
      />
    </group>
  );
}

// ─── DISPATCHER ────────────────────────────────────────────────

export const PartComponent = forwardRef<
  THREE.Group,
  { kind: ComponentKind; material: THREE.Material; wireMaterial: THREE.Material }
>(function PartComponent({ kind, material, wireMaterial }, ref) {
  const props = { material, wireMaterial };
  return (
    <group ref={ref}>
      {(() => {
        switch (kind) {
          case "piston":
            return <Piston {...props} />;
          case "engineBlock":
            return <EngineBlock {...props} />;
          case "brakeDisc":
            return <BrakeDisc {...props} />;
          case "shockAbsorber":
            return <ShockAbsorber {...props} />;
          case "steeringWheel":
            return <SteeringWheel {...props} />;
          case "clutchDisc":
            return <ClutchDisc {...props} />;
          case "gearbox":
            return <Gearbox {...props} />;
          case "driveshaft":
            return <Driveshaft {...props} />;
          case "radiator":
            return <Radiator {...props} />;
          case "fan":
            return <Fan {...props} />;
          case "airFilter":
            return <AirFilter {...props} />;
          case "tire":
            return <Tire {...props} />;
          case "belt":
            return <Belt {...props} />;
          case "sparkPlug":
            return <SparkPlug {...props} />;
          case "battery":
            return <Battery {...props} />;
          case "headlight":
            return <Headlight {...props} />;
          case "ignitionCoil":
            return <IgnitionCoil {...props} />;
          case "oilPan":
            return <OilPan {...props} />;
          case "oilFilter":
            return <OilFilter {...props} />;
          case "fluidReservoir":
            return <FluidReservoir {...props} />;
          case "racingDisc":
            return <RacingDisc {...props} />;
          case "racingWing":
            return <RacingWing {...props} />;
          case "racingStripe":
            return <RacingStripe {...props} />;
          default:
            return null;
        }
      })()}
    </group>
  );
});
