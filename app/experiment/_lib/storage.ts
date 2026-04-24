import type { ExperimentSetup } from "./types";

const STORAGE_KEY = "experimentSetup";

export function saveExperimentSetup(data: ExperimentSetup) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function loadExperimentSetup(): ExperimentSetup | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as ExperimentSetup;
    } catch {
        return null;
    }
}

export function clearExperimentSetup() {
    localStorage.removeItem(STORAGE_KEY);
}