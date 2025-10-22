'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Mail, Github, Linkedin, Instagram, Music2, Download, MapPin, Clock, Heart, Code, Coffee } from 'lucide-react';
import ImageTooltip from '../components/ImageTooltip';
import TechStackMarquee from '../components/Techstackmarque';
import GlobeLocation from '../components/GlobeLocation';
import Carousel, { DEFAULT_ITEMS } from '../components/Carousel/Carousel';


interface Sparkle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  baseX: number;
  baseY: number;
  velocityX: number;
  velocityY: number;
}

// Scroll-triggered typing animation component
const TypeWriter = ({ 
  text, 
  speed = 80, 
  onComplete,
  triggerOnScroll = true 
}: { 
  text: string; 
  speed?: number; 
  onComplete?: () => void; 
  triggerOnScroll?: boolean;
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [shouldStart, setShouldStart] = useState(!triggerOnScroll);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Intersection Observer untuk deteksi scroll
  useEffect(() => {
    if (!triggerOnScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldStart) {
            setShouldStart(true);
          }
        });
      },
      {
        threshold: 0.3, // Trigger ketika 30% elemen terlihat
        rootMargin: '-50px 0px', // Margin untuk trigger lebih awal/lambat
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [triggerOnScroll, shouldStart]);

  // Animasi typing
  useEffect(() => {
    if (!shouldStart) return;

    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayText, text, speed, onComplete, isComplete, shouldStart]);

  return (
    <span ref={elementRef} className="font-semibold italic text-black "style={{textShadow: '8px 8px 12px rgba(180, 130, 40, 0.5), 0 0 12px rgba(180, 130, 40, 0.3)'}}> {/* {{filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 24px rgba(255, 215, 0, 0.4))'}} */}
      "{displayText}"
      {shouldStart && !isComplete && <span className="animate-pulse">|</span>}
      {!shouldStart && <span className="opacity-0">{text}</span>} {/* Placeholder untuk maintain layout */}
    </span>
  );
};

