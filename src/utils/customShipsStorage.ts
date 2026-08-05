import type { ShipCardData } from '../types/ship';

const STORAGE_KEY = 'swa-builder:custom-ships';

export function loadCustomShips(): ShipCardData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ShipCardData[]) : [];
  } catch (err) {
    console.warn('Failed to load custom ships from localStorage', err);
    return [];
  }
}

export function saveCustomShips(ships: ShipCardData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ships));
  } catch (err) {
    console.warn('Failed to save custom ships to localStorage', err);
  }
}
