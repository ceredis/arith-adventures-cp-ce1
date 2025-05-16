
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EquationInputProps {
  redBalls: number;
  blueBalls: number;
  onSubmit: (operation: string, answer: number) => void;
  isVisible: boolean;
}

const EquationInput: React.FC<EquationInputProps> = ({
  redBalls,
  blueBalls,
  onSubmit,
  isVisible
}) => {
  const [operation, setOperation] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que les deux champs sont remplis et que la réponse est un nombre valide
    const trimmedOperation = operation.trim();
    const parsedAnswer = parseInt(answer.trim(), 10);
    
    if (trimmedOperation && !isNaN(parsedAnswer)) {
      onSubmit(trimmedOperation, parsedAnswer);
      // Ne pas réinitialiser les champs - laisser la valeur pour référence
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="my-4">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-32 text-center text-xl"
            required
            autoFocus
            placeholder="Écris l'opération"
          />
          <span className="text-xl">=</span>
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-24 text-center text-xl"
            required
            placeholder="Résultat"
          />
        </div>
        <Button type="submit" className="mt-2">
          Valider
        </Button>
      </form>
    </div>
  );
};

export default EquationInput;
