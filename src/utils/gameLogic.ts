
interface RandomBalls {
  redBalls: number;
  blueBalls: number;
}

export type ModuleLevel = 1 | 2 | 3 | 4;
export type GameModule = 1 | 2;

export const generateRandomBalls = (maxBalls: number, gameModule: GameModule = 1, moduleLevel: ModuleLevel = 1): RandomBalls => {
  let redBalls: number;
  let blueBalls: number;
  
  // Définir la limite maximale selon le niveau
  let maxSum: number;
  switch (moduleLevel) {
    case 1: maxSum = 5; break;
    case 2: maxSum = 10; break;
    case 3: maxSum = 20; break;
    case 4: maxSum = 50; break;
    default: maxSum = 5;
  }
  
  if (gameModule === 1) { // Module 1: Addition
    // Générer des nombres dont la somme ne dépasse pas maxSum
    redBalls = 1 + Math.floor(Math.random() * (maxSum - 2)); // Au moins 1, au plus maxSum-2
    blueBalls = 1 + Math.floor(Math.random() * (maxSum - redBalls - 1)); // Au moins 1, max possible
  } else { // Module 2: Soustraction (à implémenter plus tard)
    // Pour l'instant, même logique que le module 1
    redBalls = 1 + Math.floor(Math.random() * Math.min(5, maxSum - 2));
    blueBalls = 1 + Math.floor(Math.random() * Math.min(5, maxSum - redBalls - 1));
  }

  console.log(`Génération: redBalls=${redBalls}, blueBalls=${blueBalls}, somme=${redBalls + blueBalls}, maxSum=${maxSum}`);
  return { redBalls, blueBalls };
};

export const getPhaseMessage = (
  phase: 'intro' | 'redCount' | 'blueCount' | 'totalCount' | 'vennDiagram' | 'equation' | 'verify' | 'result',
  gameModule: GameModule = 1,
  moduleLevel: ModuleLevel = 1,
  redCount: number = 0,
  blueCount: number = 0,
  isCorrect: boolean = false,
  attempts: number = 0,
  totalCount: number = 0,
  score: number = 0,
  totalQuestions: number = 5
) => {
  switch (phase) {
    case 'intro':
      return "Bonjour ! Bienvenue au jeu de calcul ! Pour débuter, clique sur Commencer.";
    case 'redCount':
      return "Compte les billes rouges et écris le nombre que tu vas trouver.";
    case 'blueCount':
      return "Maintenant, compte les billes bleues et écris le nombre que tu vas trouver.";
    case 'totalCount':
      // Message adapté selon le niveau
      if (moduleLevel === 1) {
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
