import type { UpgradeSlotDefinition } from '../types/ship';
import { DEFAULT_UPGRADE_SLOTS } from '../data/defaultUpgradeSlots';

const STORAGE_KEY = 'swa-builder:upgrade-slots';

export function loadUpgradeSlots(): UpgradeSlotDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UpgradeSlotDefinition[]) : DEFAULT_UPGRADE_SLOTS;
  } catch (err) {
    console.warn('Failed to load upgrade slot library from localStorage', err);
    return DEFAULT_UPGRADE_SLOTS;
  }
}

export function saveUpgradeSlots(upgradeSlots: UpgradeSlotDefinition[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(upgradeSlots));
  } catch (err) {
    console.warn('Failed to save upgrade slot library to localStorage', err);
  }
}
