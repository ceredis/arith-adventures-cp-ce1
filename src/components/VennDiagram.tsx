import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VennDiagramProps {
  redBalls: number;
  blueBalls: number;
  onSubmit: (redValue: number, blueValue: number, totalValue: number) => void;
  isVisible: boolean;
}

const VennDiagram: React.FC<VennDiagramProps> = ({ 
  redBalls, 
  blueBalls, 
  onSubmit,
  isVisible
}) => {
  const [redValue, setRedValue] = useState<string>('');
  const [blueValue, setBlueValue] = useState<string>('');
  const [totalValue, setTotalValue] = useState<string>('');
  const [showBalls, setShowBalls] = useState<boolean>(false);
  
  // Reset values when visibility changes
  useEffect(() => {
    if (isVisible) {
      setRedValue('');
      setBlueValue('');
      setTotalValue('');
      setShowBalls(false);
    }
  }, [isVisible]);
  
  // Calculate total when red or blue values change
  useEffect(() => {
    const parsedRedValue = parseInt(redValue.trim());
    const parsedBlueValue = parseInt(blueValue.trim());
    
    if (!isNaN(parsedRedValue) && !isNaN(parsedBlueValue)) {
      setTotalValue(String(parsedRedValue + parsedBlueValue));
    } else {
      setTotalValue('');
    }
  }, [redValue, blueValue]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedRedValue = parseInt(redValue.trim());
    const parsedBlueValue = parseInt(blueValue.trim());
    const parsedTotalValue = parseInt(totalValue.trim());
    
    if (!isNaN(parsedRedValue) && !isNaN(parsedBlueValue) && !isNaN(parsedTotalValue)) {
      if (parsedRedValue === redBalls && parsedBlueValue === blueBalls && parsedTotalValue === redBalls + blueBalls) {
        setShowBalls(true);
        onSubmit(parsedRedValue, parsedBlueValue, parsedTotalValue);
      }
    }
  };
  
  if (!isVisible) return null;
  
  // Calculer les dimensions des ensembles en fonction du nombre de billes
  // Ensembles complètement disjoints pour respecter la théorie des ensembles
  const redRadius = 40 + Math.min(redBalls * 3, 40);
  const blueRadius = 40 + Math.min(blueBalls * 3, 40);
  const containerWidth = (redRadius + blueRadius) * 2 + 60;
  const containerHeight = Math.max(redRadius, blueRadius) * 2 + 200;
  
  // Positions des cercles - bien séparés pour garantir qu'ils soient disjoints
  const redCenterX = containerWidth / 4;
  const blueCenterX = (containerWidth / 4) * 3;
  const centerY = containerHeight / 3;
  
  // Rayon de l'ellipse englobante (union)
  const unionRadiusX = containerWidth / 2 - 10;
  const unionRadiusY = Math.max(redRadius, blueRadius) + 30;
  
  // Générer les positions des billes à l'intérieur des cercles - sans chevauchement
  const generateBallPositions = (count: number, centerX: number, radius: number) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * (radius * 0.7); // 70% du rayon pour garder les billes à l'intérieur
      positions.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance
      });
    }
    return positions;
  };
  
  const redBallPositions = showBalls ? generateBallPositions(redBalls, redCenterX, redRadius * 0.8) : [];
  const blueBallPositions = showBalls ? generateBallPositions(blueBalls, blueCenterX, blueRadius * 0.8) : [];
  
  return (
    <div className="my-6 flex flex-col items-center">
      <div className="relative" style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}>
        {/* Ensemble global (union) - grande ellipse contenant les ensembles rouge et bleu */}
        <svg width="100%" height="100%" viewBox={`0 0 ${containerWidth} ${containerHeight}`} className="absolute top-0 left-0">
          {/* Container ellipse (union) */}
          <ellipse 
            cx={containerWidth / 2} 
            cy={centerY} 
            rx={unionRadiusX} 
            ry={unionRadiusY} 
            fill="none" 
            stroke="black" 
            strokeWidth="2" 
            strokeDasharray="5,5"
          />
          
          {/* Ensemble des billes rouges - complètement à l'intérieur de l'ellipse principale */}
          <circle 
            cx={redCenterX} 
            cy={centerY} 
            r={redRadius} 
            fill={showBalls ? "rgba(255, 200, 200, 0.3)" : "none"} 
            stroke="red" 
            strokeWidth="2" 
          />
          
          {/* Ensemble des billes bleues - complètement à l'intérieur de l'ellipse principale */}
          <circle 
            cx={blueCenterX} 
            cy={centerY} 
            r={blueRadius} 
            fill={showBalls ? "rgba(200, 200, 255, 0.3)" : "none"} 
            stroke="blue" 
            strokeWidth="2" 
          />
          
          {/* Billes rouges */}
          {showBalls && redBallPositions.map((pos, idx) => (
            <circle 
              key={`red-ball-${idx}`} 
              cx={pos.x} 
              cy={pos.y} 
              r="5" 
              fill="#ea384c" 
            />
          ))}
          
          {/* Billes bleues */}
          {showBalls && blueBallPositions.map((pos, idx) => (
            <circle 
              key={`blue-ball-${idx}`} 
              cx={pos.x} 
              cy={pos.y} 
              r="5" 
              fill="#1EAEDB" 
            />
          ))}
          
          {/* Flèches reliant les étiquettes aux ensembles */}
          <line 
            x1={redCenterX} 
            y1={centerY + redRadius + 5} 
            x2={redCenterX} 
            y2={centerY + Math.max(redRadius, blueRadius) + 60} 
            stroke="black" 
            strokeWidth="1.5" 
            markerEnd="url(#arrowhead)" 
          />
          
          <line 
            x1={blueCenterX} 
            y1={centerY + blueRadius + 5} 
            x2={blueCenterX} 
            y2={centerY + Math.max(redRadius, blueRadius) + 60} 
            stroke="black" 
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)" 
          />
          
          {/* Nouvelle flèche pour l'étiquette x (totale) - partant du bas de l'étiquette vers le diagramme */}
          <line 
            x1={containerWidth / 2} 
            y1={centerY + Math.max(redRadius, blueRadius) + 130} 
            x2={containerWidth / 2} 
            y2={centerY + unionRadiusY + 5} 
            stroke="black" 
            strokeWidth="1.5"
            markerEnd="url(#arrowhead)" 
          />
          
          {/* Définition du marqueur de flèche */}
          <defs>
            <marker 
              id="arrowhead" 
              markerWidth="10" 
              markerHeight="7" 
              refX="0" 
              refY="3.5" 
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>
          
          {/* Étiquette x (pour le total) */}
          <rect 
            x={containerWidth / 2 - 15} 
            y={centerY + Math.max(redRadius, blueRadius) + 80} 
            width="30" 
            height="30" 
            fill="white" 
            stroke="black" 
            strokeWidth="1.5" 
          />
          
          <text 
            x={containerWidth / 2} 
            y={centerY + Math.max(redRadius, blueRadius) + 100} 
            textAnchor="middle" 
            dominantBaseline="middle"
            fontSize="20" 
            fontStyle="italic"
          >
            x
          </text>
        </svg>
        
        {/* Zones de saisie des nombres (étiquettes) - bien écartées */}
        <div className="absolute flex justify-between w-full" style={{top: `${centerY + Math.max(redRadius, blueRadius) + 70}px`}}>
          <div className="flex flex-col items-center" style={{width: '30%'}}>
            <Input 
              type="number"
              value={redValue}
              onChange={(e) => setRedValue(e.target.value)}
              className="w-16 h-10 text-center border-2 border-black"
              disabled={showBalls}
            />
            <span className="mt-2 text-sm font-medium">Billes rouges</span>
          </div>
          
          {/* Nouvelle zone pour le total */}
          <div className="flex flex-col items-center" style={{width: '30%', marginTop: '70px'}}>
            <Input 
              type="number"
              value={totalValue}
              onChange={(e) => setTotalValue(e.target.value)}
              className="w-16 h-10 text-center border-2 border-black"
              disabled={showBalls}
            />
            <span className="mt-2 text-sm font-medium">Total des billes</span>
          </div>
          
          <div className="flex flex-col items-center" style={{width: '30%'}}>
            <Input 
              type="number"
              value={blueValue}
              onChange={(e) => setBlueValue(e.target.value)}
              className="w-16 h-10 text-center border-2 border-black"
              disabled={showBalls}
            />
            <span className="mt-2 text-sm font-medium">Billes bleues</span>
          </div>
        </div>
      </div>
      
      {!showBalls && (
        <Button 
          type="button" 
          onClick={handleSubmit}
          className="mt-32"
        >
          Valider
        </Button>
      )}
    </div>
  );
};

export default VennDiagram;