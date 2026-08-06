import type { UpgradeSlotDefinition } from '../types/ship';

// Starter set of common Armada upgrade slot types. Edit names or add new
// ones in the Upgrades library — ships reference these by id, so renaming
// an entry here updates every ship using it.
export const DEFAULT_UPGRADE_SLOTS: UpgradeSlotDefinition[] = [
  { id: 'commander', name: 'Commander' },
  { id: 'officer', name: 'Officer' },
  { id: 'weapons-team', name: 'Weapons Team' },
  { id: 'offensive-retrofit', name: 'Offensive Retrofit' },
  { id: 'defensive-retrofit', name: 'Defensive Retrofit' },
  { id: 'fleet-command', name: 'Fleet Command' },
  { id: 'fleet-support', name: 'Fleet Support' },
  { id: 'turbolaser', name: 'Turbolaser' },
  { id: 'ion-cannon', name: 'Ion Cannon' },
  { id: 'ordnance', name: 'Ordnance' },
  { id: 'boarding-team', name: 'Boarding Team' },
  { id: 'title', name: 'Title' },
];
