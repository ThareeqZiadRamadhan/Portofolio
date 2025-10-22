// app/components/ProjectModal/ProjectModal.tsx

"use client";

import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../Projects/page'; // Impor tipe data Project

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {/* Latar belakang gelap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        {/* Konten Modal */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col"
        >
          <img src={project.image} alt={project.title} className="w-full h-85 object-cover" />
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900">{project.title}</h2>
            <div className="flex flex-wrap gap-2 my-4">
              {project.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
              ))}
            </div>
            <p className="text-gray-700">{project.description}</p>
            <button 
              onClick={onClose}
              className="mt-6 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}