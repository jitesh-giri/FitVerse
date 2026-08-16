import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DotBackground from '../components/DotBackground';

const galleryImages = [
  { src: '/images/gallery/gallery-1.jpg', alt: 'Fitness training' },
  { src: '/images/gallery/gallery-2.jpg', alt: 'Strength training' },
  { src: '/images/gallery/gallery-3.jpg', alt: 'Running group' },
  { src: '/images/gallery/gallery-4.jpg', alt: 'Basketball court' },
  { src: '/images/gallery/gallery-5.jpg', alt: 'Yoga pose' },
  { src: '/images/gallery/gallery-6.jpg', alt: 'Group stretching' },
];

const steps = [
  {
    num: '01',
    title: 'Create Profile',
    desc: 'Set up your baseline metrics and define your ultimate physical goals.',
  },
  {
    num: '02',
    title: 'AI Builds Your Plan',
    desc: 'Our engine designs a data-backed regimen tailored specifically to you.',
  },
  {
    num: '03',
    title: 'Train & Track',
    desc: 'Execute your workouts and log progress for continuous adaptation.',
  },
  {
    num: '04',
    title: 'Join the Community',
    desc: 'Connect, compete, and evolve alongside driven individuals.',
  },
];

const reviews = [
  {
    name: 'Alex M.',
    text: '"The AI-driven routines completely transformed my training regimen. I\'ve never seen progress like this before."',
  },
  {
    name: 'Sarah K.',
    text: '"Finally, an app that focuses on discipline and pure metrics. The interface is clean and exactly what I needed."',
  },
  {
    name: 'Rahul T.',
    text: '"The community aspect is unmatched. Everyone is dialed in, and the leaderboards push you to the limit."',
  },
  {
    name: 'Priya D.',
    text: '"Brilliant design, zero distractions. It\'s built for performance, and it absolutely delivers on that promise."',
  },
];

const faqs = [
  {
    question: 'Is FitVerse suitable for beginners?',
    answer:
      'Yes. Our adaptive AI scales volume, intensity, and movement complexity based on your baseline experience and biometrics.',
  },
  {
    question: 'How does the AI generate my plan?',
    answer:
      'We combine progressive overload protocols, biometric feedback, muscle recovery analytics, and your specific goal vectors.',
  },
  {
    question: 'Can I sync data from my smartwatch?',
    answer:
      'FitVerse integrates seamlessly with Apple Health, Google Fit, Garmin, and Whoop to track heart rate, strain, and recovery metrics.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can experience all core AI workouts and nutrition planning tools with our 14-day full access trial.',
  },
];

const rotatingWords = ['TRANSFORM', 'ELEVATE', 'REWRITE'];

