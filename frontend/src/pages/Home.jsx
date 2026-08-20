import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DotBackground from '../components/DotBackground';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Workout', path: '/workout' },
  { name: 'Nutrition', path: '/nutrition' },
  { name: 'Community', path: '/community' },
  { name: 'Female Health', path: '/female-health' },
  { name: 'Profile', path: '/profile' },
];

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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="bg-[#121212] text-on-background min-h-screen flex flex-col font-body overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-[#131313] flex flex-col justify-between">
        {/* Animated dot-grid background — sits at z-0 behind everything */}
        <DotBackground />

        {/* Background Floating Elements (Abstract framing) */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-[-10%] w-96 h-96 border-[8px] border-surface-variant rounded-full mix-blend-overlay"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[40rem] h-[40rem] border-[8px] border-secondary-container rounded-full mix-blend-overlay"></div>
        </div>

        {/* Floating Image Cards (Background visual layer behind glass content) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Card 1 */}
          <img
            alt="Hero Visual 1"
            className="absolute top-[14%] left-[4%] w-36 h-48 object-cover rounded-xl border-[6px] gallery-border shadow-2xl transform -rotate-12 opacity-50 sm:w-48 sm:h-64 sm:opacity-60 md:left-[6%]"
            src="/images/gallery/gallery-1.jpg"
          />
          {/* Card 2 */}
          <img
            alt="Hero Visual 2"
            className="absolute top-[10%] right-[4%] w-32 h-44 object-cover rounded-xl border-[6px] gallery-border shadow-2xl transform rotate-6 opacity-45 sm:w-44 sm:h-60 sm:opacity-55 md:right-[10%]"
            src="/images/gallery/gallery-2.jpg"
          />
          {/* Card 3 */}
          <img
            alt="Hero Visual 3"
            className="absolute top-[42%] left-[2%] w-32 h-44 object-cover rounded-xl border-[6px] gallery-border shadow-2xl transform rotate-12 opacity-35 sm:w-44 sm:h-60 sm:opacity-45 md:left-[4%]"
            src="/images/gallery/gallery-3.jpg"
          />
          {/* Card 4 */}
          <img
            alt="Hero Visual 4"
            className="absolute top-[38%] right-[3%] w-36 h-48 object-cover rounded-xl border-[6px] gallery-border shadow-2xl transform -rotate-6 opacity-45 sm:w-52 sm:h-68 sm:opacity-55 md:right-[5%]"
            src="/images/gallery/gallery-4.jpg"
          />
          {/* Card 5 */}
          <img
            alt="Hero Visual 5"
            className="absolute top-[24%] left-[50%] -translate-x-1/2 w-36 h-36 object-cover rounded-xl border-[6px] gallery-border shadow-2xl transform rotate-45 opacity-20 sm:w-56 sm:h-56 mix-blend-luminosity"
            src="/images/gallery/gallery-5.jpg"
          />
        </div>

        {/* Foreground Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Desktop & Mobile Top Bar Navigation */}
          <nav className="w-full flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12">
            {/* Left: FitVerse Wordmark */}
            <Link
              to="/"
              className="font-headline text-lg sm:text-xl font-semibold text-primary tracking-tight hover:opacity-90 transition-opacity"
            >
              FitVerse
            </Link>

            {/* Desktop Navigation (hidden lg:flex) */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Glass pill nav cluster */}
              <div className="rounded-full bg-white/10 px-1.5 py-1.5 backdrop-blur-lg border border-white/10 flex items-center gap-1 shadow-lg">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `rounded-full px-3.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-150 ease-out whitespace-nowrap ${
                        isActive
                          ? 'bg-white/15 text-white font-semibold shadow-sm'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Separate Get Started Pill */}
              <Link
                to="/onboarding"
                className="self-stretch flex items-center justify-center rounded-full px-5 py-1.5 text-xs xl:text-sm font-bold bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(173,198,255,0.25)] whitespace-nowrap"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Hamburger Button (lg:hidden) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative lg:hidden h-10 w-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/10 flex items-center justify-center z-50 text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer shadow-lg"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu
                className={`w-5 h-5 absolute transition-all duration-300 transform ${
                  mobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`w-5 h-5 absolute transition-all duration-300 transform ${
                  mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                }`}
              />
            </button>
          </nav>

          {/* Mobile Menu Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
              mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden="true"
          />

          {/* Mobile Menu Slide-in Panel */}
          <div
            className={`fixed right-0 top-0 z-40 h-full w-72 bg-black/90 backdrop-blur-xl border-l border-white/10 flex flex-col justify-between lg:hidden transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Links */}
            <div className="flex flex-col px-6 pt-24 gap-2">
              {navItems.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    transitionDelay: mobileOpen ? `${(index + 1) * 60}ms` : '0ms',
                    transform: mobileOpen ? 'translateX(0)' : 'translateX(24px)',
                    opacity: mobileOpen ? 1 : 0,
                    transitionProperty: 'opacity, transform, background-color, color',
                    transitionDuration: '300ms',
                  }}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3.5 text-base font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Bottom CTA */}
            <div
              className="mt-auto px-6 pb-10"
              style={{
                transitionDelay: mobileOpen ? '300ms' : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(24px)',
                opacity: mobileOpen ? 1 : 0,
                transitionProperty: 'opacity, transform',
                transitionDuration: '400ms',
              }}
            >
              <Link
                to="/onboarding"
                onClick={() => setMobileOpen(false)}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-bold text-center block shadow-lg hover:brightness-110 active:scale-95 transition-all text-sm uppercase tracking-wider"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Main Content Area - Bottom Anchored */}
          <div className="mt-auto w-full px-5 pb-8 sm:px-8 sm:pb-12 lg:px-12 lg:pb-16 max-w-7xl mx-auto">
            <div className="w-full max-w-2xl">
              {/* Hero Headline + Subheading + CTA buttons */}
              <h1 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-on-background leading-[1.08] tracking-tight">
                {/* Rotating Word Container */}
                <span className="relative inline-block h-[38px] sm:h-[54px] lg:h-[68px] w-full max-w-[260px] sm:max-w-[380px] lg:max-w-[460px] overflow-hidden align-bottom">
                  {rotatingWords.map((word, idx) => {
                    const isActive = idx === currentWordIndex;
                    const isPrev =
                      idx === (currentWordIndex - 1 + rotatingWords.length) % rotatingWords.length;
                    return (
                      <span
                        key={word}
                        className={`absolute left-0 top-0 gradient-text font-headline text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase transition-all duration-700 ease-in-out select-none ${
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
                </span>
                <span className="block mt-1 font-headline font-black text-white">Your Fitness Path</span>
              </h1>

              <p className="font-body text-sm sm:text-base text-white/70 mt-3 sm:mt-4 max-w-xl leading-relaxed">
                An AI-driven fitness ecosystem that adapts your training, personalizes your nutrition, and connects you with a community built for real progress.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 mt-6 sm:mt-8 items-center">
                <Link
                  to="/onboarding"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#adc6ff] via-[#4b8eff] to-[#ffb595] text-[#00285c] font-headline font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(173,198,255,0.25)] hover:brightness-110 active:scale-95 transition-all text-center"
                >
                  START YOUR TRANSFORMATION
                </Link>

                <button
                  onClick={() => {
                    const element = document.getElementById('how-it-works');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-white font-headline font-bold text-xs sm:text-sm uppercase tracking-wider active:scale-95 transition-all cursor-pointer text-center"
                >
                  SEE HOW IT WORKS
                </button>
              </div>
            </div>
          </div>
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
