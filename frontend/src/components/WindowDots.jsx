import React from 'react';

/**
 * Decorative macOS-style window control dots (#FF5F57 red, #FEBC2E yellow, #28C840 green).
 * Positioned absolutely in the true top-left corner of the parent card/window container.
 */
export default function WindowDots({ className = '' }) {
  return (
    <div
      className={`absolute top-3.5 left-4 md:top-4 md:left-5 z-20 flex items-center gap-1.5 md:gap-2 ${className}`}
      aria-hidden="true"
    >
      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F57] shadow-sm inline-block shrink-0 opacity-90" />
      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FEBC2E] shadow-sm inline-block shrink-0 opacity-90" />
      <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28C840] shadow-sm inline-block shrink-0 opacity-90" />
    </div>
  );
}

