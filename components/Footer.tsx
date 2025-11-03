
import React from 'react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { WHATSAPP_LINK, INSTAGRAM_LINK } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div>
            <h3 className="text-2xl font-serif font-bold text-brand-secondary">Heppy Yell</h3>
            <p className="text-gray-400">Indonesian Padang Cuisine</p>
          </div>
          <div className="flex space-x-6">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
              <WhatsAppIcon className="w-7 h-7" />
            </a>
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
              <InstagramIcon className="w-7 h-7" />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Heppy Yell. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
