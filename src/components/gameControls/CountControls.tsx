
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface CountControlsProps {
  type: 'red' | 'blue' | 'total' | 'secondColor';
  onSubmit: (count: number) => void;
  label: string;
  autoFocus?: boolean;
}

const CountControls: React.FC<CountControlsProps> = ({ 
  type, 
  onSubmit, 
  label,
  autoFocus = true
}) => {
  const [count, setCount] = useState<string>('');
  
  // Reset input when type changes
  useEffect(() => {
    setCount('');
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedValue = parseInt(count);
    
    if (!isNaN(parsedValue)) {
      console.log(`Soumission pour ${type}: ${parsedValue}`);
      onSubmit(parsedValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-2">
      <div className="w-full text-center mb-2">
        <label htmlFor={`${type}Count`} className="text-lg">{label}</label>
      </div>
      <Input
        id={`${type}Count`}
        type="number"
        min="0"
        max="50"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        className="px-3 py-2 text-center min-w-[8rem] w-auto text-lg"
        required
        autoFocus={autoFocus}
      />
      <Button type="submit" className="ml-2">Valider</Button>
    </form>
  );
};

export default CountControls;
