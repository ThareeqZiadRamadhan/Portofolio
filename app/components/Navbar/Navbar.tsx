"use client";

import Link from 'next/link';
import { Home, User, Code, Github, Linkedin, Sun, Moon } from 'lucide-react'; 
import { gsap } from 'gsap';
import { useRef, useState, useEffect } from 'react';
import { useTheme } from 'next-themes'; // Wajib ada untuk mengganti tema

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null); 
  const { theme, setTheme } = useTheme(); // Mengambil fungsi pengubah tema
  const [mounted, setMounted] = useState(false);

  // Mencegah error hydration dari Next.js
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseEnter = () => {
    gsap.to(navRef.current, {
      scaleX: 1.1,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(navRef.current, {
      scaleX: 1,
      duration: 1,
      ease: 'elastic.out(1, 0.6)',
    });
  };

  return (
    <nav
      ref={navRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
      className="bg-white backdrop-blur-md shadow-[0_0_10px_1px_rgba(107,114,128,0.5)] rounded-full px-1 py-1 dark:bg-black/50 border border-gray-700 ease-in-out hover:scale-x-105">
      <div className="flex items-center justify-center gap-1">
        
        <Link href="/" title="Home" className="group p-1.5 rounded-full ">
          <Home className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </Link>

        <Link href="/about" title="About Me" className="group p-1.5 rounded-full">
          <User className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </Link>

        <Link href="/Projects" title="My Project" className="group p-1.5 rounded-full ">
          <Code className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </Link>
        
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        <a href="https://github.com/ThareeqZiadRamadhan" title="GitHub" target="_blank" rel="noopener noreferrer" className="group p-1.5 rounded-full">
          <Github className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </a>

        <a href="https://www.linkedin.com/in/thareeq-ziad-ramadhan-1b862628b/" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="group p-1.5 rounded-full">
          <Linkedin className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </a>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        
        {/* Tombol Tema Dinamis (Sudah Aktif) */}
        <button 
          title="Toggle Theme" 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} // Perintah ganti warna
          className="group p-1.5 rounded-full"
        >
          {!mounted ? (
             <div className="w-[22px] h-[22px]"></div>
          ) : theme === 'dark' ? (
            <Sun className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
          ) : (
            <Moon className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
          )}
        </button>

      </div>
    </nav>
  );
}