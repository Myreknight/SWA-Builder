// A playable upgrade card, distinct from the upgrade slot type library
// (types/ship.ts UpgradeSlotDefinition) that just defines the category
// names ships can equip into.
export interface UpgradeCardData {
  id: string;
  name: string;
  upgradeSlotId: string; // references an UpgradeSlotDefinition id
  points: number;
  text: string; // ability / rules text
  artUrl: string;
  accentColor: string;
}
