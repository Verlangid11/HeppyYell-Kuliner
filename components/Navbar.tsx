
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { SunIcon, MoonIcon, WhatsAppIcon } from './Icons';
import { WHATSAPP_LINK } from '../constants';

interface NavbarProps {
  onLoginClick: () => void;
  onAdminClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, onAdminClick }) => {
  const { isDarkMode, toggleDarkMode, isAdmin, logout } = useAppContext();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClass = isScrolled
    ? 'bg-white/80 dark:bg-brand-dark/80 backdrop-blur-sm shadow-md'
    : 'bg-transparent';

  const menuItems = ["Home", "Menu", "Why Us", "Order"];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${navClass}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="text-3xl font-serif font-bold text-brand-primary dark:text-brand-secondary">
            Heppy Yell
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-700 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-secondary transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-all transform hover:scale-105 shadow-sm">
                <WhatsAppIcon className="w-5 h-5" />
                <span>Order Now</span>
            </a>
            {isAdmin ? (
                <>
                    <button onClick={onAdminClick} className="bg-brand-primary text-white px-3 py-2 rounded-md text-sm font-medium">Admin</button>
                    <button onClick={logout} className="bg-gray-500 text-white px-3 py-2 rounded-md text-sm font-medium">Logout</button>
                </>
            ) : (
                <button onClick={onLoginClick} className="bg-brand-secondary text-brand-dark px-3 py-2 rounded-md text-sm font-medium">Login</button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
