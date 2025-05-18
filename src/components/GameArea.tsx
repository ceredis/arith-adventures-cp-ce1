
import React, { useEffect } from 'react';
import GameScene from '@/components/GameScene';
import VennDiagram from '@/components/VennDiagram';
import EquationInput from '@/components/EquationInput';
import GameControls from '@/components/GameControls';
import { GameState } from '@/hooks/gameState/useGameState';
import { useGamification } from '@/contexts/GamificationContext';
import { ProgressBar, ScoreCounter, StarRating } from '@/components/gamification';
import { Trophy } from 'lucide-react';
import { calculatePoints } from '@/utils/gameLogic';

interface GameAreaProps {
  gameState: GameState;
}

const GameArea: React.FC<GameAreaProps> = ({ gameState }) => {
  const {
    gameModule,
    moduleLevel,
    phase,
    redBalls,
    blueBalls,
    userRedCount,
    userBlueCount,
    userTotalCount,  // Added this line to fix the error
    showBalls,
    questionNumber,
    TOTAL_QUESTIONS,
    score,
    totalAttempts,
    vennDiagramCompleted,
    isSoustractionMode,
    firstColorIsRed,
    handleSubmitRed,
    handleSubmitBlue,
    handleSubmitTotal,
    handleSubmitVennDiagram,
    handleSubmitEquation,
    handleSubmitSecondColor,
    handleContinue,
    handleRestart,
    startGame
  } = gameState;

  const { 
    incrementScore, 
    triggerConfetti, 
    incrementCorrectAnswers, 
    incrementStreak,
    resetStreak
  } = useGamification();

  // When a question is answered correctly
  useEffect(() => {
    if (phase === 'verify' && totalAttempts > 0) {
      const isCorrect = 
        isSoustractionMode ? 
        (firstColorIsRed ? userBlueCount === blueBalls : userRedCount === redBalls) : 
        userTotalCount === redBalls + blueBalls;
      
      if (isCorrect) {
        // Calculate points based on attempts
        const points = calculatePoints(totalAttempts);
        incrementScore(points);
        incrementCorrectAnswers();
        incrementStreak();
        
        // Only trigger confetti for perfect answers (first attempt)
        if (totalAttempts === 1) {
          triggerConfetti();
        }
      } else {
        resetStreak();
      }
    }
  }, [phase]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Module {gameModule} - Niveau {moduleLevel}</h2>
        <div className="flex items-center">
          <ScoreCounter 
            score={score} 
            icon={<Trophy className="h-5 w-5 text-yellow-500 mr-2" />} 
            className="bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2" 
          />
        </div>
      </div>
      
      {/* Progress bar for questions */}
      <div className="mb-4">
        <ProgressBar
          value={questionNumber}
          max={TOTAL_QUESTIONS}
          label="Progression"
          size="sm"
        />
      </div>
      
      <GameScene 
        redBalls={redBalls}
        blueBalls={blueBalls}
        onBallClick={(color, index) => console.log(`${color} ball ${index} clicked`)}
        showBalls={showBalls}
        countingPhase={
          phase === 'redCount' ? 'red' : 
          phase === 'blueCount' ? 'blue' : 
          phase === 'totalCount' || phase === 'totalFirst' ? 'total' : 
          phase === 'secondColor' ? (firstColorIsRed ? 'blue' : 'red') :
          'none'
        }
        level={moduleLevel}
      />
      
      {/* Show star rating during verification phase */}
      {phase === 'verify' && (
        <div className="flex justify-center my-2">
          <StarRating 
            rating={totalAttempts === 1 ? 3 : (totalAttempts === 2 ? 2 : 1)} 
            size="lg"
          />
        </div>
      )}
      
      {/* Venn diagram only for levels > 2 (module 2) */}
      {moduleLevel > 2 && (
        <VennDiagram
          redBalls={redBalls}
          blueBalls={blueBalls}
          onSubmit={handleSubmitVennDiagram}
          isVisible={phase === 'vennDiagram'}
        />
      )}
      
      {/* Equation input only for levels > 2 (module 2) */}
      {moduleLevel > 2 && (
        <EquationInput
          redBalls={redBalls}
          blueBalls={blueBalls}
          onSubmit={handleSubmitEquation}
          isVisible={phase === 'equation'}
        />
      )}
      
      {/* Standard game controls */}
      <GameControls 
        phase={phase}
        redBalls={redBalls}
        blueBalls={blueBalls}
        onSubmitRed={handleSubmitRed}
        onSubmitBlue={handleSubmitBlue}
        onSubmitTotal={handleSubmitTotal}
        onSubmitSecondColor={handleSubmitSecondColor}
        onContinue={handleContinue}
        onRestart={handleRestart}
        onStart={startGame}
        questionNumber={questionNumber}
        totalQuestions={TOTAL_QUESTIONS}
        score={score}
        level={moduleLevel}
        gameModule={gameModule}
        userRedCount={userRedCount}
        userBlueCount={userBlueCount}
        vennDiagramCompleted={vennDiagramCompleted}
        isSoustractionMode={isSoustractionMode}
        firstColorIsRed={firstColorIsRed}
      />
    </div>
  );
};

export default GameArea;
