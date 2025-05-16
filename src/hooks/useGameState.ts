
import { useState, useEffect } from 'react';
import { generateRandomBalls, getPhaseMessage, GameModule, ModuleLevel } from '@/utils/gameLogic';

type GamePhase = 'intro' | 'redCount' | 'blueCount' | 'totalCount' | 'vennDiagram' | 'equation' | 'verify' | 'result';

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
  
  // Set initial message
  useEffect(() => {
    setMessage(getPhaseMessage(phase, gameModule, moduleLevel));
  }, [gameModule, moduleLevel]);
  
  // Update message when phase changes
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
      TOTAL_QUESTIONS
    ));
    setSpeak(true);
  }, [phase, userRedCount, userBlueCount, userTotalCount, redBalls, blueBalls, totalAttempts, score, gameModule, moduleLevel]);
  
  const startGame = () => {
    // Calculer maxBalls selon le niveau
    let maxBalls;
    switch(moduleLevel) {
      case 1: maxBalls = 5; break;
      case 2: maxBalls = 10; break;
      case 3: maxBalls = 20; break;
      case 4: maxBalls = 50; break;
      default: maxBalls = 10;
    }
    
    const { redBalls: red, blueBalls: blue } = generateRandomBalls(maxBalls, gameModule, moduleLevel);
    setRedBalls(red);
    setBlueBalls(blue);
    setPhase('redCount');
    setShowBalls(true);
    setVennDiagramCompleted(false);
    setEquationCompleted(false);
    console.log(`Game started with module ${gameModule}, level ${moduleLevel}: red=${red}, blue=${blue}`);
  };
  
  const handleSubmitRed = (count: number | string) => {
    // Conversion en nombre si c'est une chaîne
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    console.log(`Vérification billes rouges: entrée=${parsedCount}, réel=${redBalls}`);
    
    // Comparer avec le nombre réel de billes rouges
    if (!isNaN(parsedCount) && parsedCount === redBalls) {
      setUserRedCount(parsedCount);
      setPhase('blueCount');
    } else {
      setMessage("Tu n'as pas bien compté, recommence.");
      setSpeak(true);
    }
  };
  
  const handleSubmitBlue = (count: number | string) => {
    // Conversion en nombre si c'est une chaîne
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    console.log(`Vérification billes bleues: entrée=${parsedCount}, réel=${blueBalls}`);
    
    // Comparer avec le nombre réel de billes bleues
    if (!isNaN(parsedCount) && parsedCount === blueBalls) {
      setUserBlueCount(parsedCount);
      // Pour tous les niveaux, passer à la phase de schématisation
      setPhase('vennDiagram');
      setShowBalls(false);
    } else {
      setMessage("Tu n'as pas bien compté, recommence.");
      setSpeak(true);
    }
  };
  
  const handleSubmitTotal = (count: number | string) => {
    // Conversion en nombre si c'est une chaîne
    const parsedCount = typeof count === 'string' ? parseInt(count) : count;
    
    console.log(`Vérification total: entrée=${parsedCount}, attendu=${redBalls + blueBalls}`);
    
    if (!isNaN(parsedCount)) {
      setUserTotalCount(parsedCount);
      setTotalAttempts(prev => prev + 1);
      
      if (parsedCount === redBalls + blueBalls) {
        // Correct answer
        setScore(prev => prev + 1);
        setShowBalls(true);
      } 
      
      setPhase('verify');
    } else {
      setMessage("Tu dois entrer un nombre valide.");
      setSpeak(true);
    }
  };
  
  const handleSubmitVennDiagram = (redValue: number | string, blueValue: number | string) => {
    // Conversion en nombres si ce sont des chaînes
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
    // Conversion en nombre si c'est une chaîne
    const parsedAnswer = typeof answer === 'string' ? parseInt(answer) : answer;
    
    if (isNaN(parsedAnswer)) {
      setMessage("Tu dois entrer un nombre valide pour le résultat.");
      setSpeak(true);
      return;
    }
    
    setUserTotalCount(parsedAnswer);
    setTotalAttempts(prev => prev + 1);
    
    // Valider l'opération (doit contenir le nombre de billes rouges et bleues)
    const operationStr = operation.replace(/\s/g, ''); // Supprime les espaces
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
      // Message pour indiquer ce qui est incorrect
      if (!isOperationCorrect) {
        setMessage(`L'opération n'est pas correcte. Réessaie de l'écrire correctement.`);
      } else {
        setMessage(`Le résultat n'est pas correct. Réessaie de calculer.`);
      }
      setSpeak(true);
      return; // Ne pas continuer à la vérification
    }
  };
  
  const handleContinue = () => {
    if (questionNumber < TOTAL_QUESTIONS) {
      // Move to next question
      setQuestionNumber(prev => prev + 1);
      
      // Calculer maxBalls selon le niveau
      let maxBalls;
      switch(moduleLevel) {
        case 1: maxBalls = 5; break;
        case 2: maxBalls = 10; break;
        case 3: maxBalls = 20; break;
        case 4: maxBalls = 50; break;
        default: maxBalls = 10;
      }
      
      const { redBalls: red, blueBalls: blue } = generateRandomBalls(maxBalls, gameModule, moduleLevel);
      setRedBalls(red);
      setBlueBalls(blue);
      setTotalAttempts(0);
      setUserRedCount(0);
      setUserBlueCount(0);
      setUserTotalCount(0);
      setVennDiagramCompleted(false);
      setEquationCompleted(false);
      setPhase('redCount');
      setShowBalls(true);
      console.log("Next question with:", { red, blue, module: gameModule, level: moduleLevel });
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
    setVennDiagramCompleted(false);
    setEquationCompleted(false);
  };
  
  const handleChangeModule = (newModule: GameModule) => {
    setGameModule(newModule);
    setModuleLevel(1);  // Reset to level 1 when changing module
    handleRestart();
  };
  
  const handleChangeLevel = (newLevel: ModuleLevel) => {
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
    setSpeak,
    startGame,
    handleSubmitRed,
    handleSubmitBlue,
    handleSubmitTotal,
    handleSubmitVennDiagram,
    handleSubmitEquation,
    handleContinue,
    handleRestart,
    handleChangeModule,
    handleChangeLevel,
  };
};

export type GameState = ReturnType<typeof useGameState>;
