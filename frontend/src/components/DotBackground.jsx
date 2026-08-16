import { useRef, useEffect } from 'react';

// ─── Design system color tokens (from tailwind.config.js) ─────────────────────
const COLOR_PRIMARY  = '#adc6ff'; // primary / electric blue
const COLOR_TERTIARY = '#ffb595'; // tertiary / warm orange

// ─── Cluster centers as fractions of viewport ─────────────────────────────────
// Each cluster creates an organic blob/continent shape on the canvas.
const CLUSTER_DEFS = [
  { x: 0.12, y: 0.22, r: 0.20, color: COLOR_PRIMARY  },
  { x: 0.40, y: 0.12, r: 0.15, color: COLOR_TERTIARY },
  { x: 0.72, y: 0.28, r: 0.22, color: COLOR_PRIMARY  },
  { x: 0.22, y: 0.72, r: 0.17, color: COLOR_TERTIARY },
  { x: 0.62, y: 0.74, r: 0.20, color: COLOR_PRIMARY  },
  { x: 0.88, y: 0.58, r: 0.14, color: COLOR_TERTIARY },
];

// Spacing between grid points (24px provides rich density while keeping shadowBlur rendering fast)
const GRID_SPACING = 24;

/** Convert '#rrggbb' to [r, g, b] tuple */
function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Generate the dot list for given canvas dimensions. */
function buildDots(width, height) {
  const dots = [];
  const cols = Math.ceil(width  / GRID_SPACING);
  const rows = Math.ceil(height / GRID_SPACING);

  const clusters = CLUSTER_DEFS.map((c) => ({
    cx:  c.x * width,
    cy:  c.y * height,
    // Radius relative to the smaller canvas dimension for consistent look
    rSq: (c.r * Math.min(width, height)) ** 2,
    rgb: hexToRgb(c.color),
  }));

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      // Add small initial jitter so the grid feels organic
      const baseX = col * GRID_SPACING + (Math.random() - 0.5) * 8;
      const baseY = row * GRID_SPACING + (Math.random() - 0.5) * 8;

      // Find the nearest cluster this dot belongs to
      let bestDistSq = Infinity;
      let bestCluster = null;

      for (const c of clusters) {
        const dSq = (baseX - c.cx) ** 2 + (baseY - c.cy) ** 2;
        if (dSq < c.rSq && dSq < bestDistSq) {
          bestDistSq = dSq;
          bestCluster = c;
        }
      }

      if (!bestCluster) continue; // outside all clusters — discard

      dots.push({
        baseX,
        baseY,
        r: bestCluster.rgb[0],
        g: bestCluster.rgb[1],
        b: bestCluster.rgb[2],
        // Random dot radius between 1.2px and 2.2px
        radius: 1.2 + Math.random() * 1.0,
        // Opacity oscillation parameters
        opacityPhase: Math.random() * Math.PI * 2,
        opacitySpeed: 0.5 + Math.random() * 0.7,
        // Continuous gentle drift parameters (5–9px radius at 0.4–0.85 rad/s gives clear, calm floating orbits)
        driftRadius: 5 + Math.random() * 4,
        driftSpeed: 0.4 + Math.random() * 0.45,
        driftPhaseX: Math.random() * Math.PI * 2,
        driftPhaseY: Math.random() * Math.PI * 2,
        driftFreqRatio: 0.65 + Math.random() * 0.25,
      });
    }
  }

  return dots;
}

export default function DotBackground() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const dotsRef   = useRef([]);
  const startRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Size canvas to its parent and regenerate dots ────────────────────────
    const init = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.offsetWidth  : window.innerWidth;
      const h = parent ? parent.offsetHeight : window.innerHeight;
      canvas.width  = w;
      canvas.height = h;
      dotsRef.current = buildDots(w, h);
    };

    // ── Per-frame draw ───────────────────────────────────────────────────────
    const draw = (timestamp) => {
      if (startRef.current === null) startRef.current = timestamp;
      const t = (timestamp - startRef.current) / 1000; // seconds elapsed

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Subtle blur for a gentle glowing point-of-light appearance
      ctx.shadowBlur = 3.5;

      for (const dot of dotsRef.current) {
        // Opacity oscillates between ~0.12 and ~0.65 (never completely vanishing)
        const alpha = 0.12 + 0.265 * (1 + Math.sin(t * dot.opacitySpeed + dot.opacityPhase));
        const colorStr = `rgba(${dot.r},${dot.g},${dot.b},${alpha.toFixed(3)})`;

        // Smooth continuous 2D floating drift around base coordinate
        const currentX = dot.baseX + Math.cos(t * dot.driftSpeed + dot.driftPhaseX) * dot.driftRadius;
        const currentY = dot.baseY + Math.sin(t * dot.driftSpeed * dot.driftFreqRatio + dot.driftPhaseY) * dot.driftRadius;

        ctx.shadowColor = colorStr;
        ctx.fillStyle   = colorStr;

        ctx.beginPath();
        ctx.arc(currentX, currentY, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    // ── Debounced resize handler ─────────────────────────────────────────────
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
        startRef.current = null; // reset time origin so dots don't phase-jump
      }, 150);
    };

    init();
    animRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'absolute',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        0,
        display:       'block',
      }}
    />
  );
}


