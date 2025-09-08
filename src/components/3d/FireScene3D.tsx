import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Flame({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const flicker = Math.sin(time * 10 + position[0]) * 0.3;
      const sway = Math.sin(time * 5 + position[2]) * 0.2;
      
      meshRef.current.scale.y = 1 + flicker;
      meshRef.current.position.x = position[0] + sway;
      meshRef.current.rotation.z = sway * 0.5;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={[position[0], position[1] + 0.5, position[2]]}
      args={[0.3, 1, 0.3]}
    >
      <meshBasicMaterial color="#FF4500" transparent opacity={0.8} />
    </Box>
  );
}

function SmokeParticle({ position, delay }: { position: [number, number, number], delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      const rise = (time * 2) % 8;
      const drift = Math.sin(time * 2) * 2;
      
      meshRef.current.position.y = position[1] + rise;
      meshRef.current.position.x = position[0] + drift;
      meshRef.current.scale.setScalar(0.5 + rise * 0.2);
      
      // Fade out as it rises
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = Math.max(0, 0.6 - rise * 0.1);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[0.5]}
    >
      <meshBasicMaterial color="#555555" transparent opacity={0.6} />
    </Sphere>
  );
}

function BurningBuilding({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const heat = Math.sin(time * 15) * 0.02;
      meshRef.current.position.y = position[1] + heat;
    }
  });

  return (
    <group>
      <Box
        ref={meshRef}
        position={position}
        args={[2, 3, 2]}
      >
        <meshStandardMaterial color="#8B4513" />
      </Box>
      {/* Fire on top */}
      <Flame position={[position[0], position[1] + 1.5, position[2]]} />
      <Flame position={[position[0] + 0.5, position[1] + 1.2, position[2] + 0.3]} />
      <Flame position={[position[0] - 0.3, position[1] + 1.4, position[2] - 0.2]} />
    </group>
  );
}

function FireScene() {
  const smokeParticles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 8,
        Math.random() * 2,
        (Math.random() - 0.5) * 8
      ] as [number, number, number],
      delay: Math.random() * 5
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 3, 0]} intensity={2} color="#FF6600" />
      <pointLight position={[3, 2, 3]} intensity={1.5} color="#FF4500" />
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[15, 15]}
      >
        <meshStandardMaterial color="#2F4F2F" />
      </Plane>
      
      {/* Burning buildings */}
      <BurningBuilding position={[0, 1.5, 0]} />
      <BurningBuilding position={[4, 1.5, 2]} />
      <BurningBuilding position={[-3, 1.5, -2]} />
      
      {/* Ground fires */}
      {Array.from({ length: 8 }, (_, i) => (
        <Flame
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            0,
            (Math.random() - 0.5) * 10
          ]}
        />
      ))}
      
      {/* Smoke particles */}
      {smokeParticles.map((particle, i) => (
        <SmokeParticle
          key={i}
          position={particle.position}
          delay={particle.delay}
        />
      ))}
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={12} minDistance={4} />
    </>
  );
}

export default function FireScene3D() {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium">
      <Canvas camera={{ position: [8, 6, 8], fov: 60 }}>
        <FireScene />
      </Canvas>
    </div>
  );
}