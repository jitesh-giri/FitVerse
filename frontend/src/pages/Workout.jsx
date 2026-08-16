import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ─── Helper: YouTube search URL per exercise ──────────────────────────────────
// To swap in a curated video later, add an entry to VIDEO_MAP:
// e.g. 'Barbell Deadlift': 'https://www.youtube.com/watch?v=SPECIFIC_ID'
const VIDEO_MAP = {};
const getYouTubeSearchUrl = (exerciseName) =>
  VIDEO_MAP[exerciseName] ||
  `https://www.youtube.com/results?search_query=${encodeURIComponent(exerciseName + ' exercise tutorial')}`;

const exercises = [
  {
    id: 1,
    title: 'Barbell Deadlift',
    category: 'Primary Compound',
    sets: '4',
    reps: '6-8',
    borderColor: 'hover:border-primary',
    accentColor: 'text-primary',
    borderAccent: 'border-primary',
    image: '/images/hero/hero-2.jpg',
    tempo: 'Tempo: 2-0-1-0',
    rest: 'Rest: 120s',
    cues: [
      'Hinge at the hips, maintaining a neutral spine. Engage lats by pulling the bar close to your shins before initiating the pull.',
      'Drive through the mid-foot, extending hips and knees simultaneously. Do not let the hips rise faster than the shoulders.',
      'Lock out forcefully at the top by squeezing the glutes, avoiding hyperextension of the lower back.',
    ],
  },
  {
    id: 2,
    title: 'Bulgarian Split Squat',
    category: 'Unilateral Accessory',
    sets: '3',
    reps: '10-12 /leg',
    borderColor: 'hover:border-tertiary',
    accentColor: 'text-tertiary',
    borderAccent: 'border-tertiary',
    image: '/images/hero/hero-3.jpg',
    tempo: 'Tempo: 3-1-1-0',
    rest: 'Rest: 90s',
    cues: [
      'Elevate rear foot on a bench. Keep the front foot positioned so the knee doesn’t track excessively past the toes.',
      'Descend slowly, focusing the load entirely on the front quadriceps and glutes. Keep torso slightly pitched forward for glute bias.',
      'Push the floor away through the front heel to return to the starting position. Maintain constant tension.',
    ],
  },
  {
    id: 3,
    title: 'Incline Dumbbell Bench Press',
    category: 'Upper Chest Compound',
    sets: '4',
    reps: '8-10',
    borderColor: 'hover:border-primary-container',
    accentColor: 'text-primary-container',
    borderAccent: 'border-primary-container',
    image: '/images/hero/hero-4.jpg',
    tempo: 'Tempo: 3-0-1-0',
    rest: 'Rest: 90s',
    cues: [
      'Set bench at a 30-degree angle. Retract and depress scapulae into the bench.',
      'Lower dumbbells with control, feeling a deep stretch across the clavicular head of the pecs.',
      'Press upward in a slight arc without slamming weights at the apex.',
    ],
  },
  {
    id: 4,
    title: 'Standing Overhead Press',
    category: 'Vertical Deltoid Push',
    sets: '3',
    reps: '8',
    borderColor: 'hover:border-primary',
    accentColor: 'text-primary',
    borderAccent: 'border-primary',
    image: '/images/hero/hero-5.jpg',
    tempo: 'Tempo: 2-1-1-0',
    rest: 'Rest: 120s',
    cues: [
      'Brace core and squeeze glutes to establish a rock-solid foundation.',
      'Press bar vertically in a straight bar path, moving head back slightly as bar passes chin.',
      'Lock out overhead with arms fully extended directly in line with ears.',
    ],
  },
];

