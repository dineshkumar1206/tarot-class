import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import VideoClasses from './pages/VideoClasses';
import StudyMaterial from './pages/StudyMaterial';
import Navbar from './components/Navbar';
import CardsMeaning from './components/syllabus/CardsMeaning';
import SymbolicMeaning from './components/syllabus/SymbolicMeaning';
import NumbersMeaning from './components/syllabus/NumbersMeaning';
import ColoursMeaning from './components/syllabus/ColoursMeaning';
import ZodiacSignMeaning from './components/syllabus/ZodiacSignMeaning';
import ZodiacConnect from './components/syllabus/ZodiacConnect';
import ElementsMeaning from './components/syllabus/ElementsMeaning';
import ElementsConnect from './components/syllabus/ElementsConnect';
import TimeFrames from './components/syllabus/TimeFrames';
import HowToSpread from './components/syllabus/HowToSpread';
import TypeOfSpread from './components/syllabus/TypeOfSpread';
import HowToCleanse from './components/syllabus/HowToCleanse';
import AwakenIntuition from './components/syllabus/AwakenIntuition';
import ConnectWithCards from './components/syllabus/ConnectWithCards';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      once: true 
    });
  }, []);

  return (
    <div className="bg-[radial-gradient(ellipse_80%_100%_at_100%_50%,rgba(161,61,142,0.10)_0%,rgba(161,61,142,0.04)_40%,transparent_70%),linear-gradient(135deg,#FFFFFF_0%,#FDFCFF_40%,#F5EEFF_70%,#EAD6FA_100%)] text-slate-900 min-h-screen font-sans selection:bg-[#c19b52]/30">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideoClasses />} />
          <Route path="/materials" element={<StudyMaterial />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/syllabus/cards-meaning" element={<CardsMeaning />} />
          <Route path="/syllabus/symbolic-meaning" element={<SymbolicMeaning />} />
          <Route path="/syllabus/numbers-meaning" element={<NumbersMeaning />} />
          <Route path="/syllabus/colours-meaning" element={<ColoursMeaning />} />
          <Route path="/syllabus/zodiac-sign-meaning" element={<ZodiacSignMeaning />} />
          <Route path="/syllabus/zodiac-connect" element={<ZodiacConnect />} />
          <Route path="/syllabus/elements-meaning" element={<ElementsMeaning />} />
          <Route path="/syllabus/elements-connect" element={<ElementsConnect />} />
          <Route path="/syllabus/time-frames" element={<TimeFrames />} />
          <Route path="/syllabus/how-to-spread" element={<HowToSpread />} />
          <Route path="/syllabus/type-of-spread" element={<TypeOfSpread />} />
          <Route path="/syllabus/how-to-cleanse" element={<HowToCleanse />} />
          <Route path="/syllabus/awaken-intuition" element={<AwakenIntuition />} />
          <Route path="/syllabus/connect-with-cards" element={<ConnectWithCards />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
