
import React, { useEffect, useRef } from 'react';
import '../../styles/confetti.css';

interface ConfettiEffectProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  active,
  duration = 3000,
  particleCount = 100
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const colors = ['#FF5252', '#FFD740', '#4FC3F7', '#9CCC65', '#BA68C8', '#7C4DFF'];
  
  useEffect(() => {
    if (!active || !containerRef.current) return;
    
    const container = containerRef.current;
    const confettis: HTMLDivElement[] = [];
    
    // Create confetti particles
    for (let i = 0; i < particleCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      
      // Random styles
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.5 + 0.5;
      const delay = Math.random() * 2;
      const duration = Math.random() * 3 + 2;
      
      confetti.style.setProperty('--confetti-color', color);
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.left = `${left}%`;
      confetti.style.opacity = opacity.toString();
      confetti.style.animationDuration = `${duration}s`;
      confetti.style.animationDelay = `${delay}s`;
      confetti.style.backgroundColor = color;
      
      // Different shapes
      const shape = Math.floor(Math.random() * 3);
      switch (shape) {
        case 0: // Square
          break;
        case 1: // Circle
          confetti.style.borderRadius = '50%';
          break;
        case 2: // Triangle
          confetti.style.width = '0';
          confetti.style.height = '0';
          confetti.style.backgroundColor = 'transparent';
          confetti.style.borderLeft = `${size/2}px solid transparent`;
          confetti.style.borderRight = `${size/2}px solid transparent`;
          confetti.style.borderBottom = `${size}px solid ${color}`;
          break;
      }
      
      container.appendChild(confetti);
      confettis.push(confetti);
    }
    
    // Cleanup
    const timeout = setTimeout(() => {
      confettis.forEach(confetti => {
        confetti.remove();
      });
    }, duration);
    
    return () => {
      clearTimeout(timeout);
      confettis.forEach(confetti => {
        confetti.remove();
      });
    };
  }, [active, particleCount, duration]);
  
  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" />;
};

export default ConfettiEffect;
