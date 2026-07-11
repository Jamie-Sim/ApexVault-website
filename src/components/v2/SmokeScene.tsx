"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

function SpinningRing() {
  const mesh = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.4;
      mesh.current.rotation.y += delta * 0.25;
    }
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[1.4, 0.06, 16, 128]} />
      <meshStandardMaterial
        color="#ff9e2c"
        emissive="#ff9e2c"
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.25}
      />
    </mesh>
  );
}

export default function SmokeScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4], fov: 45 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={20} color="#ffb454" />
      <SpinningRing />
    </Canvas>
  );
}
