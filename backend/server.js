import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import planRoutes from './src/routes/planRoutes.js';
import gymRoutes from './src/routes/gyms.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://fit-verse-ecru.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());

// Health-check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Plan generation + profile save routes
app.use('/api', planRoutes);

// Nearby gyms routes (/api/gyms/nearby)
app.use('/api/gyms', gymRoutes);

app.listen(PORT, () => {
  console.log(`FitVerse Backend server is running on http://localhost:${PORT}`);
  console.log(`  → POST /api/generate-plan`);
  console.log(`  → POST /api/profile`);
  console.log(`  → GET  /api/gyms/nearby`);
  console.log(`  GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '✓ set' : '✗ MISSING'}`);
  console.log(`  GOOGLE_PLACES_API_KEY: ${process.env.GOOGLE_PLACES_API_KEY ? '✓ set' : '✗ MISSING'}`);
  console.log(`  FIREBASE_CREDS_PATH: ${process.env.FIREBASE_CREDS_PATH || '(not set — Firestore disabled)'}`);
});

