import React from 'react';
import Navbar from '../components/Navbar';
import { ArrowRight } from 'lucide-react';

const videoClassesData = [
  {
    id: 1,
    title: 'Tarot for Beginners - Full Course',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Mastering Major Arcana',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Intuitive Spreads & Layouts',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1616055569429-07bc1379b29e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Tarot Business Masterclass',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    poster: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop'
  }
];

const VideoClasses = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-[#c19b52]/30">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-16 px-4 md:px-12">
        <div data-aos="fade-up">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#c19b52]/20">
            <div className="w-1.5 h-8 bg-[#c19b52] rounded-full"></div>
            <h1 className="text-3xl font-bold text-slate-900 uppercase tracking-widest">
              Pre-Recorded <span className="text-[#c19b52]">Video Classes</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videoClassesData.map((course, idx) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow flex flex-col"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="aspect-video relative overflow-hidden bg-black">
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    poster={course.poster}
                  >
                    <source src={course.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-bold text-slate-800 text-lg mb-4 line-clamp-2">{course.title}</h3>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-end">
                      <button className="text-sm font-bold text-slate-800 flex items-center gap-1 hover:text-[#c19b52] transition-colors group">
                        Watch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoClasses;
