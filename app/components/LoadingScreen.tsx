'use client'
import React, { useState, useEffect } from 'react';

const SimpleCountingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const countingInterval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(countingInterval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              setIsVisible(false);
              setTimeout(() => onLoadingComplete(), 500);
            }, 500);
          }, 300);
          return 100;
        }
        
        // Random increment for more natural counting
        const increment = Math.random() > 0.3 ? 5 : 3;
        return Math.min(prev + increment, 100);
      });
    },30);

    return () => clearInterval(countingInterval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'rounded-t-full scale-0 origin-bottom' : 'rounded-none scale-100'}`} style={{ backgroundColor: '#0097B2' }}>
      <div className="text-center">
        <div className="text-2xl text-white/80 font-light tracking-wide mb-4">
          Loading...
        </div>
        <div className="text-9xl font-light text-white font-mono tracking-wider">
          {count}%
        </div>
      </div>
    </div>
  );
};

const SimpleApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      {isLoading && <SimpleCountingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <div className="min-h-screen bg-white p-8 animate-fade-in">
          <h1 className="text-4xl font-light mb-4 text-gray-900">
            Portfolio Content
          </h1>
          <p className="text-gray-600">Main content loads here...</p>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

// Jadi:
export default SimpleCountingScreen;