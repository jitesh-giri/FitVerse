import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Workout', path: '/workout' },
  { name: 'Nutrition', path: '/nutrition' },
  { name: 'Community', path: '/community' },
  { name: 'Profile', path: '/profile' },
  { name: 'Admin', path: '/admin' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 w-full z-50 bg-[#131313] border-b-8 border-primary transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-on-background hover:text-primary transition-colors duration-300 md:hidden scale-95 active:scale-90"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[28px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
          
          <Link to="/" className="flex items-center cursor-pointer scale-95 active:scale-90 transition-transform hover:opacity-90">
            <span className="font-headline text-2xl md:text-3xl font-black text-primary tracking-tight">
              FitVerse
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden md:flex gap-6 lg:gap-8 items-center font-body text-base">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition-colors duration-300 font-medium ${
                  isActive
                    ? 'text-primary font-bold border-b-2 border-primary pb-1'
                    : 'text-on-surface-variant hover:text-white pb-1'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/workout"
            className="bg-primary text-on-primary font-headline text-xs md:text-sm uppercase tracking-widest font-extrabold px-5 py-2.5 rounded hover:bg-primary-container transition-all scale-95 active:scale-90 shadow-[0_0_15px_rgba(173,198,255,0.3)] hidden sm:inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-high border-t border-surface-variant p-6 flex flex-col gap-4 animate-fadeIn">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg flex items-center gap-3 font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'text-on-surface-variant hover:bg-surface-variant hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined">
                {item.path === '/' ? 'home' :
                 item.path === '/workout' ? 'fitness_center' :
                 item.path === '/nutrition' ? 'restaurant' :
                 item.path === '/community' ? 'groups' :
                 item.path === '/profile' ? 'person' : 'gavel'}
              </span>
              <span>{item.name}</span>
            </NavLink>
          ))}
          <Link
            to="/workout"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center bg-primary text-on-primary font-headline text-xs uppercase tracking-widest font-bold py-3 rounded"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
