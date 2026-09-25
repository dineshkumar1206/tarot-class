import React from 'react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Students",
      rating: "5/5",
      text: `"Sara's pre-recorded classes have transformed my tarot readings!"`,
      author: "Sarah J., London",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Students",
      rating: "5/5",
      text: `"Clear, insightful, and empowering."`,
      author: "Sarah J., London",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
      id: 3,
      name: "Students",
      rating: "5/5",
      text: `"Sara's pre-recorded classes have transformed my."`,
      author: "Sarah J., London",
      avatar: "https://i.pravatar.cc/150?img=11"
    }
  ];

  return (
    <section className="w-full py-16 px-4 md:px-12 relative z-20">
      <div className="max-w-6xl mx-auto" data-aos="fade-up">
        
        {/* Testimonials Section */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3229] font-serif mb-10 text-center">
            What Students Are Saying
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl p-6 shadow-md border border-slate-100 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  <img src={review.avatar} alt="Student" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-[#1D2939]">{review.name}</h4>
                    <p className="text-sm font-semibold text-slate-500">{review.rating}</p>
                  </div>
                </div>
                
                <div className="flex text-[#B89355] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-slate-500 font-bold">5/5</span>
                </div>
                
                <p className="text-[#475467] font-medium mb-6 flex-1 text-sm leading-relaxed">
                  {review.text}
                </p>
                
                <p className="text-sm text-[#1D2939] font-bold mt-auto">
                  {review.author}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Instructor Section */}
        <div className="bg-[#FAF8F5] rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100/50 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C3229] font-serif mb-10 text-center">
            Meet Your Instructor
          </h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 max-w-4xl mx-auto">
            <div className="flex-shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" 
                alt="Sara Tarot Reader" 
                className="w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover shadow-md"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#1D2939] mb-1">Sara Tarot Reader</h3>
              <p className="text-[#0C3229] font-bold mb-4">Certified Tarot Professionalist</p>
              
              <p className="text-[#475467] mb-6 leading-relaxed text-sm md:text-base">
                With over 15 years of experience, Sara brings clarity and intuition to every lesson. Started back for passion more and has experienced every year.
              </p>
              
              <button className="bg-[#B89355] hover:bg-[#9c7d48] text-white px-6 py-2.5 rounded-md font-bold text-sm transition-colors shadow-sm">
                Read Full Bio
              </button>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-slate-200/60 pt-8 mt-12 pb-4">
          <div className="flex justify-center gap-8 mb-6">
            <Link to="/" className="text-[#0C3229] font-bold hover:text-[#B89355] transition-colors border-b-2 border-[#0C3229] pb-1">Home</Link>
            <Link to="#" className="text-[#1D2939] font-bold hover:text-[#B89355] transition-colors">Syllabus</Link>
            <Link to="#" className="text-[#1D2939] font-bold hover:text-[#B89355] transition-colors">Contact</Link>
          </div>
          
          <p className="text-center text-sm text-[#475467] font-medium">
            Design by <a href="https://amigowebster.com/" target="_blank" rel="noopener noreferrer" className="text-[#B89355] hover:text-[#9c7d48] font-bold hover:underline transition-colors">AmigoWebster</a>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
