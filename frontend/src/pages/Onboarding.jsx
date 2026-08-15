import React, { useState } from 'react';

export default function Onboarding() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  const calculateBmi = (e) => {
    e.preventDefault();
    const hInMeters = parseFloat(height) / 100;
    const wInKg = parseFloat(weight);

    if (hInMeters > 0 && wInKg > 0) {
      const bmi = (wInKg / (hInMeters * hInMeters)).toFixed(1);
      let category = '';
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 24.9) category = 'Normal weight';
      else if (bmi < 29.9) category = 'Overweight';
      else category = 'Obese';

      setBmiResult({ bmi, category });
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <span className="inline-block px-3 py-1 bg-pink-500/10 text-pink-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-4">
          Onboarding
        </span>
        <h1 className="text-3xl font-bold text-white mb-2">BMI & Profile Flow</h1>
        <p className="text-slate-400 text-sm mb-6">
          Calculate your initial Body Mass Index (BMI) to start tailoring your personalized fitness journey.
        </p>

        <form onSubmit={calculateBmi} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
              Height (cm)
            </label>
            <input
              type="number"
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
              Weight (kg)
            </label>
            <input
              type="number"
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-xl transition mt-2 cursor-pointer"
          >
            Calculate BMI
          </button>
        </form>

        {bmiResult && (
          <div className="mt-6 p-4 bg-slate-950 border border-emerald-500/30 rounded-xl">
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">Your Result</p>
            <p className="text-2xl font-bold text-white mt-1">
              BMI: <span className="text-emerald-400">{bmiResult.bmi}</span>
            </p>
            <p className="text-sm text-slate-300 mt-1">
              Category: <span className="font-medium text-white">{bmiResult.category}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
