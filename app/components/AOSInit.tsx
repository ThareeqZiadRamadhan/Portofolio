'use client';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 300,
      easing: 'ease-out-cubic',
    });
  }, []);
  return null;
}