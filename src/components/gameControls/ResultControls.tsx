
import React from 'react';
import { Button } from '@/components/ui/button';

interface ResultControlsProps {
  onRestart: () => void;
}

const ResultControls: React.FC<ResultControlsProps> = ({ onRestart }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button 
        onClick={onRestart}
        className="bg-green-600 hover:bg-green-700 text-white"
      >
        Rejouer
      </Button>
    </div>
  );
};

export default ResultControls;
