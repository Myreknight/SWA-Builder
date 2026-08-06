// A playable upgrade card, distinct from the upgrade slot type library
// (types/ship.ts UpgradeSlotDefinition) that just defines the category
// names ships can equip into. Visual template is TBD — this only covers
// the data captured by the editor.
export interface UpgradeCardData {
  id: string;
  name: string;
  upgradeSlotId: string; // references an UpgradeSlotDefinition id
  points: number;
  text: string; // ability / rules text
  artUrl: string;
}
