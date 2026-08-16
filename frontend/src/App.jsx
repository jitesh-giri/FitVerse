import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Workout from './pages/Workout';
import Nutrition from './pages/Nutrition';
import Community from './pages/Community';
import AdminModeration from './pages/AdminModeration';
import Onboarding from './pages/Onboarding';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col font-sans selection:bg-primary selection:text-on-primary">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminModeration />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
