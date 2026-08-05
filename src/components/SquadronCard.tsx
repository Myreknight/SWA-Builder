import type { CSSProperties } from 'react';
import type { DiceCount } from '../types/ship';
import type { KeywordDefinition, SquadronCardData } from '../types/squadron';
import { DICE_ORDER, DIE_LETTER } from '../utils/dice';
import { Stat } from './Stat';
import '../styles/dice.css';
import './SquadronCard.css';

interface SquadronCardProps {
  squadron: SquadronCardData;
  keywords: KeywordDefinition[];
}

export function SquadronCard({ squadron, keywords }: SquadronCardProps) {
  const keywordNames = squadron.keywordIds
    .map((id) => keywords.find((k) => k.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <div
      className="squadron-card"
      style={{ '--accent-color': squadron.accentColor || '#888888' } as CSSProperties}
    >
      <div
        className="squadron-card__art"
        style={squadron.artUrl ? { backgroundImage: `url(${squadron.artUrl})` } : undefined}
      />
      <div className="squadron-card__overlay" />

      <header className="squadron-card__header">
        <div className="squadron-card__title">
          <h2>{squadron.name}</h2>
          <span className="squadron-card__subtitle">{squadron.faction}</span>
        </div>
        <div className="squadron-card__points" title="Point cost">
          {squadron.points}
        </div>
      </header>

      <div className="squadron-card__body">
        <Stat label="Speed" value={squadron.speed} />
        <Stat label="Hull" value={squadron.hull} />
        <DiceStat label="Anti-Squadron" dice={squadron.antiSquadronArmament} />
        <DiceStat label="Anti-Ship" dice={squadron.antiShipArmament} />
      </div>

      <div className="squadron-card__keywords">
        {keywordNames.length === 0 ? (
          <span className="squadron-card__none">No keywords</span>
        ) : (
          keywordNames.map((name) => (
            <span key={name} className="keyword-chip">
              {name}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

function DiceStat({ label, dice }: { label: string; dice: DiceCount }) {
  const entries = DICE_ORDER.map((color) => [color, dice[color]] as const).filter(([, count]) => count > 0);

  return (
    <div className="stat squadron-card__dice-stat">
      {entries.length === 0 ? (
        <span className="squadron-card__none">&mdash;</span>
      ) : (
        <div className="squadron-card__dice">
          {entries.map(([color, count]) => (
            <span key={color} className={`die die--${color}`}>
              {DIE_LETTER[color]}
              {count}
            </span>
          ))}
        </div>
      )}
      <span className="stat__label">{label}</span>
    </div>
  );
}
