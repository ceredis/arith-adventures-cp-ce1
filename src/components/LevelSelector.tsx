
import React from 'react';
import { Button } from '@/components/ui/button';
import { GameModule, ModuleLevel } from '@/utils/gameLogic';

interface LevelSelectorProps {
  gameModule: GameModule;
  moduleLevel: ModuleLevel;
  onChangeModule: (module: GameModule) => void;
  onChangeLevel: (level: ModuleLevel) => void;
}

const LevelSelector: React.FC<LevelSelectorProps> = ({
  gameModule,
  moduleLevel,
  onChangeModule,
  onChangeLevel
}) => {
  // Determine which levels to display based on selected module
  const availableLevels = gameModule === 1 
    ? [1, 2] // Module 1: levels 1 and 2
    : [3, 4, 5]; // Module 2: levels 3, 4 and 5

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Module</h3>
          <div className="flex gap-2">
            <Button
              onClick={() => onChangeModule(1)}
              variant={gameModule === 1 ? "default" : "outline"}
              className={`flex-1 ${gameModule === 1 ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            >
              Module 1
            </Button>
            <Button
              onClick={() => onChangeModule(2)}
              variant={gameModule === 2 ? "default" : "outline"}
              className={`flex-1 ${gameModule === 2 ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
            >
              Module 2
            </Button>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-2">Niveau</h3>
          <div className="flex gap-2">
            {availableLevels.map((level) => (
              <Button
                key={level}
                onClick={() => onChangeLevel(level as ModuleLevel)}
                variant={moduleLevel === level ? "default" : "outline"}
                className={`flex-1 ${moduleLevel === level ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              >
                Niveau {level}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
