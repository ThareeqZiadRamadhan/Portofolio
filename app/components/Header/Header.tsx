'use client'; 

import Image from 'next/image'; // Untuk logo
import Link from 'next/link';   // Jika logo bisa diklik
import React, { useState, useEffect } from 'react';
import Magnet from '../Magnet/Magnet';
import ThreeDLogo from '../ThreeDLogo/ThreeDLogo';

export default function Header() {
  const [time, setTime] = useState('');

  useEffect(() => {
    // Fungsi untuk mendapatkan waktu saat ini
    const updateTime = () => {
      const now = new Date();
      // Format waktu menjadi HH:MM:SS
      const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Gunakan format 24 jam
      });
      setTime(formattedTime);
    };

    // Panggil updateTime sekali saat komponen pertama kali di-mount
    updateTime();

    // Set interval untuk memperbarui waktu setiap detik
    const timerId = setInterval(updateTime, 1000);

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(timerId);
  }, []); // [] agar efek hanya berjalan sekali saat mount

  return (
   <header className="fixed top-0 left-0 right-0 z-40 p-4 flex justify-between items-center">
    <Magnet>
     <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
              PORTOFOLIO  
               </span>
               </Magnet>

      <div className="flex items-center">
       <Magnet>
          <ThreeDLogo 
           scale={0.1}
           rotationSpeed={0.8}
          />
           
               </Magnet>
        </div>

      
      <div className="text-2xl py-4 font-semibold text-gray-800 dark:text-gray-200">
        <Magnet>
        {time}
        </Magnet>
      </div>
      
    </header>
  );
}