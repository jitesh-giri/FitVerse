import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Calculates current cycle day and phase based on last period start date and cycle length.
 * Standard baseline (28-day cycle):
 * - Menstrual: Days 1 – 5
 * - Follicular: Days 6 – 13
 * - Ovulation: Days 14 – 16
 * - Luteal: Days 17 – 28
 * Scaled proportionally if cycleLength differs from 28.
 *
 * NOTE: This is for general lifestyle, fitness & nutrition wellness guidance only, not medical advice.
 *
 * @param {string|Date} lastPeriodStart - Date of last period start
 * @param {number|string} cycleLength - Total cycle length in days (default 28)
 * @returns {{ cycleDay: number, cycleLength: number, phase: string } | null}
 */
export function calculateCycleInfo(lastPeriodStart, cycleLength = 28) {
  if (!lastPeriodStart) return null;

  const startDate = new Date(lastPeriodStart);
  if (isNaN(startDate.getTime())) return null;

  const numCycleLength = parseInt(cycleLength, 10) || 28;
  const now = new Date();

  // Normalize to UTC calendar days
  const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const nowUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());

  const diffDays = Math.max(0, Math.floor((nowUtc - startUtc) / (1000 * 60 * 60 * 24)));

  // Current cycle day is 1-indexed (1 to numCycleLength)
  const cycleDay = (diffDays % numCycleLength) + 1;

  // Scale ranges proportionally if cycle length differs from 28 days
  const ratio = numCycleLength / 28;
  const menstrualEnd = Math.max(1, Math.round(5 * ratio));
  const follicularEnd = Math.max(menstrualEnd + 1, Math.round(13 * ratio));
  const ovulationEnd = Math.max(follicularEnd + 1, Math.round(16 * ratio));

  let phase = 'Luteal';
  if (cycleDay <= menstrualEnd) {
    phase = 'Menstrual';
  } else if (cycleDay <= follicularEnd) {
    phase = 'Follicular';
  } else if (cycleDay <= ovulationEnd) {
    phase = 'Ovulation';
  } else {
    phase = 'Luteal';
  }

  return {
    cycleDay,
    cycleLength: numCycleLength,
    phase,
  };
}

/**
 * Builds the structured prompt for Gemini to generate a 7-day fitness plan.
 * @param {Object} input
 * @returns {string}
 */
