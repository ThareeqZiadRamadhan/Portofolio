'use client'
import React from 'react';
import Image from 'next/image'; // 1. Impor komponen Image dari Next.js

// 2. Data diubah untuk menggunakan path gambar (src) dari folder /public
const techStack = [
  { name: 'React', src: '/assets/techlogo/reactnime.png' },
  { name: 'Next.js', src: '/assets/techlogo/nextnime.png' },
  { name: 'TypeScript', src: '/assets/techlogo/tsnime.png' },
  { name: 'Node.js', src: '/assets/techlogo/nodenime.png' },
  { name: 'TailwindCSS', src: '/assets/techlogo/twnime.png' },
  { name: 'SQL', src: '/assets/techlogo/SQL.png' },
  { name: 'Figma', src: '/assets/techlogo/figmanime.png' },
  { name: 'Laravel', src: '/assets/techlogo/laranime.png' },
  { name: 'Vscode', src: '/assets/techlogo/vsnime.png' },
  { name: 'ASP.Net', src: '/assets/techlogo/ASPNET.png' },
  { name: 'Visualstudio', src: '/assets/techlogo/vsstudio.png' },
  { name: 'Pyhton', src: '/assets/techlogo/pynime.png' },
  { name: 'Tensorflow', src: '/assets/techlogo/tensorflow.png' },
  { name: 'GIT', src: '/assets/techlogo/GIT.png' },
  { name: 'JavaScript', src: '/assets/techlogo/js.png' },
];

const TechStackMarquee = () => {
  return (
    <div className="relative flex w-full overflow-hidden py-4">
      {/* Efek pudar di sisi kiri dan kanan */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"></div>
      
      <div className="flex animate-[scroll_30s_linear_infinite]">
        {[...techStack, ...techStack].map((tech, index) => (
          <div 
            key={index} 
            className="flex-shrink-0 w-32 flex items-center justify-center mx-4"
            title={tech.name}
          >
            
            <Image
              src={tech.src}
              alt={`${tech.name} logo`}
              width={100}  // Atur lebar gambar
              height={100} // Atur tinggi gambar
              className="object-contain" // Memastikan gambar tidak gepeng
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"></div>
    </div>
  );
};

export default TechStackMarquee;