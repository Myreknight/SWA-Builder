import type { DiceColor } from '../types/ship';

export const DICE_ORDER: DiceColor[] = ['red', 'blue', 'black'];

export const DIE_COUNT_OPTIONS = [0, 1, 2, 3, 4];

export const DIE_LETTER: Record<DiceColor, string> = {
  red: 'R',
  blue: 'B',
  black: 'K',
};
