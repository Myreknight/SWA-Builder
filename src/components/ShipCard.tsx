import type { CSSProperties } from 'react';
import type {
  AntiSquadronArmament,
  DiceCount,
  Facing,
  ShipCardData,
  SpeedSetting,
  UpgradeSlotDefinition,
} from '../types/ship';
import { ALL_SPEEDS, FACING_ORDER } from '../types/ship';
import { DefenseTokenChips } from './DefenseTokenChips';
import { DiceDiamonds } from './DiceDiamonds';
import '../styles/cardFrame.css';
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
  upgradeSlotLibrary: UpgradeSlotDefinition[];
}

export function ShipCard({ ship, upgradeSlotLibrary }: ShipCardProps) {
  return (
    <div
      className="card-frame ship-card"
      style={{ '--accent-color': ship.accentColor || '#888888' } as CSSProperties}
    >
      <div
        className="card-frame__art"
        style={ship.artUrl ? { backgroundImage: `url(${ship.artUrl})` } : undefined}
      />
      <div className="card-frame__overlay" />

      <header className="card-frame__header">
        <div className="card-frame__title">
          <h2>{ship.name}</h2>
          <span className="card-frame__points" title="Point cost">
            {ship.points}
          </span>
          <span className="card-frame__subtitle">
            {ship.faction} &middot; {ship.size}
          </span>
        </div>
        <div className="ship-card__quick-stats">
          <div className="ship-card__quick-stat">
            Command <span className="ship-card__quick-stat-value">{ship.command}</span>
          </div>
          <div className="ship-card__quick-stat">
            Squadron <span className="ship-card__quick-stat-value">{ship.squadron}</span>
          </div>
          <div className="ship-card__quick-stat">
            Engineering <span className="ship-card__quick-stat-value">{ship.engineering}</span>
          </div>
        </div>
      </header>

      <div className="ship-card__body">
        <div className="ship-card__left">
          <ShieldDiagram shields={ship.shields} hull={ship.hull} />
          <ArmamentTable armament={ship.armament} antiSquadron={ship.antiSquadronArmament} />
        </div>

        <div className="ship-card__right">
          <div className="ship-card__tokens">
            <DefenseTokenChips defenseTokens={ship.defenseTokens} />
          </div>
        </div>
      </div>

      <SpeedChart speeds={ship.speed} />

      <footer className="ship-card__upgrades">
        {ship.upgradeSlots.map((slotId, i) => {
          const def = upgradeSlotLibrary.find((s) => s.id === slotId);
          return (
            <span key={`${slotId}-${i}`} className="upgrade-slot">
              {def?.name ?? slotId}
            </span>
          );
        })}
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
                  <div key={jointIndex} className="joint-row" title={`Joint ${jointIndex + 1}`}>
                    <span className="joint-row__label">{jointIndex + 1}</span>
                    <div className="yaw-pips">
                      {Array.from({ length: YAW_PIP_COUNT }, (_, i) => (
                        <span key={i} className={`yaw-pip${i < yaw ? ' filled' : ''}`} />
                      ))}
                    </div>
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

function ArmamentTable({
  armament,
  antiSquadron,
}: {
  armament: Record<Facing, DiceCount>;
  antiSquadron: AntiSquadronArmament;
}) {
  return (
    <div className="armament-table">
      {FACING_ORDER.map((facing) => (
        <ArmamentRow key={facing} label={FACING_LABEL[facing]} dice={armament[facing]} />
      ))}
      <div className="armament-row armament-row--anti-squad">
        <span className="armament-row__label">Anti-Squad</span>
        <span className="armament-row__dice">
          <DiceDiamonds dice={{ [antiSquadron.color]: antiSquadron.count }} />
        </span>
      </div>
    </div>
  );
}

function ArmamentRow({ label, dice }: { label: string; dice: DiceCount }) {
  return (
    <div className="armament-row">
      <span className="armament-row__label">{label}</span>
      <span className="armament-row__dice">
        <DiceDiamonds dice={dice} />
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
