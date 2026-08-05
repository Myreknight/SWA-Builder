import type { SquadronCardData } from '../types/squadron';

const STORAGE_KEY = 'swa-builder:custom-squadrons';

export function loadCustomSquadrons(): SquadronCardData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SquadronCardData[]) : [];
  } catch (err) {
    console.warn('Failed to load custom squadrons from localStorage', err);
    return [];
  }
}

export function saveCustomSquadrons(squadrons: SquadronCardData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(squadrons));
  } catch (err) {
    console.warn('Failed to save custom squadrons to localStorage', err);
  }
}
