import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Plane, OrbitControls, Cylinder } from "@react-three/drei";
import * as THREE from "three";

function TornadoFunnel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.1;
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.15;
      particlesRef.current.children.forEach((child, i) => {
        child.rotation.y += 0.05;
        const radius = 2 + Math.sin(state.clock.elapsedTime + i) * 0.5;
        const height = (i / particlesRef.current!.children.length) * 8;
        child.position.x = Math.cos(state.clock.elapsedTime * 2 + i) * radius;
        child.position.z = Math.sin(state.clock.elapsedTime * 2 + i) * radius;
        child.position.y = height;
      });
    }
  });

  const debris = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => (
      <Box
        key={i}
        args={[0.2, 0.2, 0.2]}
        position={[0, i * 0.4, 0]}
      >
        <meshStandardMaterial color={Math.random() > 0.5 ? "#8B4513" : "#654321"} />
      </Box>
    ));
  }, []);

  return (
    <group>
      {/* Main tornado funnel */}
      <Cylinder
        ref={meshRef}
        position={[0, 4, 0]}
        args={[3, 0.5, 8, 16]}
      >
        <meshStandardMaterial 
          color="#696969" 
          transparent 
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </Cylinder>
      
      {/* Spinning debris */}
      <group ref={particlesRef}>
        {debris}
      </group>
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
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />
      <pointLight position={[0, 8, 0]} intensity={1} color="#FFD700" />
      
      {/* Ground */}
      <Plane 
        position={[0, 0, 0]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[30, 30]}
      >
        <meshStandardMaterial color="#228B22" />
      </Plane>
      
      {/* Tornado */}
      <TornadoFunnel />
      
      {/* Damaged buildings */}
      <DamagedBuilding position={[8, 1, 5]} />
      <DamagedBuilding position={[-6, 1, -4]} />
      <DamagedBuilding position={[10, 1, -3]} />
      
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
      
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={20} minDistance={8} />
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