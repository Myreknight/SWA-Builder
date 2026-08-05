import type { CSSProperties } from 'react';
import type { AntiSquadronArmament, DiceCount, ShipCardData, ShipSize } from '../types/ship';
import { DICE_ORDER, DIE_LETTER } from '../utils/dice';
import '../styles/dice.css';
import './ShipBase.css';

// Real-world base footprint in mm. Huge ships have no defined base yet.
const BASE_SIZE_MM: Partial<Record<ShipSize, { width: number; length: number }>> = {
  Flotilla: { width: 43, length: 71 },
  Small: { width: 43, length: 71 },
  Medium: { width: 63, length: 102 },
  Large: { width: 77.5, length: 129 },
};

interface ShipBaseProps {
  ship: ShipCardData;
}

export function ShipBase({ ship }: ShipBaseProps) {
  const size = BASE_SIZE_MM[ship.size];

  if (!size) {
    return (
      <div className="ship-base ship-base--unsupported">
        No base template defined for {ship.size} ships yet.
      </div>
    );
  }

  const { width, length } = size;

  return (
    <div
      className="ship-base"
      style={
        {
          width: `${width}mm`,
          height: `${length}mm`,
          '--accent-color': ship.accentColor || '#888888',
        } as CSSProperties
      }
    >
      {ship.silhouetteUrl && (
        <div
          className="ship-base__silhouette"
          style={{ backgroundImage: `url(${ship.silhouetteUrl})` }}
        />
      )}

      <svg
        viewBox={`0 0 ${width} ${length}`}
        className="ship-base__arcs"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect x="0.75" y="0.75" width={width - 1.5} height={length - 1.5} className="ship-base__outline" />
        <line x1="0" y1="0" x2={width} y2={length} className="ship-base__arc-line" />
        <line x1={width} y1="0" x2="0" y2={length} className="ship-base__arc-line" />
      </svg>

      <div className="ship-base__zone ship-base__zone--front">
        <ArmamentBadge dice={ship.armament.front} />
      </div>
      <div className="ship-base__zone ship-base__zone--left">
        <ArmamentBadge dice={ship.armament.left} />
      </div>
      <div className="ship-base__zone ship-base__zone--right">
        <ArmamentBadge dice={ship.armament.right} />
      </div>
      <div className="ship-base__zone ship-base__zone--rear">
        <ArmamentBadge dice={ship.armament.rear} />
        <AntiSquadronBadge armament={ship.antiSquadronArmament} />
      </div>
    </div>
  );
}

function ArmamentBadge({ dice }: { dice: DiceCount }) {
  const entries = DICE_ORDER.map((color) => [color, dice[color]] as const).filter(([, count]) => count > 0);

  if (entries.length === 0) {
    return <span className="ship-base__none">&mdash;</span>;
  }

  return (
    <div className="ship-base__dice">
      {entries.map(([color, count]) => (
        <span key={color} className={`die die--${color}`}>
          {DIE_LETTER[color]}
          {count}
        </span>
      ))}
    </div>
  );
}

function AntiSquadronBadge({ armament }: { armament: AntiSquadronArmament }) {
  return (
    <div className="ship-base__anti-squad">
      <span className="ship-base__anti-squad-label">AS</span>
      <span className={`die die--${armament.color}`}>
        {DIE_LETTER[armament.color]}
        {armament.count}
      </span>
    </div>
  );
}
