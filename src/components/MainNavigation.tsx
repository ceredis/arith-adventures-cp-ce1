
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Pencil, Calculator, Home } from 'lucide-react';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { cn } from "@/lib/utils";

const MainNavigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <NavigationMenu className="mx-auto">
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <Link to="/" className={cn(
            "flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors hover:text-blue-600",
            location.pathname === "/" ? "text-blue-600" : "text-gray-700"
          )}>
            <Home className="h-5 w-5" />
            <span>Accueil</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/numeration" className={cn(
            "flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors hover:text-blue-600",
            location.pathname === "/numeration" ? "text-blue-600" : "text-gray-700"
          )}>
            <Book className="h-5 w-5" />
            <span>Numération</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/calcul-ecrit" className={cn(
            "flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors hover:text-blue-600", 
            location.pathname === "/calcul-ecrit" ? "text-blue-600" : "text-gray-700"
          )}>
            <Pencil className="h-5 w-5" />
            <span>Calcul écrit</span>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/calcul-mental" className={cn(
            "flex items-center gap-2 px-3 py-2 text-lg font-medium transition-colors hover:text-blue-600",
            location.pathname === "/calcul-mental" ? "text-blue-600" : "text-gray-700"
          )}>
            <Calculator className="h-5 w-5" />
            <span>Calcul mental</span>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNavigation;
