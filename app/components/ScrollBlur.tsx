// components/ScrollProgressiveBlur.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

interface ScrollProgressiveBlurProps {
  children: React.ReactNode;
  className?: string;
  maxBlur?: number;
}

const ScrollProgressiveBlur = ({ 
  children, 
  className = '', 
  maxBlur = 10 
}: ScrollProgressiveBlurProps) => {
  const [blurAmount, setBlurAmount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate blur based on how much element is out of viewport
      // Blur when element starts going above the viewport
      const scrollProgress = Math.max(0, Math.min(1, -rect.top / rect.height));
      const blur = scrollProgress * maxBlur;
      
      setBlurAmount(blur);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [maxBlur]);

  return (
    <div 
      ref={ref}
      className={className}
      style={{ 
        filter: `blur(${blurAmount}px)`,
        transition: 'filter 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default ScrollProgressiveBlur;