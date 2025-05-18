interface RandomBalls {
  redBalls: number;
  blueBalls: number;
}

export type ModuleLevel = 1 | 2 | 3 | 4 | 5;
export type GameModule = 1 | 2;

export const generateRandomBalls = (maxBalls: number, gameModule: GameModule = 1, moduleLevel: ModuleLevel = 1): RandomBalls => {
  let redBalls: number;
  let blueBalls: number;
  
  // Define maximum limit based on level
  let maxSum: number;
  switch (moduleLevel) {
    case 1: 
    case 2: maxSum = 5; break;
    case 3: maxSum = 10; break;
    case 4: maxSum = 20; break;
    case 5: maxSum = 50; break;
    default: maxSum = 5;
  }
  
  if (gameModule === 1) { // Module 1: Addition only (level 1 and 2)
    // Generate numbers with sum not exceeding maxSum
    redBalls = 1 + Math.floor(Math.random() * (maxSum - 2)); // At least 1, at most maxSum-2
    blueBalls = 1 + Math.floor(Math.random() * (maxSum - redBalls - 1)); // At least 1, max possible
  } else if (gameModule === 2) { // Module 2: Subtraction and various additions
    if (moduleLevel >= 3) { // Formerly levels 2, 3 and 4
      // For higher levels, same logic as before, but higher sums
      redBalls = 1 + Math.floor(Math.random() * Math.min(maxSum - 2, maxSum / 2));
      blueBalls = 1 + Math.floor(Math.random() * Math.min(maxSum - redBalls - 1, maxSum / 2));
    } else {
      // Case that shouldn't happen, but as precaution
      redBalls = 1 + Math.floor(Math.random() * 3);
      blueBalls = 1 + Math.floor(Math.random() * 3);
    }
  } else {
    // Default case
    redBalls = 1 + Math.floor(Math.random() * 3);
    blueBalls = 1 + Math.floor(Math.random() * 3);
  }

  console.log(`Generation: redBalls=${redBalls}, blueBalls=${blueBalls}, sum=${redBalls + blueBalls}, maxSum=${maxSum}, module=${gameModule}, level=${moduleLevel}`);
  return { redBalls, blueBalls };
};

export const getPhaseMessage = (
  phase: 'intro' | 'redCount' | 'blueCount' | 'totalCount' | 'vennDiagram' | 'equation' | 'verify' | 'result' | 'totalFirst' | 'secondColor',
  gameModule: GameModule = 1,
  moduleLevel: ModuleLevel = 1,
  redCount: number = 0,
  blueCount: number = 0,
  isCorrect: boolean = false,
  attempts: number = 0,
  totalCount: number = 0,
  score: number = 0,
  totalQuestions: number = 5,
  isSoustractionMode: boolean = false,
  firstColorIsRed: boolean = true
) => {
  // Subtraction mode specific to level 2 of module 1
  if (gameModule === 1 && moduleLevel === 2 && isSoustractionMode) {
    switch (phase) {
      case 'intro':
        return "Bonjour ! Bienvenue au jeu de calcul ! Pour débuter, clique sur Commencer.";
      case 'totalFirst':
        return "Compte le nombre total de billes rouges et bleues qu'il y a sur le plateau et écris le nombre que tu vas trouver.";
      case 'redCount':
        return "Compte les billes rouges et écris le nombre que tu vas trouver.";
      case 'blueCount':
        return "Compte les billes bleues et écris le nombre que tu vas trouver.";
      case 'secondColor':
        // Correction : afficher la consigne attendue
        const firstColorName = firstColorIsRed ? "rouges" : "bleues";
        const secondColorName = firstColorIsRed ? "bleues" : "rouges";
        const firstColorCount = firstColorIsRed ? redCount : blueCount;
        const totalBalls = redCount + blueCount;
        return `Tu as compté ${totalBalls} billes en tout et, parmi ces ${totalBalls} billes, il y avait ${firstColorCount} billes ${firstColorName}. Quel est le nombre de billes ${secondColorName} ? Réfléchis et écris le nombre que tu vas trouver.`;
      case 'verify':
        if (isCorrect) {
          return `Bravo ! Le nombre de billes ${firstColorIsRed ? "bleues" : "rouges"} est bien ${firstColorIsRed ? blueCount : redCount}. J'ai remis les billes sur le plateau pour que tu puisses vérifier.`;
        } else {
          return `Tu t'es trompé. Le nombre de billes ${firstColorIsRed ? "bleues" : "rouges"} est ${firstColorIsRed ? blueCount : redCount}. J'ai remis les billes sur le plateau pour que tu puisses compter et comprendre ton erreur.`;
        }
      case 'result':
        return `Jeu terminé ! Ton score final est de ${score} sur ${totalQuestions}.`;
      default:
        return "Bienvenue au jeu de calcul !";
    }
  }

  // Standard mode (addition)
  switch (phase) {
    case 'intro':
      return "Bonjour ! Bienvenue au jeu de calcul ! Pour débuter, clique sur Commencer.";
    case 'redCount':
      return "Compte les billes rouges et écris le nombre que tu vas trouver.";
    case 'blueCount':
      return "Maintenant, compte les billes bleues et écris le nombre que tu vas trouver.";
    case 'totalCount':
      // Message adapted based on level
      if (moduleLevel <= 2) {
        return `Tu as compté ${redCount} billes rouges et ${blueCount} billes bleues. Quel est le nombre total de billes ?`;
      } else {
        return `Tu as compté ${redCount} billes rouges et ${blueCount} billes bleues. Quel est le nombre total de billes ? Clique sur 'Calculer' pour faire l'opération.`;
      }
    case 'verify':
      if (isCorrect) {
        return `Bravo ! Tu as trouvé la bonne réponse en ${attempts} essai${attempts > 1 ? 's' : ''}. Clique sur Continuer`;
      } else {
        return `Essaie encore ! Tu as déjà fait ${attempts} essai${attempts > 1 ? 's' : ''}. Le nombre total de billes est ${redCount + blueCount}.`;
      }
    case 'result':
      return `Jeu terminé ! Ton score final est de ${score} sur ${totalQuestions}.`;
    case 'vennDiagram':
      return `Tu as compté ${redCount} billes rouges et ${blueCount} billes bleues. Place ces valeurs dans les étiquettes correspondantes. On notera x le nombre total de billes.`;
    case 'equation':
      return "Bravo ! Maintenant écris l'opération à faire pour trouver le nombre total de billes.";
    default:
      return "Bienvenue au jeu de calcul !";
  }
};
