import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

type Palette = {
  node: string;
  hub: string;
  line: string;
};

const NODE_COUNT = 64;
const HUB_COUNT = 7;
const LINK_DIST = 4.1;
const MAX_LINKS = 110;

/** Deterministic PRNG so the network looks identical on every visit. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function useNetwork() {
  return useMemo(() => {
    const rand = mulberry32(20260610);
    const base = new Float32Array(NODE_COUNT * 3);
    const phase = new Float32Array(NODE_COUNT);
    const speed = new Float32Array(NODE_COUNT);

    for (let i = 0; i < NODE_COUNT; i++) {
      base[i * 3] = (rand() - 0.5) * 19;
      base[i * 3 + 1] = (rand() - 0.5) * 9;
      base[i * 3 + 2] = (rand() - 0.5) * 6;
      phase[i] = rand() * Math.PI * 2;
      speed[i] = 0.25 + rand() * 0.45;
    }

    const links: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT && links.length < MAX_LINKS; i++) {
      for (let j = i + 1; j < NODE_COUNT && links.length < MAX_LINKS; j++) {
        const dx = base[i * 3] - base[j * 3];
        const dy = base[i * 3 + 1] - base[j * 3 + 1];
        const dz = base[i * 3 + 2] - base[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINK_DIST) {
          links.push([i, j]);
        }
      }
    }

    return { base, phase, speed, links };
  }, []);
}

function nodePosition(
  out: THREE.Vector3,
  base: Float32Array,
  phase: Float32Array,
  speed: Float32Array,
  i: number,
  t: number
) {
  out.set(
    base[i * 3] + Math.sin(t * speed[i] + phase[i]) * 0.45,
    base[i * 3 + 1] + Math.cos(t * speed[i] * 0.8 + phase[i] * 1.7) * 0.4,
    base[i * 3 + 2] + Math.sin(t * speed[i] * 0.6 + phase[i] * 0.9) * 0.3
  );
}

function Network({ palette }: { palette: Palette }) {
  const { base, phase, speed, links } = useNetwork();
  const group = useRef<THREE.Group>(null);
  const pointsGeo = useRef<THREE.BufferGeometry>(null);
  const hubsGeo = useRef<THREE.BufferGeometry>(null);
  const linesGeo = useRef<THREE.BufferGeometry>(null);
  const v = useMemo(() => new THREE.Vector3(), []);

  const nodePositions = useMemo(() => new Float32Array(NODE_COUNT * 3), []);
  const hubPositions = useMemo(() => new Float32Array(HUB_COUNT * 3), []);
  const linePositions = useMemo(() => new Float32Array(links.length * 6), [links]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    for (let i = 0; i < NODE_COUNT; i++) {
      nodePosition(v, base, phase, speed, i, t);
      nodePositions[i * 3] = v.x;
      nodePositions[i * 3 + 1] = v.y;
      nodePositions[i * 3 + 2] = v.z;
      if (i < HUB_COUNT) {
        hubPositions[i * 3] = v.x;
        hubPositions[i * 3 + 1] = v.y;
        hubPositions[i * 3 + 2] = v.z;
      }
    }

    for (let l = 0; l < links.length; l++) {
      const [a, b] = links[l];
      linePositions[l * 6] = nodePositions[a * 3];
      linePositions[l * 6 + 1] = nodePositions[a * 3 + 1];
      linePositions[l * 6 + 2] = nodePositions[a * 3 + 2];
      linePositions[l * 6 + 3] = nodePositions[b * 3];
      linePositions[l * 6 + 4] = nodePositions[b * 3 + 1];
      linePositions[l * 6 + 5] = nodePositions[b * 3 + 2];
    }

    if (pointsGeo.current) {
      pointsGeo.current.attributes.position.needsUpdate = true;
    }
    if (hubsGeo.current) {
      hubsGeo.current.attributes.position.needsUpdate = true;
    }
    if (linesGeo.current) {
      linesGeo.current.attributes.position.needsUpdate = true;
    }

    if (group.current) {
      const targetY = state.pointer.x * 0.16;
      const targetX = -state.pointer.y * 0.1;
      group.current.rotation.y += (targetY + t * 0.015 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={palette.node}
          size={0.085}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <points>
        <bufferGeometry ref={hubsGeo}>
          <bufferAttribute attach="attributes-position" args={[hubPositions, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          color={palette.hub}
          size={0.22}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          color={palette.line}
          opacity={0.14}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

type HeroSceneProps = {
  /** Pauses the render loop when the hero is off-screen. */
  active: boolean;
  dark: boolean;
};

export default function HeroScene({ active, dark }: HeroSceneProps) {
  const palette: Palette = dark
    ? { node: "#8b97ff", hub: "#5fd4ff", line: "#6674e8" }
    : { node: "#3947d6", hub: "#0d94d2", line: "#5560cf" };

  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 13], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
    >
      <Network palette={palette} />
    </Canvas>
  );
}
