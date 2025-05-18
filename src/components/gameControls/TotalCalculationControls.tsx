
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CalculationPopup from '@/components/CalculationPopup';

interface TotalCalculationControlsProps {
  onSubmit: (count: number) => void;
  userRedCount?: number;
  userBlueCount?: number;
  level: number;
  phase: 'totalCount' | 'totalFirst';
}

const TotalCalculationControls: React.FC<TotalCalculationControlsProps> = ({
  onSubmit,
  userRedCount = 0,
  userBlueCount = 0,
  level,
  phase
}) => {
  const [totalCount, setTotalCount] = useState<string>('');
  const [calculationOpen, setCalculationOpen] = useState(false);
  
  // Reset input when phase changes
  useEffect(() => {
    setTotalCount('');
  }, [phase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseInt(totalCount);
    
    console.log(`Soumission total: ${parsedValue}`);
    if (!isNaN(parsedValue)) {
      onSubmit(parsedValue);
    }
  };
  
  const handleCalculationComplete = (result: number) => {
    setTotalCount(result.toString());
    console.log(`Résultat du calcul: ${result}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-2">
      <div className="w-full text-center mb-2">
        {phase === 'totalCount' && userRedCount > 0 && userBlueCount > 0 && (
          <p className="text-lg">Tu as compté {userRedCount} billes rouges et {userBlueCount} billes bleues.</p>
        )}
        <label htmlFor="totalCount" className="text-lg">Nombre total de billes:</label>
      </div>
      <Input
        id="totalCount"
        type="number"
        min="0"
        max="100"
        value={totalCount}
        onChange={(e) => setTotalCount(e.target.value)}
        className="px-3 py-2 text-center min-w-[8rem] w-auto text-lg"
        required
        autoFocus
      />
      <Button type="submit" className="ml-2">Valider</Button>
      
      {/* Montrer le bouton Calculer seulement si niveau > 2 */}
      {level > 2 && (
        <Button 
          type="button" 
          onClick={() => setCalculationOpen(true)}
          variant="secondary" 
          className="ml-2 bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300 flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <line x1="8" x2="16" y1="12" y2="12" />
            <line x1="12" x2="12" y1="8" y2="16" />
          </svg>
          Calculer
        </Button>
      )}
      
      <CalculationPopup
        isOpen={calculationOpen}
        onClose={() => setCalculationOpen(false)}
        firstNumber={userRedCount}
        secondNumber={userBlueCount}
        onCalculationComplete={handleCalculationComplete}
      />
    </form>
  );
};

export default TotalCalculationControls;
