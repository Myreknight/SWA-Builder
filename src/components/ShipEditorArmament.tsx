import { FACING_ORDER } from '../types/ship';
import type { DiceColor, Facing, DiceCount } from '../types/ship';
import { DICE_ORDER, DIE_COUNT_OPTIONS } from '../utils/dice';

interface ShipEditorArmamentProps {
  armament: Record<Facing, DiceCount>;
  onUpdateDie: (facing: Facing, color: DiceColor, value: number) => void;
}

export function ShipEditorArmament({ armament, onUpdateDie }: ShipEditorArmamentProps) {
  return (
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
          {FACING_ORDER.map((facing) => (
            <tr key={facing}>
              <td className="armament-editor__facing">{facing}</td>
              {DICE_ORDER.map((color) => (
                <td key={color}>
                  <select
                    value={armament[facing][color]}
                    onChange={(e) => onUpdateDie(facing, color, Number(e.target.value))}
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
  );
}
