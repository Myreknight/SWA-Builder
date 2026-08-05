import { useState } from 'react';
import type {
  DefenseTokens,
  DiceColor,
  Facing,
  ShipCardData,
  ShipSize,
  UpgradeSlot,
} from '../types/ship';
import { FACTION_PRESETS } from '../types/ship';
import { createBlankShip } from '../utils/createBlankShip';
import { ShipBase } from './ShipBase';
import { ShipCard } from './ShipCard';
import './ShipEditor.css';

const CUSTOM_FACTION_OPTION = 'Custom…';
const SIZES: ShipSize[] = ['Flotilla', 'Small', 'Medium', 'Large', 'Huge'];
const DICE_COLORS: DiceColor[] = ['red', 'blue', 'black'];
const FACINGS: Facing[] = ['front', 'left', 'right', 'rear'];
const DEFENSE_TOKEN_KEYS: (keyof DefenseTokens)[] = ['redirect', 'evade', 'brace', 'contain', 'salvo'];
const UPGRADE_SLOTS: UpgradeSlot[] = [
  'Commander',
  'Officer',
  'Weapons Team',
  'Offensive Retrofit',
  'Defensive Retrofit',
  'Fleet Command',
  'Fleet Support',
  'Turbolaser',
  'Ion Cannon',
  'Ordnance',
  'Boarding Team',
  'Title',
];
const DIE_COUNT_OPTIONS = [0, 1, 2, 3, 4];
const TOKEN_COUNT_OPTIONS = [0, 1, 2, 3];
const SPEEDS = [1, 2, 3, 4];
const YAW_OPTIONS = [0, 1, 2, 3];

interface ShipEditorProps {
  onAdd: (ship: ShipCardData) => void;
}

