import type { UpgradeCardData } from '../types/upgrade';

const STORAGE_KEY = 'swa-builder:custom-upgrade-cards';

export function loadCustomUpgradeCards(): UpgradeCardData[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UpgradeCardData[]) : [];
  } catch (err) {
    console.warn('Failed to load custom upgrade cards from localStorage', err);
    return [];
  }
}

export function saveCustomUpgradeCards(cards: UpgradeCardData[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (err) {
    console.warn('Failed to save custom upgrade cards to localStorage', err);
  }
}
