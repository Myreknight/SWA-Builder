import type { DiceCount, Faction } from './ship';

// A single entry in the user-editable keyword library (e.g. "Bomber", "Escort").
export interface KeywordDefinition {
  id: string;
  name: string;
  description: string;
}

export interface SquadronCardData {
  id: string;
  name: string;
  faction: Faction;
  accentColor: string; // hex color for the card border/accents, chosen independently of faction
  points: number;
  speed: number; // squadrons move up to this value each activation, no speed chart
  hull: number;
  antiSquadronArmament: DiceCount; // dice pool used when attacking other squadrons
  antiShipArmament: DiceCount; // dice pool used when attacking ships (always close range)
  keywordIds: string[]; // references into the keyword library, no duplicates
  artUrl: string;
}
