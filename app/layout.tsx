import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SpotlightCursor from "@/app/components/SpotligthCursor/SpotlightCursor";
import Navbar from "@/app/components/Navbar/Navbar";
import Header from "@/app/components/Header/Header";
import Noise from "./components/Noise/Noise";
import FooterHomepage from "./components/FooterHomepage/FooterKhususHomepage";
import { Providers } from "./providers";
import AOSInit from "./components/AOSInit";
import ClientLayoutWrapper from "./components/ClientLayoutWrapper/ClientLayoutWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Portofolio Ziad",
  description: "Fullstack Porotofolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body
        
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 dark:bg-slate-300 text-slate-900 dark:text-white relative min-h-screen`}
      >
       
         <Providers>
 <ClientLayoutWrapper>
           <AOSInit />
        <div className="absolute inset-0 z-[-1]">
        <Noise
          patternSize={250}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={2}
          patternAlpha={15}
        />
              </div>

          <SpotlightCursor />
          <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
            <Navbar />
          </div>

          {/* LAPISAN KONTEN UTAMA: Diberi flex-col untuk "sticky footer" */}
          <div className="relative z-10 flex flex-col min-h-screen ">
            <Header />
            {/* <main> diberi flex-1 agar meregang mengisi ruang kosong */}
            <main className="flex-grow">{children}</main>
            <FooterHomepage/>
          </div>
          </ClientLayoutWrapper>
       </Providers> 
      </body>
    </html>
  );
}