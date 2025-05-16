
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
      <img 
        src="/lovable-uploads/bb65a9d8-dd53-48ec-939a-085a969d4bcb.png" 
        alt="Renouveau Pédagogique" 
        className="h-16 object-contain"
      />
    </header>
  );
};

export default Header;
