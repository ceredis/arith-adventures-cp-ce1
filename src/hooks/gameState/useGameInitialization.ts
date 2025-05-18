
import { useState } from 'react';
import { GameModule, ModuleLevel, generateRandomBalls } from '@/utils/gameLogic';
import { GamePhase, GameStateStore } from './types';

export function useGameInitialization() {
  // Game states
  const [gameModule, setGameModule] = useState<GameModule>(1);
  const [moduleLevel, setModuleLevel] = useState<ModuleLevel>(1);
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [redBalls, setRedBalls] = useState(0);
  const [blueBalls, setBlueBalls] = useState(0);
  const [userRedCount, setUserRedCount] = useState(0);
  const [userBlueCount, setUserBlueCount] = useState(0);
  const [userTotalCount, setUserTotalCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [showBalls, setShowBalls] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [message, setMessage] = useState('');
  const [speak, setSpeak] = useState(true);
  const [vennDiagramCompleted, setVennDiagramCompleted] = useState(false);
  const [equationCompleted, setEquationCompleted] = useState(false);
  
  // For Module 1 Level 2 (subtraction mode)
  const [isSoustractionMode, setIsSoustractionMode] = useState(false);
  const [firstColorIsRed, setFirstColorIsRed] = useState(true);
  const [userSecondColorCount, setUserSecondColorCount] = useState(0);
  
  // Initialize a new round with consistent state
  const initNewRound = () => {
    // Reset state for new round
    setVennDiagramCompleted(false);
    setEquationCompleted(false);
    setUserRedCount(0);
    setUserBlueCount(0);
    setUserTotalCount(0);
    setUserSecondColorCount(0);
    setTotalAttempts(0);
    
    // Calculate maxBalls based on level
    let maxBalls;
    switch(moduleLevel) {
      case 1: 
      case 2: maxBalls = 5; break;
      case 3: maxBalls = 10; break;
      case 4: maxBalls = 20; break;
      case 5: maxBalls = 50; break;
      default: maxBalls = 10;
    }
    
    // Generate balls
    const { redBalls: red, blueBalls: blue } = generateRandomBalls(maxBalls, gameModule, moduleLevel);
    setRedBalls(red);
    setBlueBalls(blue);
    
    // For Module 1 Level 2, determine if it's a subtraction problem
    if (gameModule === 1 && moduleLevel === 2) {
      const soustraction = Math.random() < 0.5;
      const redFirst = Math.random() < 0.5;
      
      setIsSoustractionMode(soustraction);
      setFirstColorIsRed(redFirst);
      
      if (soustraction) {
        setPhase('totalFirst');
      } else {
        setPhase('redCount');
      }
    } else {
      setIsSoustractionMode(false);
      setPhase('redCount');
    }
    
    setShowBalls(true);
    console.log(`New round initialized: module=${gameModule}, level=${moduleLevel}, red=${red}, blue=${blue}, soustraction=${isSoustractionMode}`);
  };
  
  const startGame = () => {
    // Reset game state and start first round
    setQuestionNumber(1);
    setScore(0);
    initNewRound();
  };
  
  // Function to change module
  const handleChangeModule = (newModule: GameModule) => {
    setGameModule(newModule);
    // Reset to appropriate level based on module
    if (newModule === 1) {
      setModuleLevel(1); // Module 1 starts at level 1
    } else {
      setModuleLevel(3); // Module 2 starts at level 3
    }
    handleRestart();
  };
  
  // Function to change level
  const handleChangeLevel = (newLevel: ModuleLevel) => {
    // Check if level is valid for current module
    if (gameModule === 1 && newLevel > 2) {
      // Module 1 can only have levels 1 and 2
      return;
    } else if (gameModule === 2 && newLevel < 3) {
      // Module 2 starts at level 3
      return;
    }
    
    setModuleLevel(newLevel);
    handleRestart();
  };
  
  // Function to restart game
  const handleRestart = () => {
    // Reset everything and start a new game
    setQuestionNumber(1);
    setScore(0);
    setTotalAttempts(0);
    setPhase('intro');
    setUserRedCount(0);
    setUserBlueCount(0);
    setUserTotalCount(0);
    setUserSecondColorCount(0);
    setVennDiagramCompleted(false);
    setEquationCompleted(false);
    setIsSoustractionMode(false);
  };
  
  return {
    // State
    gameModule,
    moduleLevel,
    phase,
    redBalls,
    blueBalls,
    userRedCount,
    userBlueCount,
    userTotalCount,
    totalAttempts,
    score,
    showBalls,
    questionNumber,
    message,
    speak,
    vennDiagramCompleted,
    equationCompleted,
    isSoustractionMode,
    firstColorIsRed,
    userSecondColorCount,
    
    // State setters
    setPhase,
    setRedBalls,
    setBlueBalls,
    setUserRedCount,
    setUserBlueCount,
    setUserTotalCount,
    setTotalAttempts,
    setScore,
    setShowBalls,
    setQuestionNumber,
    setMessage,
    setSpeak,
    setVennDiagramCompleted,
    setEquationCompleted,
    setIsSoustractionMode,
    setFirstColorIsRed,
    setUserSecondColorCount,
    
    // Functions
    startGame,
    initNewRound,
    handleRestart,
    handleChangeModule,
    handleChangeLevel
  };
}

export type GameStateInitialization = ReturnType<typeof useGameInitialization>;
