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

  return (
    <Box
      ref={meshRef}
      position={[position[0], position[1] + height/2, position[2]]}
      args={[1, height, 1]}
    >
      <meshStandardMaterial color={height > 3 ? "#8B7355" : "#A0A0A0"} />
    </Box>
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
    return Array.from({ length: 8 }, (_, i) => (
      <Plane
        key={i}
        position={[
          (Math.random() - 0.5) * 10,
          0.01,
          (Math.random() - 0.5) * 10
        ]}
        rotation={[-Math.PI / 2, 0, Math.random() * Math.PI]}
        args={[Math.random() * 2 + 1, 0.2]}
      >
        <meshStandardMaterial color="#3A3A3A" />
      </Plane>
    ));
  }, []);

  return <group ref={cracksRef}>{cracks}</group>;
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffaa00" />
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[20, 20]}
        receiveShadow
      >
        <meshStandardMaterial color="#8B6F47" />
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
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={15} minDistance={5} />
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