"use client";

import Link from 'next/link';
// Hapus Moon, useTheme, useEffect, dan useState dari impor
import { Home, User, Code, Github, Linkedin, Sun } from 'lucide-react'; 
import { gsap } from 'gsap';
import { useRef } from 'react';
import AboutPage from '@/app/about/page';

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null); // Membuat ref untuk menargetkan elemen nav

  // Fungsi untuk animasi saat mouse masuk
  const handleMouseEnter = () => {
    gsap.to(navRef.current, {
      scaleX: 1.1, // Melebar ke 110%
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)', // Efek elastis/fleksibel
    });
  };

  // Fungsi untuk animasi saat mouse keluar
  const handleMouseLeave = () => {
    gsap.to(navRef.current, {
      scaleX: 1, // Kembali ke ukuran normal
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
        
        {/* Link ke Halaman Utama */}
        <Link href="/" title="Home" className="group p-1.5 rounded-full ">
          <Home className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </Link>

        {/* Link ke Halaman About */}
        <Link href="/about" title="About Me" className="group p-1.5 rounded-full">
          <User className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </Link>

        {/* Link ke Halaman Projects */}
        <Link href="/Projects" title="My Project" className="group p-1.5 rounded-full ">
          <Code className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </Link>
        
        <div className="h-6 w-px bg-gray-300 mx-2"></div>

        {/* Link Eksternal ke GitHub */}
        <a href="https://github.com/ThareeqZiadRamadhan" title="GitHub" target="_blank" rel="noopener noreferrer" className="group p-1.5 rounded-full">
          <Github className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </a>

        {/* Link Eksternal ke LinkedIn */}
        <a href="https://www.linkedin.com/in/thareeq-ziad-ramadhan-1b862628b/" title="LinkedIn" target="_blank" rel="noopener noreferrer" className="group p-1.5 rounded-full">
          <Linkedin className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </a>

        <div className="h-6 w-px bg-gray-300 mx-2"></div>
        
        {/* Tombol tema kembali menjadi statis (hanya tampilan) */}
        <button title="Theme" className="group p-1.5 rounded-full ">
          <Sun className="text-gray-600 group-hover:text-white group-hover:-translate-x-1 transition-all duration-300" size={22} />
        </button>

      </div>
    </nav>
  );
}