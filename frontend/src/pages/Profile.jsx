import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePlan } from '../context/PlanContext';

export default function Profile() {
  const { plan, profile } = usePlan();

  const [goals, setGoals] = useState(() => {
    const list = [];
    if (profile?.goal) {
      const goalLabels = {
        hypertrophy: 'Hypertrophy & Muscle Growth',
        fat_loss: 'Fat Loss & Definition',
        strength: 'Maximal Strength & Power',
        endurance: 'Cardiovascular Stamina',
      };
      list.push({
        id: 1,
        name: goalLabels[profile.goal] || profile.goal,
        icon: 'fitness_center',
        color: 'text-primary',
      });
    } else {
      list.push({ id: 1, name: 'Strength Phase III', icon: 'fitness_center', color: 'text-primary' });
    }

    if (profile?.diet) {
      list.push({
        id: 2,
        name: `${profile.diet} Fueling Protocol`,
        icon: 'restaurant_menu',
        color: 'text-tertiary',
      });
    } else {
      list.push({ id: 2, name: 'Endurance Prep', icon: 'directions_run', color: 'text-tertiary' });
    }

    return list;
  });

  const [newGoalInput, setNewGoalInput] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalInput.trim()) return;
    setGoals([
      ...goals,
      {
        id: Date.now(),
        name: newGoalInput.trim(),
        icon: 'bolt',
        color: 'text-primary',
      },
    ]);
    setNewGoalInput('');
    setShowAddGoal(false);
  };

  const hasProfile = Boolean(profile);

  return (
    <div className="text-on-background min-h-screen flex flex-col font-body selection:bg-primary selection:text-on-primary">
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* Navigation Drawer (Desktop Sidebar) */}
        <aside className="hidden lg:flex flex-col h-fit w-72 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-2xl p-6 shrink-0 sticky top-28 my-8">
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-black text-primary tracking-tight">FitVerse Twin</h2>
            <p className="text-xs text-white/60 font-medium mt-1">Biometric Digital Model</p>
          </div>
          <nav aria-label="Sidebar Navigation" className="flex flex-col gap-2 font-body text-base">
            <Link
              to="/workout"
              className="flex items-center gap-4 p-3.5 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">bolt</span>
              <span className="font-medium">Workouts</span>
            </Link>
            <Link
              to="/nutrition"
              className="flex items-center gap-4 p-3.5 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">restaurant</span>
              <span className="font-medium">Nutrition</span>
            </Link>
            <Link
              to="/female-health"
              className="flex items-center gap-4 p-3.5 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-[#f5a3c7] transition-colors">female</span>
              <span className="font-medium">Female Health</span>
            </Link>
            <Link
              to="/community"
              className="flex items-center gap-4 p-3.5 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">groups</span>
              <span className="font-medium">Community</span>
            </Link>
            <div className="flex items-center gap-4 p-3.5 bg-white/15 text-white rounded-xl font-bold shadow-sm">
              <span className="material-symbols-outlined text-primary">person</span>
              <span>Profile</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-12 py-8 md:py-10 max-w-5xl mx-auto w-full">
          {/* Hero-style Header Section */}
          <header className="mb-10 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-headline font-semibold text-primary mb-4 shadow-sm w-fit">
              <span className="material-symbols-outlined text-sm text-primary">hub</span>
              BIOMETRIC DIGITAL TWIN • {profile?.bmiCategory ? profile.bmiCategory.toUpperCase() : 'BASELINE'}
            </div>
            <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-on-background leading-[1.08] tracking-tight">
              <span className="gradient-text uppercase">ELEVATE</span>
              <span className="text-white ml-2 sm:ml-3">Your Baseline</span>
            </h1>
            <p className="font-body text-sm sm:text-base text-white/70 mt-2 max-w-2xl leading-relaxed">
              Track continuous biometric adaptations, performance trajectory, and active protocols in real-time.
            </p>
          </header>

          {/* Empty State if No Profile Configured */}
          {!hasProfile ? (
            <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-10 sm:p-14 text-center flex flex-col items-center gap-4 max-w-xl mx-auto my-8 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">person</span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-black text-white">
                No Profile Configured
              </h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-md">
                Complete your biometrics, goals, and dietary preferences in onboarding to initialize your Digital Twin profile.
              </p>
              <Link
                to="/onboarding"
                className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase font-bold tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg text-center"
              >
                Complete Onboarding
              </Link>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Hero Profile Card */}
              <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 shadow-2xl">
                <div className="relative shrink-0">
                  <div className="w-36 h-36 md:w-44 md:h-44 rounded-full p-2 bg-gradient-to-r from-[#adc6ff] to-[#ffb595] shadow-xl">
                    <img
                      src="/images/hero/hero-1.jpg"
                      alt="Avatar"
                      className="w-full h-full object-cover rounded-full border-4 border-black"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-primary text-[#00285c] rounded-full p-2 border-2 border-black flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-base">verified</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full pt-2">
                  <h2 className="font-headline text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">
                    {profile.gender ? `${profile.gender.toUpperCase()} ATHLETE` : 'ACTIVE ATHLETE'}
                  </h2>
                  <p className="font-headline text-xs md:text-sm text-primary mb-6 tracking-widest font-extrabold uppercase">
                    {(profile.goal || 'OPTIMIZATION').replace('_', ' ')} • {(profile.activityStyle || 'GYM')} PROTOCOL
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Link
                      to="/onboarding"
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline text-xs uppercase tracking-widest font-bold hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      Update Profile / Plan
                    </Link>
                    <Link
                      to="/workout"
                      className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-white font-headline text-xs uppercase tracking-widest font-bold active:scale-95 transition-all cursor-pointer"
                    >
                      View Active Workout
                    </Link>
                  </div>
                </div>
              </section>

              {/* Plan Summary Banner if plan exists */}
              {plan?.planSummary && (
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 flex gap-4 items-start shadow-xl">
                  <span className="material-symbols-outlined text-primary text-2xl shrink-0 mt-0.5">smart_toy</span>
                  <div>
                    <span className="font-headline text-[10px] uppercase font-bold text-primary tracking-widest block mb-1">
                      ACTIVE AI PROTOCOL STRATEGY
                    </span>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {plan.planSummary}
                    </p>
                  </div>
                </div>
              )}

              {/* AI Fitness Twin Bento Grid */}
              <section>
                <div className="flex items-center gap-3 mb-8">
                  <span className="material-symbols-outlined text-primary text-3xl">hub</span>
                  <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white">
                    Live Biometric Matrix
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Stats Card */}
                  <div className="md:col-span-5 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 flex flex-col hover:border-white/20 transition-all duration-300 group shadow-2xl">
                    <h3 className="font-headline text-xs text-white/60 mb-6 tracking-widest font-bold uppercase">
                      MEASUREMENTS
                    </h3>
                    <div className="space-y-6 flex-1">
                      <div>
                        <div className="flex justify-between font-body text-sm mb-2">
                          <span className="text-white font-medium">Weight</span>
                          <span className="text-primary font-bold">{profile.weight || 75} kg</span>
                        </div>
                        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(100, Math.round(((parseFloat(profile.weight) || 75) / 120) * 100))}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-body text-sm mb-2">
                          <span className="text-white font-medium">Height</span>
                          <span className="text-tertiary font-bold">{profile.height || 178} cm</span>
                        </div>
                        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-tertiary h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(100, Math.round(((parseFloat(profile.height) || 178) / 210) * 100))}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-body text-sm mb-2">
                          <span className="text-white font-medium">BMI Index</span>
                          <span className="text-primary font-bold">{profile.bmi || '23.5'} ({profile.bmiCategory || 'Normal weight'})</span>
                        </div>
                        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${Math.min(100, Math.max(15, ((parseFloat(profile.bmi) || 23.5) / 35) * 100))}%` }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-body text-sm mb-2">
                          <span className="text-white font-medium">Training Frequency</span>
                          <span className="text-tertiary font-bold">{profile.frequency || 4} days / week</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Chart Card */}
                  <div className="md:col-span-7 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 flex flex-col relative overflow-hidden shadow-2xl hover:border-white/20 transition-all duration-300">
                    <h3 className="font-headline text-xs text-white/60 mb-4 tracking-widest font-bold uppercase z-10">
                      PERFORMANCE TRAJECTORY
                    </h3>
                    <div className="flex-1 flex items-end relative h-56 mt-2 z-10">
                      {/* SVG Progress Line */}
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="profileGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#adc6ff" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#adc6ff" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <line stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25" />
                        <line stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" x1="0" x2="100" y1="50" y2="50" />
                        <line stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" x1="0" x2="100" y1="75" y2="75" />

                        <path
                          d="M0,90 Q25,85 50,60 T100,20 L100,100 L0,100 Z"
                          fill="url(#profileGradient)"
                        />
                        <path
                          className="glowing-line"
                          d="M0,90 Q25,85 50,60 T100,20"
                          fill="none"
                          stroke="#adc6ff"
                          strokeWidth="2.5"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <p className="font-headline text-lg md:text-2xl text-white opacity-25 uppercase tracking-widest mix-blend-overlay font-black text-center">
                          ADAPTIVE PROGRESS<br />ACTIVE PROTOCOL
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Goals Card */}
                  <div className="md:col-span-12 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-start md:items-center shadow-2xl">
                    <div className="shrink-0">
                      <h3 className="font-headline text-xs text-white/60 mb-1 tracking-widest font-bold uppercase">
                        ACTIVE PROTOCOLS
                      </h3>
                      <p className="font-headline text-xl font-bold text-white">Target Goals</p>
                    </div>
                    <div className="flex-1 flex flex-wrap gap-4 w-full items-center">
                      {goals.map((goal) => (
                        <div
                          key={goal.id}
                          className="bg-white/5 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 flex items-center gap-3 shrink-0 hover:border-white/20 transition-all cursor-pointer"
                        >
                          <span className={`material-symbols-outlined ${goal.color}`}>{goal.icon}</span>
                          <span className="font-body text-sm text-white font-semibold">{goal.name}</span>
                        </div>
                      ))}

                      {showAddGoal ? (
                        <form onSubmit={handleAddGoal} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newGoalInput}
                            onChange={(e) => setNewGoalInput(e.target.value)}
                            placeholder="Enter goal..."
                            className="bg-white/5 border border-white/20 px-4 py-2 rounded-full text-xs text-white outline-none focus:border-primary"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
                          >
                            Add
                          </button>
                        </form>
                      ) : (
                        <button
                          onClick={() => setShowAddGoal(true)}
                          className="bg-white/5 hover:bg-white/10 px-5 py-3 rounded-full border border-white/10 flex items-center gap-3 shrink-0 transition-all cursor-pointer opacity-70 hover:opacity-100"
                        >
                          <span className="material-symbols-outlined text-white/60">add</span>
                          <span className="font-body text-sm text-white/70 font-semibold">Add Goal</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-10 w-full max-w-7xl mx-auto gap-6">
          <div className="font-headline text-xl font-bold text-primary">FitVerse</div>
          <nav aria-label="Footer Links" className="flex flex-wrap justify-center gap-6 font-headline text-xs uppercase tracking-wider font-bold text-white/60">
            <Link to="/onboarding" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/onboarding" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/community" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/workout" className="hover:text-primary transition-colors">Support</Link>
          </nav>
          <div className="font-headline text-[10px] text-white/40 tracking-widest uppercase text-center md:text-right">
            © {new Date().getFullYear()} FitVerse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
