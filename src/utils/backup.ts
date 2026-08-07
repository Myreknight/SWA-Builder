import type { ShipCardData, UpgradeSlotDefinition } from '../types/ship';
import type { KeywordDefinition, SquadronCardData } from '../types/squadron';
import type { UpgradeCardData } from '../types/upgrade';
import { createBlankShip } from './createBlankShip';
import { createBlankSquadron } from './createBlankSquadron';
import { createBlankUpgradeCard } from './createBlankUpgradeCard';

export interface AppBackup {
  schemaVersion: 1;
  exportedAt: string;
  ships: ShipCardData[];
  squadrons: SquadronCardData[];
  upgradeCards: UpgradeCardData[];
  keywords: KeywordDefinition[];
  upgradeSlots: UpgradeSlotDefinition[];
}

type BackupContents = Omit<AppBackup, 'schemaVersion' | 'exportedAt'>;

export function downloadBackup(data: BackupContents): void {
  const backup: AppBackup = { schemaVersion: 1, exportedAt: new Date().toISOString(), ...data };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `swa-builder-backup-${backup.exportedAt.slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Backfills any field missing from an older backup's schema with the same
// defaults a brand-new card would get, so imports from a prior app version
// don't carry `undefined` fields into the current one.
function fillShipDefaults(ship: Partial<ShipCardData>): ShipCardData {
  return { ...createBlankShip(), ...ship, id: ship.id || crypto.randomUUID() };
}

function fillSquadronDefaults(squadron: Partial<SquadronCardData>): SquadronCardData {
  return { ...createBlankSquadron(), ...squadron, id: squadron.id || crypto.randomUUID() };
}

function fillUpgradeCardDefaults(card: Partial<UpgradeCardData>): UpgradeCardData {
  return { ...createBlankUpgradeCard(), ...card, id: card.id || crypto.randomUUID() };
}

function fillKeywordDefaults(keyword: Partial<KeywordDefinition>): KeywordDefinition {
  return {
    id: keyword.id || crypto.randomUUID(),
    name: keyword.name ?? '',
    description: keyword.description ?? '',
    hasValue: keyword.hasValue,
  };
}

function fillUpgradeSlotDefaults(slot: Partial<UpgradeSlotDefinition>): UpgradeSlotDefinition {
  return { id: slot.id || crypto.randomUUID(), name: slot.name ?? '' };
}

export function parseBackup(text: string): AppBackup {
  const data = JSON.parse(text);
  if (!data || typeof data !== 'object' || !Array.isArray(data.ships)) {
    throw new Error('Not a valid SWA Builder backup file');
  }
  return {
    schemaVersion: 1,
    exportedAt: typeof data.exportedAt === 'string' ? data.exportedAt : new Date().toISOString(),
    ships: (data.ships ?? []).map(fillShipDefaults),
    squadrons: (data.squadrons ?? []).map(fillSquadronDefaults),
    upgradeCards: (data.upgradeCards ?? []).map(fillUpgradeCardDefaults),
    keywords: (data.keywords ?? []).map(fillKeywordDefaults),
    upgradeSlots: (data.upgradeSlots ?? []).map(fillUpgradeSlotDefaults),
  };
}
