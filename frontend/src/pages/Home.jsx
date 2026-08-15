import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Placeholder Page
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Welcome to FitVerse 🚀
        </h1>
        <p className="text-slate-400 text-lg mb-6 leading-relaxed">
          Your personal AI-driven fitness, nutrition, and wellness universe. Explore personalized workouts, smart meal planning, and interactive community challenges.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/onboarding"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-xl transition"
          >
            Start Onboarding (BMI Flow)
          </Link>
          <Link
            to="/workout"
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition"
          >
            Explore Workouts
          </Link>
        </div>
      </div>
    </div>
  );
}
