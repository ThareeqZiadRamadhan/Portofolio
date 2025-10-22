

import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

// Daftar item sosial media untuk membuat kode lebih rapi
const socialLinks = [
  { 
    href: 'mailto:ramadhanthareeq@gmail.com', 
    icon: Mail, 
    title: 'Email' 
  },
  { 
    href: 'https://github.com/ThareeqZiadRamadhan', 
    icon: Github, 
    title: 'GitHub' 
  },
  { 
    href: 'https://linkedin.com/in/ThareeqZiadRamadhan', 
    icon: Linkedin, 
    title: 'LinkedIn' 
  },
  { 
    href: 'https://instagram.com/nnaijjj', 
    icon: Instagram, 
    title: 'Instagram' 
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black text-white pt-10 pb-24">
    <div className="container mx-auto px-4 md:px-8">
      <div className="w-full h-px bg-gradient-to-r from-cyan-400 to-blue-500"></div>

      <div className="container mx-auto px-2 mt-10 flex flex-col items-center gap-7">
        
        {/* 2. Judul "Let's keep in touch!" */}
        <p className="font-semibold text-lg">
          Let's keep in touch!
        </p>

        {/* 3. Ikon Sosial Media */}
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              title={link.title}
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300"
            >
              <link.icon size={24} />
            </a>
          ))}
        </div>

        {/* 4. Teks Copyright */}
        <p className="text-sm text-gray-500 mt-4">
          Copyright © {currentYear} by Thareeq Ziad R
        </p>
        </div>
      </div>
    </footer>
  );
}