import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlan } from '../context/PlanContext';

const phaseDetails = {
  menstrual: {
    name: 'Menstrual Phase',
    days: 'Days 1 – 5',
    tag: 'RESTORATIVE & LOW INTENSITY',
    hormoneStatus: 'Low Estrogen & Progesterone',
    energyLevel: 'Low to Moderate (40%)',
    summary: 'Your body is shedding the uterine lining. Hormones are at baseline, making this the best window for active recovery, low-impact mobility, and iron replenishment.',
    workoutTip: 'Focus on gentle mobility, walking, light stretching, or bodyweight flows. Avoid high-stress maximum lifting sessions.',
    workoutBadge: 'Z1 Active Recovery',
    nutritionTip: 'Prioritize iron-rich foods (spinach, lentils, lean beef), warm bone broths, dark chocolate, and anti-inflammatory spices like turmeric.',
    nutritionBadge: 'Iron & Micronutrient Matrix',
    recoveryTip: 'Aim for 8.5+ hours of sleep. Warm magnesium baths and diaphragmatic breathing will alleviate pelvic and lower back tension.',
    recoveryBadge: 'Thermoregulation & Rest',
  },
  follicular: {
    name: 'Follicular Phase',
    days: 'Days 6 – 13',
    tag: 'PROGRESSIVE OVERLOAD & ENDURANCE',
    hormoneStatus: 'Rising Estrogen, Low Progesterone',
    energyLevel: 'High & Rising (82%)',
    summary: 'Estrogen is steadily climbing, boosting insulin sensitivity, pain tolerance, and cognitive focus. Prime window for progressive strength training and building lean tissue.',
    workoutTip: 'Ramp up training volume! Excellent for progressive overload in compound lifts, hypertrophy sets, and high-intensity interval training (HIIT).',
    workoutBadge: 'Strength Hypertrophy Protocol',
    nutritionTip: 'Your body efficiently utilizes carbohydrates. Consume complex carbs, prebiotic fiber, fermented foods, and lean protein to support follicle growth.',
    nutritionBadge: 'Glycogen & Lean Protein',
    recoveryTip: 'Recovery capacity is high. Take advantage of quick recovery times between training splits and maintain consistent hydration.',
    recoveryBadge: 'Rapid Muscle Synthesis',
  },
  ovulatory: {
    name: 'Ovulatory Phase',
    days: 'Days 14 – 16',
    tag: 'PEAK PERFORMANCE & MAX POWER',
    hormoneStatus: 'Estrogen Peak & LH Surge',
    energyLevel: 'Maximum Output (96%)',
    summary: 'Estrogen and luteinizing hormone hit their apex. Neuromuscular recruitment, stamina, and power output are at their highest baseline of the entire cycle.',
    workoutTip: 'PR (Personal Record) attempt window! Test maximum strength lifts, explosive plyometrics, sprint intervals, and high-load compound movements.',
    workoutBadge: 'Maximal Strength & Power',
    nutritionTip: 'Support peak metabolism with glutathione-rich foods (berries, avocados, asparagus), cruciferous vegetables, and clean hydration.',
    nutritionBadge: 'Antioxidant & Metabolic Matrix',
    recoveryTip: 'Joint laxity may increase slightly due to peak estrogen. Warm up thoroughly and maintain strict mechanical barbell bar paths.',
    recoveryBadge: 'Joint Stability & Prehab',
  },
  luteal: {
    name: 'Luteal Phase',
    days: 'Days 17 – 28',
    tag: 'AEROBIC CAPACITY & METABOLIC LOAD',
    hormoneStatus: 'Progesterone Dominant',
    energyLevel: 'Moderate & Tapering (65%)',
    summary: 'Progesterone dominates, raising your basal body temperature and resting metabolic rate by ~100–300 kcal/day. Focus on steady-state endurance and craving control.',
    workoutTip: 'Shift from high-impact max effort to moderate steady-state cardio (Zone 2), tempo lifting, Pilates, and higher-rep hypertrophy work.',
    workoutBadge: 'Zone 2 & Tempo Resistance',
    nutritionTip: 'Basal metabolic rate is elevated. Increase healthy fats (omega-3s, nuts, seeds), complex root vegetables, and 200–300 extra nutrient-dense kcal.',
    nutritionBadge: 'Healthy Lipids & Satiety',
    recoveryTip: 'Progesterone promotes calm but can disrupt REM sleep. Lower room temperature, supplement with magnesium, and hydrate adequately.',
    recoveryBadge: 'Cool-Down & Cortisol Management',
  },
};

