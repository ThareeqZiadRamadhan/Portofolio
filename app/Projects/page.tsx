// app/projects/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnet from '../components/Magnet/Magnet';
import ProjectModal from './ProjectModal';

// --- Types & Data ---
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'web' | 'ui/ux' | 'graphic';
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Brain Tumor Classification',
    description: 'Anime-themed graphic design projects, like poster, banner, wallpaper, and more.',
    image: '/assets/bgbox/Brain.png',
    tags: ['Python', 'Fuzzy', 'streamlit'], 
    category: 'graphic',
  },
  {
    id: 2,
    title: 'JAKCDULS CLOTHING BRAND UI/UX',
    description: 'Prototype For Realtime Website Collaboration with Jackduls Partner.',
    image: '/assets/bgbox/Jackduls.png',
    tags: ['Spark AR', 'Figma'],
    category: 'graphic',
  },
  {
    id: 3,
    title: 'JACKDULS WEBSITE',
    description: 'A promotional landing page for JACKDULS fashion brands.',
    image: '/assets/bgbox/Jackdulsweb.jpg',
    tags: ['Js', 'PHP', 'CSS', 'HTML'],
    category: 'ui/ux',
  },
  {
    id: 4,
    title: 'INFORMATICS ADVOKASI APP',
    description: 'UI/UX A Digital Advocacy Platform for Informatics Students.',
    image: '/assets/bgbox/destar.png',
    tags: ['Next.js', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 5,
    title: 'Website Trihita',
    description: 'A modern and responsive website for a corporate client.',
    image: '/assets/bgbox/Trihita.png',
    tags: ['Next.js', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 6 ,
    title: 'Netflix Movie Recomendation',
    description: 'A modern and responsive website for a corporate client.',
    image: '/assets/bgbox/Netflix.png',
    tags: ['Next.js', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 7 ,
    title: 'Waste Sorting System',
    description: 'A modern and responsive website for a corporate client.',
    image: '/projects/web-company.jpg',
    tags: ['Next.js', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 8 ,
    title: 'Virtul Pet Management',
    description: 'A modern and responsive website for a corporate client.',
    image: '/projects/web-company.jpg',
    tags: ['Next.js', 'Tailwind CSS'],
    category: 'web',
  },
  {
    id: 9 ,
    title: 'Computer Network Topology',
    description: 'A modern and responsive website for a corporate client.',
    image: '/projects/web-company.jpg',
    tags: ['Next.js', 'Tailwind CSS'],
    category: 'web',
  },
];

// --- Project Card Component ---
interface ProjectCardProps {
  project: Project;
  onReadMoreClick: () => void;
}

function ProjectCard({ project, onReadMoreClick }: ProjectCardProps) {
  const [bgPositionClass, setBgPositionClass] = useState('-top-[150%]');
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Button hover animation handlers
  const handleMouseEnter = () => {
    setIsTransitioning(false);
    setBgPositionClass('-top-[150%]');

    setTimeout(() => {
      setIsTransitioning(true);
      setBgPositionClass('top-0');
    }, 20); 
  };

  const handleMouseLeave = () => {
    setBgPositionClass('top-full'); 
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col relative h-[500px] w-[400px] border border-transparent dark:border-slate-700 transition-colors duration-300"
    >
      {/* Background Image Layer */}
      <motion.img 
        src={project.image} 
        alt={project.title} 
        className="w-full h-64 object-cover z-0 flex-shrink-0"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
      />
      
      {/* Foreground Content Layer */}
      <div className="relative z-10 p-6 flex flex-col flex-grow bg-white dark:bg-slate-800 transition-colors duration-300"> 
        <h3 className="text-xl font-bold mb-0.9 text-gray-900 dark:text-white transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="flex-1 overflow-y-auto mb-4 min-h-0 mt-2">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
            {project.description}
          </p>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6 flex-shrink-0">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-300">
              {tag}
            </span>
          ))}
        </div>

        {/* Read More Button */}
        <div className="flex items-center gap-4 mt-0 flex-shrink-0">
          <button 
            onClick={onReadMoreClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative inline-flex items-center justify-center py-3 px-5 rounded-full border border-gray-300 dark:border-slate-600 cursor-pointer overflow-hidden bg-white dark:bg-slate-800 transition-colors duration-300"
          >
            <p className="relative z-10 tracking-wide whitespace-nowrap transition-colors duration-300 group-hover:text-white text-black dark:text-white">
              Read More
            </p>
            {/* Dark background filler for hover effect */}
            <div 
              className={`absolute w-[125%] h-[150%] rounded-full ${bgPositionClass} ${isTransitioning ? 'transition-all duration-500' : ''}`}
              style={{ backgroundColor: 'rgb(24, 24, 27)' }} 
            ></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Projects Page Component ---
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sparkles, setSparkles] = useState<{ id: number; top: string; left: string; size: string; animationDelay: string; }[]>([]);

  const filters = ['all', 'web', 'ui/ux', 'graphic'];

  // Dynamic sparkles generator
  useEffect(() => {
    const generateSparkles = (count: number) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        top: `${Math.random() * 140 - 20}%`,
        left: `${Math.random() * 120 - 10}%`,
        size: `${Math.random() * 10 + 5}px`, 
        animationDelay: `${Math.random() * 2}s`
      }));
    };
    setSparkles(generateSparkles(20));
  }, []);

  // Filter handler
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      const filtered = projectsData.filter((project) =>
        project.category.toLowerCase() === activeFilter.toLowerCase()
      );
      setFilteredProjects(filtered);
    }
  }, [activeFilter]);

  return (
    <section className="w-full max-w-7xl mx-auto px-[20px] py-[90px]">
      
      {/* Header Section */}
      <div className="flex flex-col items-center">
        {/* Title with dynamic sparkles */}
        <div className="relative inline-block text-center mb-12">
          {sparkles.map((sparkle) => (
            <span
              key={sparkle.id}
              className="sparkle-effect opacity-80 dark:opacity-100 transition-opacity duration-300"
              style={{
                top: sparkle.top,
                left: sparkle.left,
                width: sparkle.size,
                height: sparkle.size,
                animationDelay: sparkle.animationDelay,
              }}
            />
          ))}
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white relative z-10 transition-colors duration-300">
            MY PROJECTS
          </h2>
        </div>
        
        {/* Filter Navigation */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-300
                ${activeFilter === filter
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700'
                }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <Magnet key={project.id} magnetStrength={25}>
              <ProjectCard 
                project={project} 
                onReadMoreClick={() => setSelectedProject(project)} 
              />
            </Magnet>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}