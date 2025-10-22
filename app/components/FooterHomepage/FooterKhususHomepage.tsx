// app/components/FooterHomepage/FooterKhususHomepage.tsx

import { Mail, Github, Linkedin, Instagram } from 'lucide-react';

const socialLinks = [
  { href: 'mailto:ramadhanthareeq@gmail.com', icon: Mail, title: 'Email' },
  { href: 'https://github.com/ThareeqZiadRamadhan', icon: Github, title: 'GitHub' },
  { href: 'https://linkedin.com/in/ThareeqZiadRamadhan', icon: Linkedin, title: 'LinkedIn' },
  { href: 'https://instagram.com/nnaijjj', icon: Instagram, title: 'Instagram' },
];

export default function FooterHomepage() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pb-24">
      

      {/* LAPISAN KONTEN (DI DEPAN) */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="w-full h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_10px_25px_rgba(32,192,213,0.7)]"></div>

        <div className="mt-10 flex flex-col items-center gap-7">
          <p className="font-semibold text-lg text-gray-800 dark:text-white">
            Let's keep in touch!
          </p>

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

          <p className="text-sm text-gray-500 mt-4">
            Copyright © {new Date().getFullYear()} by Thareeq Ziad R
          </p>
        </div>
      </div>
    </footer>
  );
}