export function buildPrompt({ bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency, cycleInfo }) {
  // Construct optional cycle context if provided
  let cycleSection = '';
  let cycleAdaptationInstruction = '';

  if (cycleInfo && cycleInfo.phase) {
    cycleSection = `
FEMALE CYCLE-SYNCED WELLNESS CONTEXT (General lifestyle & fitness guidance only — not medical advice):
- The user is currently in the ${cycleInfo.phase} phase of their menstrual cycle (day ${cycleInfo.cycleDay} of ${cycleInfo.cycleLength}).
- Training Adaptation: Adapt training intensity accordingly.
  * Menstrual phase: Favor lower-intensity sessions, mobility, walking, and active recovery.
  * Follicular phase: Encourage progressive overload, higher training volume, and strength building as energy rises.
  * Ovulation phase: Peak power and high neuromuscular output; suitable for personal records and high-intensity work.
  * Luteal phase: Moderate intensity, aerobic base conditioning (Zone 2), and steady-state resistance training.
- Nutritional Adaptation:
  * Menstrual phase: Emphasize iron-rich foods, magnesium, soothing warm meals, and hydration.
  * Follicular & Ovulation phases: Support glycogen synthesis, lean protein availability, and antioxidant-rich foods.
  * Luteal phase: Include complex carbohydrates, healthy fats, and nutrient-dense satiety support.
`;
    cycleAdaptationInstruction = `- "cycleAdaptationNote": Write 1-2 sentences explaining specifically how this plan was adapted for the user's current ${cycleInfo.phase} phase — e.g. intensity adjustments, specific nutrients emphasized, or recovery focus. Be concrete and specific to this phase.`;
  } else {
    cycleAdaptationInstruction = `- "cycleAdaptationNote": Set this field to null. Do not generate any cycle-related content.`;
  }

  return `You are an elite certified personal trainer and registered dietitian. Generate a complete, personalized 7-day fitness and nutrition plan.

USER PROFILE:
- BMI: ${bmi} (${bmiCategory})
- Primary Goal: ${goal}
- Dietary Preference: ${dietaryPreference}
- Training Style: ${activityStyle}
- Training Frequency: ${frequency} days per week
${cycleSection}
CRITICAL DIETARY RULE: The user follows a "${dietaryPreference}" diet.
- If "Vegan": ALL meals must be 100% plant-based. Zero meat, fish, eggs, or dairy in any meal.
- If "Vegetarian": No meat or fish. Dairy and eggs are allowed.
- If "Lactose Intolerant": No dairy products (milk, cheese, yogurt, whey). Use plant milks, egg whites, lean meats.
- If "Non-Vegetarian": All food groups allowed. Emphasize lean meats, fish, eggs.

TRAINING RULE: Rest days should have active recovery or stretching, not heavy lifting. Spread training across the week based on ${frequency} days/week.

Respond with ONLY valid JSON matching this exact schema (no markdown, no explanation):

{
  "weeklyWorkout": [
    {
      "day": "Monday",
      "type": "Training" | "Rest" | "Active Recovery",
      "focus": "brief focus description",
      "duration": "65 min",
      "exercises": [
        {
          "title": "Exercise Name",
          "category": "Primary Compound | Isolation | Cardio | etc",
          "sets": "4",
          "reps": "8-10",
          "tempo": "Tempo: 3-0-1-0",
          "rest": "Rest: 90s",
          "cues": [
            "First coaching cue with form detail.",
            "Second coaching cue.",
            "Third coaching cue."
          ]
        }
      ]
    }
  ],
  "weeklyDiet": [
    {
      "day": "Monday",
      "totalCalories": 2400,
      "macros": { "protein": 180, "carbs": 240, "fat": 70 },
      "meals": [
        {
          "name": "Breakfast",
          "description": "Specific meal description with portions",
          "calories": 600,
          "protein": 40
        }
      ]
    }
  ],
  "supplements": [
    {
      "name": "Supplement Name",
      "dose": "5g",
      "timing": "Post-workout",
      "rationale": "Brief evidence-based rationale."
    }
  ],
  "planSummary": "2-3 sentence overview of the overall plan strategy tailored to the user's profile.",
  "cycleAdaptationNote": "1-2 sentences describing how the plan was adapted for the user's current cycle phase, or null if no cycle data."
}

For the cycleAdaptationNote field specifically:
${cycleAdaptationInstruction}

Requirements:
- Include all 7 days (Monday through Sunday) in BOTH weeklyWorkout and weeklyDiet arrays.
- Rest/Recovery days in weeklyWorkout should have an empty exercises array [].
- Each training day should have 4-6 exercises appropriate for "${activityStyle}" style.
- Meals must STRICTLY comply with the "${dietaryPreference}" dietary restriction.
- All macros and calories must be nutritionally coherent.
- Supplement list should be 3-5 items, evidence-based, safe, and appropriate for the goal.`;
}

/**
 * Calls Gemini API in JSON mode to generate a 7-day fitness + nutrition plan.
 * @param {Object} input - { bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency, cycleInfo }
 * @returns {Promise<Object>} - Parsed plan object
 */
export async function generatePlan(input) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      responseMimeType: 'application/json',
      temperature: 0.7,
      topP: 0.9,
    },
  });

  const prompt = buildPrompt(input);

  console.log(`[planGeneratorAgent] Sending request to Gemini (${MODEL_NAME})...`);
  console.log(
    `[planGeneratorAgent] Profile: BMI=${input.bmi}, Goal=${input.goal}, Diet=${input.dietaryPreference}${
      input.cycleInfo ? `, Cycle Phase=${input.cycleInfo.phase} (Day ${input.cycleInfo.cycleDay}/${input.cycleInfo.cycleLength})` : ''
    }`
  );

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  // Validate it's parseable JSON
  let plan;
  try {
    plan = JSON.parse(responseText);
  } catch (parseError) {
    console.error('[planGeneratorAgent] JSON parse error. Raw response:', responseText.slice(0, 500));
    throw new Error(`Gemini returned invalid JSON: ${parseError.message}`);
  }

  // Validate top-level structure — cycleAdaptationNote is optional (null for non-cycle users)
  const requiredKeys = ['weeklyWorkout', 'weeklyDiet', 'supplements', 'planSummary'];
  for (const key of requiredKeys) {
    if (!plan[key]) {
      throw new Error(`Plan schema mismatch: missing required key "${key}"`);
    }
  }
  // Normalize: if Gemini omitted the field entirely (shouldn't happen), default to null
  if (!('cycleAdaptationNote' in plan)) {
    plan.cycleAdaptationNote = null;
  }

  if (plan.weeklyWorkout.length !== 7 || plan.weeklyDiet.length !== 7) {
    console.warn(`[planGeneratorAgent] Warning: expected 7 days, got workout=${plan.weeklyWorkout.length}, diet=${plan.weeklyDiet.length}`);
  }

  console.log(`[planGeneratorAgent] Plan generated successfully. Days: ${plan.weeklyWorkout.length}`);
  return plan;
}
