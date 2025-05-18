
import React from 'react';
import { Star, Award, Trophy, Gift, Zap, Brain, Target, Medal } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

// Composant de badge pour les récompenses
interface BadgeProps {
  type: 'bronze' | 'silver' | 'gold' | 'platinum';
  label: string;
  earned?: boolean;
  progress?: number;
}

export const AchievementBadge: React.FC<BadgeProps> = ({ 
  type, 
  label, 
  earned = false,
  progress = 0 
}) => {
  const colors = {
    bronze: { bg: 'bg-amber-100', border: 'border-amber-600', text: 'text-amber-800', icon: 'text-amber-600' },
    silver: { bg: 'bg-gray-100', border: 'border-gray-400', text: 'text-gray-700', icon: 'text-gray-500' },
    gold: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-800', icon: 'text-yellow-500' },
    platinum: { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-800', icon: 'text-blue-500' }
  };

  const icons = {
    bronze: <Star className="h-6 w-6" />,
    silver: <Award className="h-6 w-6" />,
    gold: <Trophy className="h-6 w-6" />,
    platinum: <Gift className="h-6 w-6" />
  };

  return (
    <div 
      className={`flex flex-col items-center p-4 rounded-lg shadow-md ${earned ? colors[type].bg : 'bg-gray-50'} 
                  border-2 ${earned ? colors[type].border : 'border-gray-200'} 
                  ${earned ? 'hover:shadow-lg transform hover:scale-105' : 'opacity-60 grayscale'} 
                  transition-all duration-300 w-28 h-28`}
    >
      <div className={`${earned ? colors[type].icon : 'text-gray-400'} mb-2`}>
        {icons[type]}
      </div>
      <p className={`text-sm font-medium ${earned ? colors[type].text : 'text-gray-500'} text-center`}>
        {label}
      </p>
      {!earned && progress > 0 && (
        <div className="w-full mt-2 bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-blue-500 h-1.5 rounded-full" 
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

// Composant pour afficher la progression
interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  max, 
  label, 
  size = 'md',
  animate = true
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const heights = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-blue-700">{label}</span>
          <span className="text-sm font-medium text-blue-700">
            <AnimatedNumber value={value} duration={1000} /> / {max}
          </span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${heights[size]} overflow-hidden`}>
        <div 
          className={`bg-gradient-to-r from-blue-500 to-purple-600 ${heights[size]} rounded-full ${animate ? 'transition-all duration-1000' : ''}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

// Composant d'étoiles pour le niveau de difficulté ou notation
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  interactive = false,
  onChange 
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          type="button"
          className={`${interactive ? 'cursor-pointer' : 'cursor-default'} p-1`}
          onClick={() => interactive && onChange && onChange(index + 1)}
        >
          <Star 
            className={`${sizes[size]} ${
              index < rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } transition-colors duration-200`} 
          />
        </button>
      ))}
    </div>
  );
};

// Composant compteur de points
interface ScoreCounterProps {
  score: number;
  icon?: React.ReactNode;
  className?: string;
}

export const ScoreCounter: React.FC<ScoreCounterProps> = ({ 
  score, 
  icon, 
  className = '' 
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      {icon}
      <AnimatedNumber 
        value={score} 
        formatValue={(val) => Math.floor(val).toString().padStart(5, '0')}
        className="font-mono" 
      />
    </div>
  );
};

// Interface pour les récompenses à collectionner
interface CollectibleProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  collected: boolean;
  hint?: string;
}

export const Collectible: React.FC<CollectibleProps> = ({
  id,
  name,
  icon,
  collected,
  hint
}) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-3 rounded-lg ${
        collected 
          ? 'bg-gradient-to-br from-purple-50 to-blue-50 shadow-md' 
          : 'bg-gray-100'
      } border-2 ${
        collected ? 'border-purple-200' : 'border-gray-200'
      } transition-all duration-300 w-24 h-24 ${
        collected ? 'hover:shadow-lg hover:scale-105' : 'grayscale opacity-50'
      }`}
      title={hint || name}
    >
      <div className={`${collected ? 'text-purple-600' : 'text-gray-400'} mb-2`}>
        {icon}
      </div>
      <p className={`text-xs font-medium text-center ${collected ? 'text-blue-700' : 'text-gray-500'}`}>
        {name}
      </p>
    </div>
  );
};

// Composant de niveau d'utilisateur
interface LevelBadgeProps {
  level: number;
  className?: string;
}

export const LevelBadge: React.FC<LevelBadgeProps> = ({ level, className = '' }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-3 py-1 text-sm font-bold">
        Niveau {level}
      </div>
    </div>
  );
};