export default function Home() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#121212] text-on-background min-h-screen flex flex-col font-body overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 md:px-16 min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Animated dot-grid background — sits at z-0 behind everything */}
        <DotBackground />

        {/* Background Floating Elements (Abstract framing) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-[-10%] w-96 h-96 border-[8px] border-surface-variant rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] border-[8px] border-secondary-container rounded-full mix-blend-overlay"></div>
        </div>

        {/* Floating Image Cards */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Card 1 */}
          <img
            alt="Hero Visual 1"
            className="absolute top-[15%] left-[5%] w-40 h-56 object-cover rounded-xl border-[10px] gallery-border shadow-2xl transform -rotate-12 opacity-80 md:w-64 md:h-80 md:left-[10%]"
            src="/images/gallery/gallery-1.jpg"
          />
          {/* Card 2 */}
          <img
            alt="Hero Visual 2"
            className="absolute top-[10%] right-[5%] w-32 h-48 object-cover rounded-xl border-[10px] gallery-border shadow-2xl transform rotate-6 opacity-70 md:w-56 md:h-72 md:right-[15%]"
            src="/images/gallery/gallery-2.jpg"
          />
          {/* Card 3 */}
          <img
            alt="Hero Visual 3"
            className="absolute bottom-[20%] left-[10%] w-36 h-52 object-cover rounded-xl border-[10px] gallery-border shadow-2xl transform rotate-12 opacity-60 md:w-60 md:h-80 md:bottom-[15%]"
            src="/images/gallery/gallery-3.jpg"
          />
          {/* Card 4 */}
          <img
            alt="Hero Visual 4"
            className="absolute bottom-[15%] right-[10%] w-44 h-60 object-cover rounded-xl border-[10px] gallery-border shadow-2xl transform -rotate-6 opacity-90 md:w-72 md:h-96 md:bottom-[10%] md:right-[5%]"
            src="/images/gallery/gallery-4.jpg"
          />
          {/* Card 5 */}
          <img
            alt="Hero Visual 5"
            className="absolute top-[40%] left-[50%] -translate-x-1/2 w-48 h-48 object-cover rounded-xl border-[10px] gallery-border shadow-2xl transform rotate-45 opacity-30 md:w-80 md:h-80 mix-blend-luminosity"
            src="/images/gallery/gallery-5.jpg"
          />
        </div>

        {/* Hero Content Canvas */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-6 md:mt-0 bg-[#121212]/85 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-surface-variant shadow-2xl">
          <h1 className="font-headline text-[42px] md:text-[64px] font-black text-on-background leading-tight mb-4 flex flex-col items-center justify-center min-h-[140px] md:min-h-[160px] text-center w-full">
            {/* Rotating Word Container */}
            <div className="relative h-[65px] md:h-[85px] w-full max-w-[340px] sm:max-w-[420px] md:max-w-[520px] overflow-hidden flex items-center justify-center">
              {rotatingWords.map((word, idx) => {
                const isActive = idx === currentWordIndex;
                const isPrev = idx === (currentWordIndex - 1 + rotatingWords.length) % rotatingWords.length;
                return (
                  <span
                    key={word}
                    className={`absolute inset-0 flex items-center justify-center gradient-text font-headline text-[42px] md:text-[64px] font-black tracking-tighter uppercase transition-all duration-700 ease-in-out select-none ${
                      isActive
                        ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
                        : isPrev
                        ? 'opacity-0 -translate-y-6 scale-95 pointer-events-none'
                        : 'opacity-0 translate-y-6 scale-95 pointer-events-none'
                    }`}
                  >
                    {word}
                  </span>
                );
              })}
            </div>
            <span className="block mt-2 font-headline font-black text-on-background">Your Fitness Path</span>
          </h1>

          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            An AI-driven fitness ecosystem that adapts your training, personalizes your nutrition, and connects you with a community built for real progress.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full relative">
            {/* Primary CTA */}
            <Link
              to="/onboarding"
              className="w-full sm:w-auto bg-transparent border-8 border-surface-variant font-headline text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-lg hover:border-primary hover:bg-primary hover:text-on-primary transition-all duration-300 scale-100 hover:scale-105 active:scale-95 font-bold z-20 backdrop-blur-md text-white shadow-lg text-center"
            >
              START YOUR TRANSFORMATION
            </Link>
            {/* Secondary CTA */}
            <button
              onClick={() => {
                const element = document.getElementById('how-it-works');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto bg-transparent border-8 border-surface-variant font-headline text-xs md:text-sm uppercase tracking-widest px-8 py-4 rounded-lg hover:border-secondary hover:bg-surface-variant/50 transition-all duration-300 scale-100 hover:scale-105 active:scale-95 font-bold z-10 backdrop-blur-md text-white text-center cursor-pointer"
            >
              SEE HOW IT WORKS
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 animate-bounce">
          <span className="font-headline text-[10px] tracking-widest uppercase text-on-surface-variant font-bold">SCROLL</span>
          <span className="material-symbols-outlined text-on-surface-variant">keyboard_arrow_down</span>
        </div>
      </section>

      {/* HOW IT WORKS Section */}
      <section id="how-it-works" className="py-24 px-4 md:px-16 w-full max-w-7xl mx-auto scroll-mt-24">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-center mb-16 gradient-text tracking-tight uppercase">
          HOW IT WORKS
        </h2>
        <div className="flex flex-col gap-8 max-w-3xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-surface-container-low p-8 rounded-xl border-[8px] border-surface-variant flex flex-col sm:flex-row items-start sm:items-center gap-6 relative overflow-hidden group hover:border-[#6b7280] transition-colors duration-300"
            >
              <div className="gradient-text font-headline text-[80px] font-black opacity-20 absolute -right-4 -bottom-8 group-hover:scale-110 transition-transform duration-500">
                {step.num}
              </div>
              <div className="z-10">
                <h3 className="font-headline text-xl md:text-2xl font-bold mb-2 text-on-surface">
                  {step.title}
                </h3>
                <p className="text-on-surface-variant font-body text-base md:text-lg">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLIMPSES Section */}
      <section className="py-24 w-full overflow-hidden">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-center mb-16 gradient-text tracking-tight px-4 md:px-16 uppercase">
          GLIMPSES
        </h2>
        <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-4 md:px-16 snap-x snap-mandatory hide-scrollbar">
          {galleryImages.map((img, i) => (
            <div key={i} className="min-w-[280px] md:min-w-[400px] snap-center shrink-0">
              <img
                alt={img.alt}
                className="w-full h-80 md:h-[400px] object-cover rounded-xl border-[10px] gallery-border hover:scale-[1.02] transition-transform duration-300"
                src={img.src}
              />
            </div>
          ))}
        </div>
      </section>

      {/* GOING LIVE Section */}
      <section className="py-24 px-4 md:px-16 bg-surface-container-low border-y-[8px] border-surface-variant overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold mb-10 gradient-text uppercase tracking-tighter leading-tight">
              GOING LIVE ACROSS INDIA
            </h2>
            <div className="flex flex-col sm:flex-row gap-12 justify-center md:justify-start">
              <div>
                <div className="font-headline text-5xl md:text-6xl font-black gradient-text mb-2">1</div>
                <div className="font-headline text-xs text-on-surface-variant tracking-widest font-bold">CITY</div>
              </div>
              <div>
                <div className="font-headline text-5xl md:text-6xl font-black gradient-text mb-2">10,000+</div>
                <div className="font-headline text-xs text-on-surface-variant tracking-widest font-bold">MEMBERS</div>
              </div>
            </div>
          </div>
          <div className="flex-1 relative h-80 w-full flex items-center justify-center pointer-events-none">
            <div className="absolute w-64 h-64 rounded-full border-[12px] border-surface-variant opacity-20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute w-48 h-48 rounded-xl border-[12px] border-[#6b7280] opacity-30 transform rotate-45 animate-[spin_15s_linear_infinite_reverse]"></div>
            <div className="absolute w-32 h-32 rounded-full border-[12px] border-[#eab308] opacity-40"></div>
            <span className="material-symbols-outlined text-[120px] gradient-text z-10">share</span>
          </div>
        </div>
      </section>

      {/* REVIEWS Section */}
      <section className="py-24 w-full overflow-hidden">
        <div className="px-4 md:px-16 max-w-7xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-center mb-16 gradient-text tracking-tight uppercase">
            REVIEWS
          </h2>
        </div>
        <div className="flex gap-8 overflow-x-auto pb-12 pt-4 px-4 md:px-16 snap-x snap-mandatory hide-scrollbar">
          {reviews.map((rev, i) => (
            <div
              key={i}
              className="min-w-[320px] md:min-w-[450px] bg-surface-container-low p-8 rounded-xl border-[8px] border-surface-variant snap-center shrink-0 hover:border-[#6b7280] transition-colors duration-300"
            >
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-surface-variant border-4 border-surface-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined gradient-text text-[32px]">person</span>
                </div>
                <div>
                  <div className="font-headline text-lg font-bold text-on-surface">{rev.name}</div>
                  <div className="flex gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined gradient-text text-[20px] icon-fill"
                      >
                        star
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="font-body text-base md:text-lg text-on-surface-variant italic">
                {rev.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 md:px-16 w-full max-w-4xl mx-auto">
        <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-center mb-16 gradient-text tracking-tight uppercase">
          FAQ
        </h2>
        <div className="flex flex-col gap-6">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                onClick={() => toggleFaq(idx)}
                className="bg-surface-container-low rounded-xl border-[8px] border-surface-variant p-6 hover:border-[#6b7280] transition-colors duration-300 cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-headline text-lg md:text-xl font-bold text-on-surface">
                    {faq.question}
                  </h3>
                  <span
                    className={`material-symbols-outlined gradient-text text-[32px] transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </div>
                {isOpen && (
                  <p className="mt-4 pt-4 border-t border-surface-variant text-on-surface-variant font-body text-base leading-relaxed animate-fadeIn">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#131313] w-full border-t-[8px] border-surface-variant py-16 px-4 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            <div className="flex flex-col gap-6">
              <div className="font-headline text-2xl font-bold gradient-text">FitVerse</div>
              <p className="text-on-surface-variant font-body text-sm max-w-xs leading-relaxed">
                Elevating fitness through data-driven discipline and community.
              </p>
              <div className="flex gap-4">
                <a href="#instagram" className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center hover:border-primary transition-colors group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-xl">photo_camera</span>
                </a>
                <a href="#twitter" className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center hover:border-primary transition-colors group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-xl">close</span>
                </a>
                <a href="#youtube" className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center hover:border-primary transition-colors group">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary text-xl">play_circle</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="font-headline text-xs text-white tracking-widest uppercase font-bold">Partnerships</h4>
              <div className="flex flex-col gap-4 font-body text-sm">
                <Link to="/community" className="text-on-surface-variant hover:text-white transition-colors">Start Your Own Club</Link>
                <Link to="/workout" className="text-on-surface-variant hover:text-white transition-colors">Become a Venue Partner</Link>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="font-headline text-xs text-white tracking-widest uppercase font-bold">Download the App</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-surface-container-high border border-surface-variant px-4 py-2.5 rounded-lg flex items-center gap-3 hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase leading-none opacity-60 font-body">Download on the</div>
                    <div className="text-[14px] font-bold leading-none font-headline mt-1">App Store</div>
                  </div>
                </button>
                <button className="bg-surface-container-high border border-surface-variant px-4 py-2.5 rounded-lg flex items-center gap-3 hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[24px]">play_arrow</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase leading-none opacity-60 font-body">Get it on</div>
                    <div className="text-[14px] font-bold leading-none font-headline mt-1">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-surface-variant pt-12 flex flex-col items-center text-center gap-6">
            <div className="flex gap-8 font-headline text-xs text-on-surface-variant font-bold tracking-wider uppercase">
              <Link to="/onboarding" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <Link to="/onboarding" className="hover:text-white transition-colors">Privacy Policy</Link>
            </div>
            <div className="font-body text-xs text-on-surface-variant opacity-60">
              Made with ❤️ in Greater Noida by Team NEXUS
            </div>
            <div className="font-headline text-[10px] text-on-surface-variant opacity-40 uppercase tracking-[0.2em]">
              © {new Date().getFullYear()} FitVerse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
