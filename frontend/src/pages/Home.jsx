import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import PreRecordedCourses from '../components/home/PreRecordedCourses';

const Home = () => {
  return (
    <div className="min-h-screen font-sans selection:bg-[#c19b52]/30">
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <Hero />
        <PreRecordedCourses />
      </main>
    </div>
  );
};

export default Home;
