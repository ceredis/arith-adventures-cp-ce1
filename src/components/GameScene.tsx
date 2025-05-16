
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface BallProps {
  position: [number, number, number];
  color: string;
  onClick: () => void;
  visible: boolean;
  index: number;
}

const Ball: React.FC<BallProps> = ({ position, color, onClick, visible, index }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Animation for pop-in effect
  useEffect(() => {
    if (meshRef.current && visible) {
      meshRef.current.scale.set(0, 0, 0);
      setTimeout(() => {
        if (meshRef.current) {
          meshRef.current.scale.set(1, 1, 1);
        }
      }, index * 100);
    }
  }, [visible, index]);
  
  useFrame(() => {
    if (meshRef.current && visible) {
      if (meshRef.current.scale.x < 1 && meshRef.current.scale.y < 1 && meshRef.current.scale.z < 1) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
        meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, 1, 0.1);
      }
      
      if (clicked) {
        // Move the ball up and down slightly when clicked, but keep it above the platform
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.005) * 0.2 + 0.5;
      }
    }
  });
  
  const handleClick = () => {
    setClicked(!clicked);
    onClick();
  };
  
  return visible ? (
    <mesh
      position={position}
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={color}
        emissive={hovered ? "#ffffff" : "#000000"} 
        emissiveIntensity={hovered ? 0.2 : 0} 
        roughness={0.3} 
        metalness={0.3} 
      />
    </mesh>
  ) : null;
};

interface GameSceneProps {
  redBalls: number;
  blueBalls: number;
  onBallClick: (color: 'red' | 'blue', index: number) => void;
  showBalls: boolean;
  countingPhase: 'red' | 'blue' | 'total' | 'none';
  level?: number;
}

const GameScene: React.FC<GameSceneProps> = ({ 
  redBalls, 
  blueBalls, 
  onBallClick, 
  showBalls, 
  countingPhase,
  level = 1
}) => {
  const generatePositions = (count: number, isRed: boolean) => {
    const positions: [number, number, number][] = [];
    
    // Ball dimensions
    const ballRadius = 0.5;
    
    // Platform dimensions
    const platformWidth = level === 1 ? 10 : 15;
    const platformDepth = level === 1 ? 10 : 15;
    
    // Always organize balls in groups of 5 (per row) - changed from 10 to reduce density
    const ballsPerRow = 5; 
    const spacing = 1.5; // Spacing between balls - increased from 1.1 to prevent overlap
    
    // Calculate total rows needed
    const totalRows = Math.ceil(count / ballsPerRow);
    
    // Start positions - left side for red, right side for blue with more separation
    let startX = isRed ? -platformWidth/2 + ballRadius + 1 : platformWidth/4;
    let startZ = -platformDepth/2 + ballRadius + 1;
    
    for (let i = 0; i < count; i++) {
      const rowIndex = Math.floor(i / ballsPerRow);
      const colIndex = i % ballsPerRow;
      
      // Add small random offset to make positioning more natural
      const randomOffsetX = (Math.random() - 0.5) * 0.4;
      const randomOffsetZ = (Math.random() - 0.5) * 0.4;
      
      // Calculate position with proper spacing
      const xPos = startX + colIndex * spacing + randomOffsetX;
      const zPos = startZ + rowIndex * spacing + randomOffsetZ;
      
      // Ensure balls stay within platform boundaries and in their respective zones
      const safeMargin = 0.5; // Safety margin from edge - increased from 0.3
      
      // Set limits based on whether it's a red or blue ball
      const minX = isRed ? -platformWidth/2 + ballRadius + safeMargin : 0 + safeMargin;
      const maxX = isRed ? -safeMargin : platformWidth/2 - ballRadius - safeMargin;
      
      const clampedX = Math.min(Math.max(xPos, minX), maxX);
      const clampedZ = Math.min(Math.max(zPos, -platformDepth/2 + ballRadius + safeMargin), platformDepth/2 - ballRadius - safeMargin);
      
      positions.push([
        clampedX, 
        ballRadius, // Position at the surface of the plane
        clampedZ
      ]);
    }
    
    return positions;
  };
  
  const redPositions = generatePositions(redBalls, true);
  const bluePositions = generatePositions(blueBalls, false);
  
  return (
    <div className="w-full h-80 md:h-96 border border-gray-300 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 5, 10], fov: 40 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, 10, 5]} intensity={0.5} />
        
        {/* Plateau */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[level === 1 ? 10 : 15, level === 1 ? 10 : 15]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        
        {/* Red balls */}
        {redPositions.map((pos, index) => (
          <Ball 
            key={`red-${index}`}
            position={pos}
            color="#ea384c"
            onClick={() => onBallClick('red', index)}
            visible={showBalls}
            index={index}
          />
        ))}
        
        {/* Blue balls */}
        {bluePositions.map((pos, index) => (
          <Ball
            key={`blue-${index}`}
            position={pos}
            color="#1EAEDB"
            onClick={() => onBallClick('blue', index)}
            visible={showBalls}
            index={redBalls + index}
          />
        ))}
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          maxPolarAngle={Math.PI / 2.5} 
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
};

export default GameScene;
