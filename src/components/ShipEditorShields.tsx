import { FACING_ORDER } from '../types/ship';
import type { Facing, ShieldValues } from '../types/ship';

interface ShipEditorShieldsProps {
  shields: ShieldValues;
  onUpdateShield: (facing: Facing, value: number) => void;
}

export function ShipEditorShields({ shields, onUpdateShield }: ShipEditorShieldsProps) {
  return (
    <section className="editor-section">
      <h3>Shields</h3>
      <div className="field-row">
        {FACING_ORDER.map((facing) => (
          <label key={facing} className="field field--narrow">
            <span>{facing}</span>
            <input
              type="number"
              min={0}
              value={shields[facing]}
              onChange={(e) => onUpdateShield(facing, Number(e.target.value))}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
