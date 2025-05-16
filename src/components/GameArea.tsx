
import React from 'react';
import GameScene from '@/components/GameScene';
import VennDiagram from '@/components/VennDiagram';
import EquationInput from '@/components/EquationInput';
import GameControls from '@/components/GameControls';
import { GameState } from '@/hooks/useGameState';

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
    showBalls,
    questionNumber,
    TOTAL_QUESTIONS,
    score,
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

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Module {gameModule} - Niveau {moduleLevel}</h2>
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
      
      {/* Diagramme de Venn uniquement pour les niveaux > 2 (module 2) */}
      {moduleLevel > 2 && (
        <VennDiagram
          redBalls={redBalls}
          blueBalls={blueBalls}
          onSubmit={handleSubmitVennDiagram}
          isVisible={phase === 'vennDiagram'}
        />
      )}
      
      {/* Saisie de l'équation uniquement pour les niveaux > 2 (module 2) */}
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
