import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlan } from '../context/PlanContext';

export default function Nutrition() {
  const { plan, profile } = usePlan();
  const [activeDay, setActiveDay] = useState(0);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const hasPlan = plan && Array.isArray(plan.weeklyDiet) && plan.weeklyDiet.length > 0;
  const currentDayDiet = hasPlan ? plan.weeklyDiet[activeDay] || plan.weeklyDiet[0] : null;

  const handleAskAi = (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    const proteinTarget = currentDayDiet?.macros?.protein || 160;
    const dietType = profile?.diet || 'balanced';
    setAiResponse(
      `Based on your active ${dietType} protocol and daily target of ${proteinTarget}g protein (${currentDayDiet?.totalCalories || 2200} kcal), this query is optimized for your metabolic demands.`
    );
  };

  return (
    <div className="text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-10 px-4 md:px-16 pb-24 max-w-7xl mx-auto w-full flex flex-col gap-10">
        {/* Hero-style Header Section */}
        <header className="max-w-3xl text-left mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-headline font-semibold text-tertiary mb-4 shadow-sm w-fit">
            <span className="material-symbols-outlined text-sm text-tertiary">restaurant_menu</span>
            {hasPlan
              ? `PRECISION MACRONUTRIENTS • ${currentDayDiet?.totalCalories || 2200} KCAL TARGET`
              : 'PRECISION MACRONUTRIENTS • NO ACTIVE PLAN'}
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-on-background leading-[1.08] tracking-tight">
            <span className="gradient-text uppercase">FUEL</span>
            <span className="text-white ml-2 sm:ml-3">Your Potential</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
            {hasPlan
              ? `AI-calibrated macronutrient fueling structured for your ${profile?.diet || 'current'} dietary profile and ${profile?.goal?.replace('_', ' ') || 'fitness'} targets.`
              : 'Generate your personalized 7-day nutrition and macronutrient protocol tailored by Gemini AI to your dietary preferences and fitness goals.'}
          </p>
        </header>

        {/* Empty State if No Plan Generated */}
        {!hasPlan ? (
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-10 sm:p-14 text-center flex flex-col items-center gap-4 max-w-xl mx-auto my-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-tertiary/20 border border-tertiary/40 flex items-center justify-center text-tertiary mb-2">
              <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
            </div>
            <h3 className="font-headline text-2xl sm:text-3xl font-black text-white">
              No Active Nutrition Protocol
            </h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              You haven't generated a nutrition protocol yet. Complete the onboarding questionnaire to receive day-by-day meal recommendations and macro targets.
            </p>
            <Link
              to="/onboarding"
              className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg text-center"
            >
              Start Onboarding & Generate Plan
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Day Selector Tabs (Monday - Sunday) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {plan.weeklyDiet.map((day, idx) => {
                const isActive = activeDay === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveDay(idx)}
                    className={`shrink-0 px-4 py-2.5 rounded-xl font-headline text-xs font-bold transition-all duration-150 ease-out cursor-pointer flex flex-col items-center min-w-[76px] border ${
                      isActive
                        ? 'bg-tertiary text-on-primary border-tertiary shadow-lg scale-105'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{(day.day || `Day ${idx + 1}`).slice(0, 3).toUpperCase()}</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">
                      {day.totalCalories ? `${day.totalCalories} kcal` : 'Diet'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* AI Chat Interface / Quick Tips */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center shadow-2xl relative overflow-hidden">
              <div className="flex-shrink-0 bg-white/10 p-4 rounded-full border border-white/15 shadow-inner">
                <span className="material-symbols-outlined text-primary text-3xl icon-fill">smart_toy</span>
              </div>
              <div className="flex-1">
                <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-2">
                  AI Nutrition Strategy
                </h3>
                <p className="font-body text-sm md:text-base text-white/75 leading-relaxed">
                  {plan.planSummary ||
                    `Targeting ${currentDayDiet?.totalCalories || 2200} kcal with ${currentDayDiet?.macros?.protein || 150}g protein to optimize recovery and energy balance.`}
                </p>
                {aiResponse && (
                  <div className="mt-4 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-primary/40 text-xs md:text-sm text-primary font-medium animate-fadeIn">
                    🤖 <strong>AI Recommendation:</strong> {aiResponse}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowAiModal(true)}
                className="md:ml-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shadow-lg shrink-0 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">forum</span> Ask AI
              </button>
            </div>

            {/* AI Modal */}
            {showAiModal && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-black/90 backdrop-blur-xl border border-white/15 p-6 sm:p-8 rounded-2xl max-w-lg w-full shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline text-xl font-bold text-primary flex items-center gap-2">
                      <span className="material-symbols-outlined">psychology</span>
                      FitVerse Nutrition AI
                    </h3>
                    <button onClick={() => setShowAiModal(false)} className="text-white/60 hover:text-white transition-colors cursor-pointer">
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <form onSubmit={handleAskAi} className="flex flex-col gap-4">
                    <textarea
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      placeholder="e.g. How can I adjust my meal timing for optimal recovery?"
                      className="w-full bg-white/5 border border-white/15 rounded-xl p-4 text-white text-sm focus:border-primary outline-none resize-none h-28"
                      autoFocus
                    ></textarea>
                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAiModal(false)}
                        className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-headline text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        onClick={() => {
                          if (aiQuestion.trim()) setShowAiModal(false);
                        }}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                      >
                        Submit Query
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Meal Recommendations Bento Grid */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  {(currentDayDiet?.day || `Day ${activeDay + 1}`)}'s Protocol
                </h2>
                <span className="text-xs font-headline font-bold text-tertiary bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/30">
                  {currentDayDiet?.totalCalories || 2200} kcal total
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Macro Tracker Card */}
                <div className="md:col-span-12 lg:col-span-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline text-xl font-bold text-white">Target Macros</h3>
                    <span className="text-xs text-primary font-headline font-bold uppercase">TARGET</span>
                  </div>
                  <div className="space-y-6 flex-grow flex flex-col justify-center">
                    {/* Protein */}
                    <div>
                      <div className="flex justify-between font-headline text-xs text-white font-bold mb-2">
                        <span>Protein</span>
                        <span className="text-primary font-black">{currentDayDiet?.macros?.protein || 150}g</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.round(((currentDayDiet?.macros?.protein || 150) / 220) * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Carbs */}
                    <div>
                      <div className="flex justify-between font-headline text-xs text-white font-bold mb-2">
                        <span>Carbohydrates</span>
                        <span className="text-tertiary font-black">{currentDayDiet?.macros?.carbs || 220}g</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-tertiary h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.round(((currentDayDiet?.macros?.carbs || 220) / 300) * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Fats */}
                    <div>
                      <div className="flex justify-between font-headline text-xs text-white font-bold mb-2">
                        <span>Fats</span>
                        <span className="text-primary-container font-black">{currentDayDiet?.macros?.fat || 65}g</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-primary-container h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.min(100, Math.round(((currentDayDiet?.macros?.fat || 65) / 100) * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meals List (8 cols) */}
                <div className="md:col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(currentDayDiet?.meals || []).map((meal, mIdx) => (
                    <div
                      key={mIdx}
                      className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all duration-300 shadow-2xl group"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="bg-white/10 text-white px-3 py-1 rounded-full font-headline text-[10px] uppercase font-bold tracking-wider group-hover:bg-tertiary group-hover:text-on-primary transition-colors">
                            {meal.name || `Meal ${mIdx + 1}`}
                          </span>
                          <span className="text-tertiary font-headline text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">local_fire_department</span>
                            {meal.calories} kcal
                          </span>
                        </div>
                        <p className="font-body text-sm text-white/80 leading-relaxed mt-2">
                          {meal.description}
                        </p>
                      </div>

                      {meal.protein && (
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="text-xs font-headline font-semibold text-white/60">Protein</span>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-headline text-xs font-bold border border-primary/20">
                            {meal.protein}g
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 text-primary font-headline text-xs w-full flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-12 mt-auto">
        <div className="font-headline text-xl font-bold text-primary mb-6 md:mb-0">FitVerse</div>
        <div className="flex gap-6 mb-6 md:mb-0 uppercase tracking-widest font-bold text-white/60">
          <Link to="/onboarding" className="hover:text-primary transition-opacity">Privacy Policy</Link>
          <Link to="/onboarding" className="hover:text-primary transition-opacity">Terms of Service</Link>
          <Link to="/community" className="hover:text-primary transition-opacity">Contact</Link>
          <Link to="/workout" className="hover:text-primary transition-opacity">Support</Link>
        </div>
        <div className="text-white/40 font-headline text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} FitVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
