import { Level } from '@/types/game';

export const levels: Level[] = [
  {
    id: 1,
    size: 8,
    grid: [
      [true, true, true, true, true, false, true, true],
      [true, false, true, false, true, false, false, true],
      [true, false, true, false, true, true, true, true],
      [true, false, true, false, false, false, false, true],
      [true, false, true, false, false, false, false, true],
      [true, false, true, false, true, true, true, true],
      [true, false, true, false, true, false, false, true],
      [true, true, true, true, true, false, true, true],
    ],
    start: { x: 0, y: 0 },
    end: { x: 7, y: 0 },
    mirrorStart: { x: 0, y: 7 },
    mirrorEnd: { x: 7, y: 7 },
  },
  // Add more levels here
];