import type { DiceColor, DiceCount } from '../types/ship';
import { DiceCountEditor } from './DiceCountEditor';

interface SquadronEditorAntiSquadronProps {
  dice: DiceCount;
  onUpdateDie: (color: DiceColor, value: number) => void;
}

export function SquadronEditorAntiSquadron({ dice, onUpdateDie }: SquadronEditorAntiSquadronProps) {
  return (
    <section className="editor-section">
      <h3>Anti-Squadron Armament</h3>
      <DiceCountEditor dice={dice} onUpdateDie={onUpdateDie} />
    </section>
  );
}
