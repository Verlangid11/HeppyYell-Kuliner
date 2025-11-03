
import React from 'react';
import { SHOPEE_LINK, WHATSAPP_LINK } from '../constants';

const CtaSection: React.FC = () => {
  return (
    <section id="order" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary dark:bg-brand-card text-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Ready to order Padang food today?</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-gray-200 dark:text-gray-300">
            Don't wait! Get your favorite authentic Padang dishes delivered hot and fresh to your door.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={SHOPEE_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-orange-500 font-semibold py-3 px-8 rounded-full text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
                Order via Shopee
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-green-500 font-semibold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg">
                Chat via WhatsApp
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-300 dark:text-gray-400">
            Service hours: 08:00 – 21:00 WIB
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
