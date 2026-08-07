import type { ShipCardData, UpgradeSlotDefinition } from '../types/ship';
import type { KeywordDefinition, SquadronCardData } from '../types/squadron';
import type { UpgradeCardData } from '../types/upgrade';

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

export function parseBackup(text: string): AppBackup {
  const data = JSON.parse(text);
  if (!data || typeof data !== 'object' || !Array.isArray(data.ships)) {
    throw new Error('Not a valid SWA Builder backup file');
  }
  return {
    schemaVersion: 1,
    exportedAt: typeof data.exportedAt === 'string' ? data.exportedAt : new Date().toISOString(),
    ships: data.ships ?? [],
    squadrons: data.squadrons ?? [],
    upgradeCards: data.upgradeCards ?? [],
    keywords: data.keywords ?? [],
    upgradeSlots: data.upgradeSlots ?? [],
  };
}
