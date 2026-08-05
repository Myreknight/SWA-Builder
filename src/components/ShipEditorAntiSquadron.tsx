import type { AntiSquadronArmament, DiceColor } from '../types/ship';
import { DICE_ORDER, DIE_COUNT_OPTIONS } from '../utils/dice';

interface ShipEditorAntiSquadronProps {
  antiSquadronArmament: AntiSquadronArmament;
  onUpdateColor: (color: DiceColor) => void;
  onUpdateCount: (count: number) => void;
}

export function ShipEditorAntiSquadron({
  antiSquadronArmament,
  onUpdateColor,
  onUpdateCount,
}: ShipEditorAntiSquadronProps) {
  return (
    <section className="editor-section">
      <h3>Anti-Squadron Armament</h3>
      <div className="field-row">
        <label className="field">
          <span>Die Color</span>
          <select value={antiSquadronArmament.color} onChange={(e) => onUpdateColor(e.target.value as DiceColor)}>
            {DICE_ORDER.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Count</span>
          <select
            value={antiSquadronArmament.count}
            onChange={(e) => onUpdateCount(Number(e.target.value))}
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
  );
}
