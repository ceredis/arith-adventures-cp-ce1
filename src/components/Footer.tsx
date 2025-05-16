
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-purple-50 py-4 text-center text-gray-600 border-t border-blue-100">
      <p>© 2025 CEREDIS - Renouveau Pédagogique</p>
      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
        <a href="#" className="hover:text-blue-600 transition-colors">Mentions légales</a>
        <span>|</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Politique de confidentialité</a>
        <span>|</span>
        <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
