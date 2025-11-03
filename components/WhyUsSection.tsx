
import React from 'react';

const features = [
  {
    icon: '🍲',
    title: 'Authentic Recipes',
    description: 'We use generations-old family recipes to bring you the true taste of Padang cuisine.',
  },
  {
    icon: '🌿',
    title: 'Fresh Ingredients',
    description: 'Only the freshest spices, meats, and vegetables are selected daily for our dishes.',
  },
  {
    icon: '🔥',
    title: 'Cooked Daily',
    description: 'Every dish is cooked fresh every single day to ensure maximum flavor and quality.',
  },
];

const WhyUsSection: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-brand-light dark:bg-brand-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white">Why Choose Heppy Yell?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">The secret behind our unforgettable flavors.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold font-serif text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
