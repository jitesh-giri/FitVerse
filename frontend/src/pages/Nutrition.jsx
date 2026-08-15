import React from 'react';

export default function Nutrition() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Nutrition
        </span>
        <h1 className="text-3xl font-bold text-white mb-4">Diet & Meal Planning</h1>
        <p className="text-slate-400 text-base mb-6">
          Macro tracking, intelligent caloric breakdown, and AI-suggested nutrient-dense recipes.
        </p>
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-slate-300">
          <p className="text-sm">🥗 Nutrition recommendations and macro targets will appear here.</p>
        </div>
      </div>
    </div>
  );
}