export default function FemaleHealth() {
  const { plan, profile } = usePlan();

  const isMenstruating = profile?.menstruates === 'yes' || profile?.menstruates === true;
  const hasCycleData = isMenstruating && profile?.lastPeriodDate;

  // Calculate cycle parameters dynamically from user profile
  const cycleLength = parseInt(profile?.cycleLength, 10) || 28;
  const startDate = profile?.lastPeriodDate ? new Date(profile.lastPeriodDate) : new Date();
  const now = new Date();
  const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.max(0, Math.floor((nowUtc - startUtc) / (1000 * 60 * 60 * 24)));
  const calculatedCurrentDay = (diffDays % cycleLength) + 1;

  // Scale phase boundaries proportionally
  const ratio = cycleLength / 28;
  const menstrualEnd = Math.max(1, Math.round(5 * ratio));
  const follicularEnd = Math.max(menstrualEnd + 1, Math.round(13 * ratio));
  const ovulationEnd = Math.max(follicularEnd + 1, Math.round(16 * ratio));

  let detectedPhase = 'luteal';
  if (calculatedCurrentDay <= menstrualEnd) detectedPhase = 'menstrual';
  else if (calculatedCurrentDay <= follicularEnd) detectedPhase = 'follicular';
  else if (calculatedCurrentDay <= ovulationEnd) detectedPhase = 'ovulatory';
  else detectedPhase = 'luteal';

  const [selectedPhase, setSelectedPhase] = useState(detectedPhase);
  const [selectedSymptoms, setSelectedSymptoms] = useState(['⚡ High Energy', '💪 Peak Strength']);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logToast, setLogToast] = useState(false);

  const progressPercent = Math.min(100, Math.round((calculatedCurrentDay / cycleLength) * 100));
  const daysUntilNext = Math.max(0, cycleLength - calculatedCurrentDay);

  const toggleSymptom = (sym) => {
    if (selectedSymptoms.includes(sym)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== sym));
    } else {
      setSelectedSymptoms([...selectedSymptoms, sym]);
    }
  };

  const handleSaveLog = (e) => {
    e.preventDefault();
    setShowLogModal(false);
    setLogToast(true);
    setTimeout(() => setLogToast(false), 3500);
  };

  const currentPhaseData = phaseDetails[selectedPhase] || phaseDetails.follicular;

  return (
    <div className="text-on-background min-h-screen flex flex-col font-body selection:bg-[#f5a3c7] selection:text-[#1a0826]">
      {/* Toast Notification */}
      {logToast && (
        <div className="fixed bottom-8 right-8 z-50 rounded-2xl bg-black/90 backdrop-blur-xl border border-[#f5a3c7]/40 p-4 shadow-2xl flex items-center gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-full bg-[#f5a3c7]/20 flex items-center justify-center text-[#f5a3c7]">
            <span className="material-symbols-outlined text-sm">check_circle</span>
          </div>
          <div>
            <h4 className="font-headline text-xs font-bold text-white">Cycle Data Synchronized</h4>
            <p className="text-[11px] text-white/70">Adaptive training recommendations updated in real-time.</p>
          </div>
        </div>
      )}

      {/* Main Content Canvas */}
      <main className="flex-grow pt-10 pb-24 px-4 md:px-16 max-w-7xl mx-auto w-full flex flex-col gap-10">
        {/* Hero-style Header Section */}
        <header className="flex flex-col gap-3 max-w-3xl mt-4 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-headline font-semibold text-[#f5a3c7] w-fit shadow-sm">
            <span className="material-symbols-outlined text-sm text-[#f5a3c7]">cycle</span>
            {hasCycleData
              ? `CYCLE-SYNCED PERFORMANCE MATRIX • DAY ${calculatedCurrentDay} OF ${cycleLength}`
              : 'CYCLE-SYNCED PERFORMANCE MATRIX • INACTIVE'}
          </div>
          <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-on-background leading-[1.08] tracking-tight">
            <span className="bg-gradient-to-r from-[#f5a3c7] via-[#d69ee6] to-[#b399e0] bg-clip-text text-transparent uppercase">HARMONIZE</span>
            <span className="text-white ml-2 sm:ml-3">Your Cycle</span>
          </h1>
          <p className="font-body text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
            Synchronize your training volume, macronutrient fueling, and recovery protocols with your biological cycle for peak sustainable strength and vitality.
          </p>
        </header>

        {/* Empty State if Cycle Tracking Not Active */}
        {!hasCycleData ? (
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-[#f5a3c7]/20 p-10 sm:p-14 text-center flex flex-col items-center gap-4 max-w-xl mx-auto my-8 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#f5a3c7]/10 border border-[#f5a3c7]/30 flex items-center justify-center text-[#f5a3c7] mb-2">
              <span className="material-symbols-outlined text-3xl">female</span>
            </div>
            <h3 className="font-headline text-2xl sm:text-3xl font-black text-white">
              Cycle Syncing Inactive
            </h3>
            <p className="text-sm text-white/70 leading-relaxed max-w-md">
              Complete your onboarding questionnaire and opt in to cycle tracking to unlock personalized physiological phase mapping, hormone-adapted nutrition, and mechanical load recommendations.
            </p>
            <Link
              to="/onboarding"
              className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#f5a3c7] via-[#d69ee6] to-[#b399e0] text-[#1a0826] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg text-center"
            >
              Configure Cycle in Onboarding
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* AI Generated Cycle Adaptation Note Banner if available */}
            {plan?.cycleAdaptationNote && (
              <div
                className="p-6 rounded-2xl border flex flex-col sm:flex-row gap-4 items-start shadow-xl animate-fadeIn"
                style={{
                  background: 'linear-gradient(135deg, rgba(245,163,199,0.12) 0%, rgba(179,153,224,0.12) 100%)',
                  borderColor: 'rgba(245,163,199,0.35)',
                }}
              >
                <div className="w-10 h-10 rounded-full bg-[#f5a3c7]/20 flex items-center justify-center text-[#f5a3c7] shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <span
                    className="font-headline text-[11px] uppercase font-extrabold tracking-widest block mb-1"
                    style={{
                      background: 'linear-gradient(90deg, #f5a3c7, #b399e0)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    AI PROTOCOL ADAPTATION FOR CURRENT PHASE
                  </span>
                  <p className="text-sm leading-relaxed text-white/90">
                    {plan.cycleAdaptationNote}
                  </p>
                </div>
              </div>
            )}

            {/* Top Bento Row: Cycle Overview Card + Quick Log Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Card 1: Cycle Overview Card (7 cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between hover:border-[#f5a3c7]/30 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#f5a3c7]/15 to-[#b399e0]/10 rounded-full blur-3xl pointer-events-none"></div>

                <div>
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <span className="font-headline text-xs uppercase font-bold tracking-widest text-[#f5a3c7]">
                        CURRENT BIOLOGICAL STATUS
                      </span>
                      <h2 className="font-headline text-2xl sm:text-3xl font-black text-white mt-1">
                        {phaseDetails[detectedPhase]?.name || 'Follicular Phase'}
                      </h2>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-headline font-semibold text-white/80">
                      <span className="w-2 h-2 rounded-full bg-[#f5a3c7] animate-pulse"></span>
                      {daysUntilNext} days until next cycle
                    </div>
                  </div>

                  {/* Progress Ring Display */}
                  <div className="flex flex-col sm:flex-row items-center gap-8 my-4">
                    <div className="relative w-36 h-36 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="roseLavenderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f5a3c7" />
                            <stop offset="50%" stopColor="#d69ee6" />
                            <stop offset="100%" stopColor="#b399e0" />
                          </linearGradient>
                        </defs>
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="9"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#roseLavenderGrad)"
                          strokeWidth="9"
                          strokeDasharray="251.2"
                          strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-headline text-2xl font-black text-white">Day {calculatedCurrentDay}</span>
                        <span className="font-headline text-[10px] uppercase font-bold text-[#f5a3c7] tracking-wider">
                          of {cycleLength}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 flex-1 text-left">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-xs text-white/60 block mb-0.5">Hormone State</span>
                        <span className="font-headline text-sm font-bold text-white">
                          {phaseDetails[detectedPhase]?.hormoneStatus}
                        </span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                        <span className="text-xs text-white/60 block mb-0.5">Energy Capacity</span>
                        <span className="font-headline text-sm font-bold text-[#f5a3c7]">
                          {phaseDetails[detectedPhase]?.energyLevel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-2">
                  <span className="text-xs text-white/70">
                    Last period start: <strong className="text-white">{profile.lastPeriodDate}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedPhase(detectedPhase)}
                    className="text-xs font-headline font-bold text-[#f5a3c7] hover:underline cursor-pointer"
                  >
                    View Current Phase Protocol →
                  </button>
                </div>
              </div>

              {/* Card 2: Quick Log Card (5 cols) */}
              <div className="lg:col-span-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between hover:border-[#f5a3c7]/30 transition-all duration-300">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-[#f5a3c7] text-2xl">edit_calendar</span>
                    <h3 className="font-headline text-xl font-bold text-white">Quick Log & Symptoms</h3>
                  </div>
                  <p className="font-body text-xs text-white/70 leading-relaxed mb-4">
                    Log daily biomarkers to continuously adapt your recovery volume and nutrition targets.
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {['⚡ High Energy', '💪 Peak Strength', '💧 Bloating', '😴 Fatigue', '🎯 Focused', '🔥 High Hunger'].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => toggleSymptom(sym)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                          selectedSymptoms.includes(sym)
                            ? 'bg-[#f5a3c7]/20 border-[#f5a3c7] text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveLog}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f5a3c7] via-[#d69ee6] to-[#b399e0] text-[#1a0826] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer mt-4"
                >
                  Save Daily Log
                </button>
              </div>
            </div>

            {/* Phase Timeline Explorer & Glassy Cards */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Phase Protocol Explorer
                </h2>
              </div>

              {/* 4 Phase Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {Object.keys(phaseDetails).map((key) => {
                  const p = phaseDetails[key];
                  const isActive = selectedPhase === key;
                  const isCurrent = detectedPhase === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPhase(key)}
                      className={`p-4 rounded-xl text-left transition-all cursor-pointer border flex flex-col justify-between gap-2 ${
                        isActive
                          ? 'bg-white/15 border-[#f5a3c7] shadow-lg scale-102'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-headline text-xs uppercase font-bold tracking-wider text-white">
                          {p.name.replace(' Phase', '')}
                        </span>
                        {isCurrent && (
                          <span className="bg-[#f5a3c7]/20 text-[#f5a3c7] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#f5a3c7]/40">
                            Current
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-white/60 font-body">{p.days}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3 Detail Cards for Selected Phase */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
                {/* Card 1: Training */}
                <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#f5a3c7] text-2xl">fitness_center</span>
                      <span className="bg-white/10 text-white font-headline text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/10">
                        {currentPhaseData.workoutBadge}
                      </span>
                    </div>
                    <h3 className="font-headline text-lg font-bold text-white mb-2">Training Protocol</h3>
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {currentPhaseData.workoutTip}
                    </p>
                  </div>
                </div>

                {/* Card 2: Nutrition */}
                <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#d69ee6] text-2xl">restaurant_menu</span>
                      <span className="bg-white/10 text-white font-headline text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/10">
                        {currentPhaseData.nutritionBadge}
                      </span>
                    </div>
                    <h3 className="font-headline text-lg font-bold text-white mb-2">Fueling Strategy</h3>
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {currentPhaseData.nutritionTip}
                    </p>
                  </div>
                </div>

                {/* Card 3: Recovery */}
                <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="material-symbols-outlined text-[#b399e0] text-2xl">self_improvement</span>
                      <span className="bg-white/10 text-white font-headline text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border border-white/10">
                        {currentPhaseData.recoveryBadge}
                      </span>
                    </div>
                    <h3 className="font-headline text-lg font-bold text-white mb-2">Recovery Focus</h3>
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {currentPhaseData.recoveryTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          <Link to="/workout" className="hover:text-primary transition-opacity">Support</Link>
        </div>
        <span className="font-headline text-[10px] text-white/40 uppercase tracking-widest">
          © {new Date().getFullYear()} FitVerse. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
