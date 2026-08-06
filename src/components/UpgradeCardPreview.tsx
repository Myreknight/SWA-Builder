import type { UpgradeSlotDefinition } from '../types/ship';
import type { UpgradeCardData } from '../types/upgrade';
import './UpgradeCardPreview.css';

interface UpgradeCardPreviewProps {
  card: UpgradeCardData;
  upgradeSlotLibrary: UpgradeSlotDefinition[];
}

// Deliberately plain — the visual template for upgrade cards hasn't been
// designed yet, this just proves the data round-trips correctly.
export function UpgradeCardPreview({ card, upgradeSlotLibrary }: UpgradeCardPreviewProps) {
  const typeName = upgradeSlotLibrary.find((s) => s.id === card.upgradeSlotId)?.name ?? '—';

  return (
    <div className="upgrade-card-preview">
      {card.artUrl && (
        <div className="upgrade-card-preview__art" style={{ backgroundImage: `url(${card.artUrl})` }} />
      )}
      <div className="upgrade-card-preview__header">
        <h2>{card.name || 'Untitled Upgrade'}</h2>
        <span className="upgrade-card-preview__points" title="Point cost">
          {card.points}
        </span>
      </div>
      <div className="upgrade-card-preview__type">{typeName}</div>
      {card.text && <p className="upgrade-card-preview__text">{card.text}</p>}
    </div>
  );
}
