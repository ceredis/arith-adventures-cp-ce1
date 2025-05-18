import { useState, useEffect } from 'react';
import { generateRandomBalls, getPhaseMessage, GameModule, ModuleLevel } from '@/utils/gameLogic';

type GamePhase = 
  | 'intro' 
  | 'redCount' 
  | 'blueCount' 
  | 'totalCount' 
  | 'vennDiagram' 
  | 'equation' 
  | 'verify' 
  | 'result'
  | 'totalFirst'   // Phase for Module 1 Level 2 (subtraction)
  | 'secondColor'; // Phase to ask for second color count

const TOTAL_QUESTIONS = 5;

export const useGameState = () => {
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
  
  // Set initial message
  useEffect(() => {
    setMessage(getPhaseMessage(
      phase,
      gameModule,
      moduleLevel,
      userRedCount,
      userBlueCount,
      userTotalCount === redBalls + blueBalls,
      totalAttempts,
      redBalls + blueBalls,
      score,
      TOTAL_QUESTIONS,
      isSoustractionMode,
      firstColorIsRed
    ));
  // Ajout de dépendances pour garantir la mise à jour correcte du message lors de la phase secondColor
  }, [
    phase,
    gameModule,
    moduleLevel,
    userRedCount,
    userBlueCount,
    userTotalCount,
    redBalls,
    blueBalls,
    totalAttempts,
    score,
    isSoustractionMode,
    firstColorIsRed
  ]);
  
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
  
  const handleSubmitRed = (count: number | string) => {
    // Convert to number if it's a string
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    console.log(`Red ball validation: input=${parsedCount}, actual=${redBalls}`);
    
    // Compare with actual number of red balls
    if (!isNaN(parsedCount) && parsedCount === redBalls) {
      setUserRedCount(parsedCount);
      
      // Check if we are in subtraction mode and this is the second color to count
      if (isSoustractionMode && !firstColorIsRed) {
        // In subtraction mode, if red is the second color, move to secondColor phase
        setPhase('secondColor');
        setShowBalls(false);
      } else {
        // Normal flow - go to blue count phase
        setPhase('blueCount');
      }
    } else {
      setMessage("Tu n'as pas bien compté, recommence.");
      setSpeak(true);
    }
  };
  
  const handleSubmitBlue = (count: number | string) => {
    // Convert to number if it's a string
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    console.log(`Blue ball validation: input=${parsedCount}, actual=${blueBalls}`);
    
    // Compare with actual number of blue balls
    if (!isNaN(parsedCount) && parsedCount === blueBalls) {
      setUserBlueCount(parsedCount);
      
      // Check if we are in subtraction mode and this is the second color to count
      if (isSoustractionMode && firstColorIsRed) {
        // In subtraction mode, if blue is the second color, move to secondColor phase
        setPhase('secondColor');
        setShowBalls(false);
      } else if (gameModule === 1) {
        // Module 1: levels 1 and 2, only manipulation (no Venn diagram)
        setPhase('totalCount');
        // Hide balls during total count phase to encourage calculation
        setShowBalls(false);
      } else if (moduleLevel >= 3) {
        // Module 2: levels 3, 4, 5 with Venn diagram
        setPhase('vennDiagram');
        setShowBalls(false);
      }
    } else {
      setMessage("Tu n'as pas bien compté, recommence.");
      setSpeak(true);
    }
  };
  
  const handleSubmitTotal = (count: number | string) => {
    // Convert to number if it's a string
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    console.log(`Total validation: input=${parsedCount}, expected=${redBalls + blueBalls}`);
    
    if (!isNaN(parsedCount)) {
      setUserTotalCount(parsedCount);
      setTotalAttempts(prev => prev + 1);
      
      // For subtraction mode in Module 1 Level 2
      if (isSoustractionMode && gameModule === 1 && moduleLevel === 2) {
        if (parsedCount === redBalls + blueBalls) {
          // If total is correct, move to the phase of counting the selected color
          setPhase(firstColorIsRed ? 'redCount' : 'blueCount');
        } else {
          setMessage("Ce n'est pas le bon nombre total de billes. Compte à nouveau.");
          setSpeak(true);
          return;
        }
      } else {
        // Standard mode (addition)
        if (parsedCount === redBalls + blueBalls) {
          // Correct answer
          setScore(prev => prev + 1);
        } 
        
        // Show balls for verification
        setShowBalls(true);
        setPhase('verify');
      }
    } else {
      setMessage("Tu dois entrer un nombre valide.");
      setSpeak(true);
    }
  };
  
  const handleSubmitSecondColor = (count: number | string) => {
    // This function is only used for Module 1 Level 2 in subtraction mode
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    // Second color is blue if first was red, and vice versa
    const expectedCount = firstColorIsRed ? blueBalls : redBalls;
    
    console.log(`Second color validation: input=${parsedCount}, expected=${expectedCount}`);
    
    if (!isNaN(parsedCount)) {
      setUserSecondColorCount(parsedCount);
      setTotalAttempts(prev => prev + 1);
      
      // Check if answer is correct
      const isCorrect = parsedCount === expectedCount;
      
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
      
      // Show balls for verification and move to verification phase
      setShowBalls(true);
      setPhase('verify');
    } else {
      setMessage("Tu dois entrer un nombre valide.");
      setSpeak(true);
    }
  };
  
  const handleSubmitVennDiagram = (redValue: number | string, blueValue: number | string) => {
    // Convert to numbers if they're strings
    const parsedRedValue = typeof redValue === 'string' ? parseInt(redValue) : redValue;
    const parsedBlueValue = typeof blueValue === 'string' ? parseInt(blueValue) : blueValue;
    
    if (!isNaN(parsedRedValue) && !isNaN(parsedBlueValue) && 
        parsedRedValue === redBalls && parsedBlueValue === blueBalls) {
      setVennDiagramCompleted(true);
      setPhase('equation');
    } else {
      setMessage("Tu n'as pas bien complété les étiquettes. Réessaie.");
      setSpeak(true);
    }
  };
  
  const handleSubmitEquation = (operation: string, answer: number | string) => {
    // Convert to number if it's a string
    const parsedAnswer = typeof answer === 'string' ? parseInt(answer) : answer;
    
    if (isNaN(parsedAnswer)) {
      setMessage("Tu dois entrer un nombre valide pour le résultat.");
      setSpeak(true);
      return;
    }
    
    setUserTotalCount(parsedAnswer);
    setTotalAttempts(prev => prev + 1);
    
    // Validate operation (must contain the number of red and blue balls)
    const operationStr = operation.replace(/\s/g, ''); // Remove spaces
    const expectedOperation = `${redBalls}+${blueBalls}`;
    const alternativeOperation = `${blueBalls}+${redBalls}`;
    
    const isOperationCorrect = operationStr === expectedOperation || operationStr === alternativeOperation;
    const isAnswerCorrect = parsedAnswer === redBalls + blueBalls;
    
    if (isOperationCorrect && isAnswerCorrect) {
      // Correct answer
      setScore(prev => prev + 1);
      setShowBalls(true);
      setEquationCompleted(true);
      setPhase('verify');
    } else {
      // Message to indicate what is incorrect
      if (!isOperationCorrect) {
        setMessage(`L'opération n'est pas correcte. Réessaie de l'écrire correctement.`);
      } else {
        setMessage(`Le résultat n'est pas correct. Réessaie de calculer.`);
      }
      setSpeak(true);
      return; // Don't continue to verification
    }
  };
  
  const handleContinue = () => {
    if (questionNumber < TOTAL_QUESTIONS) {
      // Move to next question
      setQuestionNumber(prev => prev + 1);
      // Initialize new round for the next question
      initNewRound();
    } else {
      // End of game
      setPhase('result');
    }
  };
  
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

  return {
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
    TOTAL_QUESTIONS,
    isSoustractionMode,
    firstColorIsRed,
    userSecondColorCount,
    setSpeak,
    startGame,
    handleSubmitRed,
    handleSubmitBlue,
    handleSubmitTotal,
    handleSubmitVennDiagram,
    handleSubmitEquation,
    handleSubmitSecondColor,
    handleContinue,
    handleRestart,
    handleChangeModule,
    handleChangeLevel,
  };
};

export type GameState = ReturnType<typeof useGameState>;
