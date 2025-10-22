import React, { useState } from 'react';

const ImageTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block ">
      {/* Company Name - Hoverable */}
     <a 
        href="https://www.libertahotels.com/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-xl font-bold text-gray-900 cursor-pointer hover:text-cyan-900 transition-colors "
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        Liberta Hotel Internasional
      </a>
      {/* Image Tooltip */}
      {isVisible && (
        <div className="absolute z-50 top-full left-0 mt-2 animate-fade-in">
          {/* Arrow */}
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 z-10"></div>
          
          {/* Image Container */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <img 
              src="/assets/Liberta.png" 
              alt="Liberta Hotel Information" 
              className="w-80 h-auto max-h-96 object-contain"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Alternative: Using CSS title attribute (simplest)
const SimpleImageTooltip = () => {
  return (
    <h3 className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors underline decoration-dotted underline-offset-2">
      <span 
        title="Liberta Hotel Internasional - International hospitality company"
        className="relative"
        style={{
          backgroundImage: 'url(/assets/liberta-hotel-info.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat'
        }}
      >
        Liberta Hotel Internasional
      </span>
    </h3>
  );
};

// Advanced: Image tooltip with multiple images
const MultiImageTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    "/assets/liberta-hotel-info.png",
    "/assets/liberta-hotel-gallery.png", 
    "/assets/liberta-hotel-services.png"
  ];

  return (
    <div className="relative inline-block">
      <h3 
        className="text-xl font-bold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors underline decoration-dotted underline-offset-2"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        Liberta Hotel Internasional
      </h3>

      {isVisible && (
        <div className="absolute z-50 top-full left-0 mt-2 animate-fade-in">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 z-10"></div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden">
            <img 
              src={images[currentImage]} 
              alt={`Liberta Hotel Information ${currentImage + 1}`} 
              className="w-80 h-auto max-h-96 object-contain"
            />
            
            {images.length > 1 && (
              <div className="flex justify-center gap-2 p-2 bg-gray-50">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImage ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageTooltip;