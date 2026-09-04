import React from 'react';
import { Sparkles, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0b101e] border-b border-[#1a2333] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <div className="flex items-center space-x-3">
            {/* Logo removed as requested */}
          </div>

          <div className="flex space-x-6 items-center text-sm font-semibold tracking-wider text-slate-300 uppercase">
            <Link to="/" className="hover:text-[#c19b52] transition-colors">Home</Link>
            <Link to="/videos" className="hover:text-[#c19b52] transition-colors">Pre recorded Video Class</Link>
            <Link to="/#pdfs" className="hover:text-[#c19b52] transition-colors">PDF study material</Link>
            <Link 
              to="/dashboard" 
              className="px-4 py-1.5 rounded bg-transparent border border-[#c19b52] hover:bg-[#c19b52]/10 text-[#c19b52] transition-colors flex items-center gap-2 ml-4"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
