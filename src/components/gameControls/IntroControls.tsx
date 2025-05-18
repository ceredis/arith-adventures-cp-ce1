
import React from 'react';
import { Button } from '@/components/ui/button';

interface IntroControlsProps {
  onStart: () => void;
}

const IntroControls: React.FC<IntroControlsProps> = ({ onStart }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button 
        onClick={onStart}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg"
      >
        Commencer le jeu
      </Button>
    </div>
  );
};

export default IntroControls;
