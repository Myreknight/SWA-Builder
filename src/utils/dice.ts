import type { DiceColor } from '../types/ship';

export const DICE_ORDER: DiceColor[] = ['red', 'blue', 'black'];

export const DIE_LETTER: Record<DiceColor, string> = {
  red: 'R',
  blue: 'B',
  black: 'K',
};
