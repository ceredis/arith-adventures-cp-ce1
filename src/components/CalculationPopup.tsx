
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CalculationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  firstNumber: number;
  secondNumber: number;
  onCalculationComplete: (result: number) => void;
}

const CalculationPopup: React.FC<CalculationPopupProps> = ({
  isOpen,
  onClose,
  firstNumber,
  secondNumber,
  onCalculationComplete
}) => {
  // Split numbers into digits
  const getDigits = (num: number): [number, number] => {
    const tens = Math.floor(num / 10);
    const ones = num % 10;
    return [tens, ones];
  };

  const [firstTens, firstOnes] = getDigits(firstNumber);
  const [secondTens, secondOnes] = getDigits(secondNumber);
  
  // State for user inputs
  const [carry, setCarry] = useState<string>('');
  const [resultOnes, setResultOnes] = useState<string>('');
  const [resultTens, setResultTens] = useState<string>('');
  
  // Référence pour l'input des unités
  const onesInputRef = React.useRef<HTMLInputElement>(null);
  
  // Reset form when numbers change or when dialog opens
  useEffect(() => {
    setCarry('');
    setResultOnes('');
    setResultTens('');
  }, [firstNumber, secondNumber]);
  
  // Focus sur le champ des unités lorsque la popup s'ouvre
  useEffect(() => {
    if (isOpen && onesInputRef.current) {
      // Petit délai pour s'assurer que le dialogue est complètement ouvert
      setTimeout(() => {
        onesInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  const handleSubmit = () => {
    // Convert inputs to numbers, defaulting to 0 if empty
    const resultAsNumber = (parseInt(resultTens) || 0) * 10 + (parseInt(resultOnes) || 0);
    
    onCalculationComplete(resultAsNumber);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Calcul d'addition</DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 flex flex-col items-center">
          <div className="grid grid-cols-4 gap-2 text-2xl font-mono">
            {/* Carry row */}
            <div className="col-start-2 col-span-1 h-8 flex justify-center items-center">
              <Input
                className="w-8 h-8 p-0 text-center text-sm"
                value={carry}
                onChange={(e) => setCarry(e.target.value.replace(/[^0-9]/g, '').slice(0, 1))}
                maxLength={1}
              />
            </div>
            <div className="col-start-3 col-span-1"></div>
            <div className="col-start-4 col-span-1"></div>
            
            {/* First number */}
            <div className="col-start-1 col-span-1 text-right pr-3">
              {firstNumber >= 10 && '+'}
            </div>
            <div className="col-span-1 text-center border border-transparent">
              {firstTens > 0 ? firstTens : ''}
            </div>
            <div className="col-span-1 text-center border border-transparent">
              {firstOnes}
            </div>
            <div className="col-span-1"></div>
            
            {/* Second number */}
            <div className="col-start-1 col-span-1 text-right pr-3 font-bold">
              +
            </div>
            <div className="col-span-1 text-center border border-transparent">
              {secondTens > 0 ? secondTens : ''}
            </div>
            <div className="col-span-1 text-center border border-transparent">
              {secondOnes}
            </div>
            <div className="col-span-1"></div>
            
            {/* Line */}
            <div className="col-start-1 col-span-4">
              <hr className="border-t-2 border-black my-2" />
            </div>
            
            {/* Result */}
            <div className="col-start-1 col-span-1"></div>
            <div className="col-span-1">
              <Input
                className="w-8 h-8 p-0 text-center"
                value={resultTens}
                onChange={(e) => setResultTens(e.target.value.replace(/[^0-9]/g, '').slice(0, 1))}
                maxLength={1}
              />
            </div>
            <div className="col-span-1">
              <Input
                ref={onesInputRef}
                className="w-8 h-8 p-0 text-center" 
                value={resultOnes}
                onChange={(e) => setResultOnes(e.target.value.replace(/[^0-9]/g, '').slice(0, 1))}
                maxLength={1}
              />
            </div>
            <div className="col-span-1"></div>
          </div>
          
          <Button className="mt-6" onClick={handleSubmit}>
            Valider
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculationPopup;
