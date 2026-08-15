import React from 'react';

export default function Workout() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Workout Hub
        </span>
        <h1 className="text-3xl font-bold text-white mb-4">AI Workout Generator & Plans</h1>
        <p className="text-slate-400 text-base mb-6">
          Custom exercise routines tailored to your fitness level, available equipment, and target muscle groups.
        </p>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
          <p className="text-sm">🏋️ Workout plans and AI Coach modules will be initialized here.</p>
        </div>
      </div>
    </div>
  );
}
