import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Workout', path: '/workout' },
  { name: 'Nutrition', path: '/nutrition' },
  { name: 'Community', path: '/community' },
  { name: 'Female Health', path: '/female-health' },
  { name: 'Profile', path: '/profile' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header className="sticky top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 lg:px-12">
        {/* Left: FitVerse Wordmark */}
        <Link
          to="/"
          className="font-headline text-lg sm:text-xl font-semibold text-primary tracking-tight hover:opacity-90 transition-opacity shrink-0"
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
      </div>

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
    </header>
  );
}
