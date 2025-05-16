
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
  const [open, setOpen] = useState<boolean>(false);

  const handleModuleChange = (module: GameModule) => {
    onChangeModule(module);
    // Ouvrir automatiquement le dropdown pour le Module 1
    if (module === 1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleLevelSelect = (level: ModuleLevel) => {
    onChangeLevel(level);
    setOpen(false);
  };

  return (
    <div className="flex justify-center mb-4 space-x-4">
      <Popover open={open && gameModule === 1} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant={gameModule === 1 ? "default" : "outline"} 
            onClick={() => handleModuleChange(1)}
            className={gameModule === 1 ? "bg-navy-blue hover:bg-navy-blue-dark" : ""}
          >
            Module 1
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0">
          <div className="grid grid-cols-1 divide-y">
            {[1, 2, 3, 4].map((level) => (
              <Button
                key={level}
                variant="ghost"
                className={`justify-start px-4 py-2 ${moduleLevel === level ? 'bg-muted' : ''}`}
                onClick={() => handleLevelSelect(level as ModuleLevel)}
              >
                Niveau {level}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      
      <Button 
        variant={gameModule === 2 ? "default" : "outline"} 
        onClick={() => handleModuleChange(2)}
        className={gameModule === 2 ? "bg-navy-blue hover:bg-navy-blue-dark" : ""}
      >
        Module 2
      </Button>
    </div>
  );
};

export default LevelSelector;
