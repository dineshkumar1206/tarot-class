import React from 'react';
import { Star, Clock, ArrowRight } from 'lucide-react';

const coursesData = [
  {
    id: 1,
    title: 'Tarot for Beginners',
    image: 'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=600&auto=format&fit=crop',
    rating: 5,
    reviews: 857,
    duration: '3 months training',
    price: '₹2,499',
    originalPrice: '₹4,499',
    discount: '44% off'
  },
  {
    id: 2,
    title: 'Mastering Major Arcana',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviews: 814,
    duration: '3 months training',
    price: '₹2,499',
    originalPrice: '₹4,499',
    discount: '44% off'
  },
  {
    id: 3,
    title: 'Intuitive Spreads & Layouts',
    image: 'https://images.unsplash.com/photo-1616055569429-07bc1379b29e?q=80&w=600&auto=format&fit=crop',
    rating: 4.9,
    reviews: 589,
    duration: '3 months training',
    price: '₹2,499',
    originalPrice: '₹4,499',
    discount: '44% off'
  },
  {
    id: 4,
    title: 'Tarot Business Masterclass',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop',
    rating: 5,
    reviews: 817,
    duration: '3 months training',
    price: '₹2,499',
    originalPrice: '₹4,499',
    discount: '44% off'
  }
];

const PreRecordedCourses = () => {
  return (
    <section id="videos" className="w-full py-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto" data-aos="fade-up">
        

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coursesData.map((course, idx) => (
            <div 
              key={course.id} 
              className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow flex flex-col"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="aspect-[16/10] relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-800 text-lg mb-1">{course.title}</h3>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-end">
                    <button className="text-sm font-bold text-slate-800 flex items-center gap-1 hover:text-[#c19b52] transition-colors group">
                      View <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PreRecordedCourses;
