import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePlan } from '../context/PlanContext';
import { API_URL } from '../config';
import WindowDots from '../components/WindowDots';
import NearbyGyms from '../components/NearbyGyms';

// ─── Helper: YouTube search URL per exercise ──────────────────────────────────
// Add curated video IDs to VIDEO_MAP to override the search-fallback:
// e.g. 'Barbell Deadlift': 'https://www.youtube.com/watch?v=SPECIFIC_ID'
const VIDEO_MAP = {};
const getYouTubeSearchUrl = (exerciseName) =>
  VIDEO_MAP[exerciseName] ||
  `https://www.youtube.com/results?search_query=${encodeURIComponent(
    (exerciseName || 'exercise') + ' exercise tutorial'
  )}`;

// ─── Constants ────────────────────────────────────────────────────────────────

const steps = [
  { id: 1, title: 'Biometrics & BMI', icon: 'straighten' },
  { id: 2, title: 'Primary Goal', icon: 'flag' },
  { id: 3, title: 'Dietary Preference', icon: 'restaurant_menu' },
  { id: 4, title: 'Activity Focus', icon: 'fitness_center' },
  { id: 5, title: 'AI Plan', icon: 'auto_awesome' },
];

const dietOptions = [
  {
    id: 'Vegetarian',
    name: 'Vegetarian',
    icon: 'spa',
    desc: 'Plant-forward nutrition with dairy and eggs. Focused on clean protein sources, legumes, and micronutrient balance.',
    macroFocus: 'High Fiber • Quality Dairy & Soy',
  },
  {
    id: 'Non-Vegetarian',
    name: 'Non-Vegetarian',
    icon: 'egg_alt',
    desc: 'Full macronutrient spectrum including lean poultry, seafood, red meat, eggs, and dairy for maximum protein synthesis.',
    macroFocus: 'Maximum Bioavailability • High Leucine',
  },
  {
    id: 'Vegan',
    name: 'Vegan',
    icon: 'eco',
    desc: '100% plant-exclusive nutrition. Zero animal products with complete plant proteins from pulses, tofu, and seeds.',
    macroFocus: '100% Plant Fuel • Clean Digestion',
  },
  {
    id: 'Lactose Intolerant',
    name: 'Lactose Intolerant',
    icon: 'water_drop',
    desc: 'Dairy-free nutrition designed for optimal gut health and reduced inflammation while maintaining high protein targets.',
    macroFocus: 'Dairy-Free • Gut-Friendly',
  },
];

const goalOptions = [
  {
    id: 'hypertrophy',
    title: 'Muscle Hypertrophy',
    desc: 'Build lean muscle mass with progressive mechanical tension and structured volume.',
    badge: 'High Protein Recommended',
    icon: 'fitness_center',
  },
  {
    id: 'fat_loss',
    title: 'Fat Loss & Definition',
    desc: 'Shed body fat while preserving lean tissue through a caloric deficit and strength focus.',
    badge: 'Metabolic Optimization',
    icon: 'local_fire_department',
  },
  {
    id: 'strength',
    title: 'Pure Strength & Power',
    desc: 'Maximal neuromuscular recruitment focused on barbell compound movement strength.',
    badge: 'Heavy Loading',
    icon: 'bolt',
  },
  {
    id: 'endurance',
    title: 'Cardiovascular & Stamina',
    desc: 'Enhance aerobic base, lactate threshold, and metabolic work capacity.',
    badge: 'Zone 2 & Conditioning',
    icon: 'directions_run',
  },
];

const activityStyles = [
  { id: 'gym', name: 'Barbell & Commercial Gym', icon: 'fitness_center' },
  { id: 'calisthenics', name: 'Bodyweight & Calisthenics', icon: 'accessibility_new' },
  { id: 'hybrid', name: 'Hybrid Functional & HIIT', icon: 'timer' },
  { id: 'home', name: 'Home Dumbbell & Bands', icon: 'home' },
];

