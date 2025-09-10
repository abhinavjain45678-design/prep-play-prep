import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function Flame({ position, intensity = 1 }: { position: [number, number, number], intensity?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const flicker = Math.sin(time * 12 + position[0]) * 0.4 * intensity;
      const sway = Math.sin(time * 6 + position[2]) * 0.3;
      
      meshRef.current.scale.y = 0.8 + flicker;
      meshRef.current.position.x = position[0] + sway * 0.5;
      meshRef.current.rotation.z = sway * 0.3;
    }
    
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.children.forEach((child, i) => {
        const rise = ((time * 3 + i) % 5);
        const drift = Math.sin(time * 2 + i) * 0.5;
        child.position.y = position[1] + rise;
        child.position.x = position[0] + drift;
        child.scale.setScalar(Math.max(0, 1 - rise * 0.2));
        
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = Math.max(0, 0.8 - rise * 0.15);
      });
    }
  });

  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => (
      <Box
        key={i}
        position={[position[0], position[1], position[2]]}
        args={[0.1, 0.1, 0.1]}
      >
        <meshBasicMaterial 
          color={i % 2 === 0 ? "#FF6B35" : "#F7931E"} 
          transparent 
          opacity={0.6} 
        />
      </Box>
    ));
  }, [position]);

  return (
    <group>
      <Box
        ref={meshRef}
        position={[position[0], position[1] + 0.8, position[2]]}
        args={[0.4, 1.6 * intensity, 0.4]}
      >
         <meshBasicMaterial 
          color="#FF2D00" 
          transparent 
          opacity={0.9}
        />
      </Box>
      <group ref={particlesRef}>
        {particles}
      </group>
    </group>
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
      const heat = Math.sin(time * 15) * 0.03;
      meshRef.current.position.y = position[1] + heat;
    }
  });

  return (
    <group>
      {/* Building structure */}
      <Box
        ref={meshRef}
        position={position}
        args={[2.5, 4, 2.5]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#2C1810" 
          roughness={0.9}
          metalness={0.1}
          emissive="#8B4513"
          emissiveIntensity={0.2}
        />
      </Box>
      
      {/* Damaged windows */}
      {Array.from({ length: 6 }, (_, i) => (
        <Box
          key={i}
          position={[
            position[0] + (i % 2 === 0 ? 1.2 : -1.2), 
            position[1] + 0.5 + Math.floor(i / 2) * 0.8, 
            position[2]
          ]}
          args={[0.1, 0.4, 0.8]}
        >
          <meshBasicMaterial 
            color="#FF4500" 
          />
        </Box>
      ))}
      
      {/* Major fires */}
      <Flame position={[position[0], position[1] + 2.2, position[2]]} intensity={1.5} />
      <Flame position={[position[0] + 0.8, position[1] + 1.8, position[2] + 0.5]} intensity={1.2} />
      <Flame position={[position[0] - 0.6, position[1] + 2.0, position[2] - 0.4]} intensity={1.3} />
      <Flame position={[position[0] + 0.3, position[1] + 1.5, position[2] - 0.8]} intensity={0.8} />
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
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[15, 20, 10]} 
        intensity={0.6} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5, 0]} intensity={3} color="#FF3300" />
      <pointLight position={[4, 4, 2]} intensity={2.5} color="#FF6600" />
      <pointLight position={[-3, 4, -2]} intensity={2.5} color="#FF4500" />
      <fog attach="fog" args={["#1A0A0A", 2, 20]} />
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[20, 20]}
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#1C1C1C" 
          roughness={0.8}
          metalness={0.0}
          emissive="#2D1B0F"
          emissiveIntensity={0.1}
        />
      </Plane>
      
      {/* Burning buildings */}
      <BurningBuilding position={[0, 2, 0]} />
      <BurningBuilding position={[5, 2, 3]} />
      <BurningBuilding position={[-4, 2, -3]} />
      <BurningBuilding position={[3, 2, -4]} />
      
      {/* Ground fires */}
      {Array.from({ length: 12 }, (_, i) => (
        <Flame
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            0,
            (Math.random() - 0.5) * 15
          ]}
          intensity={0.6 + Math.random() * 0.8}
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
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={18} minDistance={5} />
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