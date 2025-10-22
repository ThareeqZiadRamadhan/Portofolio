"use client";

import { ThemeProvider } from 'next-themes';
import React from 'react';

// 1. Impor ToastContainer dan CSS-nya di sini
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
      
      {/* 2. Tambahkan ToastContainer di sini */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // 'light', 'dark', atau 'colored'
      />
    </ThemeProvider>
  );
}