const DAY_ACCENT_COLORS = [
  { border: 'border-primary', text: 'text-primary', borderAccent: 'border-primary' },
  { border: 'border-tertiary', text: 'text-tertiary', borderAccent: 'border-tertiary' },
  { border: 'border-primary-container', text: 'text-primary-container', borderAccent: 'border-primary-container' },
  { border: 'border-primary', text: 'text-primary', borderAccent: 'border-primary' },
  { border: 'border-tertiary', text: 'text-tertiary', borderAccent: 'border-tertiary' },
  { border: 'border-primary-container', text: 'text-primary-container', borderAccent: 'border-primary-container' },
  { border: 'border-primary', text: 'text-primary', borderAccent: 'border-primary' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Reusable exercise row with Demo expand + Watch overlay — mirrors Workout.jsx pattern.
 */
function ExerciseRow({ ex, idx, expandedId, setExpandedId, accentColors }) {
  const isExpanded = expandedId === idx;
  const { text: accentText, borderAccent } = accentColors;

  return (
    <div
      className={`bg-surface-container rounded-xl border-l-[8px] transition-all duration-300 overflow-hidden shadow-lg ${
        isExpanded ? borderAccent : 'border-surface-variant'
      } hover:${borderAccent}`}
    >
      {/* Main row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 items-center">
        <div className="col-span-1 md:col-span-5 flex flex-col gap-1">
          <span className="font-headline text-lg md:text-xl font-bold text-on-surface">
            {ex.title}
          </span>
          <span className={`font-headline text-[10px] uppercase font-extrabold tracking-wider ${accentText}`}>
            {ex.category}
          </span>
        </div>

        <div className="col-span-1 md:col-span-3 flex md:justify-center items-center gap-4">
          <div className="bg-surface-container-high px-3 py-2 rounded-lg border border-surface-variant flex flex-col items-center min-w-[60px]">
            <span className="font-headline text-[10px] uppercase font-bold text-on-surface-variant">Sets</span>
            <span className="font-headline text-xl font-black text-on-surface">{ex.sets}</span>
          </div>
          <span className="text-surface-variant text-xl font-light">×</span>
          <div className="bg-surface-container-high px-3 py-2 rounded-lg border border-surface-variant flex flex-col items-center min-w-[70px]">
            <span className="font-headline text-[10px] uppercase font-bold text-on-surface-variant">Reps</span>
            <span className="font-headline text-xl font-black text-on-surface">{ex.reps}</span>
          </div>
        </div>

        <div className="col-span-1 md:col-span-4 flex justify-start md:justify-end gap-2 mt-2 md:mt-0">
          <a
            href={getYouTubeSearchUrl(ex.title)}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 border-2 ${borderAccent} ${accentText} px-3 py-2 rounded-lg font-headline text-xs uppercase font-bold hover:bg-primary hover:text-on-primary hover:border-primary transition-colors`}
          >
            <span className="material-symbols-outlined text-[16px]">play_circle</span>
            Watch
          </a>
          <button
            onClick={() => setExpandedId(isExpanded ? null : idx)}
            aria-expanded={isExpanded}
            className="flex items-center gap-1.5 bg-surface-container-high border border-outline-variant text-on-surface px-3 py-2 rounded-lg font-headline text-xs uppercase font-bold hover:bg-surface-bright transition-colors"
          >
            Demo
            <span className="material-symbols-outlined text-[16px]">
              {isExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Demo Section */}
      {isExpanded && (
        <div className="border-t border-surface-variant bg-surface p-6 md:p-8 animate-fadeIn">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* AI Biomechanics Frame (no static image needed) */}
            <div className={`w-full md:w-5/12 aspect-video border-[8px] ${borderAccent} rounded-xl relative overflow-hidden bg-surface-container-lowest shadow-2xl flex items-center justify-center`}>
              <div className="flex flex-col items-center gap-3 p-4 text-center">
                <span className={`material-symbols-outlined text-5xl ${accentText} opacity-40`}>fitness_center</span>
                <span className={`font-headline text-xs font-bold tracking-widest ${accentText} opacity-60 uppercase`}>
                  AI Biomechanics Reference
                </span>
              </div>
              <div className="absolute inset-0 border border-primary/20 m-2 rounded pointer-events-none"></div>
            </div>

            <div className="w-full md:w-7/12 flex flex-col gap-4 justify-center">
              <h4 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
                <span className={`material-symbols-outlined ${accentText}`}>psychology</span>
                Mind-Muscle Connection
              </h4>
              <ul className="flex flex-col gap-3 font-body text-sm text-on-background">
                {(ex.cues || []).map((cue, cIdx) => (
                  <li key={cIdx} className="flex gap-3 items-start">
                    <span className={`${accentText} font-bold mt-0.5`}>0{cIdx + 1}.</span>
                    <span className="text-on-surface-variant">{cue}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-3">
                <span className="bg-surface-container-high text-on-surface-variant font-headline text-xs font-semibold px-3 py-1.5 rounded-md border border-surface-variant">
                  {ex.tempo}
                </span>
                <span className="bg-surface-container-high text-on-surface-variant font-headline text-xs font-semibold px-3 py-1.5 rounded-md border border-surface-variant">
                  {ex.rest}
                </span>
                <span className="bg-primary/10 text-primary font-headline text-xs font-semibold px-3 py-1.5 rounded-md border border-primary/30 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">analytics</span> AI Optimized
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Day panel — workout section + diet section
 */
function DayPanel({ workout, diet, dayIdx }) {
  const [expandedId, setExpandedId] = useState(null);
  const accentColors = DAY_ACCENT_COLORS[dayIdx % DAY_ACCENT_COLORS.length];
  const isRestDay = !workout.exercises || workout.exercises.length === 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Workout Section ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className={`material-symbols-outlined ${accentColors.text}`}>fitness_center</span>
          <h3 className="font-headline text-lg font-bold text-on-surface">
            {workout.focus || workout.type}
          </h3>
          <span className="font-headline text-[10px] uppercase font-bold px-2 py-1 rounded bg-surface-container-high text-on-surface-variant ml-auto">
            {workout.duration || (isRestDay ? 'Rest' : '60 min')}
          </span>
        </div>

        {isRestDay ? (
          <div className="p-6 bg-surface rounded-xl border border-surface-variant flex items-center gap-4">
            <span className="material-symbols-outlined text-3xl text-on-surface-variant opacity-50">bedtime</span>
            <div>
              <p className="font-headline text-sm font-bold text-on-surface">Rest & Recovery Day</p>
              <p className="text-xs text-on-surface-variant mt-1">
                Prioritize sleep, light stretching, and hydration. Let your muscles repair and grow stronger.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="hidden md:grid grid-cols-12 gap-4 px-5 pb-2 border-b border-surface-variant font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">
              <div className="col-span-5">Movement Protocol</div>
              <div className="col-span-3 text-center">Volume</div>
              <div className="col-span-4 text-right">Execution</div>
            </div>
            {workout.exercises.map((ex, idx) => (
              <ExerciseRow
                key={idx}
                ex={ex}
                idx={idx}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                accentColors={accentColors}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Diet Section ── */}
      {diet && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="material-symbols-outlined text-tertiary">restaurant_menu</span>
            <h3 className="font-headline text-lg font-bold text-on-surface">Nutrition Protocol</h3>
            <div className="ml-auto flex gap-3 text-[10px] font-headline font-bold">
              <span className="px-2.5 py-1 bg-primary/10 text-primary rounded border border-primary/30">{diet.macros?.protein}g Protein</span>
              <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary rounded border border-tertiary/30 hidden sm:inline">{diet.macros?.carbs}g Carbs</span>
              <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant rounded border border-surface-variant hidden md:inline">{diet.totalCalories} kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(diet.meals || []).map((meal, mIdx) => (
              <div
                key={mIdx}
                className="bg-surface rounded-xl border border-surface-variant p-5 hover:border-outline transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-headline text-xs uppercase font-bold text-on-surface-variant tracking-wider">
                    {meal.name}
                  </span>
                  <span className="font-headline text-xs font-bold text-tertiary">{meal.calories} kcal</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">{meal.description}</p>
                {meal.protein && (
                  <span className="mt-3 inline-block text-[10px] font-headline font-bold px-2 py-0.5 bg-primary/10 text-primary rounded border border-primary/20">
                    {meal.protein}g protein
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Supplements tab
 */
function SupplementsPanel({ supplements }) {
  return (
    <div className="animate-fadeIn space-y-4">
      <p className="text-on-surface-variant text-sm">
        Evidence-based supplementation stack tailored to your goal and dietary profile.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {supplements.map((s, idx) => (
          <div
            key={idx}
            className="bg-surface-container-high rounded-xl border border-surface-variant p-5 flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">medication</span>
                <h4 className="font-headline text-sm font-bold text-on-surface">{s.name}</h4>
              </div>
              <span className="font-headline text-[10px] uppercase font-bold px-2 py-1 bg-primary/10 text-primary rounded border border-primary/20">
                {s.dose}
              </span>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="font-headline text-[10px] font-bold px-2 py-1 bg-surface text-tertiary rounded border border-surface-variant uppercase">
                {s.timing}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">{s.rationale}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const LOADING_STEPS = [
  { text: 'Analyzing your profile...', icon: 'biotech' },
  { text: 'Calculating optimal macros...', icon: 'calculate' },
  { text: 'Structuring your weekly workout split...', icon: 'fitness_center' },
  { text: 'Matching exercises to your goals...', icon: 'psychology' },
  { text: 'Finalizing your nutrition plan...', icon: 'restaurant_menu' },
];

/**
 * Interactive AI plan generation loading state with rotating status messages and progress indicator.
 */
function AiPlanLoader({ diet, goal }) {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 1800);

    const progInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 88) return prev + Math.random() * 4 + 1.2;
        if (prev < 96) return prev + 0.25;
        return prev;
      });
    }, 350);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
    };
  }, []);

  const currentStep = LOADING_STEPS[loadingIndex];

  return (
    <div className="py-8 px-2 flex flex-col items-center gap-6 text-center animate-fadeIn max-w-xl mx-auto">
      <WindowDots />
      {/* Central Pulsing / Rotating AI Core */}
      <div className="relative flex items-center justify-center my-2">
        <div className="absolute w-24 h-24 rounded-full border-2 border-primary/20 animate-ping opacity-25" />
        <div className="absolute w-20 h-20 rounded-full border border-primary/30 animate-pulse" />
        <div className="w-16 h-16 rounded-full border-4 border-surface-variant border-t-primary border-r-primary/40 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-2xl animate-pulse">
            {currentStep.icon}
          </span>
        </div>
      </div>

      {/* Rotating status text */}
      <div className="space-y-2 w-full">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span className="font-headline text-[10px] uppercase font-extrabold tracking-widest text-primary">
            SYNTHESIS PHASE {loadingIndex + 1} OF {LOADING_STEPS.length}
          </span>
        </div>

        <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface transition-all duration-300 min-h-[32px] flex items-center justify-center">
          {currentStep.text}
        </h3>

        <p className="text-on-surface-variant text-xs md:text-sm max-w-md mx-auto leading-relaxed">
          Gemini 2.5 Flash is tailoring your 7-day protocol for {diet.toLowerCase()} nutrition and {goal.replace('_', ' ')}.
        </p>
      </div>

      {/* Slim dynamic progress bar */}
      <div className="w-full space-y-2 bg-surface-container p-4 rounded-xl border border-surface-variant">
        <div className="flex justify-between text-[11px] font-headline font-bold text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-primary">auto_awesome</span>
            Neural Protocol Assembly
          </span>
          <span className="text-primary font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Live status check items */}
      <div className="grid grid-cols-3 gap-3 w-full pt-1">
        {[
          { label: 'Workout Split', active: loadingIndex >= 0 },
          { label: 'Macro Matrix', active: loadingIndex >= 1 },
          { label: 'Supplements', active: loadingIndex >= 3 },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-xl border text-center transition-all duration-500 ${
              item.active
                ? 'bg-surface-container border-primary/40 text-primary shadow-sm'
                : 'bg-surface border-surface-variant text-on-surface-variant/40'
            }`}
          >
            <span className="material-symbols-outlined text-base block mb-1">
              {item.active ? 'check_circle' : 'hourglass_empty'}
            </span>
            <span className="font-headline text-[10px] font-bold uppercase tracking-wider block truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Onboarding Component ────────────────────────────────────────────────

export default function Onboarding() {
  const navigate = useNavigate();
  const { plan, setPlan, profile, setProfile, clearPlan } = usePlan();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState(() => ({
    age: profile?.age || '26',
    gender: profile?.gender || 'male',
    height: profile?.height || '178',
    weight: profile?.weight || '75',
    menstruates: profile?.menstruates || 'no',
    lastPeriodDate: profile?.lastPeriodDate || '',
    cycleLength: profile?.cycleLength || '28',
    goal: profile?.goal || 'hypertrophy',
    diet: profile?.diet || 'Non-Vegetarian',
    activityStyle: profile?.activityStyle || 'gym',
    frequency: profile?.frequency || '4',
  }));

  // Step 5 state (loading/error remain local, plan data lives in PlanContext)
  const [planState, setPlanState] = useState(() => (plan ? 'success' : 'idle'));
  const [planError, setPlanError] = useState('');
  const [activeDay, setActiveDay] = useState(0); // 0-6 = Mon-Sun
  const [activePlanTab, setActivePlanTab] = useState('workout'); // 'workout' | 'nutrition' | 'supplements'
  const [saveState, setSaveState] = useState('idle'); // idle | saving | saved | error

  // Calculate BMI
  const calculateBmiData = () => {
    const hInM = parseFloat(formData.height) / 100;
    const wInKg = parseFloat(formData.weight);
    if (hInM > 0 && wInKg > 0) {
      const bmi = (wInKg / (hInM * hInM)).toFixed(1);
      let category = 'Normal weight';
      let color = 'text-primary';
      let recommendation = 'Hypertrophy or recomposition is ideal.';

      if (bmi < 18.5) {
        category = 'Underweight';
        color = 'text-tertiary';
        recommendation = 'Caloric surplus and strength-focused progressive overload.';
      } else if (bmi < 24.9) {
        category = 'Normal weight';
        color = 'text-primary';
        recommendation = 'Ideal baseline for lean muscle building or recomposition.';
      } else if (bmi < 29.9) {
        category = 'Overweight';
        color = 'text-tertiary';
        recommendation = 'Moderate deficit with high protein retention protocols.';
      } else {
        category = 'Obese';
        color = 'text-error';
        recommendation = 'Gradual lifestyle recomposition with low-impact volume.';
      }
      return { bmi, category, color, recommendation };
    }
    return { bmi: '23.7', category: 'Normal weight', color: 'text-primary', recommendation: 'Solid baseline.' };
  };

  // ─── BMI → Suggested Goal mapping (fixes underweight bug) ────────────────────
  const getBmiSuggestedGoal = (category) => {
    if (category === 'Underweight') return { id: 'hypertrophy', label: 'Gain Weight — Muscle Hypertrophy' };
    if (category === 'Normal weight') return { id: 'hypertrophy', label: 'Maintain — Lean Muscle Recomposition' };
    // Overweight or Obese
    return { id: 'fat_loss', label: 'Lose Weight — Fat Loss & Definition' };
  };

  const bmiData = calculateBmiData();

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // ── Generate Plan ──────────────────────────────────────────────────────────
  const handleGeneratePlan = async () => {
    setPlanState('loading');
    setPlanError('');
    setActiveDay(0);

    try {
      const response = await fetch(`${API_URL}/api/generate-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bmi: bmiData.bmi,
          bmiCategory: bmiData.category,
          goal: formData.goal,
          dietaryPreference: formData.diet,
          activityStyle: formData.activityStyle,
          frequency: formData.frequency,
          menstruates: formData.menstruates,
          lastPeriodDate: formData.lastPeriodDate,
          cycleLength: formData.cycleLength,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Plan generation failed.');
      }

      // Persist to PlanContext and localStorage
      setPlan(data.plan);
      setProfile({
        ...formData,
        bmi: bmiData.bmi,
        bmiCategory: bmiData.category,
      });
      setPlanState('success');
    } catch (err) {
      setPlanError(err.message || 'Unknown error occurred.');
      setPlanState('error');
    }
  };

  // ── Save Plan to Profile ───────────────────────────────────────────────────
  const handleSaveAndNavigate = async () => {
    setSaveState('saving');
    try {
      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'user_' + Date.now(),
          plan: plan,
          onboardingData: {
            ...formData,
            bmi: bmiData.bmi,
            bmiCategory: bmiData.category,
          },
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSaveState('saved');
        setTimeout(() => navigate('/profile'), 600);
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (err) {
      console.error('Save error:', err.message);
      setSaveState('error');
      // Still navigate after a brief pause — don't block the user
      setTimeout(() => navigate('/profile'), 1200);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background text-on-background py-10 px-4 md:px-12 flex flex-col items-center justify-center font-body selection:bg-primary selection:text-on-primary">
      <div className="w-full max-w-4xl">
        {/* ── Step Progress Bar ── */}
        <div className="mb-10 bg-surface-container-low p-6 rounded-2xl border-[8px] border-surface-variant shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <span className="font-headline text-xs uppercase font-extrabold tracking-widest text-primary">
              ONBOARDING PROTOCOL • STEP {currentStep} OF 5
            </span>
            <span className="font-headline text-xs font-bold text-on-surface-variant">
              {steps[currentStep - 1].title}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 md:gap-4">
            {steps.map((s) => {
              const isCompleted = s.id < currentStep;
              const isCurrent = s.id === currentStep;
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(s.id)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl text-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-md'
                      : isCompleted
                      ? 'bg-primary/20 text-primary hover:bg-primary/30'
                      : 'bg-surface-container text-on-surface-variant/60 hover:bg-surface-variant'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-base">
                      {isCompleted ? 'check_circle' : s.icon}
                    </span>
                    <span className="hidden sm:inline font-headline text-xs font-bold">
                      {s.id}.
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs font-medium truncate max-w-full">
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Step Card Canvas ── */}
        <div className="bg-surface-container-low border-[8px] border-surface-variant rounded-2xl p-6 md:p-10 shadow-2xl relative overflow-hidden">

          {/* ══ STEP 1: Biometrics & BMI ══════════════════════════════════════ */}
          {currentStep === 1 && (
            <div className="animate-fadeIn space-y-8">
              <WindowDots />
              <div>
                <span className="px-3 py-1 bg-surface-container-high rounded-full font-headline text-[10px] uppercase font-bold tracking-widest text-primary">
                  BASELINE MEASUREMENTS
                </span>
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
                  Body Mass Index & Biometrics
                </h2>
                <p className="text-on-surface-variant text-sm mt-1">
                  Enter your stats to establish baseline metabolic parameters.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Age</label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:border-primary outline-none text-sm font-semibold"
                      placeholder="e.g. 26"
                      min="14"
                      max="99"
                    />
                  </div>
                  <div>
                    <label className="block font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Height (cm)</label>
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:border-primary outline-none text-sm font-semibold"
                      placeholder="e.g. 178"
                    />
                  </div>
                  <div>
                    <label className="block font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Weight (kg)</label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-on-surface focus:border-primary outline-none text-sm font-semibold"
                      placeholder="e.g. 75"
                    />
                  </div>

                  {/* ── Cycle Tracking (Menstruation Question) ── */}
                  <div className="pt-3 border-t border-surface-variant space-y-3">
                    <div>
                      <label className="block font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                        Do you menstruate?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'yes', label: 'Yes' },
                          { id: 'no', label: 'No' },
                          { id: 'prefer_not_to_say', label: 'Prefer not to say' },
                        ].map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setFormData({ ...formData, menstruates: opt.id })}
                            className={`py-2.5 px-2 sm:px-3 rounded-xl font-headline text-xs font-bold transition-all duration-150 cursor-pointer text-center border ${
                              formData.menstruates === opt.id
                                ? 'bg-primary-container text-on-primary-container border-primary shadow-sm'
                                : 'bg-surface text-on-surface-variant border-outline-variant hover:bg-surface-variant hover:text-white'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Inline smooth expand if 'Yes' is selected */}
                    {formData.menstruates === 'yes' && (
                      <div className="bg-surface rounded-xl p-4 border border-primary/30 space-y-3 animate-fadeIn">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-headline text-xs font-bold text-primary flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-sm">female</span>
                            Cycle Parameters
                          </span>
                          <span className="text-[10px] text-on-surface-variant/70 italic">
                            Optional — helps us tailor your plan to your cycle
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                          <div>
                            <label className="block font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                              Date of last period start
                            </label>
                            <input
                              type="date"
                              value={formData.lastPeriodDate}
                              onChange={(e) => setFormData({ ...formData, lastPeriodDate: e.target.value })}
                              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-on-surface focus:border-primary outline-none text-xs font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block font-headline text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                              Average cycle length (days)
                            </label>
                            <input
                              type="number"
                              value={formData.cycleLength}
                              onChange={(e) => setFormData({ ...formData, cycleLength: e.target.value })}
                              className="w-full bg-surface-container border border-outline-variant rounded-xl px-3 py-2 text-on-surface focus:border-primary outline-none text-xs font-semibold"
                              placeholder="28"
                              min="21"
                              max="35"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* BMI Result Card */}
                <div className="bg-surface-container-high rounded-2xl p-6 border border-outline-variant flex flex-col justify-between shadow-lg">
                  <div>
                    <span className="font-headline text-[10px] uppercase font-bold text-on-surface-variant tracking-wider">Calculated Metric</span>
                    <div className="flex items-baseline gap-3 mt-2">
                      <span className="font-headline text-5xl font-black text-on-surface">{bmiData.bmi}</span>
                      <span className={`font-headline text-sm font-bold uppercase ${bmiData.color}`}>{bmiData.category}</span>
                    </div>
                  </div>
                  <div className="my-4 p-4 bg-surface rounded-xl border border-surface-variant">
                    <span className="font-headline text-[11px] font-bold text-primary flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined text-sm">insights</span> AI Biomarker Note
                    </span>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{bmiData.recommendation}</p>
                  </div>
                  <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(10, (parseFloat(bmiData.bmi) / 35) * 100))}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ STEP 2: Goal Recommendation ════════════════════════════════════ */}
          {currentStep === 2 && (() => {
            const suggested = getBmiSuggestedGoal(bmiData.category);
            return (
              <div className="animate-fadeIn space-y-6">
                <WindowDots />
                <div>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full font-headline text-[10px] uppercase font-bold tracking-widest text-primary">
                    TARGET VECTOR
                  </span>
                  <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
                    Select Your Primary Goal
                  </h2>
                  <p className="text-on-surface-variant text-sm mt-1">
                    Choose the primary adaptation stimulus your program will be optimized for.
                  </p>
                </div>

                {/* BMI-based recommendation banner */}
                <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">insights</span>
                  <div>
                    <p className="font-headline text-xs font-bold text-primary uppercase tracking-widest mb-1">BMI Recommendation — {bmiData.category}</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Based on your BMI of <strong className="text-on-surface">{bmiData.bmi}</strong> ({bmiData.category}),
                      we recommend: <strong className="text-primary">{suggested.label}</strong>.
                      You can still choose any goal below.
                    </p>
                    <button
                      onClick={() => setFormData({ ...formData, goal: suggested.id })}
                      className="mt-2 text-[10px] font-headline font-extrabold uppercase tracking-widest text-primary hover:underline cursor-pointer"
                    >
                      Apply Recommendation →
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {goalOptions.map((goal) => {
                    const isSelected = formData.goal === goal.id;
                    const isSuggested = goal.id === suggested.id;
                    return (
                      <div
                        key={goal.id}
                        onClick={() => setFormData({ ...formData, goal: goal.id })}
                        className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-surface-variant bg-surface hover:border-outline hover:bg-surface-container'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className={`material-symbols-outlined text-2xl ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                              {goal.icon}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {isSuggested && (
                                <span className="font-headline text-[9px] uppercase font-extrabold px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                                  Recommended
                                </span>
                              )}
                              <span className="font-headline text-[10px] uppercase font-bold px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant">
                                {goal.badge}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-headline text-lg font-bold text-on-surface mb-1">{goal.title}</h3>
                          <p className="text-xs text-on-surface-variant leading-relaxed">{goal.desc}</p>
                        </div>
                        {isSelected && (
                          <div className="mt-4 text-primary text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span> Selected Strategy
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* ══ STEP 3: Dietary Preference ════════════════════════════════════ */}
          {currentStep === 3 && (
            <div className="animate-fadeIn space-y-6">
              <WindowDots />
              <div>
                <span className="px-3 py-1 bg-surface-container-high rounded-full font-headline text-[10px] uppercase font-bold tracking-widest text-primary">
                  NUTRITIONAL MATRIX
                </span>
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
                  Dietary Preference
                </h2>
                <p className="text-on-surface-variant text-sm mt-1">
                  Select your primary dietary framework. Meal suggestions and macro ratios will adjust accordingly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {dietOptions.map((diet) => {
                  const isSelected = formData.diet === diet.id;
                  return (
                    <div
                      key={diet.id}
                      onClick={() => setFormData({ ...formData, diet: diet.id })}
                      className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected ? 'border-primary bg-primary/10 shadow-xl' : 'border-surface-variant bg-surface hover:border-outline hover:bg-surface-container'
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-primary'}`}>
                              <span className="material-symbols-outlined text-xl">{diet.icon}</span>
                            </div>
                            <h3 className="font-headline text-lg font-bold text-on-surface">{diet.name}</h3>
                          </div>
                          {isSelected && (
                            <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{diet.desc}</p>
                      </div>
                      <div className="pt-3 border-t border-surface-variant/60 flex items-center justify-between">
                        <span className="font-headline text-[10px] uppercase font-extrabold tracking-wider text-tertiary">{diet.macroFocus}</span>
                        <span className="text-xs font-semibold text-primary group-hover:underline">
                          {isSelected ? 'Active Preference' : 'Select'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ STEP 4: Activity Focus ════════════════════════════════════════ */}
          {currentStep === 4 && (
            <div className="animate-fadeIn space-y-8">
              <WindowDots />
              <div>
                <span className="px-3 py-1 bg-surface-container-high rounded-full font-headline text-[10px] uppercase font-bold tracking-widest text-primary">
                  TRAINING MODALITY
                </span>
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
                  Activity Style & Frequency
                </h2>
                <p className="text-on-surface-variant text-sm mt-1">
                  How and where do you prefer to train, and how many days can you commit?
                </p>
              </div>

              <div>
                <label className="block font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Preferred Modality</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activityStyles.map((style) => {
                    const isSelected = formData.activityStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => setFormData({ ...formData, activityStyle: style.id })}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                          isSelected ? 'border-primary bg-primary/10' : 'border-surface-variant bg-surface hover:border-outline'
                        }`}
                      >
                        <span className={`material-symbols-outlined ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {style.icon}
                        </span>
                        <span className="font-headline text-sm font-bold text-on-surface">{style.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block font-headline text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">Weekly Training Frequency</label>
                <div className="grid grid-cols-4 gap-3">
                  {['3', '4', '5', '6'].map((days) => {
                    const isSelected = formData.frequency === days;
                    return (
                      <button
                        key={days}
                        type="button"
                        onClick={() => setFormData({ ...formData, frequency: days })}
                        className={`py-4 rounded-xl font-headline text-sm font-black border-2 transition-all cursor-pointer ${
                          isSelected ? 'border-primary bg-primary text-on-primary shadow-md' : 'border-surface-variant bg-surface text-on-surface hover:border-outline'
                        }`}
                      >
                        {days} Days / Wk
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ══ STEP 5: AI Plan Generation ════════════════════════════════════ */}
          {currentStep === 5 && (
            <div className="animate-fadeIn space-y-6">

              {/* ── Phase A: Pre-generation (idle / error) ── */}
              {(planState === 'idle' || planState === 'error') && (
                <>
                  <WindowDots />
                  <div>
                    <span className="px-3 py-1 bg-primary/20 text-primary rounded-full font-headline text-[10px] uppercase font-bold tracking-widest">
                      READY TO GENERATE
                    </span>
                    <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
                      Your Onboarding Profile
                    </h2>
                    <p className="text-on-surface-variant text-sm mt-1">
                      Review your inputs, then let Gemini AI synthesize your custom 7-day protocol.
                    </p>
                  </div>

                  {/* Profile Summary Bento */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant">
                      <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Biometrics</span>
                      <div className="font-headline text-base font-black text-on-surface mt-1">{formData.height}cm · {formData.weight}kg</div>
                      <span className="text-xs text-primary font-bold">BMI {bmiData.bmi} ({bmiData.category})</span>
                    </div>
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant">
                      <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Goal</span>
                      <div className="font-headline text-base font-black text-on-surface mt-1 capitalize">{formData.goal.replace('_', ' ')}</div>
                      <span className="text-xs text-tertiary font-bold">Priority Objective</span>
                    </div>
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant">
                      <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Diet</span>
                      <div className="font-headline text-base font-black text-primary mt-1">{formData.diet}</div>
                      <span className="text-xs text-on-surface-variant">Macro Engine Tagged</span>
                    </div>
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant">
                      <span className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Training</span>
                      <div className="font-headline text-base font-black text-on-surface mt-1">{formData.frequency}×/Wk</div>
                      <span className="text-xs text-on-surface-variant capitalize">{formData.activityStyle}</span>
                    </div>
                  </div>

                  {/* Error card */}
                  {planState === 'error' && (
                    <div className="p-4 bg-error/10 border border-error/40 rounded-xl flex items-start gap-3">
                      <span className="material-symbols-outlined text-error text-xl shrink-0">error</span>
                      <div>
                        <p className="font-headline text-sm font-bold text-error">Generation Failed</p>
                        <p className="text-xs text-on-surface-variant mt-1">{planError}</p>
                      </div>
                    </div>
                  )}

                  {/* Generate CTA */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleGeneratePlan}
                      className="flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-on-primary font-headline text-sm uppercase font-extrabold tracking-widest hover:bg-primary-container transition-all shadow-lg shadow-primary/20 cursor-pointer group"
                    >
                      <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">auto_awesome</span>
                      {planState === 'error' ? 'Retry AI Generation' : 'Generate My AI Plan'}
                    </button>
                    <p className="text-xs text-on-surface-variant max-w-[200px] leading-relaxed">
                      Powered by Gemini 2.5 Flash. Takes ~20–40s.
                    </p>
                  </div>
                </>
              )}

              {/* ── Phase B: Loading ── */}
              {planState === 'loading' && (
                <AiPlanLoader diet={formData.diet} goal={formData.goal} />
              )}

              {/* ── Phase C: Plan Display ── */}
              {((planState === 'success' && plan) || plan) && (
                <div className="space-y-6">
                  <WindowDots />
                  {/* Plan summary banner */}
                  <div className="p-5 bg-primary/10 rounded-xl border border-primary/30 flex gap-3 items-start">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">smart_toy</span>
                    <div>
                      <span className="font-headline text-[10px] uppercase font-bold text-primary tracking-widest">GEMINI AI PROTOCOL GENERATED</span>
                      <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">{plan.planSummary}</p>
                    </div>
                  </div>

                  {/* Cycle Adaptation Note — renders only when Gemini returned a non-null note */}
                  {plan.cycleAdaptationNote && (
                    <div
                      className="p-5 rounded-xl border flex gap-3 items-start"
                      style={{
                        background: 'linear-gradient(135deg, rgba(245,163,199,0.12) 0%, rgba(179,153,224,0.12) 100%)',
                        borderColor: 'rgba(245,163,199,0.35)',
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-xl shrink-0 mt-0.5"
                        style={{ color: '#f5a3c7' }}
                      >
                        cycle
                      </span>
                      <div>
                        <span
                          className="font-headline text-[10px] uppercase font-bold tracking-widest"
                          style={{
                            background: 'linear-gradient(90deg, #f5a3c7, #b399e0)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          CYCLE-SYNCED ADAPTATION
                        </span>
                        <p className="text-sm mt-1 leading-relaxed" style={{ color: 'rgba(245,163,199,0.9)' }}>
                          {plan.cycleAdaptationNote}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── Outer Workout / Nutrition / Supplements / Nearby Gyms pill-tabs ── */}
                  <div className="flex gap-2 p-1 bg-surface-container rounded-xl border border-surface-variant w-fit overflow-x-auto max-w-full">
                    {[
                      { id: 'workout',      icon: 'fitness_center',  label: 'Workout Routine' },
                      { id: 'nutrition',    icon: 'restaurant_menu', label: 'Nutrition' },
                      { id: 'supplements',  icon: 'medication',      label: 'Supplements' },
                      { id: 'nearby_gyms',  icon: 'location_on',     label: 'Nearby Gyms' },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActivePlanTab(tab.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-headline text-xs font-bold uppercase tracking-wider transition-all duration-150 ease-out cursor-pointer shrink-0 ${
                          activePlanTab === tab.id
                            ? 'bg-primary text-on-primary shadow-md'
                            : 'text-on-surface-variant hover:bg-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div key={activePlanTab} className="tab-transition">
                    {/* ── WORKOUT TAB ── */}
                    {activePlanTab === 'workout' && (
                      <div className="space-y-4">
                        {/* Day tabs (Mon–Sun) */}
                        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
                          {(plan.weeklyWorkout || []).map((day, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveDay(idx)}
                              className={`shrink-0 px-3 py-2 rounded-lg font-headline text-xs font-bold transition-all duration-150 ease-out cursor-pointer ${
                                activeDay === idx
                                  ? 'bg-primary text-on-primary shadow-md'
                                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                              }`}
                            >
                              {day.day?.slice(0, 3).toUpperCase()}
                              {day.type === 'Rest' || day.type === 'Active Recovery' ? (
                                <span className="block text-[9px] font-normal opacity-70">Rest</span>
                              ) : (
                                <span className="block text-[9px] font-normal opacity-70">{(day.exercises || []).length} ex</span>
                              )}
                            </button>
                          ))}
                        </div>
                        {/* Day panel (workout only — no diet in this tab) */}
                        <div className="bg-surface rounded-xl border border-surface-variant p-6">
                          <DayPanel
                            key={activeDay}
                            workout={plan.weeklyWorkout[activeDay]}
                            diet={null}
                            dayIdx={activeDay}
                          />
                        </div>
                      </div>
                    )}

                    {/* ── NUTRITION TAB ── */}
                    {activePlanTab === 'nutrition' && (
                      <div className="space-y-4">
                        {/* Day tabs (Mon–Sun) */}
                        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
                          {(plan.weeklyDiet || []).map((day, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveDay(idx)}
                              className={`shrink-0 px-3 py-2 rounded-lg font-headline text-xs font-bold transition-all duration-150 ease-out cursor-pointer ${
                                activeDay === idx
                                  ? 'bg-tertiary text-on-primary shadow-md'
                                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                              }`}
                            >
                              {(plan.weeklyWorkout?.[idx]?.day || `Day ${idx + 1}`)?.slice(0, 3).toUpperCase()}
                              <span className="block text-[9px] font-normal opacity-70">
                                {day?.totalCalories ? `${day.totalCalories} kcal` : 'Diet'}
                              </span>
                            </button>
                          ))}
                        </div>
                        {/* Diet panel */}
                        <div className="bg-surface rounded-xl border border-surface-variant p-6 animate-fadeIn">
                          {plan.weeklyDiet?.[activeDay] ? (
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="material-symbols-outlined text-tertiary">restaurant_menu</span>
                                <h3 className="font-headline text-lg font-bold text-on-surface">Nutrition Protocol</h3>
                                <div className="ml-auto flex gap-3 text-[10px] font-headline font-bold">
                                  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded border border-primary/30">{plan.weeklyDiet[activeDay].macros?.protein}g Protein</span>
                                  <span className="px-2.5 py-1 bg-tertiary/10 text-tertiary rounded border border-tertiary/30 hidden sm:inline">{plan.weeklyDiet[activeDay].macros?.carbs}g Carbs</span>
                                  <span className="px-2.5 py-1 bg-surface-container-high text-on-surface-variant rounded border border-surface-variant hidden md:inline">{plan.weeklyDiet[activeDay].totalCalories} kcal</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {(plan.weeklyDiet[activeDay].meals || []).map((meal, mIdx) => (
                                  <div key={mIdx} className="bg-surface-container rounded-xl border border-surface-variant p-5 hover:border-outline transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                      <span className="font-headline text-xs uppercase font-bold text-on-surface-variant tracking-wider">{meal.name}</span>
                                      <span className="font-headline text-xs font-bold text-tertiary">{meal.calories} kcal</span>
                                    </div>
                                    <p className="text-xs text-on-surface-variant leading-relaxed">{meal.description}</p>
                                    {meal.protein && (
                                      <span className="mt-3 inline-block text-[10px] font-headline font-bold px-2 py-0.5 bg-primary/10 text-primary rounded border border-primary/20">
                                        {meal.protein}g protein
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <p className="text-on-surface-variant text-sm">No nutrition data for this day.</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* ── SUPPLEMENTS TAB ── */}
                    {activePlanTab === 'supplements' && (
                      <div className="bg-surface rounded-xl border border-surface-variant p-6">
                        <SupplementsPanel supplements={plan.supplements || []} />
                      </div>
                    )}

                    {/* ── NEARBY GYMS TAB ── */}
                    {activePlanTab === 'nearby_gyms' && (
                      <div className="bg-surface rounded-xl border border-surface-variant p-6">
                        <NearbyGyms />
                      </div>
                    )}
                  </div>

                  {/* Save CTA */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={handleSaveAndNavigate}
                      disabled={saveState === 'saving' || saveState === 'saved'}
                      className={`flex items-center gap-2 px-8 py-3 rounded-xl font-headline text-xs uppercase font-extrabold tracking-widest transition-all shadow-lg cursor-pointer ${
                        saveState === 'saved'
                          ? 'bg-primary/50 text-on-primary cursor-default'
                          : 'bg-primary text-on-primary hover:bg-primary-container'
                      }`}
                    >
                      {saveState === 'saving' && (
                        <span className="w-4 h-4 border-2 border-on-primary/50 border-t-on-primary rounded-full animate-spin"></span>
                      )}
                      {saveState === 'saved' && <span className="material-symbols-outlined text-sm">check_circle</span>}
                      {saveState === 'idle' && <span className="material-symbols-outlined text-sm">save</span>}
                      {saveState === 'saving' ? 'Saving...' : saveState === 'saved' ? 'Saved! Redirecting...' : 'Save Plan & Go to Profile'}
                    </button>
                    <button
                      onClick={() => { setPlanState('idle'); clearPlan(); }}
                      className="text-xs font-headline font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      ↩ Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Navigation Controls ── */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-surface-variant">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-on-surface font-headline text-xs uppercase font-bold tracking-wider transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {currentStep < 5 && (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-3 rounded-xl bg-primary text-on-primary font-headline text-xs uppercase font-extrabold tracking-widest hover:bg-primary-container transition-all shadow-lg cursor-pointer"
              >
                Continue to Step {currentStep + 1}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
