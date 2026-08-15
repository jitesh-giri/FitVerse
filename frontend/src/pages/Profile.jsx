import React from 'react';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <span className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Profile
        </span>
        <h1 className="text-3xl font-bold text-white mb-4">User Profile & Metrics</h1>
        <p className="text-slate-400 text-base mb-6">
          View your personal health metrics, fitness achievements, activity streaks, and preferences.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-500 uppercase font-semibold">Streak</p>
            <p className="text-2xl font-bold text-emerald-400">7 Days</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-500 uppercase font-semibold">Workouts Completed</p>
            <p className="text-2xl font-bold text-cyan-400">24</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <p className="text-xs text-slate-500 uppercase font-semibold">Current Goal</p>
            <p className="text-2xl font-bold text-purple-400">Muscle Gain</p>
          </div>
        </div>
      </div>
    </div>
  );
}
