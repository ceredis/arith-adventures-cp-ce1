
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CalculationPopup from './CalculationPopup';

interface GameControlsProps {
  phase: 'intro' | 'redCount' | 'blueCount' | 'totalCount' | 'vennDiagram' | 'equation' | 'verify' | 'result' | 'totalFirst' | 'secondColor';
  redBalls: number;
  blueBalls: number;
  onSubmitRed: (count: number) => void;
  onSubmitBlue: (count: number) => void;
  onSubmitTotal: (count: number) => void;
  onSubmitSecondColor?: (count: number) => void;
  onContinue: () => void;
  onRestart: () => void;
  onStart: () => void;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  level: number;
  gameModule: number;
  userRedCount?: number;
  userBlueCount?: number;
  vennDiagramCompleted?: boolean;
  isSoustractionMode?: boolean;
  firstColorIsRed?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  phase,
  redBalls,
  blueBalls,
  onSubmitRed,
  onSubmitBlue,
  onSubmitTotal,
  onSubmitSecondColor,
  onContinue,
  onRestart,
  onStart,
  questionNumber,
  totalQuestions,
  score,
  level,
  gameModule,
  userRedCount = 0,
  userBlueCount = 0,
  vennDiagramCompleted = false,
  isSoustractionMode = false,
  firstColorIsRed = true
}) => {
  const [redCount, setRedCount] = useState<string>('');
  const [blueCount, setBlueCount] = useState<string>('');
  const [totalCount, setTotalCount] = useState<string>('');
  const [secondColorCount, setSecondColorCount] = useState<string>('');
  const [calculationOpen, setCalculationOpen] = useState(false);
  
  // Reset inputs when phase changes
  useEffect(() => {
    if (phase === 'redCount') setRedCount('');
    if (phase === 'blueCount') setBlueCount('');
    if (phase === 'totalCount' || phase === 'totalFirst') setTotalCount('');
    if (phase === 'secondColor') setSecondColorCount('');
    
    // Debug logs
    if (phase === 'redCount') console.log(`Phase comptage billes rouges: ${redBalls} billes`);
    if (phase === 'blueCount') console.log(`Phase comptage billes bleues: ${blueBalls} billes`);
    if (phase === 'totalCount') console.log(`Phase total: ${redBalls + blueBalls} billes au total, vennDiagramCompleted=${vennDiagramCompleted}`);
    if (phase === 'totalFirst') console.log(`Phase total first: ${redBalls + blueBalls} billes au total, mode soustraction`);
    if (phase === 'secondColor') console.log(`Phase second color: attendu=${firstColorIsRed ? blueBalls : redBalls} billes`);
  }, [phase, redBalls, blueBalls, vennDiagramCompleted, isSoustractionMode, firstColorIsRed]);
  
  const handleRedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseInt(redCount);
    console.log(`Soumission billes rouges: ${parsedValue}`);
    if (!isNaN(parsedValue)) {
      onSubmitRed(parsedValue);
    }
  };
  
  const handleBlueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseInt(blueCount);
    console.log(`Soumission billes bleues: ${parsedValue}`);
    if (!isNaN(parsedValue)) {
      onSubmitBlue(parsedValue);
    }
  };
  
  const handleTotalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseInt(totalCount);
    console.log(`Soumission total: ${parsedValue}`);
    if (!isNaN(parsedValue)) {
      onSubmitTotal(parsedValue);
    }
  };
  
  const handleSecondColorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseInt(secondColorCount);
    console.log(`Soumission second type: ${parsedValue}`);
    if (!isNaN(parsedValue) && onSubmitSecondColor) {
      onSubmitSecondColor(parsedValue);
    }
  };

  const handleCalculationComplete = (result: number) => {
    setTotalCount(result.toString());
    console.log(`Résultat du calcul: ${result}`);
    // On n'effectue pas automatiquement la soumission ici
    // pour laisser l'utilisateur valider manuellement
  };
  
  // Updated style for input that is wider and more user-friendly
  const inputStyle = "px-3 py-2 text-center min-w-[8rem] w-auto text-lg";
  
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <div className="px-3 py-1 bg-gray-100 rounded-md">
          Question: {questionNumber}/{totalQuestions}
        </div>
        <div className="px-3 py-1 bg-gray-100 rounded-md">
          Score: {score}/{totalQuestions}
        </div>
      </div>
      
      {phase === 'intro' && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onStart}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg"
          >
            Commencer le jeu
          </Button>
        </div>
      )}
      
      {phase === 'redCount' && (
        <form onSubmit={handleRedSubmit} className="flex flex-wrap items-center justify-center gap-2">
          <label htmlFor="redCount" className="text-lg">Nombre de billes rouges:</label>
          <Input
            id="redCount"
            type="number"
            min="0"
            max="50"
            value={redCount}
            onChange={(e) => setRedCount(e.target.value)}
            className={inputStyle}
            required
            autoFocus
          />
          <Button type="submit" className="ml-2">Valider</Button>
        </form>
      )}
      
      {phase === 'blueCount' && (
        <form onSubmit={handleBlueSubmit} className="flex flex-wrap items-center justify-center gap-2">
          <label htmlFor="blueCount" className="text-lg">Nombre de billes bleues:</label>
          <Input
            id="blueCount"
            type="number"
            min="0"
            max="50"
            value={blueCount}
            onChange={(e) => setBlueCount(e.target.value)}
            className={inputStyle}
            required
            autoFocus
          />
          <Button type="submit" className="ml-2">Valider</Button>
        </form>
      )}
      
      {(phase === 'totalCount' || phase === 'totalFirst') && (
        <form onSubmit={handleTotalSubmit} className="flex flex-wrap items-center justify-center gap-2">
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
            className={inputStyle}
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
        </form>
      )}
      
      {phase === 'secondColor' && (
        <form onSubmit={handleSecondColorSubmit} className="flex flex-wrap items-center justify-center gap-2">
          <div className="w-full text-center mb-2">
            <label htmlFor="secondColorCount" className="text-lg">
              Nombre de billes {firstColorIsRed ? 'bleues' : 'rouges'}:
            </label>
          </div>
          <Input
            id="secondColorCount"
            type="number"
            min="0"
            max="50"
            value={secondColorCount}
            onChange={(e) => setSecondColorCount(e.target.value)}
            className={inputStyle}
            required
            autoFocus
          />
          <Button type="submit" className="ml-2">Valider</Button>
        </form>
      )}
      
      {phase === 'verify' && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onContinue}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continuer
          </Button>
        </div>
      )}
      
      {phase === 'result' && (
        <div className="flex justify-center mt-4">
          <Button 
            onClick={onRestart}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Rejouer
          </Button>
        </div>
      )}
      
      <CalculationPopup
        isOpen={calculationOpen}
        onClose={() => setCalculationOpen(false)}
        firstNumber={userRedCount}
        secondNumber={userBlueCount}
        onCalculationComplete={handleCalculationComplete}
      />
    </div>
  );
};

export default GameControls;
