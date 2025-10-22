'use client'
import { useEffect, useState, useRef } from 'react';
// PERBAIKAN: Impor motion dan hooks dari 'framer-motion'
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'; 
import React, { JSX } from 'react';

// Ganti ikon jika diperlukan
import { FiCircle, FiCode, FiFileText, FiLayers, FiLayout } from 'react-icons/fi';

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactNode;
  imageUrl: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

// Pastikan Anda mengisi semua path imageUrl
export const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: 'Machine Learning',
    description: 'Ultimage Guide Machine Learning smartpath.',
    id: 1,
    icon: <FiFileText className="h-[16px] w-[16px] text-white" />,
    imageUrl: '/assets/MachineLearning.png'
  },
  {
    title: 'Data Analyst',
    description: 'Data Visualization by dicoding',
    id: 2,
    icon: <FiCircle className="h-[16px] w-[16px] text-white" />,
    imageUrl: '/assets/DataAnalyst.png'
  },
  {
    title: 'Back end',
    description: 'Back end in Web Development by My skill',
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] text-white" />,
    imageUrl: '/assets/backend.png'
  },
  {
    title: 'More Certificates',
    description: 'cta',
    id: 4,
    icon: null,
    imageUrl: '/assets/common-ui.png'
  }
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 } as const;

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, carouselItems.length, pauseOnHover]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(prev => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex(prev => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0
        }
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4 ${
        round ? 'rounded-full border border-white' : 'rounded-[24px] border border-[#222]'
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` })
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
              return (
                <motion.div
                  key={item.id + '-' + index}
                  className={`relative shrink-0 flex flex-col justify-end h-[320px] w-full
                              rounded-[12px] overflow-hidden cursor-grab active:cursor-grabbing
                              bg-cover bg-center`}
                  style={{
                    width: itemWidth,
                    rotateY: rotateY,
                    // HANYA TERAPKAN imageUrl JIKA BUKAN KARTU CTA
                    backgroundImage: item.description !== 'cta' ? `url(${item.imageUrl})` : 'none'
                  }}
                  transition={effectiveTransition}
                >
                  {/* ===== KONDISIONAL RENDER UNTUK KARTU "MORE CERTIFICATES" ===== */}
                  {item.description === 'cta' ? (
                  // --- KARTU "MORE CERTIFICATES" ---
                  <div className="flex flex-col items-center justify-center h-full w-full p-5 text-center bg-[#060010]">
                    
                    {/* 👇 DIV INI DIUBAH MENJADI <a> 👇 */}
                    <a 
                      href="https://drive.google.com/drive/folders/1DCGpMQ4L_k_DVk0QdzU0Ujbgjj9Nc_lf?usp=sharing" // <-- GANTI DENGAN LINK TUJUAN ANDA
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="relative border border-solid border-[#4A6D7C] rounded-lg p-8 w-full h-full flex flex-col justify-center items-center transition-transform duration-300 hover:scale-105 hover:border-white"
                    >
                      <p className="absolute top-8 font-semibold text-white/80 text-sm w-fit whitespace-nowrap px-4 bg-[#060010]">
                        Click here to see more
                      </p>
                      <h3 className="font-black text-3xl mb-4 animate-bounce-slow "
                          style={{
                            background: 'linear-gradient(to right, #4A6D7C, #A7B1BF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}>
                        {item.title}
                      </h3>
                      <svg className="w-12 h-auto mt-4" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9.5C1 9.5 13.5 1 25.5 1C37.5 1 49.5 17 61.5 17C73.5 17 86.5 1 99 1" stroke="#A7B1BF" strokeWidth="2"/>
                      </svg>
                    </a>

                  </div>
                ) : (
                  // --- KARTU NORMAL DENGAN GAMBAR (TIDAK BERUBAH & TIDAK BISA DIKLIK) ---
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="relative z-10 p-5 flex flex-col justify-end h-full">
                      <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/10 backdrop-blur-sm mb-4">
                        {item.icon}
                      </span>
                      <div className="mb-1 font-black text-lg text-white">{item.title}</div>
                      <p className="text-sm text-white/80">{item.description}</p>
                    </div>
                  </>
                )}
              </motion.div>
            );
        })}
      </motion.div>
      <div className={`flex w-full justify-center ${round ? 'absolute z-20 bottom-12 left-1/2 -translate-x-1/2' : ''}`}>
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? 'bg-white'
                    : 'bg-[#333333]'
                  : round
                    ? 'bg-[#555]'
                    : 'bg-[rgba(51,51,51,0.4)]'
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}