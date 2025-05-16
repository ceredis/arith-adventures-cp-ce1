
import React, { useRef, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const sponsors = [
  { 
    name: "Ministère de l'Éducation", 
    logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Ministère+de+l'Éducation",
    description: "Soutient le développement éducatif"
  },
  { 
    name: "UNESCO", 
    logo: "https://placehold.co/200x100/e2e8f0/64748b?text=UNESCO",
    description: "Partenaire international de l'éducation"
  },
  { 
    name: "Université de Montréal", 
    logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Université+de+Montréal",
    description: "Recherche et innovation pédagogique"
  },
  { 
    name: "Fondation pour l'Éducation", 
    logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Fondation+pour+l'Éducation",
    description: "Financement de projets éducatifs"
  },
  { 
    name: "Tech pour Tous", 
    logo: "https://placehold.co/200x100/e2e8f0/64748b?text=Tech+pour+Tous",
    description: "Accès numérique pour tous les élèves"
  },
];

const SponsorsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = React.useState(0);
  
  const scrollRight = () => {
    if (scrollRef.current) {
      const nextIndex = Math.min(visibleIndex + 1, sponsors.length - 3);
      setVisibleIndex(nextIndex);
      scrollRef.current.scrollTo({ left: nextIndex * 250, behavior: 'smooth' });
    }
  };
  
  const scrollLeft = () => {
    if (scrollRef.current) {
      const prevIndex = Math.max(visibleIndex - 1, 0);
      setVisibleIndex(prevIndex);
      scrollRef.current.scrollTo({ left: prevIndex * 250, behavior: 'smooth' });
    }
  };
  
  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (visibleIndex < sponsors.length - 3) {
        scrollRight();
      } else {
        setVisibleIndex(0);
        if (scrollRef.current) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [visibleIndex]);

  return (
    <div className="relative my-8 py-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-md">
      <h3 className="text-2xl font-bold text-center mb-6 text-blue-700">Nos partenaires</h3>
      
      <div className="relative mx-auto max-w-5xl">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-8 py-4 px-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {sponsors.map((sponsor, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 snap-start w-60 group transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white p-4 rounded-xl shadow-md border-2 border-blue-100 h-full flex flex-col">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-24 w-48 object-contain mx-auto mb-3 group-hover:animate-pulse"
                />
                <h4 className="font-bold text-center mt-2 text-blue-700 group-hover:text-purple-600 transition-colors">
                  {sponsor.name}
                </h4>
                <p className="text-center text-sm text-gray-600 mt-2">{sponsor.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Voir les sponsors précédents"
          disabled={visibleIndex === 0}
        >
          <ChevronLeft className="h-6 w-6 text-blue-700" />
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Voir plus de sponsors"
          disabled={visibleIndex >= sponsors.length - 3}
        >
          <ChevronRight className="h-6 w-6 text-blue-700" />
        </button>
        
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: Math.ceil(sponsors.length / 3) }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                Math.floor(visibleIndex / 3) === i ? 'bg-blue-600 w-4' : 'bg-gray-300 hover:bg-blue-300'
              }`}
              onClick={() => {
                setVisibleIndex(i * 3);
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({ left: i * 3 * 250, behavior: 'smooth' });
                }
              }}
              aria-label={`Voir la page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorsCarousel;
