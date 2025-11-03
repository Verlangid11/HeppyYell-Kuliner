
import React from 'react';
import { Product } from '../types';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="bg-brand-light dark:bg-brand-card rounded-2xl shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-all duration-300 flex flex-col">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">{product.name}</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-300 flex-grow">{product.description}</p>
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xl font-semibold text-brand-primary dark:text-brand-secondary">{product.price}</span>
          <a href={product.buyLink} target="_blank" rel="noopener noreferrer" className="bg-brand-primary text-white font-semibold py-2 px-5 rounded-full hover:bg-red-800 dark:bg-brand-secondary dark:text-brand-dark dark:hover:bg-yellow-500 transition-colors duration-300 shadow-sm">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};
