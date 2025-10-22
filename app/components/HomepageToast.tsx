"use client"; // Komponen ini WAJIB menjadi Client Component

import { useEffect } from 'react';
import { toast } from 'react-toastify';

const HomepageToast = () => {
  // useEffect akan berjalan sekali saat komponen dimuat
  useEffect(() => {
    toast.success("👋 Welcome to my portfolio!");
  }, []);

  // Komponen ini tidak merender apapun, tugasnya hanya memanggil toast
  return null; 
};

export default HomepageToast;