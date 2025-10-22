"use client";

import React, { useRef, Suspense } from 'react'; // 1. Impor Suspense
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei'; // 2. Impor Environment
import * as THREE from 'three';

// Komponen Model yang memuat dan menganimasikan file .glb
function Model(props: any) {
  // Pastikan path ini benar dan file ada di folder /public
  const { scene } = useGLTF('/assets/logo/logo.glb');
  const modelRef = useRef<THREE.Group>(null);

  // 3. Gunakan 'delta' di useFrame untuk animasi yang lebih mulus
  useFrame((state, delta) => {
    if (modelRef.current) {
      // Kalikan dengan delta agar kecepatan rotasi konsisten di semua perangkat
      modelRef.current.rotation.y += delta * props.rotationSpeed;
    }
  });

  return <primitive object={scene} ref={modelRef} {...props} />;
}

// Komponen utama yang menyiapkan "panggung" 3D
export default function ThreeDLogo({ rotationSpeed = 0.5, ...props }) {
  return (
    <div style={{ width: '50px', height: '50px' }}> {/* Beri ukuran pada div pembungkus */}
      <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
        
        {/* 4. Bungkus Model dengan <Suspense> */}
        <Suspense fallback={null}>
          
          {/* 5. Tambahkan <Environment> untuk pencahayaan yang lebih baik */}
          <Environment preset="studio" />
          
          {/* Model 3D Anda */}
          <Model scale={0.3} rotationSpeed={rotationSpeed} {...props} />
          
        </Suspense>

      </Canvas>
    </div>
  );
}