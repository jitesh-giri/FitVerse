import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const meals = [
  {
    type: 'Breakfast',
    calories: '450 kcal',
    title: 'Oatmeal Power Bowl',
    desc: 'Complex carbs from oats combined with antioxidant-rich berries to kickstart your metabolism and prepare you for today\'s active recovery session.',
    image: '/images/gallery/gallery-7.jpg',
    colSpan: 'md:col-span-8',
    height: 'h-80',
  },
  {
    type: 'Lunch',
    calories: '620 kcal',
    title: 'Grilled Chicken & Greens',
    desc: 'Lean poultry breast loaded with complete amino acids, served over dark leafy greens and avocado for micronutrient balance.',
    image: '/images/gallery/gallery-8.jpg',
    colSpan: 'md:col-span-6',
    height: 'h-64',
  },
  {
    type: 'Dinner',
    calories: '580 kcal',
    title: 'Wild Salmon & Quinoa',
    desc: 'Pan-seared omega-3 rich salmon with slow-burning tri-color quinoa and roasted asparagus spears.',
    image: '/images/gallery/gallery-9.jpg',
    colSpan: 'md:col-span-6',
    height: 'h-64',
  },
];

export default function Nutrition() {
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const handleAskAi = (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setAiResponse(
      `Based on your target of 180g protein and today's 65-min hypertrophy training, adding 30g of whey isolate and 5g creatine post-workout will optimize MPS (muscle protein synthesis) by 24%.`
    );
  };

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary selection:text-on-primary">
      {/* Main Content Canvas */}
      <main className="flex-grow pt-12 px-4 md:px-16 pb-24 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="mb-14 mt-4 md:w-8/12">
          <span className="px-3 py-1 bg-surface-container-high rounded-full font-headline text-[10px] uppercase font-bold tracking-widest text-primary">
            PRECISION MACRONUTRIENTS
          </span>
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black text-on-surface mb-4 mt-3 tracking-tight">
            Fuel Your Potential
          </h1>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            Based on your recent heavy lifting sessions, our AI recommends a high-protein, nutrient-dense protocol for optimal recovery.
          </p>
        </div>

        {/* AI Chat Interface / Quick Tips */}
        <div className="glass-card rounded-2xl p-8 mb-16 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden border-l-[8px] border-l-primary shadow-xl">
          <div className="flex-shrink-0 bg-surface-container-high p-4 rounded-full ai-glow border border-primary/40">
            <span className="material-symbols-outlined text-primary text-3xl icon-fill">smart_toy</span>
          </div>
          <div className="flex-1">
            <h3 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-2">
              AI Nutrition Insight
            </h3>
            <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
              Your glycogen levels might be depleted after yesterday's leg day. Focus on complex carbohydrates combined with lean protein for your next meal to accelerate muscle repair.
            </p>
            {aiResponse && (
              <div className="mt-4 p-4 bg-surface-container rounded-xl border border-primary/30 text-xs md:text-sm text-primary font-medium animate-fadeIn">
                🤖 <strong>AI Recommendation:</strong> {aiResponse}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowAiModal(true)}
            className="md:ml-auto bg-surface-container border border-outline-variant px-6 py-3 rounded-full text-primary font-headline text-xs uppercase font-bold hover:bg-surface-variant hover:border-primary transition-all flex items-center gap-2 shadow-md shrink-0"
          >
            <span className="material-symbols-outlined text-lg">forum</span> Ask AI
          </button>
        </div>

        {/* AI Modal */}
        {showAiModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface-container-high border-[8px] border-surface-variant p-8 rounded-2xl max-w-lg w-full shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline text-xl font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined">psychology</span>
                  FitVerse Nutrition AI
                </h3>
                <button onClick={() => setShowAiModal(false)} className="text-on-surface-variant hover:text-white">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleAskAi} className="flex flex-col gap-4">
                <textarea
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="e.g. What should I eat before my 6 PM deadlift session?"
                  className="w-full bg-surface border border-outline-variant rounded-xl p-4 text-on-surface text-sm focus:border-primary outline-none resize-none h-28"
                  autoFocus
                ></textarea>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAiModal(false)}
                    className="px-5 py-2.5 rounded-lg border border-outline-variant text-on-surface-variant text-xs font-bold uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={() => {
                      if (aiQuestion.trim()) setShowAiModal(false);
                    }}
                    className="bg-primary text-on-primary font-headline text-xs uppercase font-bold px-6 py-2.5 rounded-lg hover:bg-primary-container"
                  >
                    Submit Query
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Meal Recommendations Bento Grid */}
        <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface mb-8 border-b-2 border-surface-variant pb-4 inline-block tracking-tight">
          Today's Protocol
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Meal 1: Breakfast */}
          <div className="md:col-span-8 bg-surface rounded-2xl overflow-hidden group shadow-xl">
            <div className="relative h-80 w-full border-[8px] border-surface group-hover:border-primary transition-colors duration-300 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Oatmeal Power Bowl"
                src={meals[0].image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-primary text-on-primary px-3 py-1 rounded-full font-headline text-[10px] uppercase font-bold tracking-wider">
                    {meals[0].type}
                  </span>
                  <span className="text-on-surface font-headline text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-tertiary">local_fire_department</span>
                    {meals[0].calories}
                  </span>
                </div>
                <h3 className="font-headline text-2xl font-black text-on-surface">
                  {meals[0].title}
                </h3>
                <p className="font-body text-sm text-on-surface-variant mt-2 line-clamp-2 max-w-xl">
                  {meals[0].desc}
                </p>
              </div>
            </div>
          </div>

          {/* Macro Tracker */}
          <div className="md:col-span-4 glass-card rounded-2xl p-8 flex flex-col justify-between border-[8px] border-surface-container-high shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-xl font-bold text-on-surface">Daily Macros</h3>
              <span className="text-xs text-primary font-headline font-bold">75% GOAL</span>
            </div>
            <div className="space-y-6 flex-grow flex flex-col justify-center">
              {/* Protein */}
              <div>
                <div className="flex justify-between font-headline text-xs text-on-surface font-bold mb-2">
                  <span>Protein</span>
                  <span className="text-primary font-black">120g / 180g</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full transition-all duration-700" style={{ width: '66%' }}></div>
                </div>
              </div>
              {/* Carbs */}
              <div>
                <div className="flex justify-between font-headline text-xs text-on-surface font-bold mb-2">
                  <span>Carbs</span>
                  <span className="text-tertiary font-black">200g / 250g</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full transition-all duration-700" style={{ width: '80%' }}></div>
                </div>
              </div>
              {/* Fats */}
              <div>
                <div className="flex justify-between font-headline text-xs text-on-surface font-bold mb-2">
                  <span>Fats</span>
                  <span className="text-secondary-fixed font-black">45g / 65g</span>
                </div>
                <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                  <div className="bg-secondary-fixed h-full rounded-full transition-all duration-700" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Meal 2: Lunch */}
          <div className="md:col-span-6 bg-surface rounded-2xl overflow-hidden group shadow-xl">
            <div className="relative h-64 w-full border-[8px] border-surface group-hover:border-primary transition-colors duration-300 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Grilled Chicken & Greens"
                src={meals[1].image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-surface-variant text-on-surface px-3 py-1 rounded-full font-headline text-[10px] uppercase font-bold tracking-wider group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {meals[1].type}
                  </span>
                  <span className="text-on-surface font-headline text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-tertiary">local_fire_department</span>
                    {meals[1].calories}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface">
                  {meals[1].title}
                </h3>
              </div>
            </div>
          </div>

          {/* Meal 3: Dinner */}
          <div className="md:col-span-6 bg-surface rounded-2xl overflow-hidden group shadow-xl">
            <div className="relative h-64 w-full border-[8px] border-surface group-hover:border-primary transition-colors duration-300 rounded-2xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Wild Salmon & Quinoa"
                src={meals[2].image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="bg-surface-variant text-on-surface px-3 py-1 rounded-full font-headline text-[10px] uppercase font-bold tracking-wider group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {meals[2].type}
                  </span>
                  <span className="text-on-surface font-headline text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-tertiary">local_fire_department</span>
                    {meals[2].calories}
                  </span>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface">
                  {meals[2].title}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-lowest text-primary font-headline text-xs w-full border-t-8 border-surface-variant flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-12 mt-auto">
        <div className="font-headline text-xl font-bold text-on-surface mb-6 md:mb-0">FitVerse</div>
        <div className="flex gap-6 mb-6 md:mb-0 uppercase tracking-widest font-bold">
          <Link to="/onboarding" className="text-on-surface-variant hover:text-primary transition-opacity">Privacy Policy</Link>
          <Link to="/onboarding" className="text-on-surface-variant hover:text-primary transition-opacity">Terms of Service</Link>
          <Link to="/community" className="text-on-surface-variant hover:text-primary transition-opacity">Contact</Link>
          <Link to="/workout" className="text-on-surface-variant hover:text-primary transition-opacity">Support</Link>
        </div>
        <div className="text-on-surface-variant font-headline text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} FitVerse. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
