import type { UpgradeCardData } from '../types/upgrade';
import { placeholderArt } from '../utils/placeholderArt';

export const sampleUpgradeCards: UpgradeCardData[] = [
  {
    id: 'sample-gunnery-team',
    name: 'Gunnery Team',
    upgradeSlotId: 'weapons-team',
    points: 6,
    text: 'While attacking, you may reroll any number of your black dice.',
    artUrl: placeholderArt('#5c4a1e', '#1a1408', 300, 420),
  },
  {
    id: 'sample-veteran-officer',
    name: 'Veteran Officer',
    upgradeSlotId: 'officer',
    points: 4,
    text: 'You may resolve two effects that trigger "when you reveal a command" instead of one.',
    artUrl: placeholderArt('#1e4a5c', '#08141a', 300, 420),
  },
];
