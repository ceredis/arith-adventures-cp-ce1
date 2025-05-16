
import React from 'react';
import MainNavigation from './MainNavigation';

const Header = () => {
  return (
    <header className="bg-white p-2 flex justify-between items-center border-b">
      <img 
        src="/lovable-uploads/60618cea-5df4-4068-8fdb-73aacd00de0d.png" 
        alt="CEREDIS" 
        className="h-16 object-contain"
      />
      <MainNavigation />
      <div className="w-16"></div> {/* Espace vide pour conserver l'équilibre dans la mise en page */}
    </header>
  );
};

export default Header;
