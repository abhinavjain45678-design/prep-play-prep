import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Building({ position, height, shakeIntensity }: { position: [number, number, number], height: number, shakeIntensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Create realistic earthquake shaking
      const time = state.clock.elapsedTime;
      const shake = Math.sin(time * 15) * shakeIntensity * 0.1;
      const tilt = Math.sin(time * 12) * shakeIntensity * 0.05;
      
      meshRef.current.position.x = position[0] + shake;
      meshRef.current.position.z = position[2] + shake * 0.5;
      meshRef.current.rotation.z = tilt;
      meshRef.current.rotation.x = tilt * 0.3;
    }
  });

  const buildingType = height > 3 ? 'skyscraper' : 'residential';
  
  return (
    <group>
      <Box
        ref={meshRef}
        position={[position[0], position[1] + height/2, position[2]]}
        args={[1.2, height, 1.2]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial 
          color={buildingType === 'skyscraper' ? "#2C3E50" : "#34495E"}
          roughness={0.8}
          metalness={0.1}
          clearcoat={0.1}
        />
      </Box>
      {/* Window details */}
      {Array.from({ length: Math.floor(height / 0.8) }, (_, i) => (
        <Box
          key={i}
          position={[position[0] + 0.5, position[1] + 0.4 + i * 0.8, position[2]]}
          args={[0.1, 0.3, 0.6]}
        >
          <meshBasicMaterial color="#87CEEB" />
        </Box>
      ))}
    </group>
  );
}

function GroundCracks() {
  const cracksRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cracksRef.current) {
      const time = state.clock.elapsedTime;
      const pulse = Math.sin(time * 8) * 0.1;
      cracksRef.current.children.forEach((child, i) => {
        child.scale.setScalar(1 + pulse * (i * 0.1));
      });
    }
  });

  const cracks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => (
      <Plane
        key={i}
        position={[
          (Math.random() - 0.5) * 15,
          0.02,
          (Math.random() - 0.5) * 15
        ]}
        rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        args={[Math.random() * 3 + 2, 0.3]}
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#1C1C1C" 
          roughness={0.9}
          metalness={0.0}
          emissive="#2C1810"
          emissiveIntensity={0.1}
        />
      </Plane>
    ));
  }, []);

  return <group ref={cracksRef}>{cracks}</group>;
}

function Debris() {
  const debrisRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (debrisRef.current) {
      const time = state.clock.elapsedTime;
      debrisRef.current.children.forEach((child, i) => {
        const bounce = Math.sin(time * 10 + i) * 0.05;
        child.position.y = 0.1 + bounce;
        child.rotation.y += 0.01;
      });
    }
  });

  const debris = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => (
      <Box
        key={i}
        position={[
          (Math.random() - 0.5) * 12,
          0.1,
          (Math.random() - 0.5) * 12
        ]}
        args={[0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.3]}
        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
        castShadow
      >
        <meshPhysicalMaterial 
          color={Math.random() > 0.5 ? "#8B7D6B" : "#A0522D"}
          roughness={0.8}
          metalness={0.1}
        />
      </Box>
    ));
  }, []);

  return <group ref={debrisRef}>{debris}</group>;
}

function EarthquakeScene() {
  const buildings = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        0,
        (Math.random() - 0.5) * 12
      ] as [number, number, number],
      height: Math.random() * 4 + 1,
      shakeIntensity: Math.random() * 0.5 + 0.5
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[15, 20, 10]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      <pointLight position={[0, 8, 0]} intensity={0.3} color="#FF4500" />
      <fog attach="fog" args={["#D4AF8C", 5, 25]} />
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[25, 25]}
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#8B6914" 
          roughness={0.9}
          metalness={0.0}
          
        />
      </Plane>
      
      {/* Buildings */}
      {buildings.map((building, i) => (
        <Building
          key={i}
          position={building.position}
          height={building.height}
          shakeIntensity={building.shakeIntensity}
        />
      ))}
      
      {/* Ground cracks */}
      <GroundCracks />
      
      {/* Debris */}
      <Debris />
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={20} minDistance={6} />
    </>
  );
}

export default function EarthquakeScene3D() {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium">
      <Canvas camera={{ position: [8, 6, 8], fov: 60 }} shadows>
        <EarthquakeScene />
      </Canvas>
    </div>
  );
}