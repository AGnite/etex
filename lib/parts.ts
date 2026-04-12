import type { Vector3Tuple } from "three";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Component kinds — each one renders as a composite assembly of Three.js
 * primitives designed to read as an actual car part. JSX for each kind
 * lives in components/three/PartComponents.tsx.
 */
export type ComponentKind =
  | "piston"
  | "engineBlock"
  | "brakeDisc"
  | "shockAbsorber"
  | "steeringWheel"
  | "clutchDisc"
  | "gearbox"
  | "driveshaft"
  | "radiator"
  | "fan"
  | "airFilter"
  | "tire"
  | "belt"
  | "sparkPlug"
  | "battery"
  | "headlight"
  | "ignitionCoil"
  | "oilPan"
  | "oilFilter"
  | "fluidReservoir"
  | "racingDisc"
  | "racingWing"
  | "racingStripe";

export type MarkerInstance = {
  position: Vector3Tuple;
  rotation?: Vector3Tuple;
  scale?: number;
  kind: ComponentKind;
};

export type ProductImage = {
  src: string;
  label: string;
};

export type PartCategory = {
  id: string;
  code: string;
  name: string;
  description: string;
  brands: string[];
  camera: Vector3Tuple;
  target: Vector3Tuple;
  markers: MarkerInstance[];
  products: ProductImage[];
};

