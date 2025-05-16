
import React from 'react';
import AppLayout from '@/components/AppLayout';
import LevelSelector from '@/components/LevelSelector';
import GameArea from '@/components/GameArea';
import TeacherSection from '@/components/TeacherSection';
import { useGameState } from '@/hooks/useGameState';

const Index = () => {
  const gameState = useGameState();
  const { gameModule, moduleLevel, message, speak, handleChangeModule, handleChangeLevel, setSpeak } = gameState;
  
  // Whether to use 3D avatar or 2D image
  const use3DAvatar = true;
  
  return (
    <AppLayout>
      <div className="container mx-auto p-4">
        <LevelSelector 
          gameModule={gameModule} 
          moduleLevel={moduleLevel} 
          onChangeModule={handleChangeModule} 
          onChangeLevel={handleChangeLevel} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GameArea gameState={gameState} />
          <TeacherSection 
            message={message} 
            speak={speak} 
            onSpeechEnd={() => setSpeak(false)} 
            use3DAvatar={use3DAvatar}
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Index;
