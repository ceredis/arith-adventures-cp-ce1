
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import TeacherAvatar from './TeacherAvatar';
import SpeechSynthesis from './SpeechSynthesis';
import { Volume2, VolumeX } from 'lucide-react';

const HomeTeacherBubble: React.FC = () => {
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const welcomeMessage = "Bienvenue sur Arith-play-game ! Sur le menu ci-dessus, choisis le domaine d'apprentissage dans lequel tu veux travailler.";
  
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    setIsSpeaking(soundEnabled);
  };
  
  return (
    <div className="flex flex-col items-center max-w-sm">
      {/* Speech bubble with animation */}
      <div className="speech-bubble mb-4 bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-2xl shadow-lg border-2 border-blue-200 transform transition-all duration-500 hover:shadow-xl relative">
        <div className="absolute -top-2 -right-2 bg-purple-100 rounded-full p-1.5 cursor-pointer hover:bg-purple-200 transition-colors" onClick={toggleSound}>
          {soundEnabled ? <Volume2 className="w-5 h-5 text-purple-600" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
        </div>
        
        <p className="text-lg">{welcomeMessage}</p>
        
        {/* Emotes/Reactions */}
        <div className="flex gap-2 mt-3 justify-end">
          <button className="text-xl hover:scale-125 transition-transform duration-200">👍</button>
          <button className="text-xl hover:scale-125 transition-transform duration-200">😊</button>
          <button className="text-xl hover:scale-125 transition-transform duration-200">❓</button>
        </div>
      </div>

      {/* Teacher Avatar Container */}
      <div className="w-72 h-[420px] relative mt-2 bg-gradient-to-b from-blue-100 to-transparent p-3 rounded-2xl">
        {!avatarLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img 
              src="/lovable-uploads/e4e7aa88-b633-45df-8859-71a60a13e30a.png" 
              alt="Institutrice (chargement…)" 
              className="w-full h-full object-contain absolute top-0 left-0 z-10 animate-pulse" 
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full text-sm font-medium text-blue-700">
              Chargement...
            </div>
          </div>
        )}
        
        <div className="w-full h-full rounded-xl overflow-hidden shadow-inner">
          <Canvas camera={{ position: [0, 0.2, 2.5], fov: 40 }}>
            <ambientLight intensity={0.7} />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
            <spotLight position={[-10, 10, 5]} intensity={0.8} angle={0.3} penumbra={1} castShadow />
            
            <TeacherAvatar 
              isSpeaking={isSpeaking && soundEnabled} 
              onLoad={() => setAvatarLoaded(true)} 
              position={[0, -1.0, 0]} 
              scale={0.95}
              rotation={[0, 0, 0]} 
            />
            
            <OrbitControls 
              enableZoom={false} 
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 1.8}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>
        
        {/* Controls bar */}
        {avatarLoaded && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md flex items-center gap-3">
            <button 
              className="text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => setIsSpeaking(true)}
            >
              🔄 Répéter
            </button>
            <div className="h-4 w-px bg-gray-300"></div>
            <button className="text-purple-600 hover:text-purple-800 transition-colors">
              👋 Saluer
            </button>
          </div>
        )}
      </div>

      {soundEnabled && (
        <SpeechSynthesis 
          text={welcomeMessage} 
          speak={isSpeaking} 
          onEnd={() => setIsSpeaking(false)} 
        />
      )}
    </div>
  );
};

export default HomeTeacherBubble;
