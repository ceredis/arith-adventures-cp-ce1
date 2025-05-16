import React from 'react';
import AppLayout from '@/components/AppLayout';
import HomeHeader from '@/components/HomeHeader';
import HomeTeacherBubble from '@/components/HomeTeacherBubble';
import SponsorsCarousel from '@/components/SponsorsCarousel';
import { Sparkles, Calculator, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Calculator className="h-10 w-10 text-yellow-500" />,
      title: "Numération",
      description: "Apprends à compter et à reconnaître les nombres de façon amusante"
    },
    {
      icon: <BookOpen className="h-10 w-10 text-green-500" />,
      title: "Calcul",
      description: "Découvre l'addition et la soustraction avec des jeux interactifs",
      link: "/calcul-ecrit"
    },
    {
      icon: <Users className="h-10 w-10 text-blue-500" />,
      title: "Collaboration",
      description: "Travaille avec tes camarades sur des défis mathématiques"
    },
  ];

  return (
    <AppLayout useHomeHeader={true}>
      <HomeHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Section principale avec animation - Modified: aligned with header content and fixed vertical alignment */}
        <div className="flex flex-col md:flex-row gap-8 mb-12 items-start pl-16">
          {/* Section gauche avec slogan et paragraphes */}
          <div className="flex-1 p-6 rounded-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"></div>
            
            <div className="flex items-center mb-4">
              <Sparkles className="h-8 w-8 text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-blue-700">
                La transformation numérique de l'éducation
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg">
                <span className="font-bold text-purple-600">Arith-play-game</span> est un environnement numérique 
                d'enseignement et d'apprentissage de l'arithmétique élémentaire, 
                qui peut être utilisé en classe et en-dehors des heures de classe.
              </p>
              
              <p className="text-lg">
                <span className="font-bold text-purple-600">Arith-play-game</span> est basée sur une échelle de niveaux de compétence permettant un suivi rigoureux des progrès de chaque élève.
              </p>

              <p className="text-lg">
                Les enseignants peuvent utiliser <span className="font-bold text-purple-600">Arith-play-game</span> en classe, 
                comme support didactique numérique de séquences d'enseignement de la numération et du calcul.
              </p>
              
              <p className="text-lg">
                Les élèves peuvent utiliser <span className="font-bold text-purple-600">Arith-play-game</span> à la maison 
                pour réviser et s'entraîner.
              </p>
              
              <button className="mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300">
                Commencer l'aventure !
              </button>
            </div>
          </div>
          
          {/* Section droite avec bulle et avatar */}
          <div className="flex-1 flex justify-center pt-8">
            <HomeTeacherBubble />
          </div>
        </div>
        
        {/* Section des fonctionnalités */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">Découvre ce que tu peux apprendre</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 hover:border-purple-300 transform hover:scale-105 transition duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-center text-blue-700 mb-2">
                  {feature.link ? (
                    <Link to={feature.link} className="hover:text-purple-600 transition-colors">
                      {feature.title}
                    </Link>
                  ) : (
                    feature.title
                  )}
                </h3>
                <p className="text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Appel à l'action - Modified: Enhanced parallax effect and increased image visibility */}
        <div className="relative mb-12 text-center overflow-hidden rounded-xl" style={{ minHeight: "300px" }}>
          {/* Background image with parallax effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60 z-0" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/1e091c5d-4845-4417-9ff0-3c8f50e60d16.png')",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />
          {/* Content with semi-transparent overlay to maintain readability */}
          <div className="relative z-10 bg-gradient-to-r from-blue-100/70 to-purple-100/70 p-8 rounded-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Prêt à apprendre en t'amusant ?</h3>
            <p className="text-lg mb-6 text-gray-800">Rejoins les milliers d'élèves qui progressent chaque jour grâce à Arith-play-game !</p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-600 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-blue-700 transition duration-300">
                Pour les enseignants
              </button>
              <button className="bg-purple-600 text-white py-3 px-6 rounded-full font-bold shadow-lg hover:bg-purple-700 transition duration-300">
                Pour les élèves
              </button>
            </div>
          </div>
        </div>
        
        {/* Carrousel des sponsors */}
        <SponsorsCarousel />
      </div>
    </AppLayout>
  );
};

export default Home;