import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlan } from '../context/PlanContext';

// ─── Helper: YouTube search URL per exercise ──────────────────────────────────
const VIDEO_MAP = {};
const getYouTubeSearchUrl = (exerciseName) =>
  VIDEO_MAP[exerciseName] ||
  `https://www.youtube.com/results?search_query=${encodeURIComponent((exerciseName || 'exercise') + ' exercise tutorial')}`;

const ACCENT_STYLES = [
  { accentColor: 'text-primary', borderAccent: 'border-primary' },
  { accentColor: 'text-tertiary', borderAccent: 'border-tertiary' },
  { accentColor: 'text-primary-container', borderAccent: 'border-primary-container' },
];

export default function Workout() {
  const { plan } = usePlan();
  const [activeDay, setActiveDay] = useState(0);
  const [expandedExercise, setExpandedExercise] = useState(null);

  const toggleDemo = (idx) => {
    setExpandedExercise(expandedExercise === idx ? null : idx);
  };

  const hasPlan = plan && Array.isArray(plan.weeklyWorkout) && plan.weeklyWorkout.length > 0;
  const currentDayWorkout = hasPlan ? plan.weeklyWorkout[activeDay] || plan.weeklyWorkout[0] : null;
  const isRestDay = currentDayWorkout && (!currentDayWorkout.exercises || currentDayWorkout.exercises.length === 0 || currentDayWorkout.type === 'Rest' || currentDayWorkout.type === 'Active Recovery');

  return (
    <div className="text-on-background min-h-screen flex flex-col font-body selection:bg-primary selection:text-on-primary">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-10 pb-24 px-4 md:px-16 max-w-7xl mx-auto w-full flex flex-col gap-10">
        {/* Hero-style Header Section */}
        <header className="flex flex-col gap-3 max-w-3xl mt-4 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-headline font-semibold text-primary w-fit shadow-sm">
            <span className="material-symbols-outlined text-sm text-primary">bolt</span>
            {hasPlan
              ? `AI PROTOCOL • ${currentDayWorkout?.duration || '60 MIN'} • ${(currentDayWorkout?.focus || currentDayWorkout?.type || 'TRAINING').toUpperCase()}`
              : 'AI PROTOCOL • NO ACTIVE PLAN'}
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-on-background leading-[1.08] tracking-tight">
            <span className="gradient-text uppercase">DOMINATE</span>
            <span className="text-white ml-2 sm:ml-3">Your Training</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
            {hasPlan
              ? 'A precision-engineered protocol designed to maximize mechanical tension. Follow the prescribed tempo and respect the rest intervals to ensure optimal progress.'
              : 'Generate your personalized 7-day training schedule tailored by Gemini AI to your fitness goals, experience level, and body biometrics.'}
          </p>
        </header>

        {/* Empty State if No Plan Generated */}
        {!hasPlan ? (
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-10 sm:p-14 text-center flex flex-col items-center gap-4 max-w-xl mx-auto my-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-3xl">fitness_center</span>
            </div>
            <h3 className="font-headline text-2xl sm:text-3xl font-black text-white">
              No Active Workout Plan
            </h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              You haven't generated a personalized workout protocol yet. Complete the onboarding questionnaire to generate your tailored 7-day routine.
            </p>
            <Link
              to="/onboarding"
              className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg text-center"
            >
              Start Onboarding & Generate Plan
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Day Selector Tabs (Monday - Sunday) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {plan.weeklyWorkout.map((day, idx) => {
                const isActive = activeDay === idx;
                const isDayRest = !day.exercises || day.exercises.length === 0 || day.type === 'Rest' || day.type === 'Active Recovery';
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveDay(idx);
                      setExpandedExercise(null);
                    }}
                    className={`shrink-0 px-4 py-2.5 rounded-xl font-headline text-xs font-bold transition-all duration-150 ease-out cursor-pointer flex flex-col items-center min-w-[72px] border ${
                      isActive
                        ? 'bg-primary text-[#00285c] border-primary shadow-lg scale-105'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{(day.day || `Day ${idx + 1}`).slice(0, 3).toUpperCase()}</span>
                    <span className="text-[10px] font-normal opacity-80 mt-0.5">
                      {isDayRest ? 'Rest' : `${day.exercises.length} ex`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Rest Day Card */}
            {isRestDay ? (
              <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary/80 shrink-0">
                  <span className="material-symbols-outlined text-4xl">bedtime</span>
                </div>
                <div>
                  <span className="font-headline text-xs uppercase font-bold tracking-widest text-primary">
                    RECOVERY WINDOW
                  </span>
                  <h3 className="font-headline text-2xl font-black text-white mt-1">
                    {currentDayWorkout?.focus || 'Rest & Active Recovery'}
                  </h3>
                  <p className="font-body text-sm text-white/70 mt-2 leading-relaxed max-w-xl">
                    Prioritize quality sleep, light dynamic stretching, and adequate protein fueling. Muscle protein synthesis and central nervous system adaptation occur during rest.
                  </p>
                </div>
              </div>
            ) : (
              /* Workout Grid / Table */
              <div className="flex flex-col gap-6 w-full">
                {/* Column Headers (Desktop) */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 border-b border-white/10 font-headline text-xs font-bold text-white/60 uppercase tracking-wider">
                  <div className="col-span-5">Movement Protocol</div>
                  <div className="col-span-3 text-center">Volume Structure</div>
                  <div className="col-span-4 text-right">Execution</div>
                </div>

                {/* Exercise Rows */}
                {(currentDayWorkout?.exercises || []).map((ex, idx) => {
                  const isExpanded = expandedExercise === idx;
                  const accent = ACCENT_STYLES[idx % ACCENT_STYLES.length];

                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300 group overflow-hidden"
                    >
                      {/* Main Visible Row */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
                        <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                          <span className="font-headline text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                            {ex.title}
                          </span>
                          <span className={`font-headline text-xs uppercase font-extrabold tracking-wider ${accent.accentColor}`}>
                            {ex.category || 'Compound Movement'}
                          </span>
                        </div>

                        <div className="col-span-1 md:col-span-3 flex md:justify-center items-center gap-4">
                          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex flex-col items-center min-w-[70px]">
                            <span className="font-headline text-[10px] uppercase font-bold text-white/60">Sets</span>
                            <span className="font-headline text-xl font-black text-white">{ex.sets}</span>
                          </div>
                          <span className="text-white/30 text-2xl font-light">×</span>
                          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex flex-col items-center min-w-[80px]">
                            <span className="font-headline text-[10px] uppercase font-bold text-white/60">Reps</span>
                            <span className="font-headline text-xl font-black text-white">{ex.reps}</span>
                          </div>
                        </div>

                        <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-3 mt-4 md:mt-0">
                          <a
                            href={getYouTubeSearchUrl(ex.title)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase font-bold tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">play_circle</span>
                            Watch
                          </a>
                          <button
                            onClick={() => toggleDemo(idx)}
                            aria-expanded={isExpanded}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-white font-headline text-xs uppercase font-bold tracking-wider active:scale-95 transition-all cursor-pointer"
                          >
                            Demo
                            <span className="material-symbols-outlined text-[18px]">
                              {isExpanded ? 'expand_less' : 'expand_more'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Expandable Demo Section */}
                      {isExpanded && (
                        <div className="border-t border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8 animate-fadeIn">
                          <div className="flex flex-col md:flex-row gap-8 items-center">
                            {/* Visual Placeholder Frame */}
                            <div className="w-full md:w-5/12 aspect-video rounded-xl border border-white/15 relative overflow-hidden bg-black/40 shadow-2xl flex items-center justify-center">
                              <div className="flex flex-col items-center gap-3 p-4 text-center">
                                <span className={`material-symbols-outlined text-5xl ${accent.accentColor} opacity-40`}>fitness_center</span>
                                <span className={`font-headline text-xs font-bold tracking-widest ${accent.accentColor} opacity-60 uppercase`}>
                                  AI Biomechanics Blueprint
                                </span>
                              </div>
                              <div className="absolute inset-0 border border-white/10 m-2 rounded pointer-events-none"></div>
                            </div>

                            <div className="w-full md:w-7/12 flex flex-col gap-4 justify-center">
                              <h4 className="font-headline text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                                <span className={`material-symbols-outlined ${accent.accentColor}`}>psychology</span>
                                Mind-Muscle Connection
                              </h4>
                              <ul className="flex flex-col gap-3 font-body text-sm md:text-base text-white/90">
                                {(ex.cues || []).map((cue, cIdx) => (
                                  <li key={cIdx} className="flex gap-3 items-start">
                                    <span className={`${accent.accentColor} font-bold mt-0.5`}>0{cIdx + 1}.</span>
                                    <span className="text-white/70">{cue}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="mt-4 flex flex-wrap gap-3">
                                {ex.tempo && (
                                  <span className="bg-white/10 text-white/80 font-headline text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                                    {ex.tempo}
                                  </span>
                                )}
                                {ex.rest && (
                                  <span className="bg-white/10 text-white/80 font-headline text-xs font-semibold px-3 py-1.5 rounded-full border border-white/10">
                                    {ex.rest}
                                  </span>
                                )}
                                <span className="bg-primary/15 text-primary font-headline text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/30 flex items-center gap-1">
                                  <span className="material-symbols-outlined text-sm">analytics</span> AI Form Cues
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-12 w-full mt-auto">
        <span className="font-headline text-xl font-bold text-primary tracking-tight">FitVerse</span>
        <div className="flex flex-wrap justify-center gap-6 font-headline text-xs font-bold text-white/60 my-6 md:my-0 uppercase tracking-widest">
          <Link to="/onboarding" className="hover:text-primary transition-opacity">Privacy Policy</Link>
          <Link to="/onboarding" className="hover:text-primary transition-opacity">Terms of Service</Link>
          <Link to="/community" className="hover:text-primary transition-opacity">Contact</Link>
          <Link to="/nutrition" className="hover:text-primary transition-opacity">Support</Link>
        </div>
        <span className="font-headline text-[10px] text-white/40 uppercase tracking-widest">
          © {new Date().getFullYear()} FitVerse. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
