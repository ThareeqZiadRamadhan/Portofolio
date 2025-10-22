import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

type GlobeInstance = {
  destroy: () => void;
};

const GlobeLocation: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); 
  
  // --- TAMBAHAN: Refs untuk menyimpan status interaksi kursor ---
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    let phi = 0;
    
    // --- TAMBAHAN: Variabel untuk menyimpan instance globe agar bisa diakses di cleanup ---
    let globe: GlobeInstance;

    const globeOptions = {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3] as [number, number, number],
      markerColor: [1, 0.1, 0.1] as [number, number, number],
      glowColor: [1, 1, 1] as [number, number, number],
      markers: [
        { 
          location: [-6.2088, 106.8456] as [number, number], 
          size: 0.1 
        }
      ],
      // --- MODIFIKASI KECIL PADA onRender ---
      onRender: (state: Record<string, any>) => {
        // Jika kursor tidak sedang berinteraksi, jalankan auto-rotasi
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        // Terapkan rotasi gabungan (otomatis + gerakan kursor)
        state.phi = phi + pointerInteractionMovement.current;
      }
    };

    globe = createGlobe(canvasRef.current, globeOptions);

    // --- TAMBAHAN: Logika untuk event listener kursor ---
    const canvas = canvasRef.current;
    const onPointerDown = (e: PointerEvent) => {
        pointerInteracting.current = e.pointerId;
        canvas.style.cursor = 'grabbing';
    }
    const onPointerUp = () => {
        pointerInteracting.current = null;
        canvas.style.cursor = 'grab';
    }
    const onPointerOut = () => {
        pointerInteracting.current = null;
        canvas.style.cursor = 'grab';
    }
    const onMouseMove = (e: MouseEvent) => {
        if (pointerInteracting.current !== null) {
            const width = canvas.offsetWidth;
            const delta = e.movementX / width;
            pointerInteractionMovement.current += delta * 2.5;
        }
    }
    
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointerout', onPointerOut);
    canvas.addEventListener('mousemove', onMouseMove);

    // --- TAMBAHAN: Membersihkan event listener saat komponen hilang ---
    return () => {
      globe.destroy();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointerout', onPointerOut);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
   <div ref={containerRef} className="relative w-full p-4 rounded-lg bg-gray-900 shadow-lg" {...props}>
     <div className="absolute top-4 left-4 z-10">
       <h3 className="text-lg font-semibold text-white">Location</h3>
       <p className="text-gray-400">Jakarta, Indonesia</p>
     </div>
     <div className="w-full aspect-square flex items-center justify-center">
       <canvas
         ref={canvasRef}
         // --- TAMBAHAN KECIL: Style untuk kursor ---
         style={{ width: 600, height: 743, maxWidth: '100%', aspectRatio: 1, cursor: 'grab' }}
       />
     </div>
   </div>
  );
};

export default GlobeLocation;