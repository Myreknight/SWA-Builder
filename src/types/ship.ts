// Free-form string so custom factions can be typed in; these are just the presets offered in the UI.
export type Faction = string;
export const FACTION_PRESETS: string[] = ['Rebel', 'Empire', 'Republic', 'Separatist'];

export type ShipSize = 'Flotilla' | 'Small' | 'Medium' | 'Large' | 'Huge';
export type Facing = 'front' | 'left' | 'right' | 'rear';
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

// One entry per speed the ship can use; yaw is the pip count (0-3) at that speed.
export interface SpeedSetting {
  speed: number; // 1-4
  yaw: number; // 0-3, shown as pips
}

export type UpgradeSlot =
  | 'Commander'
  | 'Officer'
  | 'Weapons Team'
  | 'Offensive Retrofit'
  | 'Defensive Retrofit'
  | 'Fleet Command'
  | 'Fleet Support'
  | 'Turbolaser'
  | 'Ion Cannon'
  | 'Ordnance'
  | 'Boarding Team'
  | 'Title';

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
