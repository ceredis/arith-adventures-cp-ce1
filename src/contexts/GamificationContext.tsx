
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConfettiEffect } from '../components/gamification';

interface GamificationState {
  score: number;
  level: number;
  badges: { [key: string]: boolean };
  collectibles: { [key: string]: boolean };
  correctAnswers: number;
  streak: number;
  showConfetti: boolean;
  incrementScore: (points: number) => void;
  incrementCorrectAnswers: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  unlockBadge: (badgeId: string) => void;
  unlockCollectible: (collectibleId: string) => void;
  triggerConfetti: () => void;
}

const GamificationContext = createContext<GamificationState | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<{ [key: string]: boolean }>({});
  const [collectibles, setCollectibles] = useState<{ [key: string]: boolean }>({});
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('mathGameProgress');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setScore(data.score || 0);
        setLevel(data.level || 1);
        setBadges(data.badges || {});
        setCollectibles(data.collectibles || {});
        setCorrectAnswers(data.correctAnswers || 0);
        setStreak(data.streak || 0);
      } catch (error) {
        console.error('Error parsing saved game data:', error);
      }
    }
  }, []);
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('mathGameProgress', JSON.stringify({
      score,
      level,
      badges,
      collectibles,
      correctAnswers,
      streak
    }));
  }, [score, level, badges, collectibles, correctAnswers, streak]);
  
  // Calculate level based on score
  useEffect(() => {
    const newLevel = Math.floor(score / 100) + 1;
    if (newLevel !== level) {
      setLevel(newLevel);
      // Trigger confetti for level up
      triggerConfetti();
    }
  }, [score]);
  
  // Check for badges based on progress
  useEffect(() => {
    checkBadges();
  }, [score, correctAnswers, streak]);
  
  const incrementScore = (points: number) => {
    setScore(prevScore => prevScore + points);
  };
  
  const incrementCorrectAnswers = () => {
    setCorrectAnswers(prev => prev + 1);
  };
  
  const incrementStreak = () => {
    setStreak(prev => prev + 1);
  };
  
  const resetStreak = () => {
    setStreak(0);
  };
  
  const unlockBadge = (badgeId: string) => {
    if (!badges[badgeId]) {
      setBadges(prev => ({ ...prev, [badgeId]: true }));
      triggerConfetti();
    }
  };
  
  const unlockCollectible = (collectibleId: string) => {
    if (!collectibles[collectibleId]) {
      setCollectibles(prev => ({ ...prev, [collectibleId]: true }));
    }
  };
  
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };
  
  const checkBadges = () => {
    // Badge for quick thinker (10 correct answers)
    if (correctAnswers >= 10 && !badges['quick_thinker']) {
      unlockBadge('quick_thinker');
    }
    
    // Badge for math wizard (500 points)
    if (score >= 500 && !badges['math_wizard']) {
      unlockBadge('math_wizard');
    }
    
    // Badge for perfect streak (10 correct answers in a row)
    if (streak >= 10 && !badges['perfect_streak']) {
      unlockBadge('perfect_streak');
    }
    
    // Badge for math master (level 10)
    if (level >= 10 && !badges['math_master']) {
      unlockBadge('math_master');
    }
    
    // Collectibles based on specific achievements
    // Calculator - first correct answer
    if (correctAnswers >= 1 && !collectibles['calculator']) {
      unlockCollectible('calculator');
    }
    
    // Brain - reach level 3
    if (level >= 3 && !collectibles['brain']) {
      unlockCollectible('brain');
    }
    
    // Target - get 5 correct in a row
    if (streak >= 5 && !collectibles['target']) {
      unlockCollectible('target');
    }
    
    // Medal - score at least 1000 points
    if (score >= 1000 && !collectibles['medal']) {
      unlockCollectible('medal');
    }
  };
  
  return (
    <GamificationContext.Provider value={{
      score,
      level,
      badges,
      collectibles,
      correctAnswers,
      streak,
      showConfetti,
      incrementScore,
      incrementCorrectAnswers,
      incrementStreak,
      resetStreak,
      unlockBadge,
      unlockCollectible,
      triggerConfetti
    }}>
      {children}
      <ConfettiEffect active={showConfetti} />
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (context === undefined) {
    throw new Error('useGamification must be used within a GamificationProvider');
  }
  return context;
};
