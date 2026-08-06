import type { SquadronCardData } from '../types/squadron';
import { placeholderArt as sharedPlaceholderArt } from '../utils/placeholderArt';

function placeholderArt(topColor: string, bottomColor: string): string {
  return sharedPlaceholderArt(topColor, bottomColor, 300, 180);
}

export const sampleSquadrons: SquadronCardData[] = [
  {
    id: 'reb-x-wing',
    name: 'X-Wing Squadron',
    unique: false,
    faction: 'Rebel',
    accentColor: '#c0392b',
    points: 16,
    speed: 4,
    hull: 4,
    antiSquadronArmament: { red: 2, blue: 0, black: 0 },
    antiShipArmament: { red: 0, blue: 1, black: 0 },
    defenseTokens: { brace: 1 },
    keywords: [{ keywordId: 'swarm' }],
    artUrl: placeholderArt('#7a2e2e', '#2b0f0f'),
  },
  {
    id: 'emp-tie-bomber',
    name: 'TIE Bomber Squadron',
    unique: false,
    faction: 'Empire',
    accentColor: '#9aa3ad',
    points: 12,
    speed: 3,
    hull: 3,
    antiSquadronArmament: { red: 1, blue: 0, black: 0 },
    antiShipArmament: { red: 0, blue: 2, black: 0 },
    defenseTokens: {},
    keywords: [{ keywordId: 'bomber' }],
    artUrl: placeholderArt('#3a3f4a', '#0d0f14'),
  },
  {
    id: 'rep-arc170',
    name: 'Odd Ball',
    unique: true,
    faction: 'Republic',
    accentColor: '#2e78c9',
    points: 21,
    speed: 4,
    hull: 4,
    antiSquadronArmament: { red: 1, blue: 1, black: 0 },
    antiShipArmament: { red: 0, blue: 1, black: 0 },
    defenseTokens: { evade: 1, brace: 1 },
    keywords: [{ keywordId: 'escort' }, { keywordId: 'grit' }, { keywordId: 'counter', value: 2 }],
    artUrl: placeholderArt('#1f4e8c', '#0a1a33'),
  },
];
