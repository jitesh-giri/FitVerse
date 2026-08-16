import express from 'express';
import { generatePlan } from '../agents/planGeneratorAgent.js';

let firestoreDb = null;

// Lazy-load Firestore only if credentials are configured
async function getFirestore() {
  if (firestoreDb) return firestoreDb;

  const credsPath = process.env.FIREBASE_CREDS_PATH;
  if (!credsPath) {
    console.warn('[planRoutes] FIREBASE_CREDS_PATH not set — Firestore save will be skipped (plan logged to console).');
    return null;
  }

  try {
    const { default: admin } = await import('firebase-admin');
    if (!admin.apps.length) {
      const { createRequire } = await import('module');
      const require = createRequire(import.meta.url);
      const serviceAccount = require(credsPath);
      admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
    }
    firestoreDb = admin.firestore();
    console.log('[planRoutes] Firestore initialized.');
    return firestoreDb;
  } catch (err) {
    console.error('[planRoutes] Firestore init failed:', err.message);
    return null;
  }
}

const router = express.Router();

/**
 * POST /api/generate-plan
 * Body: { bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency }
 * Returns: { success: true, plan: { weeklyWorkout, weeklyDiet, supplements, planSummary } }
 */
router.post('/generate-plan', async (req, res) => {
  const { bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency } = req.body;

  // Basic validation
  if (!bmi || !bmiCategory || !goal || !dietaryPreference || !activityStyle || !frequency) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency',
    });
  }

  try {
    const plan = await generatePlan({ bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency });
    return res.json({ success: true, plan });
  } catch (err) {
    console.error('[POST /api/generate-plan] Error:', err.message);

    // Surface specific error types to the frontend
    if (err.message.includes('GEMINI_API_KEY')) {
      return res.status(500).json({
        success: false,
        error: 'Gemini API key is not configured on the server.',
        code: 'MISSING_API_KEY',
      });
    }
    if (err.message.includes('JSON')) {
      return res.status(500).json({
        success: false,
        error: 'AI returned an unexpected response format. Please retry.',
        code: 'SCHEMA_MISMATCH',
      });
    }
    return res.status(500).json({
      success: false,
      error: err.message || 'Plan generation failed. Please try again.',
      code: 'GENERATION_ERROR',
    });
  }
});

/**
 * POST /api/profile
 * Body: { userId, plan, onboardingData }
 * Saves to Firestore if configured, otherwise logs to console.
 */
router.post('/profile', async (req, res) => {
  const { userId = 'anonymous', plan, onboardingData } = req.body;

  if (!plan) {
    return res.status(400).json({ success: false, error: 'No plan provided to save.' });
  }

  const profileDoc = {
    userId,
    onboardingData: onboardingData || {},
    plan,
    savedAt: new Date().toISOString(),
  };

  try {
    const db = await getFirestore();
    if (db) {
      const docRef = db.collection('profiles').doc(userId);
      await docRef.set(profileDoc, { merge: true });
      console.log(`[POST /api/profile] Saved profile for userId="${userId}" to Firestore.`);
      return res.json({ success: true, source: 'firestore', userId });
    } else {
      // Graceful fallback — log the profile, return success so navigation works
      console.log('[POST /api/profile] Firestore unavailable. Profile data (fallback log):');
      console.log(JSON.stringify(profileDoc, null, 2));
      return res.json({ success: true, source: 'console_fallback', userId });
    }
  } catch (err) {
    console.error('[POST /api/profile] Save error:', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
