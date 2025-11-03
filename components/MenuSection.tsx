
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { ProductCard } from './ProductCard';

const MenuSection: React.FC = () => {
  const { products } = useAppContext();

  return (
    <section id="menu" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">Our Signature Menu</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Freshly prepared with love and authentic spices.</p>
        </div>
        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">No menu available yet.</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Please check back later or add items from the admin panel.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
