
import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TeacherAvatarProps {
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  isSpeaking: boolean;
  onLoad?: () => void;
}

const TeacherAvatar: React.FC<TeacherAvatarProps> = ({ 
  position = [0, -0.5, 0], 
  scale = 1.0,
  rotation = [0, 0, 0],
  isSpeaking,
  onLoad
}) => {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/teacher-avatar.glb');
  
  // Chargement des fichiers d'animation
  const idleAnimations = useGLTF('/F_Standing_Idle_001.glb');
  const talkingAnimations = useGLTF('/M_Talking_Variations_008.glb');
  
  // Combiner les animations de toutes les sources
  const animations = [
    ...(idleAnimations.animations || []),
    ...(talkingAnimations.animations || [])
  ];
  
  // Utiliser les animations avec la scène
  const { actions, mixer } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  // Effet pour gérer les animations en fonction de l'état isSpeaking
  useEffect(() => {
    if (!mixer || !group.current) return;
    
    console.log("TeacherAvatar animations loaded:", animations.length);
    console.log("isSpeaking:", isSpeaking);
    
    // Arrêter l'animation en cours si elle existe
    if (currentAction) {
      currentAction.fadeOut(0.5);
    }
    
    // Sélectionner l'animation appropriée
    const animationToUse = isSpeaking ? talkingAnimations.animations : idleAnimations.animations;
    
    if (animationToUse && animationToUse.length > 0) {
      const action = mixer.clipAction(animationToUse[0], group.current);
      action.reset().fadeIn(0.5).play();
      setCurrentAction(action);
      console.log(`Playing ${isSpeaking ? 'talking' : 'idle'} animation`);
    } else {
      console.warn(`No ${isSpeaking ? 'talking' : 'idle'} animations found`);
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.5);
      }
    };
  }, [mixer, isSpeaking, animations]);

  // Boucle d'animation pour mettre à jour le mixer
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
    
    // Appliquer une légère animation flottante
    if (group.current) {
      const baseY = position[1];
      group.current.position.y = baseY + Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }
  });

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
};

// Précharger les modèles
useGLTF.preload('/teacher-avatar.glb');
useGLTF.preload('/F_Standing_Idle_001.glb');
useGLTF.preload('/M_Talking_Variations_008.glb');

export default TeacherAvatar;
