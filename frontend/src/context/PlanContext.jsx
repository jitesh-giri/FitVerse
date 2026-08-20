import React, { createContext, useContext, useState, useEffect } from 'react';

const PlanContext = createContext(null);

const STORAGE_KEYS = {
  PLAN: 'fitverse_plan',
  PROFILE: 'fitverse_profile',
};

function safeParse(key, fallback = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.warn(`[PlanContext] Failed to parse localStorage key "${key}":`, err);
    return fallback;
  }
}

export function PlanProvider({ children }) {
  // Hydrate initial state synchronously from localStorage
  const [plan, setPlanState] = useState(() => safeParse(STORAGE_KEYS.PLAN, null));
  const [profile, setProfileState] = useState(() => safeParse(STORAGE_KEYS.PROFILE, null));

  // Setter wrapper for plan that updates state and localStorage
  const setPlan = (newPlan) => {
    setPlanState(newPlan);
    try {
      if (newPlan) {
        localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(newPlan));
      } else {
        localStorage.removeItem(STORAGE_KEYS.PLAN);
      }
    } catch (err) {
      console.error('[PlanContext] Error writing plan to localStorage:', err);
    }
  };

  // Setter wrapper for profile that updates state and localStorage
  const setProfile = (newProfile) => {
    setProfileState(newProfile);
    try {
      if (newProfile) {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(newProfile));
      } else {
        localStorage.removeItem(STORAGE_KEYS.PROFILE);
      }
    } catch (err) {
      console.error('[PlanContext] Error writing profile to localStorage:', err);
    }
  };

  // Reset helper
  const clearPlan = () => {
    setPlanState(null);
    setProfileState(null);
    try {
      localStorage.removeItem(STORAGE_KEYS.PLAN);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
    } catch (err) {
      console.error('[PlanContext] Error clearing localStorage:', err);
    }
  };

  return (
    <PlanContext.Provider value={{ plan, profile, setPlan, setProfile, clearPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}
