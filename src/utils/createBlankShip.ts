import type { ShipCardData } from '../types/ship';

export function createBlankShip(): ShipCardData {
  return {
    id: crypto.randomUUID(),
    name: '',
    faction: 'Rebel',
    accentColor: '#aa3bff',
    size: 'Medium',
    points: 0,
    hull: 0,
    command: 0,
    squadron: 0,
    engineering: 0,
    speed: [],
    shields: { front: 0, left: 0, right: 0, rear: 0 },
    armament: {
      front: { red: 0, blue: 0, black: 0 },
      left: { red: 0, blue: 0, black: 0 },
      right: { red: 0, blue: 0, black: 0 },
      rear: { red: 0, blue: 0, black: 0 },
    },
    antiSquadronArmament: { color: 'black', count: 0 },
    defenseTokens: {},
    upgradeSlots: [],
    artUrl: '',
    silhouetteUrl: '',
  };
}
