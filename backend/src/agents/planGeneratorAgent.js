import { GoogleGenerativeAI } from '@google/generative-ai';

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Builds the structured prompt for Gemini to generate a 7-day fitness plan.
 * @param {Object} input
 * @returns {string}
 */
function buildPrompt({ bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency }) {
  return `You are an elite certified personal trainer and registered dietitian. Generate a complete, personalized 7-day fitness and nutrition plan.

USER PROFILE:
- BMI: ${bmi} (${bmiCategory})
- Primary Goal: ${goal}
- Dietary Preference: ${dietaryPreference}
- Training Style: ${activityStyle}
- Training Frequency: ${frequency} days per week

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
  "planSummary": "2-3 sentence overview of the overall plan strategy tailored to the user's profile."
}

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
 * @param {Object} input - { bmi, bmiCategory, goal, dietaryPreference, activityStyle, frequency }
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
  console.log(`[planGeneratorAgent] Profile: BMI=${input.bmi}, Goal=${input.goal}, Diet=${input.dietaryPreference}`);

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

  // Validate top-level structure
  const requiredKeys = ['weeklyWorkout', 'weeklyDiet', 'supplements', 'planSummary'];
  for (const key of requiredKeys) {
    if (!plan[key]) {
      throw new Error(`Plan schema mismatch: missing required key "${key}"`);
    }
  }

  if (plan.weeklyWorkout.length !== 7 || plan.weeklyDiet.length !== 7) {
    console.warn(`[planGeneratorAgent] Warning: expected 7 days, got workout=${plan.weeklyWorkout.length}, diet=${plan.weeklyDiet.length}`);
  }

  console.log(`[planGeneratorAgent] Plan generated successfully. Days: ${plan.weeklyWorkout.length}`);
  return plan;
}
