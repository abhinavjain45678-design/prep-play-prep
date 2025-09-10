import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Cylinder, Plane, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function VolcanicBomb({ position, trajectory }: { position: [number, number, number], trajectory: { velocity: [number, number, number], gravity: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useRef(position);
  const startTime = useRef(Date.now());
  
  useFrame(() => {
    if (meshRef.current) {
      const elapsed = (Date.now() - startTime.current) / 1000;
      const [vx, vy, vz] = trajectory.velocity;
      
      const x = initialPosition.current[0] + vx * elapsed;
      const y = initialPosition.current[1] + vy * elapsed - 0.5 * trajectory.gravity * elapsed * elapsed;
      const z = initialPosition.current[2] + vz * elapsed;
      
      if (y <= 0) {
        // Reset when hits ground
        startTime.current = Date.now();
        initialPosition.current = [position[0], position[1], position[2]];
      }
      
      meshRef.current.position.set(x, Math.max(y, 0), z);
      meshRef.current.rotation.x += 0.1;
      meshRef.current.rotation.z += 0.1;
    }
  });

  return (
    <Sphere
      ref={meshRef}
      position={position}
      args={[0.3]}
      castShadow
    >
      <meshPhysicalMaterial 
        color="#8B0000" 
        emissive="#FF2000"
        emissiveIntensity={0.6}
        roughness={0.8}
        metalness={0.2}
      />
    </Sphere>
  );
}

function LavaFlow({ position, width = 2 }: { position: [number, number, number], width?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const flow = Math.sin(time * 2) * 0.15;
      meshRef.current.position.z = position[2] + flow;
      
      const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
      material.emissiveIntensity = 0.8 + Math.sin(time * 4) * 0.3;
    }
    
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.children.forEach((child, i) => {
        const float = Math.sin(time * 3 + i) * 0.2;
        child.position.y = position[1] + 0.3 + float;
        child.rotation.y += 0.02;
      });
    }
  });

  const steamParticles = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => (
      <Box
        key={i}
        position={[
          position[0] + (Math.random() - 0.5) * width,
          position[1] + 0.3,
          position[2] + (Math.random() - 0.5) * 2
        ]}
        args={[0.3, 0.3, 0.3]}
      >
        <meshBasicMaterial 
          color="#FF6B35" 
          transparent 
          opacity={0.4}
        />
      </Box>
    ));
  }, [position, width]);

  return (
    <group>
      <Box
        ref={meshRef}
        position={position}
        args={[width, 0.3, 5]}
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#8B0000" 
          emissive="#FF1500" 
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
          clearcoat={0.3}
        />
      </Box>
      <group ref={particlesRef}>
        {steamParticles}
      </group>
    </group>
  );
}

function VolcanicEruption() {
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.children.forEach((child, i) => {
        const height = (time * 4 + i * 0.2) % 12;
        const spread = height * 0.3;
        const angle = i * 0.5;
        
        child.position.x = Math.cos(angle) * spread;
        child.position.z = Math.sin(angle) * spread;
        child.position.y = 5.5 + height;
        
        child.scale.setScalar(0.5 + height * 0.1);
        
        const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
        material.opacity = Math.max(0.2, 1 - height * 0.08);
      });
    }
  });

  const eruptionParticles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => (
      <Sphere
        key={i}
        position={[0, 5.5, 0]}
        args={[0.2]}
      >
        <meshBasicMaterial 
          color={i % 2 === 0 ? "#FF4500" : "#FF6B35"} 
          transparent 
          opacity={0.8}
        />
      </Sphere>
    ));
  }, []);

  return (
    <group ref={particlesRef}>
      {eruptionParticles}
    </group>
  );
}

function VolcanoScene() {
  const volcanicBombs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      position: [0, 6, 0] as [number, number, number],
      trajectory: {
        velocity: [
          (Math.random() - 0.5) * 8,
          Math.random() * 3 + 2,
          (Math.random() - 0.5) * 8
        ] as [number, number, number],
        gravity: 4.9
      }
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[15, 25, 10]} 
        intensity={0.7} 
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 8, 0]} intensity={4} color="#FF2000" />
      <pointLight position={[3, 6, 3]} intensity={2} color="#FF6600" />
      <fog attach="fog" args={["#2C1810", 5, 30]} />
      
      {/* Volcano cone */}
      <Cylinder
        position={[0, 2, 0]}
        args={[1, 3.5, 4]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#2F1B14" 
          roughness={0.9}
          metalness={0.1}
        />
      </Cylinder>
      
      {/* Crater glow */}
      <Cylinder
        position={[0, 5.5, 0]}
        args={[1, 1.2, 0.5]}
      >
        <meshBasicMaterial 
          color="#FF1500" 
          transparent 
          opacity={0.8}
        />
      </Cylinder>
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[25, 25]}
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#3C2414" 
          roughness={0.8}
          metalness={0.0}
          emissive="#1A0F0A"
          emissiveIntensity={0.1}
        />
      </Plane>
      
      {/* Lava flows */}
      <LavaFlow position={[0, 0.1, 3]} width={2.5} />
      <LavaFlow position={[2, 0.1, -1]} width={1.8} />
      <LavaFlow position={[-2.5, 0.1, 1]} width={2} />
      
      {/* Volcanic eruption */}
      <VolcanicEruption />
      
      {/* Volcanic bombs */}
      {volcanicBombs.map((bomb, i) => (
        <VolcanicBomb
          key={i}
          position={bomb.position}
          trajectory={bomb.trajectory}
        />
      ))}
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={20} minDistance={6} />
    </>
  );
}

export default function VolcanoScene3D() {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium">
      <Canvas camera={{ position: [10, 8, 10], fov: 60 }} shadows>
        <VolcanoScene />
      </Canvas>
    </div>
  );
}