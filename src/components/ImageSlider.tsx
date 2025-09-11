'use client';

import { useState } from 'react';

const ImageSlider = () => {
  // แก้ไข array รูปภาพของคุณที่นี่
  const images = [
    { id: 1, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 1" },
    { id: 2, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 2" },
    { id: 3, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 3" },
    { id: 4, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 4" },
    { id: 5, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 5" },
    { id: 6, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 6" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Featured Products</h2>
      <div className="relative w-full flex items-center justify-center h-72 sm:h-96">
        {/* Buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 -translate-y-1/2 left-0 md:left-8 bg-white/60 hover:bg-white rounded-full p-2 transition z-20"
          aria-label="Previous Image"
        >
          <svg className="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 -translate-y-1/2 right-0 md:right-8 bg-white/60 hover:bg-white rounded-full p-2 transition z-20"
          aria-label="Next Image"
        >
          <svg className="h-6 w-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 19.5L15.75 12l7.5-7.5" />
          </svg>
        </button>

        {/* Slider Viewport */}
        <div className="w-full h-full overflow-hidden">
          {/* Image Container */}
          <div
            className="relative w-full h-full"
          >
            {images.map((image, index) => {
              const offset = (index - currentIndex + images.length) % images.length;
              const isCurrent = offset === 0;
              const isPrev = offset === images.length - 1;
              const isNext = offset === 1;

              let transform = 'translateX(0) scale(0.5)';
              let opacity = 0;
              let zIndex = 0;

              if (isCurrent) {
                transform = 'translateX(0) scale(1)';
                opacity = 1;
                zIndex = 10;
              } else if (isNext) {
                transform = 'translateX(50%) scale(0.8)';
                opacity = 0.7;
                zIndex = 5;
              } else if (isPrev) {
                transform = 'translateX(-50%) scale(0.8)';
                opacity = 0.7;
                zIndex = 5;
              }

              return (
                <div
                  key={image.id}
                  className="absolute w-full h-full transition-all duration-500 ease-in-out"
                  style={{
                    transform: transform,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                >
                  <div className="w-[70%] h-full mx-auto">
                     {/* 
                        คุณสามารถเปลี่ยน src ของรูปภาพได้ที่ array ด้านบนสุดของไฟล์นี้
                     */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
