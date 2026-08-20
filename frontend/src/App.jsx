import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import DotBackground from './components/DotBackground';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Nutrition from './pages/Nutrition';
import Community from './pages/Community';
import FemaleHealth from './pages/FemaleHealth';
import AdminModeration from './pages/AdminModeration';
import Onboarding from './pages/Onboarding';

// Shared page transition variants — enter fades + slides up 8px, exit fades + slides up 4px
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -4 },
};

const pageTransition = {
  duration: 0.18,
  ease: [0.16, 1, 0.3, 1],
};

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#121212] text-on-background flex flex-col font-body selection:bg-primary selection:text-on-primary relative overflow-x-hidden">
      {/* Global Particle Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <DotBackground />
      </div>

      {!isHome && <Navbar />}
      <main className="flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="flex-1 flex flex-col"
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/community" element={<Community />} />
              <Route path="/female-health" element={<FemaleHealth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<AdminModeration />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}



