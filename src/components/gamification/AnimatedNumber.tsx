
import React, { useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatValue?: (value: number) => string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1000,
  className = '',
  formatValue = (val) => Math.round(val).toString()
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    if (value === displayValue) return;
    
    setAnimating(true);
    const startValue = displayValue;
    const endValue = value;
    const startTime = performance.now();
    
    const animateValue = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = startValue + (endValue - startValue) * easedProgress;
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      } else {
        setAnimating(false);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value, duration, displayValue]);
  
  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4);
  };
  
  return (
    <span 
      className={`${className} ${animating ? 'text-purple-600 font-bold' : ''} transition-colors duration-300`}
    >
      {formatValue(displayValue)}
    </span>
  );
};

export default AnimatedNumber;
