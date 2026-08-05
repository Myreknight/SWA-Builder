import type { ShipCardData } from '../types/ship';

function placeholderArt(topColor: string, bottomColor: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${topColor}" />
          <stop offset="100%" stop-color="${bottomColor}" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#g)" />
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Generic top-down hull outline, nose at top, used until the user uploads a real silhouette.
function placeholderSilhouette(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 160">
      <path d="M50 4 L68 42 L62 128 L78 156 L22 156 L38 128 L32 42 Z" fill="#1a1a1a" />
    </svg>
  `.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const sampleShips: ShipCardData[] = [
  {
    id: 'reb-frigate-mk2',
    name: 'Frigate Mk II',
    faction: 'Rebel',
    accentColor: '#c0392b',
    size: 'Medium',
    points: 45,
    hull: 62,
    command: 3,
    squadron: 2,
    engineering: 4,
    speed: [
      { speed: 1, yaws: [2] },
      { speed: 2, yaws: [2, 1] },
      { speed: 3, yaws: [1, 1, 0] },
    ],
    shields: { front: 3, left: 2, right: 2, rear: 1 },
    armament: {
      front: { red: 1, blue: 2, black: 0 },
      left: { red: 0, blue: 1, black: 1 },
      right: { red: 0, blue: 1, black: 1 },
      rear: { red: 0, blue: 0, black: 1 },
    },
    antiSquadronArmament: { color: 'black', count: 2 },
    defenseTokens: { evade: 1, redirect: 1 },
    upgradeSlots: ['Officer', 'Fleet Support', 'Turbolaser', 'Ordnance'],
    artUrl: placeholderArt('#7a2e2e', '#2b0f0f'),
    silhouetteUrl: placeholderSilhouette(),
  },
  {
    id: 'emp-star-destroyer',
    name: 'Star Destroyer',
    faction: 'Empire',
    accentColor: '#9aa3ad',
    size: 'Large',
    points: 108,
    hull: 108,
    command: 4,
    squadron: 3,
    engineering: 5,
    speed: [
      { speed: 1, yaws: [1] },
      { speed: 2, yaws: [1, 1] },
      { speed: 3, yaws: [0, 1, 0] },
    ],
    shields: { front: 4, left: 3, right: 3, rear: 2 },
    armament: {
      front: { red: 3, blue: 2, black: 0 },
      left: { red: 1, blue: 1, black: 1 },
      right: { red: 1, blue: 1, black: 1 },
      rear: { red: 0, blue: 1, black: 1 },
    },
    antiSquadronArmament: { color: 'black', count: 4 },
    defenseTokens: { brace: 2, contain: 1, redirect: 1 },
    upgradeSlots: ['Officer', 'Weapons Team', 'Ion Cannon', 'Fleet Command', 'Turbolaser'],
    artUrl: placeholderArt('#3a3f4a', '#0d0f14'),
    silhouetteUrl: placeholderSilhouette(),
  },
  {
    id: 'rep-assault-cruiser',
    name: 'Assault Cruiser',
    faction: 'Republic',
    accentColor: '#2e78c9',
    size: 'Medium',
    points: 68,
    hull: 70,
    command: 3,
    squadron: 3,
    engineering: 4,
    speed: [
      { speed: 1, yaws: [2] },
      { speed: 2, yaws: [2, 2] },
      { speed: 3, yaws: [1, 1, 1] },
      { speed: 4, yaws: [1, 1, 1, 0] },
    ],
    shields: { front: 3, left: 2, right: 2, rear: 2 },
    armament: {
      front: { red: 2, blue: 1, black: 0 },
      left: { red: 0, blue: 1, black: 1 },
      right: { red: 0, blue: 1, black: 1 },
      rear: { red: 0, blue: 0, black: 1 },
    },
    antiSquadronArmament: { color: 'blue', count: 2 },
    defenseTokens: { evade: 1, brace: 1 },
    upgradeSlots: ['Officer', 'Fleet Support', 'Turbolaser'],
    artUrl: placeholderArt('#1f4e8c', '#0a1a33'),
    silhouetteUrl: placeholderSilhouette(),
  },
  {
    id: 'sep-recusant-destroyer',
    name: 'Recusant Destroyer',
    faction: 'Separatist',
    accentColor: '#8c1c1c',
    size: 'Large',
    points: 92,
    hull: 90,
    command: 2,
    squadron: 4,
    engineering: 3,
    speed: [
      { speed: 1, yaws: [2] },
      { speed: 2, yaws: [1, 1] },
      { speed: 3, yaws: [0, 1, 0] },
    ],
    shields: { front: 4, left: 2, right: 2, rear: 1 },
    armament: {
      front: { red: 3, blue: 1, black: 0 },
      left: { red: 1, blue: 0, black: 1 },
      right: { red: 1, blue: 0, black: 1 },
      rear: { red: 0, blue: 0, black: 1 },
    },
    antiSquadronArmament: { color: 'black', count: 3 },
    defenseTokens: { salvo: 1, contain: 1 },
    upgradeSlots: ['Officer', 'Ordnance', 'Turbolaser', 'Fleet Command'],
    artUrl: placeholderArt('#5c1e1e', '#1a0a0a'),
    silhouetteUrl: placeholderSilhouette(),
  },
];
