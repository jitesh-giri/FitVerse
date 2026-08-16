import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState([
    { id: 1, name: 'Strength Phase III', icon: 'fitness_center', color: 'text-primary' },
    { id: 2, name: 'Endurance Prep', icon: 'directions_run', color: 'text-tertiary' },
  ]);
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

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body selection:bg-primary selection:text-on-primary">
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        {/* Navigation Drawer (Desktop Sidebar) */}
        <aside className="hidden lg:flex flex-col h-fit w-72 rounded-2xl bg-surface-container-high shadow-2xl p-6 shrink-0 sticky top-28 my-8 border border-surface-variant">
          <div className="mb-8">
            <h2 className="font-headline text-2xl font-black text-primary tracking-tight">FitVerse Twin</h2>
            <p className="text-xs text-on-surface-variant font-medium mt-1">Biometric Digital Model</p>
          </div>
          <nav aria-label="Sidebar Navigation" className="flex flex-col gap-2 font-body text-base">
            <Link
              to="/workout"
              className="flex items-center gap-4 p-3.5 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">bolt</span>
              <span className="font-medium">Workouts</span>
            </Link>
            <Link
              to="/community"
              className="flex items-center gap-4 p-3.5 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">groups</span>
              <span className="font-medium">Community</span>
            </Link>
            <div className="flex items-center gap-4 p-3.5 bg-primary-container text-on-primary-container rounded-xl font-bold">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </div>
            <Link
              to="/nutrition"
              className="flex items-center gap-4 p-3.5 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">restaurant</span>
              <span className="font-medium">Nutrition</span>
            </Link>
            <Link
              to="/admin"
              className="flex items-center gap-4 p-3.5 text-on-surface-variant hover:bg-surface-variant rounded-xl transition-colors group"
            >
              <span className="material-symbols-outlined group-hover:text-primary transition-colors">shield</span>
              <span className="font-medium">Admin View</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 md:px-12 py-8 md:py-12 max-w-5xl mx-auto w-full">
          {/* Hero Profile Section */}
          <section className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-16 bg-surface-container-low p-8 rounded-2xl border-[8px] border-surface-variant">
            <div className="relative shrink-0">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full p-2 bg-gradient-border shadow-xl">
                <img
                  src="/images/hero/hero-1.jpg"
                  alt="Alex V. Avatar"
                  className="w-full h-full object-cover rounded-full border-4 border-surface"
                />
              </div>
              <div className="absolute bottom-2 right-2 bg-primary text-on-primary rounded-full p-2 border-2 border-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-base">verified</span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left flex flex-col justify-center h-full pt-2">
              <h1 className="font-headline text-4xl md:text-5xl font-black text-on-surface mb-2 tracking-tight">
                ALEX V.
              </h1>
              <p className="font-headline text-sm md:text-base text-primary mb-6 tracking-widest font-extrabold uppercase">
                ELITE ATHLETE TIER • LEVEL 42
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="bg-primary text-on-primary font-headline text-xs uppercase tracking-widest font-bold px-6 py-3.5 rounded hover:bg-primary-container transition-all shadow-md">
                  Edit Profile
                </button>
                <button className="border-[4px] border-primary text-primary font-headline text-xs uppercase tracking-widest font-bold px-6 py-3 rounded hover:bg-primary hover:text-on-primary transition-colors">
                  Share Stats
                </button>
              </div>
            </div>
          </section>

          {/* AI Fitness Twin Bento Grid */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">hub</span>
              <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface">
                AI Fitness Twin
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Stats Card */}
              <div className="md:col-span-5 glass-panel p-8 rounded-2xl flex flex-col border-[8px] border-surface-container-high hover:border-primary transition-colors duration-500 group shadow-xl">
                <h3 className="font-headline text-xs text-on-surface-variant mb-6 tracking-widest font-bold uppercase">
                  BIOMETRICS
                </h3>
                <div className="space-y-6 flex-1">
                  <div>
                    <div className="flex justify-between font-body text-sm mb-2">
                      <span className="text-on-surface font-medium">Weight</span>
                      <span className="text-primary font-bold">185 lbs</span>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[70%] group-hover:w-[75%] transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-body text-sm mb-2">
                      <span className="text-on-surface font-medium">Body Fat</span>
                      <span className="text-tertiary font-bold">12%</span>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div className="bg-tertiary h-full w-[30%] group-hover:w-[25%] transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-body text-sm mb-2">
                      <span className="text-on-surface font-medium">Muscle Mass</span>
                      <span className="text-primary font-bold">82 lbs</span>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[80%] group-hover:w-[85%] transition-all duration-1000 ease-out"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Chart Card */}
              <div className="md:col-span-7 glass-panel p-8 rounded-2xl flex flex-col border-[8px] border-surface-container-high relative overflow-hidden shadow-xl">
                <h3 className="font-headline text-xs text-on-surface-variant mb-4 tracking-widest font-bold uppercase z-10">
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
                    {/* Grid lines */}
                    <line stroke="#201f1f" strokeWidth="0.5" x1="0" x2="100" y1="25" y2="25" />
                    <line stroke="#201f1f" strokeWidth="0.5" x1="0" x2="100" y1="50" y2="50" />
                    <line stroke="#201f1f" strokeWidth="0.5" x1="0" x2="100" y1="75" y2="75" />

                    <path
                      d="M0,90 Q25,85 50,60 T100,20 L100,100 L0,100 Z"
                      fill="url(#profileGradient)"
                    />
                    <path
                      className="glowing-line"
                      d="M0,90 Q25,85 50,60 T100,20"
                      fill="none"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Overlay Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <p className="font-headline text-lg md:text-2xl text-on-surface opacity-25 uppercase tracking-widest mix-blend-overlay font-black text-center">
                      +15% EFFICIENCY<br />OVER 30 DAYS
                    </p>
                  </div>
                </div>
              </div>

              {/* Goals Card */}
              <div className="md:col-span-12 glass-panel p-8 rounded-2xl border-[8px] border-surface-container-high flex flex-col md:flex-row gap-8 items-start md:items-center shadow-xl">
                <div className="shrink-0">
                  <h3 className="font-headline text-xs text-on-surface-variant mb-1 tracking-widest font-bold uppercase">
                    ACTIVE PROTOCOLS
                  </h3>
                  <p className="font-headline text-xl font-bold text-on-surface">Target Goals</p>
                </div>
                <div className="flex-1 flex flex-wrap gap-4 w-full items-center">
                  {goals.map((goal) => (
                    <div
                      key={goal.id}
                      className="bg-surface-container-high px-5 py-3 rounded-full border border-outline-variant flex items-center gap-3 shrink-0 hover:border-primary transition-colors cursor-pointer"
                    >
                      <span className={`material-symbols-outlined ${goal.color}`}>{goal.icon}</span>
                      <span className="font-body text-sm text-on-surface font-semibold">{goal.name}</span>
                    </div>
                  ))}

                  {showAddGoal ? (
                    <form onSubmit={handleAddGoal} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newGoalInput}
                        onChange={(e) => setNewGoalInput(e.target.value)}
                        placeholder="Enter goal..."
                        className="bg-surface-container border border-primary px-4 py-2 rounded-full text-xs text-on-surface outline-none"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-primary text-on-primary px-3 py-2 rounded-full text-xs font-bold"
                      >
                        Add
                      </button>
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowAddGoal(true)}
                      className="bg-surface-container-low px-5 py-3 rounded-full border border-surface-container flex items-center gap-3 shrink-0 hover:border-outline-variant transition-colors opacity-70 hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-on-surface-variant">add</span>
                      <span className="font-body text-sm text-on-surface-variant font-semibold">Add Goal</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Decorative Image Break */}
          <section className="mb-16 h-80 md:h-96 w-full rounded-2xl overflow-hidden border-[8px] border-surface-container-high relative shadow-2xl">
            <img
              src="/images/hero/hero-6.jpg"
              alt="High performance fitness studio"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-8">
              <span className="bg-primary text-on-primary font-headline text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded">
                STUDIO SESSION
              </span>
              <h4 className="font-headline text-xl md:text-2xl font-bold text-white mt-2">
                Hypertrophy Lab & Recovery Sanctuary
              </h4>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t-8 border-surface-variant w-full mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-10 w-full max-w-7xl mx-auto gap-6">
          <div className="font-headline text-xl font-bold text-on-surface">FitVerse</div>
          <nav aria-label="Footer Links" className="flex flex-wrap justify-center gap-6 font-headline text-xs uppercase tracking-wider font-bold">
            <Link to="/onboarding" className="text-on-surface-variant hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/onboarding" className="text-on-surface-variant hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/community" className="text-on-surface-variant hover:text-primary transition-colors">Contact</Link>
            <Link to="/workout" className="text-on-surface-variant hover:text-primary transition-colors">Support</Link>
          </nav>
          <div className="font-headline text-[10px] text-on-surface-variant opacity-70 tracking-widest uppercase text-center md:text-right">
            © {new Date().getFullYear()} FitVerse. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
