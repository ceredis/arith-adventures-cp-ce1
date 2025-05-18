
import React from 'react';
import { useGamification } from '@/contexts/GamificationContext';
import { AchievementBadge, Collectible, ProgressBar, ScoreCounter, LevelBadge } from '@/components/gamification';
import { Star, Award, Trophy, Gift, Zap, Brain, Target, Medal } from 'lucide-react';
import AppLayout from '@/components/AppLayout';

const Rewards = () => {
  const { score, level, badges, collectibles, correctAnswers, streak } = useGamification();
  
  // Level progress calculation
  const nextLevelScore = level * 100;
  const currentLevelScore = (level - 1) * 100;
  const progressToNextLevel = score - currentLevelScore;
  
  const allBadges = [
    { id: 'quick_thinker', type: 'bronze' as const, label: 'Penseur rapide', earned: badges['quick_thinker'] || false, progress: Math.min(correctAnswers / 10 * 100, 100) },
    { id: 'math_wizard', type: 'silver' as const, label: 'Magicien des maths', earned: badges['math_wizard'] || false, progress: Math.min(score / 500 * 100, 100) },
    { id: 'perfect_streak', type: 'gold' as const, label: 'Sans erreur', earned: badges['perfect_streak'] || false, progress: Math.min(streak / 10 * 100, 100) },
    { id: 'math_master', type: 'platinum' as const, label: 'Maître des maths', earned: badges['math_master'] || false, progress: Math.min(level / 10 * 100, 100) }
  ];
  
  const allCollectibles = [
    { id: 'calculator', name: 'Calculatrice', icon: <Zap className="h-6 w-6" />, collected: collectibles['calculator'] || false, hint: 'Résous ton premier problème' },
    { id: 'brain', name: 'Cerveau', icon: <Brain className="h-6 w-6" />, collected: collectibles['brain'] || false, hint: 'Atteins le niveau 3' },
    { id: 'target', name: 'Cible', icon: <Target className="h-6 w-6" />, collected: collectibles['target'] || false, hint: '5 bonnes réponses de suite' },
    { id: 'medal', name: 'Médaille', icon: <Medal className="h-6 w-6" />, collected: collectibles['medal'] || false, hint: 'Score de 1000 points' }
  ];
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Tes récompenses</h1>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <LevelBadge level={level} className="text-lg" />
            <ScoreCounter 
              score={score} 
              icon={<Trophy className="h-5 w-5 text-yellow-500 mr-2" />} 
              className="bg-yellow-50 border border-yellow-200 rounded-full px-4 py-2" 
            />
          </div>
          
          <ProgressBar 
            value={progressToNextLevel} 
            max={100} 
            label={`Progression vers niveau ${level + 1}`} 
            size="lg" 
          />
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {allBadges.map(badge => (
              <AchievementBadge 
                key={badge.id}
                type={badge.type}
                label={badge.label}
                earned={badge.earned}
                progress={badge.earned ? 100 : badge.progress}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Collection</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {allCollectibles.map(item => (
              <Collectible 
                key={item.id}
                id={item.id}
                name={item.name}
                icon={item.icon}
                collected={item.collected}
                hint={item.hint}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Rewards;