const SocialCard = ({ children, className, sparkleCount = 8 }: { children: React.ReactNode, className: string, sparkleCount?: number }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const generateSparkles = (count: number): Sparkle[] => {
    return Array.from({ length: count }, (_, i) => {
      const x = Math.random() * 90 + 5;
      const y = Math.random() * 90 + 5;
      return {
        id: i,
        x,
        y,
        targetX: x,
        targetY: y,
        size: Math.random() * 2 + 1,
        baseX: x,
        baseY: y,
        velocityX: (Math.random() - 0.5) * 0.3,
        velocityY: (Math.random() - 0.5) * 0.3,
      };
    });
  };

  useEffect(() => {
    setSparkles(generateSparkles(sparkleCount));

    const animate = () => {
      setSparkles(prev => prev.map(sparkle => {
        let newX = sparkle.x;
        let newY = sparkle.y;
        let newVelX = sparkle.velocityX;
        let newVelY = sparkle.velocityY;
        let newTargetX = sparkle.targetX;
        let newTargetY = sparkle.targetY;

        if (!isHovered) {
          // Mode otomatis: gerakan floating
          newTargetX = sparkle.baseX + newVelX;
          newTargetY = sparkle.baseY + newVelY;

          // Bounce off edges
          if (newTargetX <= 5 || newTargetX >= 95) {
            newVelX = -newVelX;
            newTargetX = Math.max(5, Math.min(95, newTargetX));
          }
          if (newTargetY <= 5 || newTargetY >= 95) {
            newVelY = -newVelY;
            newTargetY = Math.max(5, Math.min(95, newTargetY));
          }
        }

        // Smooth movement ke target
        const easing = 0.1;
        newX += (newTargetX - sparkle.x) * easing;
        newY += (newTargetY - sparkle.y) * easing;

        return {
          ...sparkle,
          x: newX,
          y: newY,
          targetX: newTargetX,
          targetY: newTargetY,
          baseX: isHovered ? sparkle.baseX : newTargetX,
          baseY: isHovered ? sparkle.baseY : newTargetY,
          velocityX: newVelX,
          velocityY: newVelY,
        };
      }));
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [sparkleCount, isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
    const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

    setSparkles(prev => prev.map(sparkle => {
      const deltaX = mouseX - sparkle.baseX;
      const deltaY = mouseY - sparkle.baseY;
      
      const moveX = deltaX * 0.2;
      const moveY = deltaY * 0.2;
      
      return {
        ...sparkle,
        targetX: Math.max(5, Math.min(95, sparkle.baseX + moveX)),
        targetY: Math.max(5, Math.min(95, sparkle.baseY + moveY))
      };
    }));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSparkles(prev => prev.map(sparkle => ({
      ...sparkle,
      targetX: sparkle.baseX,
      targetY: sparkle.baseY
    })));
  };
  

  return (
    
    <div 
      ref={cardRef}
      className={`relative ${className} overflow-hidden`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      
      {children}
    </div>
  );
};

const AboutPage = () => {
  //for typetext//
  const [isTypingDone, setIsTypingDone] = useState(false);
  return (
    <div className="min-h-screen  p-6 animate-zoom-in">
        <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
           @keyframes scroll {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
     @keyframes bounce-slow {
    0%, 100% {
      transform: translateY(-15%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  .animate-bounce-slow {
    animation: bounce-slow 0.7s infinite;
  }
      @keyframes zoom-in {
    from {
      transform: scale(0.95);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  .animate-zoom-in {
    animation: zoom-in 0.7s ease-out;
  }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mt-24 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">About Me</h1>
          <p className="text-gray-600">Get to know more about who I am</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Profile */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <div className="flex flex-col items-start">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-6 flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/Foto.jpg" 
                  alt="Thareeq Ziad" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Hi, I'm Thareeq Ziad R. 
                <span className="animate-wave inline-block origin-bottom-left text-4xl ml-2">👋</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                I build cool websites and applications like this. Passionate about creating modern, 
                performant web experiences with clean code architecture.
              </p>
            </div>
          </div>

          {/* Right Column - Social Cards with Interactive Sparkles */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* Email Card */}
            <SocialCard 
              className="bg-red-500 rounded-2xl p-6 flex items-center justify-center text-white hover:bg-red-600 cursor-pointer group   transition-all duration-500 ease-in-out-rotate-3 hover:rotate-3 hover:scale-110"
              sparkleCount={6}
            >
              <div className="relative z-10 text-center">
                <Mail size={32} className="mx-auto mb-2 transition-transform" />
                <p className="text-sm font-medium">Email</p>
              </div>
            </SocialCard>

            {/* Instagram Card */}
            <SocialCard 
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-700 cursor-pointer group  transition-all duration-500 ease-in-out-rotate-3 hover:-rotate-6 hover:scale-110"
              sparkleCount={8}
            >
              <div className="relative z-10 text-center">
                <Instagram size={32} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Instagram</p>
              </div>
            </SocialCard>

            {/* GitHub Card */}
            <SocialCard 
              className="bg-gray-800 rounded-2xl p-6 flex items-center justify-center text-white hover:bg-gray-900 cursor-pointer group transition-all duration-500 ease-in-out-rotate-3 hover:-rotate-6 hover:scale-110"
              sparkleCount={5}
            >
              <div className="relative z-10 text-center">
                <Github size={32} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">GitHub</p>
              </div>
            </SocialCard>

            {/* TikTok Card */}
            <SocialCard 
              className="bg-gradient-to-br from-slate-50 to-zinc-950 rounded-2xl p-6 flex items-center justify-center text-white hover:bg-blue-700 cursor-pointer group transition-all duration-500 ease-in-out-rotate-3 hover:rotate-6 hover:scale-110"
              sparkleCount={7}
            >
              <div className="relative z-10 text-center">
                <Music2 size={32} className="mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-medium">Tiktok</p>
              </div>
            </SocialCard>
            
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-gray-200"
        data-aos="fade-up"
        >
               <p className="text-gray-600 text-left text-xl mt-6 mb-6 leading-relaxed">
            <TypeWriter
              text="For me, lines of code are a medium for storytelling."
              speed={50}
              triggerOnScroll={true}
              onComplete={() => setIsTypingDone(true)}
            />
          </p>
          {isTypingDone && (
            <div className="animate-fade-in">
              <p className="text-gray-600 text-left text-xl mt-6 mb-6 leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                I am a Computer Science student fascinated by the intersection of logic and art—where functional applications meet captivating design. My journey, which began in 2023, is a quest to answer one question: <span className="font-semibold text-black">"How can technology better touch people's lives?"</span> 
              </p>
              <p className="text-gray-700 text-left text-xl mt-6 mb-6 leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
                That answer led me to dive into the world of Fullstack Development, building bridges between elegant frontends and robust backends, as well as UI/UX that leaves a lasting impression. However, my curiosity didn't stop there. I began exploring the worlds of Data Science, Data Analysis, Machine Learning, and Mobile Development. Because I believe that data is the lifeblood of every great digital product, it gives us the insights to build with empathy.
              </p>
              <p className="text-gray-600 text-left text-xl mt-6 mb-6 leading-relaxed opacity-0 animate-fade-in-up" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
                In this digital space, I share artifacts from my learning journey: projects that challenge me and writings that crystallize my understanding. I believe in the power of collaboration and constructive feedback. Let's connect—I'm excited to hear your story, and maybe, we can build something extraordinary together.
              </p>
            </div>
          )}
        </div>

       <div className="bg-white rounded-2xl p-8 mt-8 shadow-sm border border-gray-200"
       data-aos="fade-left"
       >
          <div className="flex flex-col items-start">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              EXPERIENCE
            </h2>
            
            {/* Experience Item */}
            <div className="w-full pb-8">
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                   <img 
                    src="/assets/Liberta-icon.png" 
                    alt="Liberta Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                        <ImageTooltip />          
                    </div>
                    
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      Aug 2025 - Present
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium mb-3">IT DEVELOPER INTERN</p>
                  <p className="text-gray-600 leading-relaxed pl-7">
                    <li>Building a responsive website using Visual Studio 2022 with the ASP.NET framework and using SourceTree and Azure DevOps to manage Software Development Life Cycle</li>
                    <li>Creating UI/UX designs</li>
                    <li>Create API and integrate them into programs</li>
                    <li>Performing testing and bug fixing using xUnit / NUnit Test Explorer</li>
                  </p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
        {/* Bottom Section - Additional Info */}
       <div className="mt-8 mb-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start">
  
  {/* ===== INI PEMBUNGKUS UTAMA UNTUK KOLOM KIRI ===== */}
  <div className="md:col-span-2 flex flex-col gap-6 w-full">

    {/* --- Kartu Skills (Bagian Atas) --- */}
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
    data-aos="fade-up"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-2 text-center">
        Tech I Enjoy Working With
      </h2>
      <TechStackMarquee />
    </div>

    {/* --- Kartu Proyek (Bagian Bawah) --- */}
    <div className="w-full h-full bg-white rounded-2xl p-[55px]  shadow-sm border border-gray-200 flex flex-col items-center"
    data-aos="fade-up"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
        License & Certificates
      </h3>
      <Carousel 
        items={DEFAULT_ITEMS}
        autoplay={true} 
        loop={true}
        baseWidth={500} // Sesuaikan lebar carousel jika perlu
      />
    </div>

  </div> {/* <-- Penutup div pembungkus kolom kiri */}


  {/* ===== KOLOM KANAN (Tidak berubah) ===== */}
  <GlobeLocation data-aos="fade-up" data-aos-delay="200" />
  
</div>
      </div>
    </div>
  );
};

export default AboutPage;