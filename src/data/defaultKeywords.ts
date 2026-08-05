import type { KeywordDefinition } from '../types/squadron';

// Starter set of common Armada squadron keywords, paraphrased in plain language.
// These are approximations meant as a starting point — edit them in the Keyword
// Library to match whatever wording or house rules you prefer.
export const DEFAULT_KEYWORDS: KeywordDefinition[] = [
  {
    id: 'bomber',
    name: 'Bomber',
    description: "When attacking a hull zone, this squadron's attack ignores the defender's brace defense token.",
  },
  {
    id: 'escort',
    name: 'Escort',
    description:
      'While in range of a ship under attack from enemy squadrons, this squadron may intercept some of that damage.',
  },
  {
    id: 'cloak',
    name: 'Cloak',
    description: 'This squadron cannot be attacked by ships, and can only be attacked by squadrons at close range.',
  },
  {
    id: 'counter',
    name: 'Counter X',
    description:
      "After being attacked by a squadron and surviving, this squadron's attacker suffers X damage.",
  },
  {
    id: 'grit',
    name: 'Grit',
    description: 'This squadron does not need extra maneuvering to move away from the side or rear of a ship.',
  },
  {
    id: 'heavy',
    name: 'Heavy',
    description: 'This squadron cannot move through other squadrons, friendly or enemy.',
  },
  {
    id: 'intel',
    name: 'Intel X',
    description: 'While attacking, the defender may not spend more than X of their defense tokens.',
  },
  {
    id: 'relay',
    name: 'Relay X',
    description: 'At the start of the squadron phase, this squadron may give an order to X friendly squadrons at distance 1.',
  },
  {
    id: 'rogue',
    name: 'Rogue',
    description: "This squadron isn't required to engage when moving out of an enemy squadron's engagement range.",
  },
  {
    id: 'screen',
    name: 'Screen',
    description: "Enemy ships treat this squadron as an obstacle when determining a hull zone's line of sight.",
  },
  {
    id: 'snipe',
    name: 'Snipe X',
    description: "While attacking a ship at long range, this squadron's attack pool gains X additional die.",
  },
  {
    id: 'swarm',
    name: 'Swarm',
    description: 'While attacking, this squadron may re-roll one non-blank die in its attack pool.',
  },
];
