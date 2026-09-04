import React from 'react';
import { Play, FileText, Download } from 'lucide-react';

const pdfMaterials = [
  {
    id: 1,
    title: "Major Arcana Reference Guide - Complete Overview",
    time: "5 hours ago",
    size: "2.4 MB",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Celtic Cross Spread Cheatsheet & Layouts",
    time: "1 day ago",
    size: "1.8 MB",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Minor Arcana Intuitive Symbolism Handbook",
    time: "2 days ago",
    size: "3.1 MB",
    image: "https://images.unsplash.com/photo-1616055569429-07bc1379b29e?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Daily Reading Logbook Printable Template",
    time: "3 days ago",
    size: "800 KB",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=200&auto=format&fit=crop"
  }
];

const Hero = () => {
  return (
    <section className="relative w-full py-12 px-4 md:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 min-h-[80vh] items-start">
      
      {/* Left Side: Featured Class Video */}
      <div className="flex-1 w-full lg:w-2/3 flex flex-col justify-start" data-aos="fade-right">
        <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white/60 backdrop-blur-md border border-slate-200">
          
          <div className="aspect-[16/9] relative bg-slate-900 group">
            {/* Sample Video */}
            <video 
              className="w-full h-full object-cover"
              controls 
              poster="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1200&auto=format&fit=crop"
            >
              <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3 text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <span>2026</span>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span>1h 45m</span>
              <span className="w-1 h-1 rounded-full bg-slate-400"></span>
              <span className="text-[#c19b52]">Masterclass</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Intuitive Reading & <br/> The Fool's Journey
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed font-light mb-8 max-w-3xl line-clamp-3">
              Step into the realm of Tarot and uncover the hidden truths waiting for you. This comprehensive masterclass covers everything from basic spreads to deep intuitive connections, empowering your choices and spiritual journey.
            </p>
            
            <button className="flex items-center gap-2 px-8 py-3.5 bg-[#c19b52] hover:bg-[#b08b45] text-white font-bold tracking-wide rounded-lg transition-colors shadow-lg shadow-[#c19b52]/20">
              <Play className="w-5 h-5 fill-current" /> WATCH NOW
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: PDF Study Materials List */}
      <div className="w-full lg:w-1/3 flex flex-col justify-start" data-aos="fade-left">
        
        <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-[#c19b52]/20">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-[#c19b52] rounded-full"></div>
            <h3 className="font-bold text-slate-900 uppercase tracking-widest text-lg">Study Materials</h3>
          </div>
          <a href="#pdfs" className="text-xs font-bold text-[#c19b52] hover:text-slate-900 transition-colors tracking-widest uppercase">
            View All <span className="ml-1">&gt;</span>
          </a>
        </div>

        <div className="flex flex-col gap-2">
          {pdfMaterials.map((pdf) => (
            <div 
              key={pdf.id} 
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-all border border-transparent hover:border-slate-200 cursor-pointer shadow-sm hover:shadow-md group"
            >
              <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 relative">
                <img src={pdf.image} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white/90" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm mb-1.5 line-clamp-2 group-hover:text-[#c19b52] transition-colors">
                  {pdf.title}
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                  <span>{pdf.time}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1"><Download className="w-3 h-3" /> {pdf.size}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
      
    </section>
  );
};

export default Hero;
