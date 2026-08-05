import type { DiceColor, DiceCount } from '../types/ship';
import { DICE_ORDER, DIE_COUNT_OPTIONS } from '../utils/dice';

interface DiceCountEditorProps {
  dice: DiceCount;
  onUpdateDie: (color: DiceColor, value: number) => void;
}

export function DiceCountEditor({ dice, onUpdateDie }: DiceCountEditorProps) {
  return (
    <div className="field-row">
      {DICE_ORDER.map((color) => (
        <label key={color} className="field field--narrow">
          <span>{color}</span>
          <select value={dice[color]} onChange={(e) => onUpdateDie(color, Number(e.target.value))}>
            {DIE_COUNT_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      ))}
    </div>
  );
}
