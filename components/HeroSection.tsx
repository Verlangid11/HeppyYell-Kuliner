
import React from 'react';
import { SHOPEE_LINK, WHATSAPP_LINK } from '../constants';

const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-brand-light dark:bg-brand-dark">
        <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-700/[0.1] [mask-image:linear-gradient(to_bottom,white_5%,transparent_50%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white leading-tight">
                        Heppy Yell – <span className="text-brand-primary dark:text-brand-secondary">Authentic Padang Taste,</span> Ready to Deliver!
                    </h1>
                    <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto lg:mx-0">
                        Savor the rich, bold flavors of Minangkabau. Our Padang dishes are cooked fresh daily with traditional recipes and the finest spices, delivered right to your doorstep.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <a href={SHOPEE_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-orange-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
                            Order on Shopee
                        </a>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-green-500 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg">
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
                <div className="hidden lg:block relative">
                    <img 
                        src="https://picsum.photos/seed/padangfood/600/500" 
                        alt="Padang Food Platter"
                        className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                     <div className="absolute -top-8 -right-8 w-40 h-40 bg-brand-secondary/20 rounded-full blur-2xl"></div>
                     <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-primary/20 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default HeroSection;
