import type { KeywordDefinition } from '../types/squadron';
import { DEFAULT_KEYWORDS } from '../data/defaultKeywords';

const STORAGE_KEY = 'swa-builder:keywords';

export function loadKeywords(): KeywordDefinition[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as KeywordDefinition[]) : DEFAULT_KEYWORDS;
  } catch (err) {
    console.warn('Failed to load keyword library from localStorage', err);
    return DEFAULT_KEYWORDS;
  }
}

export function saveKeywords(keywords: KeywordDefinition[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(keywords));
  } catch (err) {
    console.warn('Failed to save keyword library to localStorage', err);
  }
}
