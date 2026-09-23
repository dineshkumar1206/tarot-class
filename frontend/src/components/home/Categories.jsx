import React from 'react';

const syllabusItems = [
  { id: 1, title: '78 Cards Meaning', desc: 'Complete meaning of all 78 cards', icon: '🎴' },
  { id: 2, title: 'Tarot Symbolic Meaning', desc: 'Understand the hidden symbols', icon: '✡️' },
  { id: 3, title: 'Numbers Meaning', desc: 'The power of numbers in Tarot', icon: '123' },
  { id: 4, title: 'Colours Meaning', desc: 'What colours reveal in cards', icon: '🎨' },
  { id: 5, title: 'Zodiac Sign Meaning', desc: 'Zodiac connections in Tarot', icon: '♈' },
  { id: 6, title: 'Zodiac Connect with Tarot', desc: 'Bridging astrology and Tarot', icon: '🔗' },
  { id: 7, title: 'Elements Meaning', desc: 'Fire, Water, Air, Earth in Tarot', icon: '△' },
  { id: 8, title: 'Elements connect with Tarot', desc: 'How elements influence readings', icon: '⚛️' },
  { id: 9, title: 'Time Frames of Suits', desc: 'Timing and prediction methods', icon: '⏱️' },
  { id: 10, title: 'How to Spread', desc: 'Learn different spreads', icon: '🕸️' },
  { id: 11, title: 'Type of Spread', desc: 'Choose the right spread for your query', icon: '🃏' },
  { id: 12, title: 'How to Cleanse Cards', desc: 'Methods to purify your deck', icon: '🌿' },
  { id: 13, title: 'How to Awake your intuition', desc: 'Tips to develop inner guidance', icon: '🧠' },
  { id: 14, title: 'How to connect with Cards', desc: 'Build a personal bond with your deck', icon: '❤️' },
  { id: 15, title: 'Recorded Permanent Notes And All Explanation', desc: 'Access to recorded notes', icon: '📄' }
];

const Categories = () => {
  return (
    <section id="syllabus" className="w-full py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-serif">
            Tarot Card Reading Class <span className="text-[#c19b52]">Syllabus</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Explore the comprehensive topics covered in our professional Tarot reading course.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {syllabusItems.map((item, idx) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-[#c19b52]/20 hover:border-[#c19b52]/60 hover:shadow-[0_8px_30px_rgba(193,155,82,0.15)] transition-all flex items-start gap-4 group"
              data-aos="fade-up"
              data-aos-delay={(idx % 6) * 100}
            >
              <div className="w-12 h-12 rounded-full bg-[#fdfbf7] border border-[#c19b52]/30 flex items-center justify-center text-xl shrink-0 group-hover:bg-[#c19b52] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-[#c19b52] transition-colors">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
