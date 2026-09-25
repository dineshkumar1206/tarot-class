import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const getIcon = (idx) => {
  const icons = [
    (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="15" width="24" height="34" rx="2" fill="#0C3229" stroke="#B89355" strokeWidth="2" />
        <rect x="12" y="20" width="24" height="34" rx="2" transform="rotate(-15 12 20)" fill="#0C3229" stroke="#B89355" strokeWidth="2" />
        <rect x="28" y="10" width="24" height="34" rx="2" transform="rotate(15 28 10)" fill="#0C3229" stroke="#B89355" strokeWidth="2" />
        <circle cx="32" cy="32" r="6" fill="#B89355" />
      </svg>
    ),
    (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="24" r="10" fill="#0C3229" stroke="#B89355" strokeWidth="2" />
        <circle cx="44" cy="40" r="10" fill="#0C3229" stroke="#B89355" strokeWidth="2" />
        <line x1="26" y1="28" x2="38" y2="36" stroke="#B89355" strokeWidth="2" />
        <circle cx="32" cy="32" r="3" fill="#B89355" />
      </svg>
    ),
    (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="24" fill="#0C3229" />
        <circle cx="32" cy="32" r="22" stroke="#B89355" strokeWidth="1" strokeDasharray="4 2" />
        <path d="M24 24 Q32 36 40 24 M32 30 V44" stroke="#B89355" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    (
      <svg width="44" height="44" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 36 C10 36 10 20 24 20 C30 20 32 28 32 28 C32 28 34 20 40 20 C54 20 54 36 44 36" fill="#0C3229" stroke="#B89355" strokeWidth="2" />
        <path d="M26 26 L38 38 M38 26 L26 38" stroke="#B89355" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="32" r="4" fill="#B89355" />
      </svg>
    )
  ];
  return icons[idx % icons.length];
};

const categories = [
  { title: "78 Cards Meaning", desc: "Complete meaning of all 78 cards" },
  { title: "Tarot Symbolic Meaning", desc: "Understand the hidden symbols" },
  { title: "Numbers Meaning", desc: "The power of numbers in Tarot" },
  { title: "Colours Meaning", desc: "What colours reveal in cards" },
  { title: "Zodiac Sign Meaning", desc: "Zodiac connections in Tarot" },
  { title: "Zodiac Connect with Tarot", desc: "Bridging astrology and Tarot" },
  { title: "Elements Meaning", desc: "Fire, Water, Air, Earth in Tarot" },
  { title: "Elements connect with Tarot", desc: "How elements influence readings" },
  { title: "Time Frames of Suits", desc: "Timing and prediction methods" },
  { title: "How to Spread", desc: "Learn different spreads" },
  { title: "Type of Spread", desc: "Choose the right spread for your query" },
  { title: "How to Cleanse Cards", desc: "Methods to purify your deck" },
  { title: "How to Awake your intuition", desc: "Tips to develop inner guidance" },
  { title: "How to connect with Cards", desc: "Build a personal bond with your deck" }
];

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <section id="categories" className="w-full py-16 px-4 md:px-12 relative z-20">
        <div className="max-w-[1400px] mx-auto" data-aos="fade-up">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-[2.5rem] font-bold text-[#0C3229] font-serif mb-4">
              Comprehensive Tarot Syllabus
            </h2>
            <p className="text-[#475467] md:text-lg max-w-2xl mx-auto">
              Everything you need to master the art of Tarot reading, from basic meanings to advanced spreads and intuition building.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {categories.map((cat, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-xl p-4 md:p-5 border border-slate-100 hover:border-[#B89355]/30 transition-all flex flex-col items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={(idx % 5) * 50}
              >
                <div className="mb-3 flex justify-center w-full">
                  {getIcon(idx)}
                </div>
                <h3 className="font-bold text-[#0C3229] text-lg mb-2 font-serif">{cat.title}</h3>
                <p className="text-[#475467] text-xs md:text-sm mb-5 flex-1 leading-relaxed font-medium">{cat.desc}</p>
                
                <button 
                  onClick={() => setSelectedCategory(cat.title)}
                  className="w-[90%] py-2 px-4 rounded-md bg-[#B89355] hover:bg-[#9c7d48] text-white font-semibold transition-colors shadow-sm text-xs uppercase tracking-wide"
                >
                  View Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video List Popup Modal (Moved outside section to prevent clipping from AOS transform) */}
      {selectedCategory && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-white/80 backdrop-blur-md overflow-y-auto" 
          onClick={() => setSelectedCategory(null)}
        >
          <div 
            className="relative w-full max-w-6xl bg-white p-6 md:p-10 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] my-auto border border-slate-200" 
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <button 
              onClick={() => setSelectedCategory(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-[#E41E5D] transition-colors bg-gray-100 hover:bg-red-50 rounded-full p-2 z-10"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#0C3229] mb-8 border-b border-slate-100 pb-4 pr-12">
              Category: <span className="text-[#B89355]">{selectedCategory}</span> - Pre Recorded Classes
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((v) => (
                <div key={v} className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
                  {/* Video Thumbnail Placeholder */}
                  <div className="relative bg-[#0C3229] h-48 flex items-center justify-center">
                    <img src={`/images/hero-1.webp`} alt="Thumbnail placeholder" className="opacity-40 h-full w-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-white/80 font-bold tracking-widest uppercase">Video {v}</span>
                    </div>
                    {/* Play Icon */}
                    <div className="absolute bottom-3 right-3 bg-black/70 rounded-full p-2.5 shadow-lg backdrop-blur-sm cursor-pointer hover:bg-black transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h4 className="font-bold text-[#1D2939] text-lg mb-1 leading-tight line-clamp-2">
                      The Major Arcana Deep Meanings - Part {v}
                    </h4>
                    <p className="text-sm text-[#475467] font-medium mb-5">
                      {45 + (v * 5)} min
                    </p>
                    <div className="mt-auto">
                      <button className="w-full py-2.5 rounded-md bg-[#B89355] hover:bg-[#9c7d48] text-white font-bold transition-colors shadow-sm">
                        Play Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Link 
                to="/videos" 
                className="inline-block py-3 px-10 rounded-md bg-[#0C3229] hover:bg-[#08201a] text-white font-bold shadow-lg transition-transform hover:-translate-y-0.5 tracking-wide"
              >
                View More Classes
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
