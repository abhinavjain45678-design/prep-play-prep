import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane, OrbitControls, Cylinder } from "@react-three/drei";
import * as THREE from "three";

function TornadoFunnel() {
  const funnelRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const innerFunnelRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (funnelRef.current) {
      funnelRef.current.rotation.y += 0.08;
    }
    
    if (innerFunnelRef.current) {
      innerFunnelRef.current.rotation.y -= 0.12;
    }
    
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      particlesRef.current.children.forEach((child, i) => {
        const radius = 1.5 + Math.sin(time + i) * 0.5;
        const angle = time * 3 + i * 0.8;
        const height = (time * 2.5 + i * 0.5) % 10;
        
        child.position.x = Math.cos(angle) * radius;
        child.position.z = Math.sin(angle) * radius;
        child.position.y = height;
        child.rotation.set(
          time + i,
          time * 2 + i,
          time * 1.5 + i
        );
      });
    }
  });

  const debris = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => (
      <Box
        key={i}
        position={[0, 0, 0]}
        args={[0.15 + Math.random() * 0.2, 0.15 + Math.random() * 0.2, 0.15 + Math.random() * 0.2]}
        castShadow
      >
        <meshPhysicalMaterial 
          color={Math.random() > 0.5 ? "#8B4513" : "#A0522D"} 
          roughness={0.8}
          metalness={0.1}
        />
      </Box>
    ));
  }, []);

  return (
    <group>
      {/* Outer tornado funnel */}
      <Cylinder
        ref={funnelRef}
        position={[0, 5, 0]}
        args={[0.3, 2.5, 10]}
      >
        <meshPhysicalMaterial 
          color="#2F2F2F" 
          transparent 
          opacity={0.4}
          roughness={0.9}
          metalness={0.1}
        />
      </Cylinder>
      
      {/* Inner tornado funnel */}
      <Cylinder
        ref={innerFunnelRef}
        position={[0, 5, 0]}
        args={[0.1, 1.8, 10]}
      >
        <meshPhysicalMaterial 
          color="#1A1A1A" 
          transparent 
          opacity={0.6}
          roughness={0.7}
          metalness={0.2}
        />
      </Cylinder>
      
      {/* Spinning debris */}
      <group ref={particlesRef}>
        {debris}
      </group>
      
      {/* Enhanced dust cloud at base */}
      <Cylinder
        position={[0, 0.8, 0]}
        args={[4, 4, 1.5]}
      >
        <meshPhysicalMaterial 
          color="#8B7355" 
          transparent 
          opacity={0.3}
          roughness={0.9}
          metalness={0.0}
        />
      </Cylinder>
    </group>
  );
}

function FlyingDebris({ position, type }: { position: [number, number, number], type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const orbit = time * 3;
      const radius = 8 + Math.sin(time + position[0]) * 3;
      const height = position[1] + Math.sin(time * 2) * 2;
      
      meshRef.current.position.x = Math.cos(orbit + position[0]) * radius;
      meshRef.current.position.z = Math.sin(orbit + position[0]) * radius;
      meshRef.current.position.y = height;
      
      meshRef.current.rotation.x += 0.1;
      meshRef.current.rotation.y += 0.05;
      meshRef.current.rotation.z += 0.08;
    }
  });

  const color = type === "roof" ? "#8B4513" : type === "car" ? "#FF0000" : "#32CD32";
  const size: [number, number, number] = type === "roof" ? [2, 0.1, 1.5] : type === "car" ? [1.5, 0.8, 1] : [0.8, 2, 0.8];

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

function DamagedBuilding({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const shake = Math.sin(time * 20) * 0.05;
      meshRef.current.rotation.z = shake;
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[1.5, 2, 1.5]}
    >
      <meshStandardMaterial color="#A0522D" />
    </Box>
  );
}

function WindLines() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.position.x += 0.3;
        if (child.position.x > 15) {
          child.position.x = -15;
        }
      });
    }
  });

  const lines = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => (
      <Box
        key={i}
        position={[
          (Math.random() - 0.5) * 30,
          Math.random() * 8 + 1,
          (Math.random() - 0.5) * 30
        ]}
        args={[1, 0.05, 0.05]}
      >
        <meshBasicMaterial color="#DCDCDC" transparent opacity={0.4} />
      </Box>
    ));
  }, []);

  return <group ref={groupRef}>{lines}</group>;
}

function TornadoScene() {
  const flyingObjects = useMemo(() => {
    const objects = [];
    const types = ["roof", "car", "tree"];
    
    for (let i = 0; i < 6; i++) {
      objects.push({
        position: [
          (Math.random() - 0.5) * 5,
          Math.random() * 5 + 2,
          (Math.random() - 0.5) * 5
        ] as [number, number, number],
        type: types[Math.floor(Math.random() * types.length)]
      });
    }
    
    return objects;
  }, []);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[12, 15, 8]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 8, 0]} intensity={0.4} color="#87CEEB" />
      <fog attach="fog" args={["#696969", 8, 30]} />
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[25, 25]}
        receiveShadow
      >
        <meshPhysicalMaterial 
          color="#5D4E37" 
          roughness={0.9}
          metalness={0.0}
        />
      </Plane>
      
      {/* Tornado */}
      <TornadoFunnel />
      
      {/* Damaged buildings */}
      <DamagedBuilding position={[5, 1, 4]} />
      <DamagedBuilding position={[-4, 1, -3]} />
      <DamagedBuilding position={[3, 1, -5]} />
      <DamagedBuilding position={[-5, 1, 2]} />
      <DamagedBuilding position={[2, 1, 6]} />
      
      {/* Flying debris */}
      {flyingObjects.map((obj, i) => (
        <FlyingDebris
          key={i}
          position={obj.position}
          type={obj.type}
        />
      ))}
      
      {/* Wind effect lines */}
      <WindLines />
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={20} minDistance={6} />
    </>
  );
}

export default function TornadoScene3D() {
  return (
    <div className="w-full h-64 rounded-xl overflow-hidden shadow-medium">
      <Canvas camera={{ position: [15, 10, 15], fov: 60 }}>
        <TornadoScene />
      </Canvas>
    </div>
  );
}