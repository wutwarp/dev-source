'use client';

import { useState } from 'react';
import Link from 'next/link';

interface StockCategory {
  id: number;
  name: string;
  count: number;
  image: string;
  href: string;
}

const StockListPage = () => {
  const categories: StockCategory[] = [
    { 
      id: 1, 
      name: 'SOFA', 
      count: 4, 
      image: 'https://i0.wp.com/www.source-th.com/wp-content/uploads/2023/12/sofa.png',
      href: '/stock/sofa'
    },
    { 
      id: 2, 
      name: 'BED', 
      count: 0, 
      image: 'https://www.source-th.com/wp-content/uploads/2023/12/bed.png',
      href: '#'
    },
    { 
      id: 3, 
      name: 'CHAIR', 
      count: 0, 
      image: 'https://i0.wp.com/www.source-th.com/wp-content/uploads/2023/12/chair.png',
      href: '#'
    },
  ];

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-light tracking-wider text-gray-800 mb-4">
              STOCK MANAGEMENT
            </h1>
            <div className="w-24 h-0.5 bg-gray-800 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-light">
              จัดการสต็อกสินค้าแต่ละหมวดหมู่
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const CategoryWrapper = category.href === '#' ? 'div' : Link;
            const isDisabled = category.href === '#';
            
            return (
              <CategoryWrapper
                key={category.id}
                href={isDisabled ? '#' : category.href}
                className={`group ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onMouseEnter={() => !isDisabled && setHoveredId(category.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
                  isDisabled ? 'opacity-50' : 'hover:shadow-xl hover:-translate-y-1'
                }`}>
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        !isDisabled && 'group-hover:scale-110'
                      }`}
                    />
                    
                    {isDisabled && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="bg-white/90 px-4 py-2 rounded-lg text-sm font-light tracking-wider text-gray-800">
                          Coming Soon
                        </span>
                      </div>
                    )}

                    {!isDisabled && (
                      <div 
                        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
                          hoveredId === category.id ? 'opacity-100' : 'opacity-0'
                        }`}
                      ></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-2xl font-light tracking-widest text-gray-800">
                        {category.name}
                      </h3>
                      {!isDisabled && (
                        <svg 
                          className={`w-6 h-6 text-gray-600 transition-transform ${
                            hoveredId === category.id ? 'translate-x-1' : ''
                          }`}
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
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-light">
                        {category.count} รายการในสต็อก
                      </span>
                      <div className={`px-3 py-1 rounded-full text-xs font-light ${
                        category.count > 0 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count > 0 ? 'มีสินค้า' : 'ว่าง'}
                      </div>
                    </div>
                  </div>
                </div>
              </CategoryWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StockListPage;