import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function FloatingObject({ position, type }: { position: [number, number, number], type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const bob = Math.sin(time * 2 + position[0]) * 0.2;
      const drift = Math.sin(time * 0.5 + position[2]) * 2;
      
      meshRef.current.position.y = position[1] + bob;
      meshRef.current.position.x = position[0] + drift;
      meshRef.current.rotation.y = time * 0.5;
    }
  });

  const color = type === "car" ? "#FF0000" : type === "debris" ? "#8B4513" : "#00FF00";
  const size: [number, number, number] = type === "car" ? [2, 0.8, 1] : type === "debris" ? [0.5, 0.5, 0.5] : [1, 1, 1];

  return (
    <Box
      ref={meshRef}
      position={position}
      args={size}
    >
      <meshStandardMaterial color={color} />
    </Box>
  );
}

function WaterSurface() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
      const vertices = geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const z = vertices[i + 2];
        vertices[i + 1] = Math.sin(time * 2 + x * 0.5) * 0.3 + Math.cos(time * 1.5 + z * 0.3) * 0.2;
      }
      
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();
    }
  });

  return (
    <Plane
      ref={meshRef}
      position={[0, 2, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      args={[20, 20, 32, 32]}
    >
      <meshStandardMaterial 
        color="#4682B4" 
        transparent 
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </Plane>
  );
}

function SubmergedBuilding({ position, height }: { position: [number, number, number], height: number }) {
  return (
    <Box
      position={[position[0], position[1] - 0.5, position[2]]}
      args={[1.5, height, 1.5]}
    >
      <meshStandardMaterial color="#8B7355" />
    </Box>
  );
}

function RainDrops() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.y -= 0.5;
        if (child.position.y < -5) {
          child.position.y = 10;
          child.position.x = (Math.random() - 0.5) * 20;
          child.position.z = (Math.random() - 0.5) * 20;
        }
      });
    }
  });

  const raindrops = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => (
      <Sphere
        key={i}
        position={[
          (Math.random() - 0.5) * 20,
          Math.random() * 15,
          (Math.random() - 0.5) * 20
        ]}
        args={[0.02, 4, 4]}
      >
        <meshBasicMaterial color="#87CEEB" transparent opacity={0.6} />
      </Sphere>
    ));
  }, []);

  return <group ref={groupRef}>{raindrops}</group>;
}

function FloodScene() {
  const floatingObjects = useMemo(() => {
    const objects = [];
    const types = ["car", "debris", "tree"];
    
    for (let i = 0; i < 8; i++) {
      objects.push({
        position: [
          (Math.random() - 0.5) * 15,
          2.5,
          (Math.random() - 0.5) * 15
        ] as [number, number, number],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    
    return objects;
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#87CEEB" />
      
      {/* Ground (mostly underwater) */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[25, 25]}
      >
        <meshStandardMaterial color="#654321" />
      </Plane>
      
      {/* Submerged buildings */}
      <SubmergedBuilding position={[3, 1, 2]} height={4} />
      <SubmergedBuilding position={[-2, 1, -3]} height={3} />
      <SubmergedBuilding position={[5, 1, -1]} height={5} />
      <SubmergedBuilding position={[-4, 1, 4]} height={3.5} />
      
      {/* Water surface with waves */}
      <WaterSurface />
      
      {/* Floating objects */}
      {floatingObjects.map((obj, i) => (
        <FloatingObject
          key={i}
          position={obj.position}
          type={obj.type}
        />
      ))}
      
      {/* Rain effect */}
      <RainDrops />
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={15} minDistance={6} />
    </>
  );
}

export default function FloodScene3D() {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium">
      <Canvas camera={{ position: [10, 8, 10], fov: 60 }}>
        <FloodScene />
      </Canvas>
    </div>
  );
}