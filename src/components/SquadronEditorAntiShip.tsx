import type { DiceColor, DiceCount } from '../types/ship';
import { DiceCountEditor } from './DiceCountEditor';

interface SquadronEditorAntiShipProps {
  dice: DiceCount;
  onUpdateDie: (color: DiceColor, value: number) => void;
}

export function SquadronEditorAntiShip({ dice, onUpdateDie }: SquadronEditorAntiShipProps) {
  return (
    <section className="editor-section">
      <h3>Anti-Ship Battery Armament</h3>
      <DiceCountEditor dice={dice} onUpdateDie={onUpdateDie} />
    </section>
  );
}
