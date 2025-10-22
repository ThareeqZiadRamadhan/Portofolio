"use client"; // Komponen ini butuh akses ke browser, jadi 'use client' wajib

import { useState, useEffect } from "react";

export default function SpotlightCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Daftarkan event listener saat komponen pertama kali dirender
    window.addEventListener("mousemove", handleMouseMove);

    // Hapus event listener saat komponen di-unmount untuk mencegah memory leak
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Array dependensi kosong agar useEffect hanya berjalan sekali

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition duration-300"
      style={{
        background: `radial-gradient(450px at ${position.x}px ${position.y}px,  rgba(29, 78, 216, 0.4), transparent 50%)`,
      }}
    />
  );
}