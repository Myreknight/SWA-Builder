import type { SquadronCardData } from '../types/squadron';

export function createBlankSquadron(): SquadronCardData {
  return {
    id: crypto.randomUUID(),
    name: '',
    unique: false,
    faction: 'Rebel',
    accentColor: '#aa3bff',
    points: 0,
    speed: 0,
    hull: 0,
    antiSquadronArmament: { red: 0, blue: 0, black: 0 },
    antiShipArmament: { red: 0, blue: 0, black: 0 },
    defenseTokens: {},
    keywords: [],
    artUrl: '',
  };
}
