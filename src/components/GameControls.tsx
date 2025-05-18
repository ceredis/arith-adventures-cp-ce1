
import React from 'react';
import { 
  IntroControls, 
  CountControls, 
  ResultControls,
  VerifyControls,
  TotalCalculationControls,
  GameScoreHeader
} from './gameControls';

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
  userRedCount = 0,
  userBlueCount = 0,
  isSoustractionMode = false,
  firstColorIsRed = true
}) => {
  // Debug logs
  React.useEffect(() => {
    if (phase === 'redCount') console.log(`Phase comptage billes rouges`);
    if (phase === 'blueCount') console.log(`Phase comptage billes bleues`);
    if (phase === 'totalCount') console.log(`Phase total`);
    if (phase === 'totalFirst') console.log(`Phase total first, mode soustraction`);
    if (phase === 'secondColor') console.log(`Phase second color: attendu=${firstColorIsRed ? 'bleues' : 'rouges'} billes`);
  }, [phase, firstColorIsRed]);
  
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <GameScoreHeader 
        questionNumber={questionNumber} 
        totalQuestions={totalQuestions} 
        score={score} 
      />
      
      {phase === 'intro' && <IntroControls onStart={onStart} />}
      
      {phase === 'redCount' && (
        <CountControls 
          type="red" 
          onSubmit={onSubmitRed} 
          label="Nombre de billes rouges:" 
        />
      )}
      
      {phase === 'blueCount' && (
        <CountControls 
          type="blue" 
          onSubmit={onSubmitBlue} 
          label="Nombre de billes bleues:" 
        />
      )}
      
      {(phase === 'totalCount' || phase === 'totalFirst') && (
        <TotalCalculationControls
          onSubmit={onSubmitTotal}
          userRedCount={userRedCount}
          userBlueCount={userBlueCount}
          level={level}
          phase={phase}
        />
      )}
      
      {phase === 'secondColor' && (
        <CountControls 
          type="secondColor" 
          onSubmit={(count) => onSubmitSecondColor?.(count)} 
          label={`Nombre de billes ${firstColorIsRed ? 'bleues' : 'rouges'}:`} 
        />
      )}
      
      {phase === 'verify' && <VerifyControls onContinue={onContinue} />}
      
      {phase === 'result' && <ResultControls onRestart={onRestart} />}
    </div>
  );
};

export default GameControls;
