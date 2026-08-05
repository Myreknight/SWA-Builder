import type { DefenseTokens, DiceCount, Faction } from './ship';

// A single entry in the user-editable keyword library (e.g. "Bomber", "Escort").
export interface KeywordDefinition {
  id: string;
  name: string;
  description: string;
  // True for keywords that need a per-squadron number, e.g. "Counter" -> "Counter 2".
  hasValue?: boolean;
}

// One keyword assigned to a specific squadron; `value` only applies when the
// keyword's definition has hasValue: true.
export interface SquadronKeywordAssignment {
  keywordId: string;
  value?: number;
}

export interface SquadronCardData {
  id: string;
  name: string;
  unique: boolean; // shown as a bullet before the name, like a named ace squadron
  faction: Faction;
  accentColor: string; // hex color for the card border/accents, chosen independently of faction
  points: number;
  speed: number; // squadrons move up to this value each activation, no speed chart
  hull: number;
  antiSquadronArmament: DiceCount; // dice pool used when attacking other squadrons
  antiShipArmament: DiceCount; // dice pool used when attacking ships (always close range)
  defenseTokens: DefenseTokens; // capped at 2 total tokens in the editor
  keywords: SquadronKeywordAssignment[]; // references into the keyword library, no duplicate keywordIds
  artUrl: string;
}
