import type { ExperimentPlan } from "./types";

const STORAGE_KEY = "experimentPlan";

export function saveExperimentPlan(plan: ExperimentPlan) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

export function loadExperimentPlan(): ExperimentPlan | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ExperimentPlan;
  } catch {
    return null;
  }
}

export function clearExperimentPlan() {
  localStorage.removeItem(STORAGE_KEY);
}
