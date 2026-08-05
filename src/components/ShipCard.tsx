import type { CSSProperties } from 'react';
import type { AntiSquadronArmament, DiceCount, Facing, ShipCardData, SpeedSetting } from '../types/ship';
import { ALL_SPEEDS, FACING_ORDER } from '../types/ship';
import { DICE_ORDER, DIE_LETTER } from '../utils/dice';
import { DefenseTokenChips } from './DefenseTokenChips';
import { Stat } from './Stat';
import '../styles/dice.css';
import './ShipCard.css';

const FACING_LABEL: Record<Facing, string> = {
  front: 'Front',
  left: 'Left',
  right: 'Right',
  rear: 'Rear',
};

const YAW_PIP_COUNT = 3;

interface ShipCardProps {
  ship: ShipCardData;
}

export function ShipCard({ ship }: ShipCardProps) {
  return (
    <div className="ship-card" style={{ '--accent-color': ship.accentColor || '#888888' } as CSSProperties}>
      <div
        className="ship-card__art"
        style={ship.artUrl ? { backgroundImage: `url(${ship.artUrl})` } : undefined}
      />
      <div className="ship-card__overlay" />

      <header className="ship-card__header">
        <div className="ship-card__title">
          <h2>{ship.name}</h2>
          <span className="ship-card__subtitle">
            {ship.faction} &middot; {ship.size}
          </span>
        </div>
        <div className="ship-card__points" title="Point cost">
          {ship.points}
        </div>
      </header>

      <div className="ship-card__body">
        <div className="ship-card__left">
          <ShieldDiagram shields={ship.shields} hull={ship.hull} />
          <ArmamentTable armament={ship.armament} />
        </div>

        <div className="ship-card__right">
          <div className="ship-card__stats">
            <Stat label="Command" value={ship.command} />
            <Stat label="Squadron" value={ship.squadron} />
            <Stat label="Engineering" value={ship.engineering} />
            <AntiSquadronStat armament={ship.antiSquadronArmament} />
          </div>

          <div className="ship-card__tokens">
            <DefenseTokenChips defenseTokens={ship.defenseTokens} />
          </div>
        </div>
      </div>

      <SpeedChart speeds={ship.speed} />

      <footer className="ship-card__upgrades">
        {ship.upgradeSlots.map((slot, i) => (
          <span key={`${slot}-${i}`} className="upgrade-slot">
            {slot}
          </span>
        ))}
      </footer>
    </div>
  );
}

function SpeedChart({ speeds }: { speeds: SpeedSetting[] }) {
  const bySpeed = new Map(speeds.map((entry) => [entry.speed, entry.yaws]));

  return (
    <div className="speed-chart" aria-label="Speed and yaw chart">
      {ALL_SPEEDS.map((s) => {
        const yaws = bySpeed.get(s);
        const active = yaws !== undefined;
        return (
          <div key={s} className="speed-chart__column">
            <span className={`speed-pip${active ? ' active' : ''}`}>{s}</span>
            {active && (
              <div className="joint-list">
                {yaws.map((yaw, jointIndex) => (
                  <div key={jointIndex} className="yaw-pips">
                    {Array.from({ length: YAW_PIP_COUNT }, (_, i) => (
                      <span key={i} className={`yaw-pip${i < yaw ? ' filled' : ''}`} />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function AntiSquadronStat({ armament }: { armament: AntiSquadronArmament }) {
  return (
    <div className="stat">
      <span className={`die die--${armament.color} stat__die`}>
        {DIE_LETTER[armament.color]}
        {armament.count}
      </span>
      <span className="stat__label">Anti-Squad</span>
    </div>
  );
}

function ArmamentTable({ armament }: { armament: Record<Facing, DiceCount> }) {
  return (
    <div className="armament-table">
      {FACING_ORDER.map((facing) => (
        <ArmamentRow key={facing} label={FACING_LABEL[facing]} dice={armament[facing]} />
      ))}
    </div>
  );
}

function ArmamentRow({ label, dice }: { label: string; dice: DiceCount }) {
  const entries = DICE_ORDER.map((color) => [color, dice[color]] as const).filter(([, count]) => count > 0);

  return (
    <div className="armament-row">
      <span className="armament-row__label">{label}</span>
      <span className="armament-row__dice">
        {entries.length === 0 ? (
          <span className="armament-row__none">&mdash;</span>
        ) : (
          entries.map(([color, count]) => (
            <span key={color} className={`die die--${color}`}>
              {DIE_LETTER[color]}
              {count}
            </span>
          ))
        )}
      </span>
    </div>
  );
}

function ShieldDiagram({ shields, hull }: { shields: ShipCardData['shields']; hull: number }) {
  return (
    <div className="shield-diagram">
      <svg viewBox="0 0 120 120" className="shield-diagram__svg" aria-hidden="true">
        <polygon points="60,8 112,60 60,112 8,60" />
      </svg>
      <span className="shield shield--front" title="Front shield">
        {shields.front}
      </span>
      <span className="shield shield--right" title="Right shield">
        {shields.right}
      </span>
      <span className="shield shield--rear" title="Rear shield">
        {shields.rear}
      </span>
      <span className="shield shield--left" title="Left shield">
        {shields.left}
      </span>
      <span className="hull-value" title="Hull">
        {hull}
      </span>
    </div>
  );
}
