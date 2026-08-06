import type { CSSProperties } from 'react';
import type { UpgradeSlotDefinition } from '../types/ship';
import type { UpgradeCardData } from '../types/upgrade';
import '../styles/cardFrame.css';
import './UpgradeCardPreview.css';

interface UpgradeCardPreviewProps {
  card: UpgradeCardData;
  upgradeSlotLibrary: UpgradeSlotDefinition[];
}

export function UpgradeCardPreview({ card, upgradeSlotLibrary }: UpgradeCardPreviewProps) {
  const typeName = upgradeSlotLibrary.find((s) => s.id === card.upgradeSlotId)?.name ?? '—';

  return (
    <div
      className="card-frame upgrade-card"
      style={{ '--accent-color': card.accentColor || '#888888' } as CSSProperties}
    >
      <div
        className="card-frame__art"
        style={card.artUrl ? { backgroundImage: `url(${card.artUrl})` } : undefined}
      />
      <div className="card-frame__overlay" />

      <header className="card-frame__header">
        <div className="card-frame__title">
          <h2>{card.name || 'Untitled Upgrade'}</h2>
          <span className="card-frame__subtitle">{typeName}</span>
        </div>
        <div className="card-frame__points" title="Point cost">
          {card.points}
        </div>
      </header>

      <div className="upgrade-card__body">
        {card.text && <p className="upgrade-card__text">{card.text}</p>}
      </div>
    </div>
  );
}
