'use client';

import { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    { id: 1, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Modern Sofa" },
    { id: 2, src: "https://www.source-th.com/wp-content/uploads/2024/03/ROOM-PHOTO-min.jpg", alt: "Living Room" },
    { id: 3, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide4.jpg", alt: "Dining Set" },
    { id: 4, src: "https://source-th.com/wp-content/uploads/2024/09/PURO-Lax.jpg", alt: "Interior Design" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="w-full bg-white py-12 overflow-hidden">
      <div className="relative w-full max-w-[1920px] mx-auto h-[50vh] md:h-[70vh]">
        
        <div 
          className="absolute top-0 left-0 h-full flex items-center transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translateX(calc(-${currentIndex * 80}% + 10%))` 
          }}
        >
          {images.map((image, index) => {
            const isActive = index === currentIndex;
            return (
              <div 
                key={image.id}
                className={`
                  relative flex-shrink-0 w-[80%] h-full px-2 md:px-4
                  transition-all duration-700 ease-out
                  ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-90 opacity-40 grayscale-[30%]'}
                `}
              >
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl bg-gray-100 relative group cursor-pointer">
                   {/* รูปภาพ */}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onClick={() => setCurrentIndex(index)}
                  />
                  
                  {/* Overlay เงาดำจางๆ เพื่อให้อ่าน text ง่าย (เฉพาะรูป Active) */}
                  <div className={`absolute inset-0 bg-black/10 transition-opacity duration-500 ${isActive ? 'opacity-0 hover:opacity-100' : 'opacity-0'}`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ปุ่มลูกศรซ้ายขวา (Floating) */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 hidden md:block"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        {/* จุด Indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full shadow-sm
                ${index === currentIndex 
                  ? 'w-8 h-2 bg-gray-800' 
                  : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ImageSlider;