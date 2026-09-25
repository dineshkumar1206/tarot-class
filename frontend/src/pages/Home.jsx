import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import Testimonials from '../components/home/Testimonials';

const Home = () => {
  return (
    <div 
      className="min-h-screen font-sans selection:bg-[#c19b52]/30"
      style={{ backgroundImage: 'url(/images/hero-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'right 80px', backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat' }}
    >
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <Hero />
        <Categories />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;
