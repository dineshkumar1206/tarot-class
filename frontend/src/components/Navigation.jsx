import React from 'react';
import { Sparkles, BookOpen, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-indigo-900/50 sticky top-0 z-50" data-aos="fade-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center space-x-3">
            <Sparkles className="w-8 h-8 text-amber-500" />
            <span className="text-xl font-bold text-slate-100 hidden sm:block tracking-wide">
              Tarot Card Reading Classes
            </span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            <a href="#video-lessons" className="text-slate-300 hover:text-amber-500 transition-colors flex items-center gap-2 font-medium">
              <PlayCircle className="w-5 h-5" />
              Video Lessons
            </a>
            <a href="#study-guides" className="text-slate-300 hover:text-amber-500 transition-colors flex items-center gap-2 font-medium">
              <BookOpen className="w-5 h-5" />
              Study Guides (PDFs)
            </a>
          </div>

          <div className="flex items-center">
            <div className="px-4 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-800 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-sm font-medium text-slate-200">Student: Active</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
