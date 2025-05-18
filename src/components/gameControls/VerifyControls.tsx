
import React from 'react';
import { Button } from '@/components/ui/button';

interface VerifyControlsProps {
  onContinue: () => void;
}

const VerifyControls: React.FC<VerifyControlsProps> = ({ onContinue }) => {
  return (
    <div className="flex justify-center mt-4">
      <Button 
        onClick={onContinue}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Continuer
      </Button>
    </div>
  );
};

export default VerifyControls;
