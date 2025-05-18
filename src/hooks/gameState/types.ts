
import { GameModule, ModuleLevel } from '@/utils/gameLogic';

export type GamePhase = 
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

export const TOTAL_QUESTIONS = 5;

export interface GameStateStore {
  // Game configuration
  gameModule: GameModule;
  moduleLevel: ModuleLevel;
  
  // Game state
  phase: GamePhase;
  redBalls: number;
  blueBalls: number;
  userRedCount: number;
  userBlueCount: number;
  userTotalCount: number;
  totalAttempts: number;
  score: number;
  showBalls: boolean;
  questionNumber: number;
  message: string;
  speak: boolean;
  vennDiagramCompleted: boolean;
  equationCompleted: boolean;
  
  // Subtraction mode properties
  isSoustractionMode: boolean;
  firstColorIsRed: boolean;
  userSecondColorCount: number;
}