export default function Workout() {
  const [expandedExercise, setExpandedExercise] = useState(1);

  const toggleDemo = (id) => {
    setExpandedExercise(expandedExercise === id ? null : id);
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body selection:bg-primary selection:text-on-primary">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-12 pb-24 px-4 md:px-16 max-w-7xl mx-auto w-full flex flex-col gap-12">
        {/* Header Section */}
        <header className="flex flex-col gap-4 max-w-3xl mt-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-surface-container-high rounded-full font-headline text-[10px] uppercase font-bold tracking-widest text-primary">
              AI PROTOCOL V3.4
            </span>
            <span className="text-on-surface-variant text-xs">• 65 min estimated</span>
          </div>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black text-gradient-vibrant tracking-tight">
            Hypertrophy Core Matrix
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant opacity-85 leading-relaxed">
            A precision-engineered protocol designed to maximize mechanical tension. Follow the prescribed tempo and respect the rest intervals to ensure optimal metabolic stress.
          </p>
        </header>

        {/* Workout Grid / Table */}
        <div className="flex flex-col gap-6 w-full">
          {/* Column Headers (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 pb-2 border-b-2 border-surface-variant font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider">
            <div className="col-span-5">Movement Protocol</div>
            <div className="col-span-3 text-center">Volume Structure</div>
            <div className="col-span-4 text-right">Execution</div>
          </div>

          {/* Exercise Rows */}
          {exercises.map((ex) => {
            const isExpanded = expandedExercise === ex.id;
            return (
              <div
                key={ex.id}
                className={`bg-surface-container rounded-xl border-l-[8px] ${
                  isExpanded ? ex.borderAccent : 'border-surface-variant'
                } ${ex.borderColor} transition-all duration-300 group overflow-hidden shadow-lg`}
              >
                {/* Main Visible Row */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center">
                  <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
                    <span className="font-headline text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
                      {ex.title}
                    </span>
                    <span className={`font-headline text-xs uppercase font-extrabold tracking-wider ${ex.accentColor}`}>
                      {ex.category}
                    </span>
                  </div>

                  <div className="col-span-1 md:col-span-3 flex md:justify-center items-center gap-4">
                    <div className="bg-surface-container-high px-4 py-2 rounded-lg border border-surface-variant flex flex-col items-center min-w-[70px]">
                      <span className="font-headline text-[10px] uppercase font-bold text-on-surface-variant">Sets</span>
                      <span className="font-headline text-xl font-black text-on-surface">{ex.sets}</span>
                    </div>
                    <span className="text-surface-variant text-2xl font-light">×</span>
                    <div className="bg-surface-container-high px-4 py-2 rounded-lg border border-surface-variant flex flex-col items-center min-w-[80px]">
                      <span className="font-headline text-[10px] uppercase font-bold text-on-surface-variant">Reps</span>
                      <span className="font-headline text-xl font-black text-on-surface">{ex.reps}</span>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-3 mt-4 md:mt-0">
                    <a
                      href={getYouTubeSearchUrl(ex.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 border-2 ${ex.borderAccent} ${ex.accentColor} px-4 py-2 rounded-lg font-headline text-xs uppercase font-bold hover:bg-primary hover:text-on-primary transition-colors`}
                    >
                      <span className="material-symbols-outlined text-[18px]">play_circle</span>
                      Watch
                    </a>
                    <button
                      onClick={() => toggleDemo(ex.id)}
                      aria-expanded={isExpanded}
                      className="flex items-center gap-2 bg-surface-container-high border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-headline text-xs uppercase font-bold hover:bg-surface-bright transition-colors"
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
                  <div className="border-t border-surface-variant bg-surface p-6 md:p-8 animate-fadeIn">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      {/* Thick Border Image Container */}
                      <div className={`w-full md:w-5/12 aspect-video border-[8px] ${ex.borderAccent} rounded-xl relative overflow-hidden bg-surface-container-lowest shadow-2xl`}>
                        <img
                          src={ex.image}
                          alt={ex.title}
                          className="w-full h-full object-cover opacity-85 mix-blend-screen"
                        />
                        <div className="absolute inset-0 border border-primary/20 m-2 rounded pointer-events-none"></div>
                      </div>

                      <div className="w-full md:w-7/12 flex flex-col gap-4 justify-center">
                        <h4 className="font-headline text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2">
                          <span className={`material-symbols-outlined ${ex.accentColor}`}>psychology</span>
                          Mind-Muscle Connection
                        </h4>
                        <ul className="flex flex-col gap-3 font-body text-sm md:text-base text-on-background">
                          {ex.cues.map((cue, cIdx) => (
                            <li key={cIdx} className="flex gap-3 items-start">
                              <span className={`${ex.accentColor} font-bold mt-0.5`}>0{cIdx + 1}.</span>
                              <span className="text-on-surface-variant">{cue}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <span className="bg-surface-container-high text-on-surface-variant font-headline text-xs font-semibold px-3 py-1.5 rounded-md border border-surface-variant">
                            {ex.tempo}
                          </span>
                          <span className="bg-surface-container-high text-on-surface-variant font-headline text-xs font-semibold px-3 py-1.5 rounded-md border border-surface-variant">
                            {ex.rest}
                          </span>
                          <span className="bg-primary/10 text-primary font-headline text-xs font-semibold px-3 py-1.5 rounded-md border border-primary/30 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">analytics</span> 98% Form Match
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
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t-8 border-surface-variant flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-12 w-full mt-auto">
        <span className="font-headline text-xl font-bold text-on-surface tracking-tight">FitVerse</span>
        <div className="flex flex-wrap justify-center gap-6 font-headline text-xs font-bold text-on-surface-variant my-6 md:my-0 uppercase tracking-widest">
          <Link to="/onboarding" className="hover:text-primary transition-opacity">Privacy Policy</Link>
          <Link to="/onboarding" className="hover:text-primary transition-opacity">Terms of Service</Link>
          <Link to="/community" className="hover:text-primary transition-opacity">Contact</Link>
          <Link to="/nutrition" className="hover:text-primary transition-opacity">Support</Link>
        </div>
        <span className="font-headline text-[10px] text-on-surface-variant opacity-60 uppercase tracking-widest">
          © {new Date().getFullYear()} FitVerse. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
