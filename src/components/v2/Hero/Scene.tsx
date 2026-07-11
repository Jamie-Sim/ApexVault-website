"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/*
 * The hero instrument: an abstract 3D tachometer floating in the dark.
 * The red needle idles at ~900rpm and revs with live scroll velocity
 * (read from the Lenis instance), sweeping toward the redline when the
 * visitor scrolls hard. Pointer position tilts the whole assembly.
 */

const TICK_COUNT = 48;
const START_ANGLE = (Math.PI * 7) / 6; /* 210° = 0 rpm */
const END_ANGLE = -Math.PI / 6; /* -30° = max */
const SWEEP = START_ANGLE - END_ANGLE;

function rpmAngle(rpm: number) {
  return START_ANGLE - (rpm / 8000) * SWEEP;
}

function Ticks() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const colors = useMemo(() => {
    const arr = new Float32Array(TICK_COUNT * 3);
    const amber = new THREE.Color("#ff9e2c");
    const red = new THREE.Color("#e6392b");
    for (let i = 0; i < TICK_COUNT; i++) {
      const c = i / (TICK_COUNT - 1) > 0.8 ? red : amber;
      arr.set([c.r, c.g, c.b], i * 3);
    }
    return arr;
  }, []);

  useMemo(() => {
    /* placed imperatively once on mount via ref callback below */
  }, []);

  return (
    <instancedMesh
      ref={(mesh) => {
        if (!mesh) return;
        const dummy = new THREE.Object3D();
        for (let i = 0; i < TICK_COUNT; i++) {
          const t = i / (TICK_COUNT - 1);
          const angle = START_ANGLE - t * SWEEP;
          const major = i % 6 === 0;
          const r = 2.14;
          dummy.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
          dummy.rotation.set(0, 0, angle + Math.PI / 2);
          dummy.scale.set(1, major ? 1.9 : 1, 1);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }}
      args={[undefined, undefined, TICK_COUNT]}
    >
      <boxGeometry args={[0.018, 0.11, 0.018]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxGeometry>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

function Needle() {
  const group = useRef<THREE.Group>(null);
  const rpm = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const lenis = window.__lenis;
    const velocity = lenis ? Math.abs(lenis.velocity) : 0;
    const target = Math.min(900 + velocity * 55, 7900);
    /* rev fast, fall back slow, like a real engine */
    const rate = target > rpm.current ? 6.5 : 1.6;
    rpm.current = THREE.MathUtils.damp(rpm.current, target, rate, delta);
    group.current.rotation.z = rpmAngle(rpm.current);
  });

  return (
    <group ref={group} rotation={[0, 0, rpmAngle(0)]}>
      <mesh position={[0.85, 0, 0.02]}>
        <boxGeometry args={[1.7, 0.022, 0.012]} />
        <meshBasicMaterial color="#ff2f1f" toneMapped={false} />
      </mesh>
      <mesh position={[1.7, 0, 0.02]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color="#ff5a3c" toneMapped={false} />
      </mesh>
    </group>
  );
}

function Rings() {
  return (
    <>
      <mesh>
        <torusGeometry args={[2.32, 0.028, 24, 200]} />
        <meshStandardMaterial
          color="#4a4238"
          metalness={1}
          roughness={0.28}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[1.52, 0.014, 16, 160]} />
        <meshStandardMaterial
          color="#3c352c"
          metalness={1}
          roughness={0.35}
        />
      </mesh>
      {/* hub */}
      <mesh>
        <cylinderGeometry args={[0.09, 0.09, 0.05, 24]} />
        <meshStandardMaterial color="#211c16" metalness={0.9} roughness={0.4} />
      </mesh>
    </>
  );
}

function Dust() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const n = 320;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 1.2 + Math.random() * 4.2;
      const a = Math.random() * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a) * r * 0.7;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2.4;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.012;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffb454"
        size={0.014}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Assembly() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    const { pointer } = state;
    /* pointer parallax, lerped so it feels weighted */
    const tx = -0.24 + pointer.y * 0.08;
    const ty = -0.3 + pointer.x * 0.12;
    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      tx,
      3,
      delta,
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      ty,
      3,
      delta,
    );
  });

  return (
    /* the dial sits to the right of the stacked wordmark, angled
       slightly toward the viewer like a gauge in a binnacle */
    <group ref={group} position={[2.35, -0.18, 0]} scale={0.95} rotation={[-0.24, -0.3, 0]}>
      <Rings />
      <Ticks />
      <Needle />
      <Dust />
    </group>
  );
}

export default function Scene({
  onReady,
  frameloop = "always",
}: {
  onReady?: () => void;
  frameloop?: "always" | "never";
}) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={frameloop}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, -0.4, 5.6], fov: 42 }}
      onCreated={() => onReady?.()}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 3, 4]} intensity={26} color="#ffb454" />
      <pointLight position={[-5, -2, 3]} intensity={8} color="#e6392b" />
      <Assembly />
      <EffectComposer>
        <Bloom
          intensity={0.9}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.28} darkness={0.72} />
      </EffectComposer>
    </Canvas>
  );
}