// ─── Ferrari 458 GLB actual coordinates (from runtime inspection) ───
// IMPORTANT: this GLB orients the car with +Z at REAR, -Z at FRONT.
// Key node positions in car-local coordinates:
//   wheel_fr (front right):  ( 0.83, 0.36, -1.15)
//   wheel_fl (front left):   (-0.84, 0.36, -1.15)
//   wheel_rr (rear right):   ( 0.82, 0.36,  1.50)
//   wheel_rl (rear left):    (-0.82, 0.36,  1.50)
//   lights (front):          ( 0.00, 0.00, -1.85)
//   lights_red (rear):       ( 0.00, 0.00,  0.91)
//   glass (cockpit):         ( 0.00, 0.00,  0.19)
//   steering_wheel:          (-0.35, 0.80, -0.35)
//
// All marker positions below are in this car-local frame. The PartMarkers
// group applies the same translate+scale as the Car group so markers align.
export const PART_CATEGORIES: PartCategory[] = [
  {
    id: "engine",
    code: "C01",
    name: "Engine Components",
    description:
      "Pistons, liners, piston rings, engine bearings, valves, guides, gaskets, belts, tensioners — the heart of every chassis etex services.",
    brands: ["GOETZE", "GLYCO", "NURAL", "PAYEN", "MUSASHI"],
    camera: [3.0, 2.4, 3.0],
    target: [0, 0.6, 0.85],
    markers: [
      // engine block sitting in the engine bay
      { position: [0, 0.55, 0.85], kind: "engineBlock" },
      // 4 pistons arrayed above the valve covers (poking out above the block)
      { position: [-0.3, 0.88, 0.7], kind: "piston" },
      { position: [-0.1, 0.88, 0.7], kind: "piston" },
      { position: [0.1, 0.88, 0.7], kind: "piston" },
      { position: [0.3, 0.88, 0.7], kind: "piston" },
    ],
    products: [
      { src: `${BASE}/images/products/pistons-and-liners.jpg`, label: "Pistons & Liners" },
      { src: `${BASE}/images/products/piston-rings.jpg`, label: "Piston Rings" },
      { src: `${BASE}/images/products/engine-bearings.jpg`, label: "Engine Bearings" },
      { src: `${BASE}/images/products/valves-and-guides.jpg`, label: "Valves & Guides" },
      { src: `${BASE}/images/products/gaskets.jpg`, label: "Gaskets" },
      { src: `${BASE}/images/products/belts.jpg`, label: "Belts" },
      { src: `${BASE}/images/products/tensioners.jpg`, label: "Tensioners" },
    ],
  },
  {
    id: "steering",
    code: "C02",
    name: "Steering & Suspension",
    description:
      "Shock absorbers, arms, ends, rods, joints, CV joints, steering drive shaft boots and wheel bearings. The parts that keep the car planted.",
    brands: ["MONROE", "MOOG", "LESJÖFORS", "FLENNOR", "555"],
    camera: [3.8, 2.8, -3.5],
    target: [0, 0.5, 0],
    markers: [
      // 4 coilover shocks above each wheel
      { position: [0.83, 0.7, -1.15], kind: "shockAbsorber" },
      { position: [-0.84, 0.7, -1.15], kind: "shockAbsorber" },
      { position: [0.82, 0.7, 1.50], kind: "shockAbsorber" },
      { position: [-0.82, 0.7, 1.50], kind: "shockAbsorber" },
      // steering wheel in the cockpit
      { position: [-0.35, 0.8, -0.35], rotation: [0.35, 0, 0], kind: "steeringWheel" },
    ],
    products: [
      { src: `${BASE}/images/products/shock-absorbers.jpg`, label: "Shock Absorbers" },
      { src: `${BASE}/images/products/arms-ends-rods-joints.jpg`, label: "Arms · Ends · Rods · Joints" },
      { src: `${BASE}/images/products/cv-joints.jpg`, label: "CV Joints" },
      { src: `${BASE}/images/products/Steering-Drive-Shaft-Boots.jpg`, label: "Drive Shaft Boots" },
      { src: `${BASE}/images/products/wheel-bearings.jpg`, label: "Wheel Bearings" },
    ],
  },
  {
    id: "brakes",
    code: "C03",
    name: "Brake System",
    description:
      "Pads, discs, shoes, pumps and fluids — every stopping surface for every chassis. Authorized-distributor pricing direct from manufacturers.",
    brands: ["FERODO", "REMSA", "NISSHINBO", "LOCKHEED"],
    camera: [2.8, 1.0, -2.6],
    target: [0.83, 0.36, -1.15],
    markers: [
      // brake disc at each wheel — matches real wheel translations
      { position: [0.83, 0.36, -1.15], kind: "brakeDisc" },
      { position: [-0.84, 0.36, -1.15], kind: "brakeDisc" },
      { position: [0.82, 0.36, 1.50], kind: "brakeDisc" },
      { position: [-0.82, 0.36, 1.50], kind: "brakeDisc" },
    ],
    products: [
      { src: `${BASE}/images/products/brake-pads.jpg`, label: "Brake Pads" },
      { src: `${BASE}/images/products/brake-discs.jpg`, label: "Brake Discs" },
      { src: `${BASE}/images/products/brake-shoes.jpg`, label: "Brake Shoes" },
      { src: `${BASE}/images/products/brake-pumps.jpg`, label: "Brake Pumps" },
      { src: `${BASE}/images/products/brake-fluids.jpg`, label: "Brake Fluids" },
    ],
  },
  {
    id: "transmission",
    code: "C04",
    name: "Transmission",
    description:
      "Clutches, clutch bearings, transmission fluid, universal joints. Smooth shifts across European, Japanese and Korean drivetrains.",
    brands: ["DAIKIN", "VALEO", "SACHS", "NATIONAL"],
    camera: [4.5, 3.5, 4.8],
    target: [0, 0.3, 1.1],
    markers: [
      // gearbox behind the engine, in front of rear axle
      { position: [0, 0.3, 1.35], kind: "gearbox" },
      // driveshaft running forward (toward -z) from gearbox to engine
      { position: [0, 0.2, 0.6], kind: "driveshaft" },
      // clutch disc between engine and gearbox
      { position: [0, 0.4, 1.1], rotation: [0, Math.PI / 2, 0], kind: "clutchDisc" },
    ],
    products: [
      { src: `${BASE}/images/products/clutches.jpg`, label: "Clutches" },
      { src: `${BASE}/images/products/clutch-bearings.jpg`, label: "Clutch Bearings" },
      { src: `${BASE}/images/products/transmission-fluid.jpg`, label: "Transmission Fluid" },
      { src: `${BASE}/images/products/universal-joints.jpg`, label: "Universal Joints" },
    ],
  },
  {
    id: "cooling",
    code: "C05",
    name: "Cooling & Filters",
    description:
      "Filters, coolant, antifreeze, water pumps, thermostats, hoses, radiators. Thermal management for Cyprus's summer heat.",
    brands: ["GMB", "MOTORAD", "MAHLE", "CHAMPION"],
    camera: [1.5, 1.8, -4.0],
    target: [0, 0.5, -1.7],
    markers: [
      // radiator in the nose
      { position: [0, 0.5, -1.7], kind: "radiator" },
      // two fans behind the radiator (slightly more positive z = closer to cabin)
      { position: [-0.28, 0.5, -1.55], kind: "fan" },
      { position: [0.28, 0.5, -1.55], kind: "fan" },
      // air filter in the engine bay, right side next to the block
      { position: [0.55, 0.75, 0.85], kind: "airFilter" },
    ],
    products: [
      { src: `${BASE}/images/products/filters.jpg`, label: "Filters" },
      { src: `${BASE}/images/products/coolant-antifreeze.jpg`, label: "Coolant · Antifreeze" },
      { src: `${BASE}/images/products/water-pumps.jpg`, label: "Water Pumps" },
      { src: `${BASE}/images/products/thermostats.jpg`, label: "Thermostats" },
      { src: `${BASE}/images/products/hoses.jpg`, label: "Hoses" },
      { src: `${BASE}/images/products/radiators.jpg`, label: "Radiators" },
    ],
  },
  {
    id: "rubber",
    code: "C06",
    name: "Rubber & Body",
    description:
      "Engine mounts, bushes, boots, oil seals, hoses, gas springs. The connective tissue between metal and motion.",
    brands: ["SEIKEN", "IMA", "METELLI", "ALCO"],
    camera: [4.8, 2.0, -4.2],
    target: [0, 0.2, -0.2],
    markers: [
      // tires at wheel positions
      { position: [0.83, 0.36, -1.15], kind: "tire" },
      { position: [-0.84, 0.36, -1.15], kind: "tire" },
      { position: [0.82, 0.36, 1.50], kind: "tire" },
      { position: [-0.82, 0.36, 1.50], kind: "tire" },
      // timing belt on the engine
      { position: [0, 0.95, 0.55], rotation: [0, Math.PI / 2, 0], kind: "belt" },
    ],
    products: [
      { src: `${BASE}/images/products/engine-mounts.jpg`, label: "Engine Mounts" },
      { src: `${BASE}/images/products/bushes.jpg`, label: "Bushes" },
      { src: `${BASE}/images/products/boots.jpg`, label: "Boots" },
      { src: `${BASE}/images/products/oil-seals.jpg`, label: "Oil Seals" },
      { src: `${BASE}/images/products/hoses.jpg`, label: "Hoses" },
      { src: `${BASE}/images/products/gas-springs.jpg`, label: "Gas Springs" },
    ],
  },
  {
    id: "electrical",
    code: "C07",
    name: "Electrical & Ignition",
    description:
      "Spark plugs, glow plugs, ignition cable, fuel pumps, batteries, engine control sensors, oxygen sensors, ignition coils.",
    brands: ["CHAMPION", "VALEO", "HDK", "JFBK"],
    camera: [3.5, 3.2, -2.5],
    target: [0, 0.6, 0],
    markers: [
      // car battery in the nose / front trunk
      { position: [0.45, 0.4, -1.35], kind: "battery" },
      // 4 spark plugs atop the engine, one per cylinder
      { position: [-0.3, 1.15, 0.7], kind: "sparkPlug" },
      { position: [-0.1, 1.15, 0.7], kind: "sparkPlug" },
      { position: [0.1, 1.15, 0.7], kind: "sparkPlug" },
      { position: [0.3, 1.15, 0.7], kind: "sparkPlug" },
      // ignition coil pack next to the engine
      { position: [-0.55, 1.0, 0.85], kind: "ignitionCoil" },
      // 2 headlights
      { position: [0.7, 0.55, -1.8], kind: "headlight" },
      { position: [-0.7, 0.55, -1.8], kind: "headlight" },
    ],
    products: [
      { src: `${BASE}/images/products/spark-plugs.jpg`, label: "Spark Plugs" },
      { src: `${BASE}/images/products/glow-plugs.jpg`, label: "Glow Plugs" },
      { src: `${BASE}/images/products/ignition-cable.jpg`, label: "Ignition Cable" },
      { src: `${BASE}/images/products/fuel-pumps.jpg`, label: "Fuel Pumps" },
      { src: `${BASE}/images/products/car-battery.jpg`, label: "Car Battery" },
      { src: `${BASE}/images/products/engine-control-sensors.jpg`, label: "Engine Control Sensors" },
      { src: `${BASE}/images/products/oxygen-sensors.jpg`, label: "Oxygen Sensors" },
      { src: `${BASE}/images/products/ignition-coil.jpg`, label: "Ignition Coil" },
    ],
  },
  {
    id: "lubricants",
    code: "C08",
    name: "Lubricants",
    description:
      "Engine oil, transmission fluid, grease, coolant, antifreeze, brake fluids. The fluids that keep the metal moving.",
    brands: ["UNIL", "PB", "MOTORAD", "CAR"],
    camera: [-4.8, 0.8, 3.2],
    target: [0, 0.2, 0.85],
    markers: [
      // oil pan under the engine
      { position: [0, 0.15, 0.85], kind: "oilPan" },
      // oil filter near engine
      { position: [0.5, 0.4, 0.65], kind: "oilFilter" },
      // brake fluid reservoir near firewall
      { position: [0.5, 0.85, 0.3], kind: "fluidReservoir" },
    ],
    products: [
      { src: `${BASE}/images/products/engine-oil.jpg`, label: "Engine Oil" },
      { src: `${BASE}/images/products/transmission-fluid.jpg`, label: "Transmission Fluid" },
      { src: `${BASE}/images/products/grease.jpg`, label: "Grease" },
      { src: `${BASE}/images/products/coolant-antifreeze.jpg`, label: "Coolant · Antifreeze" },
      { src: `${BASE}/images/products/brake-fluids.jpg`, label: "Brake Fluids" },
    ],
  },
  {
    id: "racing",
    code: "C09",
    name: "Performance & Racing",
    description:
      "Racing brake pads, racing brake discs, racing engine oil, racing clutches. Track-ready gear for Cyprus's enthusiasts.",
    brands: ["FERODO", "MCHANIX", "UNIL", "NDC"],
    camera: [4.0, 2.0, 4.5],
    target: [0, 0.5, 0.3],
    markers: [
      // racing stripe along the centerline
      { position: [0, 1.15, 0], kind: "racingStripe" },
      // uprated racing discs at all 4 wheels
      { position: [0.83, 0.36, -1.15], kind: "racingDisc" },
      { position: [-0.84, 0.36, -1.15], kind: "racingDisc" },
      { position: [0.82, 0.36, 1.50], kind: "racingDisc" },
      { position: [-0.82, 0.36, 1.50], kind: "racingDisc" },
      // rear wing (behind the car, high y)
      { position: [0, 1.25, 1.9], kind: "racingWing" },
    ],
    products: [
      { src: `${BASE}/images/products/racing-brake-pads.jpg`, label: "Racing Brake Pads" },
      { src: `${BASE}/images/products/racing-brake-discs.jpg`, label: "Racing Brake Discs" },
      { src: `${BASE}/images/products/racing-engine-oil.jpg`, label: "Racing Engine Oil" },
      { src: `${BASE}/images/products/racing-clutches.jpg`, label: "Racing Clutches" },
    ],
  },
];
