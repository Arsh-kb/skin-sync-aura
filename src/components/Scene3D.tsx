import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function ProductBottle() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 1.6, 32]} />
        <meshStandardMaterial
          color="#d5bdaf"
          roughness={0.15}
          metalness={0.3}
          envMapIntensity={0.8}
        />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.3, 32]} />
        <meshStandardMaterial
          color="#8d5b4c"
          roughness={0.1}
          metalness={0.6}
        />
      </mesh>
      {/* Label band */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.42, 0.37, 0.5, 32]} />
        <meshStandardMaterial
          color="#f5ebe0"
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function MoleculeOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#e8b4b8"
          roughness={0.2}
          metalness={0.4}
          distort={0.2}
          speed={2}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh scale={0.6}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#f9e4e4"
          roughness={0.5}
          transparent
          opacity={0.4}
          emissive="#e8b4b8"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

interface Scene3DProps {
  variant: "product" | "molecule";
  className?: string;
}

export function Scene3D({ variant, className }: Scene3DProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#f5ebe0" />
          <directionalLight position={[-3, 3, 2]} intensity={0.4} color="#e8b4b8" />
          <pointLight position={[0, -2, 3]} intensity={0.3} color="#d5bdaf" />
          {variant === "product" ? <ProductBottle /> : <MoleculeOrb />}
        </Suspense>
      </Canvas>
    </div>
  );
}
