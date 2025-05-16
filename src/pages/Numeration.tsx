
import React from 'react';
import AppLayout from '@/components/AppLayout';
import TeacherSection from '@/components/TeacherSection';

const Numeration: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Numération</h1>
        <p className="text-xl mb-8">Cette section est en cours de développement. Merci de votre patience !</p>
        
        <TeacherSection 
          message="La section Numération sera bientôt disponible. En attendant, essaie la section Calcul écrit !" 
          speak={true}
          onSpeechEnd={() => {}}
          use3DAvatar={true}
        />
      </div>
    </AppLayout>
  );
};

export default Numeration;
