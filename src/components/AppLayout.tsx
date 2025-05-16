
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AppLayoutProps {
  children: React.ReactNode;
  useHomeHeader?: boolean;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, useHomeHeader = false }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {!useHomeHeader && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
