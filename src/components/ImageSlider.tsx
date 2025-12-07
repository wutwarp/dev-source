'use client';

import { useState, useEffect } from 'react';

const ImageSlider = () => {
  // แก้ไข array รูปภาพของคุณที่นี่
  const images = [
    { id: 1, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 1" },
    { id: 2, src: "https://www.source-th.com/wp-content/uploads/2024/03/ROOM-PHOTO-min.jpg", alt: "Image 2" },
    { id: 3, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide4.jpg", alt: "Image 3" },
    { id: 4, src: "https://source-th.com/wp-content/uploads/2024/09/PURO-Lax.jpg", alt: "Image 4" },
    //{ id: 5, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 5" },
    //{ id: 6, src: "https://www.source-th.com/wp-content/uploads/2025/02/slide5.jpg", alt: "Image 6" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide functionality (optional)
  useEffect(() => {
    const slideInterval = setInterval(handleNext, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image Container */}
       <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image) => (
          // เพิ่ม bg-gray-100 หรือสีที่ชอบ เพื่อรองรับกรณีรูปไม่เต็มจอ
          <div key={image.id} className="flex-shrink-0 w-full h-[60vh] md:h-[80vh] bg-gray-50">
            <img
              src={image.src}
              alt={image.alt}
              // แก้ตรงนี้: เปลี่ยนจาก object-cover เป็น object-contain
              className="w-full h-full object-contain" 
            />
          </div>
        ))}
      </div>

      {/* Side Images Preview */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between pointer-events-none">
        {images.map((image, index) => {
          const prevIndex = (currentIndex - 1 + images.length) % images.length;
          const nextIndex = (currentIndex + 1) % images.length;

          let transform = 'scale(0)';
          let opacity = 0;
          let side = '';

          if (index === prevIndex) {
            transform = 'translateX(-80%) scale(0.8)';
            opacity = 0.5;
            side = 'left-0';
          } else if (index === nextIndex) {
            transform = 'translateX(80%) scale(0.8)';
            opacity = 0.5;
            side = 'right-0';
          }

          if (index !== currentIndex) {
            return (
              <div
                key={`preview-${image.id}`}
                className={`absolute w-full h-full top-0 ${side} transition-all duration-700 ease-in-out`}
                style={{
                  transform: transform,
                  opacity: opacity,
                }}
              >
                <div className="w-[80%] h-full mx-auto">
                   <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>


      {/* Navigation Buttons */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-4">
        <button
          onClick={handlePrev}
          className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition z-20"
          aria-label="Previous Image"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition z-20"
          aria-label="Next Image"
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5L15.75 12l-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;