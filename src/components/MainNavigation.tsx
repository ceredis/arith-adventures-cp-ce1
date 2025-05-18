
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGamification } from '@/contexts/GamificationContext';
import { Trophy } from 'lucide-react';
import { Badge } from './ui/badge';

const MainNavigation = () => {
  const location = useLocation();
  const { score } = useGamification();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600 hover:text-blue-600';
  };
  
  return (
    <nav className="bg-white p-4 rounded-lg shadow-md">
      <ul className="flex flex-wrap justify-center gap-8">
        <li>
          <Link to="/" className={`text-lg ${isActive('/')}`}>
            Accueil
          </Link>
        </li>
        <li>
          <Link to="/numeration" className={`text-lg ${isActive('/numeration')}`}>
            Numération
          </Link>
        </li>
        <li>
          <Link to="/calcul-ecrit" className={`text-lg ${isActive('/calcul-ecrit')}`}>
            Calcul écrit
          </Link>
        </li>
        <li>
          <Link to="/calcul-mental" className={`text-lg ${isActive('/calcul-mental')}`}>
            Calcul mental
          </Link>
        </li>
        <li>
          <Link 
            to="/rewards" 
            className={`flex items-center gap-2 text-lg ${isActive('/rewards')}`}
          >
            <Trophy className="h-5 w-5" />
            Récompenses
            {score > 0 && <Badge variant="secondary" className="ml-1">{score}</Badge>}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
