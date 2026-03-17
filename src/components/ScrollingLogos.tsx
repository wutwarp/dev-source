'use client';

const ScrollingLogos = () => {
  const logos = [
    { id: 1, src: "https://source-th.com/wp-content/uploads/2023/12/logo-tocco@2x.png", alt: "Tocco" },
    { id: 2, src: "https://source-th.com/wp-content/uploads/2023/12/logo-bis@2x.png", alt: "Bis" },
    { id: 3, src: "https://source-th.com/wp-content/uploads/2023/12/logo-sala@2x.png", alt: "Tocco" },
    { id: 4, src: "https://source-th.com/wp-content/uploads/2023/12/logo-bis@2x.png", alt: "Bis" },
    { id: 5, src: "https://source-th.com/wp-content/uploads/2023/12/logo-tocco@2x.png", alt: "Tocco" },
    { id: 6, src: "https://source-th.com/wp-content/uploads/2023/12/logo-bis@2x.png", alt: "Bis" },
  ];

  return (
    <section className="w-full bg-gray-50 py-12 overflow-hidden">
      <div className="relative w-full">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>
        
        {/* Scrolling Container */}
        <div className="flex animate-scroll">
          {/* First Set */}
          <div className="flex items-center gap-16 px-8 shrink-0">
            {logos.map((logo) => (
              <div 
                key={`first-${logo.id}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate Set for Seamless Loop */}
          <div className="flex items-center gap-16 px-8 shrink-0">
            {logos.map((logo) => (
              <div 
                key={`second-${logo.id}`}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ScrollingLogos;