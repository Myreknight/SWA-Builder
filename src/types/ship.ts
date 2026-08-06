// Free-form string so custom factions can be typed in; these are just the presets offered in the UI.
export type Faction = string;
export const FACTION_PRESETS: string[] = ['Rebel', 'Empire', 'Republic', 'Separatist'];

export type ShipSize = 'Flotilla' | 'Small' | 'Medium' | 'Large' | 'Huge';
export type Facing = 'front' | 'left' | 'right' | 'rear';
export const FACING_ORDER: Facing[] = ['front', 'left', 'right', 'rear'];
export type DiceColor = 'red' | 'blue' | 'black';

export interface ShieldValues {
  front: number;
  left: number;
  right: number;
  rear: number;
}

// Anti-ship battery dice for a single hull zone, one count per die color.
export interface DiceCount {
  red: number;
  blue: number;
  black: number;
}

// Anti-squadron armament is a single die color + count, not tied to a facing.
export interface AntiSquadronArmament {
  color: DiceColor;
  count: number;
}

export interface DefenseTokens {
  redirect?: number;
  evade?: number;
  brace?: number;
  contain?: number;
  salvo?: number;
}

export const DEFENSE_TOKEN_KEYS: (keyof DefenseTokens)[] = ['redirect', 'evade', 'brace', 'contain', 'salvo'];

// One entry per speed the ship can use. `yaws` holds one 0-3 pip value per
// maneuver-tool joint at that speed (Speed 1 = 1 joint, Speed 2 = 2 joints,
// Speed 3 = 3 joints, Speed 4 = 4 joints).
export interface SpeedSetting {
  speed: number; // 1-4
  yaws: number[]; // one entry per joint, each 0-3, shown as pips
}

export function jointsForSpeed(speed: number): number {
  return speed;
}

export const ALL_SPEEDS = [1, 2, 3, 4] as const;

// Free-form id referencing an entry in the user-editable upgrade slot
// library (see data/defaultUpgradeSlots.ts) — not a fixed set, so slot
// types can be renamed or added. A ship's upgradeSlots array holds ids,
// not literal names, so renaming a library entry updates every ship
// using it. Duplicates are allowed (a ship can have two Ordnance slots).
export type UpgradeSlot = string;

export interface UpgradeSlotDefinition {
  id: string;
  name: string;
}

export interface ShipCardData {
  id: string;
  name: string;
  faction: Faction;
  accentColor: string; // hex color for the card/base border and accents, chosen independently of faction
  size: ShipSize;
  points: number;
  hull: number;
  command: number;
  squadron: number;
  engineering: number;
  speed: SpeedSetting[]; // one entry per available speed, each with its yaw pip count
  shields: ShieldValues;
  armament: Record<Facing, DiceCount>; // battery armament per hull zone
  antiSquadronArmament: AntiSquadronArmament;
  defenseTokens: DefenseTokens;
  upgradeSlots: UpgradeSlot[];
  artUrl: string; // card art
  silhouetteUrl: string; // top-down silhouette used on the ship base template
}
