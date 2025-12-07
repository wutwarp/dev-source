'use client';

import { useState } from 'react';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
}

const Categories = () => {
  const categories: Category[] = [
    { id: 1, name: 'SOFA', image: 'https://i0.wp.com/www.source-th.com/wp-content/uploads/2023/12/sofa.png', count: 45 },
    { id: 2, name: 'CHAIR', image: 'https://i0.wp.com/www.source-th.com/wp-content/uploads/2023/12/chair.png', count: 32 },
    { id: 3, name: 'BED', image: 'https://www.source-th.com/wp-content/uploads/2023/12/bed.png', count: 58 },
    // { id: 4, name: 'OFFICE', image: '', count: 28 },
    // { id: 5, name: 'OUTDOOR', image: '', count: 23 },
    // { id: 6, name: 'LIGHTING', image: '', count: 67 },
    // { id: 7, name: 'DECORATION', image: '', count: 89 },
    // { id: 8, name: 'KITCHEN', image: '', count: 41 },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-4">
            CATEGORIES
          </h2>
          <div className="w-24 h-0.5 bg-gray-800 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
            Explore our curated collection of furniture and interior goods
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer flex flex-col items-center"
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative aspect-square w-full bg-gray-100 overflow-hidden rounded-full mb-6">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10 rounded-full"></div>
                
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : null}
                </div>

                <div 
                  className={`absolute inset-0 bg-black/30 z-20 transition-opacity duration-300 rounded-full ${
                    hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>

                <div 
                  className={`absolute inset-0 border-2 border-white z-40 m-3 transition-opacity duration-300 rounded-full ${
                    hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                  }`}
                ></div>
              </div>

              <div className="text-center">
                <h3 className="text-gray-800 text-2xl font-light tracking-widest mb-2 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {category.name}
                </h3>
                <span className="text-gray-600 text-sm font-light">
                  {category.count} Products
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-800 text-gray-800 text-sm tracking-widest font-light hover:bg-gray-800 hover:text-white transition-all duration-300 group">
            VIEW ALL CATEGORIES
            <svg  
              className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;