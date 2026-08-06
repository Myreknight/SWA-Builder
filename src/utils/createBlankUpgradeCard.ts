import type { UpgradeCardData } from '../types/upgrade';

export function createBlankUpgradeCard(): UpgradeCardData {
  return {
    id: crypto.randomUUID(),
    name: '',
    upgradeSlotId: '',
    points: 0,
    text: '',
    artUrl: '',
  };
}
