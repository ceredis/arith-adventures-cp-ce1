
interface RandomBalls {
  redBalls: number;
  blueBalls: number;
}

export type ModuleLevel = 1 | 2 | 3 | 4 | 5;
export type GameModule = 1 | 2;

export const generateRandomBalls = (maxBalls: number, gameModule: GameModule = 1, moduleLevel: ModuleLevel = 1): RandomBalls => {
  let redBalls: number;
  let blueBalls: number;
  
  // Définir la limite maximale selon le niveau
  let maxSum: number;
  switch (moduleLevel) {
    case 1: 
    case 2: maxSum = 5; break;
    case 3: maxSum = 10; break;
    case 4: maxSum = 20; break;
    case 5: maxSum = 50; break;
    default: maxSum = 5;
  }
  
  if (gameModule === 1) { // Module 1: Addition seulement (niveau 1 et 2)
    // Générer des nombres dont la somme ne dépasse pas maxSum
    redBalls = 1 + Math.floor(Math.random() * (maxSum - 2)); // Au moins 1, au plus maxSum-2
    blueBalls = 1 + Math.floor(Math.random() * (maxSum - redBalls - 1)); // Au moins 1, max possible
  } else if (gameModule === 2) { // Module 2: Soustraction et additions variées
    if (moduleLevel >= 3) { // Anciennement niveau 2, 3 et 4
      // Pour les niveaux supérieurs, même logique que précédemment, mais sommes plus élevées
      redBalls = 1 + Math.floor(Math.random() * Math.min(maxSum - 2, maxSum / 2));
      blueBalls = 1 + Math.floor(Math.random() * Math.min(maxSum - redBalls - 1, maxSum / 2));
    } else {
      // Cas qui ne devrait pas arriver, mais par précaution
      redBalls = 1 + Math.floor(Math.random() * 3);
      blueBalls = 1 + Math.floor(Math.random() * 3);
    }
  } else {
    // Cas par défaut
    redBalls = 1 + Math.floor(Math.random() * 3);
    blueBalls = 1 + Math.floor(Math.random() * 3);
  }

  console.log(`Génération: redBalls=${redBalls}, blueBalls=${blueBalls}, somme=${redBalls + blueBalls}, maxSum=${maxSum}, module=${gameModule}, niveau=${moduleLevel}`);
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
  // Mode soustraction spécifique au niveau 2 du module 1
  if (gameModule === 1 && moduleLevel === 2 && isSoustractionMode) {
    switch (phase) {
      case 'intro':
        return "Bonjour ! Bienvenue au jeu de calcul ! Pour débuter, clique sur Commencer.";
      case 'totalFirst':
        return "Compte le nombre total de billes rouges et bleues qu'il y a sur le plateau et écris le nombre que tu vas trouver.";
      case 'redCount':
      case 'blueCount':
        return firstColorIsRed ? 
          "Compte les billes rouges et écris le nombre que tu vas trouver." :
          "Compte les billes bleues et écris le nombre que tu vas trouver.";
      case 'secondColor':
        const firstColorName = firstColorIsRed ? "rouges" : "bleues";
        const secondColorName = firstColorIsRed ? "bleues" : "rouges";
        const firstColorCount = firstColorIsRed ? redCount : blueCount;
        const totalBalls = redCount + blueCount;
        return `Tu as compté ${totalBalls} billes en tout et, parmi ces ${totalBalls} billes, il y avait ${firstColorCount} billes ${firstColorName}. Combien y avait-il de billes ${secondColorName} ? Réfléchis et écris le nombre que tu vas trouver.`;
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

  // Mode standard (addition)
  switch (phase) {
    case 'intro':
      return "Bonjour ! Bienvenue au jeu de calcul ! Pour débuter, clique sur Commencer.";
    case 'redCount':
      return "Compte les billes rouges et écris le nombre que tu vas trouver.";
    case 'blueCount':
      return "Maintenant, compte les billes bleues et écris le nombre que tu vas trouver.";
    case 'totalCount':
      // Message adapté selon le niveau
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
