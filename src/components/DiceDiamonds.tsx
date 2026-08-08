import type { DiceColor } from '../types/ship';
import { DICE_ORDER } from '../utils/dice';
import '../styles/dice.css';

interface DiceDiamondsProps {
  dice: Partial<Record<DiceColor, number>>;
  emptyLabel?: string;
  className?: string;
}

// Renders one small diamond per die instead of a single "R2"-style badge,
// so a pool's size is visible at a glance without reading text.
export function DiceDiamonds({ dice, emptyLabel = '—', className }: DiceDiamondsProps) {
  const pips = DICE_ORDER.flatMap((color) => Array(dice[color] ?? 0).fill(color) as DiceColor[]);

  if (pips.length === 0) {
    return <span className="die-diamond-empty">{emptyLabel}</span>;
  }

  return (
    <span className={`die-diamond-group${className ? ` ${className}` : ''}`}>
      {pips.map((color, i) => (
        <span key={`${color}-${i}`} className={`die-diamond die-diamond--${color}`} />
      ))}
    </span>
  );
}
