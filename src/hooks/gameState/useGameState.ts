
import { TOTAL_QUESTIONS } from './types';
import { useGameInitialization } from './useGameInitialization';
import { useGameHandlers } from './useGameHandlers';

export const useGameState = () => {
  // Initialize all state variables and basic functions
  const gameStateInit = useGameInitialization();
  
  // Initialize handlers that depend on the gameState
  const handlers = useGameHandlers(gameStateInit);
  
  // Combine everything into a single object to expose as the hook's return value
  return {
    ...gameStateInit,
    ...handlers,
    TOTAL_QUESTIONS
  };
};

export type GameState = ReturnType<typeof useGameState>;
