
import React from 'react';
import MainNavigation from './MainNavigation';

const HomeHeader: React.FC = () => {
  return (
    <header className="relative">
      {/* Bande avec logos et navigation */}
      <div className="bg-white py-3 px-4 flex items-center justify-between shadow-sm">
        <img 
          src="/lovable-uploads/60618cea-5df4-4068-8fdb-73aacd00de0d.png" 
          alt="CEREDIS" 
          className="h-16 object-contain hover:scale-105 transition-transform duration-300"
        />
        
        <MainNavigation />
        
        <img 
          src="/lovable-uploads/bb65a9d8-dd53-48ec-939a-085a969d4bcb.png" 
          alt="Renouveau Pédagogique" 
          className="h-16 object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Image de fond du header avec overlay et animation */}
      <div className="relative h-[500px] bg-cover bg-center overflow-hidden" 
           style={{ backgroundImage: `url('/lovable-uploads/dfdc4865-47ae-4df5-9d7d-fe27f9498de1.png')` }}>
        {/* Overlay coloré semi-transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/20"></div>
        
        {/* Éléments décoratifs flottants (bulles de nombres) */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center text-2xl font-bold text-blue-800 animate-bounce delay-100">
          123
        </div>
        <div className="absolute top-2/3 right-1/3 w-12 h-12 bg-blue-300 rounded-full flex items-center justify-center text-xl font-bold text-blue-800 animate-bounce delay-300">
          +
        </div>
        <div className="absolute top-1/2 right-1/6 w-14 h-14 bg-green-300 rounded-full flex items-center justify-center text-xl font-bold text-blue-800 animate-bounce delay-200">
          =
        </div>
        
        {/* Texte principal avec animation - MODIFIED: reduced padding */}
        <div className="absolute left-16 top-[35%] max-w-lg bg-white/60 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-purple-200 transform hover:scale-105 transition duration-300">
          <h1 className="text-4xl font-bold text-[#14213d] mb-3 animate-fadeIn">
            Bienvenue <br/> sur <span className="text-purple-600">arith-play-game</span> !
          </h1>
          <p className="text-2xl text-[#CB6CE6] font-medium">
            Une application d'apprentissage scolaire qui s'inscrit dans le courant de l'éducation basée sur les compétences.
          </p>
          <div className="mt-3 flex gap-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-full font-bold shadow-md hover:bg-blue-700 transition duration-300 text-sm">
              Découvrir
            </button>
            <button className="bg-purple-600 text-white py-2 px-4 rounded-full font-bold shadow-md hover:bg-purple-700 transition duration-300 text-sm">
              Connexion
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