export function ShipEditor({ onAdd }: ShipEditorProps) {
  const [ship, setShip] = useState<ShipCardData>(createBlankShip);
  const isCustomFaction = !FACTION_PRESETS.includes(ship.faction);

  function update<K extends keyof ShipCardData>(key: K, value: ShipCardData[K]) {
    setShip((prev) => ({ ...prev, [key]: value }));
  }

  function updateShield(facing: Facing, value: number) {
    setShip((prev) => ({ ...prev, shields: { ...prev.shields, [facing]: value } }));
  }

  function updateArmamentDie(facing: Facing, color: DiceColor, value: number) {
    setShip((prev) => ({
      ...prev,
      armament: {
        ...prev.armament,
        [facing]: { ...prev.armament[facing], [color]: value },
      },
    }));
  }

  function updateAntiSquadronColor(color: DiceColor) {
    setShip((prev) => ({ ...prev, antiSquadronArmament: { ...prev.antiSquadronArmament, color } }));
  }

  function updateAntiSquadronCount(count: number) {
    setShip((prev) => ({ ...prev, antiSquadronArmament: { ...prev.antiSquadronArmament, count } }));
  }

  function updateDefenseToken(token: keyof DefenseTokens, count: number) {
    setShip((prev) => {
      const defenseTokens = { ...prev.defenseTokens };
      if (count === 0) {
        delete defenseTokens[token];
      } else {
        defenseTokens[token] = count;
      }
      return { ...prev, defenseTokens };
    });
  }

  function toggleSpeed(value: number) {
    setShip((prev) => ({
      ...prev,
      speed: prev.speed.some((entry) => entry.speed === value)
        ? prev.speed.filter((entry) => entry.speed !== value)
        : [...prev.speed, { speed: value, yaw: 0 }].sort((a, b) => a.speed - b.speed),
    }));
  }

  function updateYaw(value: number, yaw: number) {
    setShip((prev) => ({
      ...prev,
      speed: prev.speed.map((entry) => (entry.speed === value ? { ...entry, yaw } : entry)),
    }));
  }

  function addUpgradeSlot(slot: UpgradeSlot) {
    setShip((prev) => ({ ...prev, upgradeSlots: [...prev.upgradeSlots, slot] }));
  }

  function removeUpgradeSlot(index: number) {
    setShip((prev) => ({ ...prev, upgradeSlots: prev.upgradeSlots.filter((_, i) => i !== index) }));
  }

  function handleAdd() {
    onAdd(ship);
    setShip(createBlankShip());
  }

  return (
    <div className="ship-editor">
      <div className="ship-editor__form">
        <section className="editor-section">
          <h3>Basic Info</h3>
          <label className="field">
            <span>Name</span>
            <input value={ship.name} onChange={(e) => update('name', e.target.value)} placeholder="Ship name" />
          </label>
          <div className="field-row">
            <label className="field">
              <span>Faction</span>
              <select
                value={isCustomFaction ? CUSTOM_FACTION_OPTION : ship.faction}
                onChange={(e) => update('faction', e.target.value === CUSTOM_FACTION_OPTION ? '' : e.target.value)}
              >
                {FACTION_PRESETS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
                <option value={CUSTOM_FACTION_OPTION}>{CUSTOM_FACTION_OPTION}</option>
              </select>
            </label>
            <label className="field">
              <span>Size</span>
              <select value={ship.size} onChange={(e) => update('size', e.target.value as ShipSize)}>
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Points</span>
              <input
                type="number"
                min={0}
                value={ship.points}
                onChange={(e) => update('points', Number(e.target.value))}
              />
            </label>
            <label className="field field--narrow">
              <span>Border Color</span>
              <input
                type="color"
                value={ship.accentColor}
                onChange={(e) => update('accentColor', e.target.value)}
              />
            </label>
          </div>
          {isCustomFaction && (
            <label className="field">
              <span>Custom Faction Name</span>
              <input
                value={ship.faction}
                onChange={(e) => update('faction', e.target.value)}
                placeholder="Enter custom faction"
              />
            </label>
          )}
          <label className="field">
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => update('artUrl', reader.result as string);
                reader.readAsDataURL(file);
              }}
            />
          </label>
          <label className="field">
            <span>Or Paste Image URL</span>
            <input
              value={ship.artUrl}
              onChange={(e) => update('artUrl', e.target.value)}
              placeholder="https://... (optional)"
            />
          </label>
          <label className="field">
            <span>Upload Silhouette (for ship base)</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => update('silhouetteUrl', reader.result as string);
                reader.readAsDataURL(file);
              }}
            />
          </label>
        </section>

        <section className="editor-section">
          <h3>Core Stats</h3>
          <div className="field-row">
            <label className="field">
              <span>Hull</span>
              <input
                type="number"
                min={0}
                value={ship.hull}
                onChange={(e) => update('hull', Number(e.target.value))}
              />
            </label>
            <label className="field">
              <span>Command</span>
              <input
                type="number"
                min={0}
                value={ship.command}
                onChange={(e) => update('command', Number(e.target.value))}
              />
            </label>
            <label className="field">
              <span>Squadron</span>
              <input
                type="number"
                min={0}
                value={ship.squadron}
                onChange={(e) => update('squadron', Number(e.target.value))}
              />
            </label>
            <label className="field">
              <span>Engineering</span>
              <input
                type="number"
                min={0}
                value={ship.engineering}
                onChange={(e) => update('engineering', Number(e.target.value))}
              />
            </label>
          </div>
        </section>

        <section className="editor-section">
          <h3>Speed &amp; Yaw</h3>
          <div className="speed-editor">
            {SPEEDS.map((s) => {
              const entry = ship.speed.find((e) => e.speed === s);
              const active = entry !== undefined;
              return (
                <div key={s} className="speed-editor__row">
                  <label className="checkbox">
                    <input type="checkbox" checked={active} onChange={() => toggleSpeed(s)} />
                    <span>Speed {s}</span>
                  </label>
                  {active && (
                    <label className="field field--narrow">
                      <span>Yaw</span>
                      <select value={entry.yaw} onChange={(e) => updateYaw(s, Number(e.target.value))}>
                        {YAW_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section className="editor-section">
          <h3>Shields</h3>
          <div className="field-row">
            {FACINGS.map((facing) => (
              <label key={facing} className="field field--narrow">
                <span>{facing}</span>
                <input
                  type="number"
                  min={0}
                  value={ship.shields[facing]}
                  onChange={(e) => updateShield(facing, Number(e.target.value))}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="editor-section">
          <h3>Battery Armament</h3>
          <table className="armament-editor">
            <thead>
              <tr>
                <th>Facing</th>
                <th>Red</th>
                <th>Blue</th>
                <th>Black</th>
              </tr>
            </thead>
            <tbody>
              {FACINGS.map((facing) => (
                <tr key={facing}>
                  <td className="armament-editor__facing">{facing}</td>
                  {DICE_COLORS.map((color) => (
                    <td key={color}>
                      <select
                        value={ship.armament[facing][color]}
                        onChange={(e) => updateArmamentDie(facing, color, Number(e.target.value))}
                      >
                        {DIE_COUNT_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="editor-section">
          <h3>Anti-Squadron Armament</h3>
          <div className="field-row">
            <label className="field">
              <span>Die Color</span>
              <select
                value={ship.antiSquadronArmament.color}
                onChange={(e) => updateAntiSquadronColor(e.target.value as DiceColor)}
              >
                {DICE_COLORS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Count</span>
              <select
                value={ship.antiSquadronArmament.count}
                onChange={(e) => updateAntiSquadronCount(Number(e.target.value))}
              >
                {DIE_COUNT_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="editor-section">
          <h3>Defense Tokens</h3>
          <div className="field-row">
            {DEFENSE_TOKEN_KEYS.map((token) => (
              <label key={token} className="field field--narrow">
                <span>{token}</span>
                <select
                  value={ship.defenseTokens[token] ?? 0}
                  onChange={(e) => updateDefenseToken(token, Number(e.target.value))}
                >
                  {TOKEN_COUNT_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </section>

        <section className="editor-section">
          <h3>Upgrade Slots</h3>
          <select
            className="upgrade-add-select"
            value=""
            onChange={(e) => {
              if (e.target.value) addUpgradeSlot(e.target.value as UpgradeSlot);
              e.target.value = '';
            }}
          >
            <option value="" disabled>
              Add slot&hellip;
            </option>
            {UPGRADE_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          <div className="upgrade-list">
            {ship.upgradeSlots.length === 0 && <span className="upgrade-list__empty">No upgrade slots added</span>}
            {ship.upgradeSlots.map((slot, i) => (
              <span key={`${slot}-${i}`} className="upgrade-chip">
                {slot}
                <button type="button" onClick={() => removeUpgradeSlot(i)} aria-label={`Remove ${slot}`}>
                  &times;
                </button>
              </span>
            ))}
          </div>
        </section>

        <button type="button" className="add-ship-button" onClick={handleAdd} disabled={!ship.name}>
          Add Ship to Gallery
        </button>
      </div>

      <div className="ship-editor__preview">
        <h3>Live Preview</h3>
        <ShipCard ship={ship} />
        <ShipBase ship={ship} />
      </div>
    </div>
  );
}
