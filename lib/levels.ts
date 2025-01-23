import { Level } from "@/types/game";

export const levels: Level[] = [
  {
    id: 1,
    size: 8,
    grid: [
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true],
    ],
    start: { x: 0, y: 0 },
    end: { x: 7, y: 0 },
    mirrorStart: { x: 0, y: 5 },
    mirrorEnd: { x: 7, y: 7 },
    mustGoThrough: [
      { x: 2, y: 0 },
      { x: 2, y: 7 },
    ], // Modifiez cette ligne pour définir plusieurs cases
  },
  // Add more levels here
  {
    id: 2,
    size: 6,
    grid: [
      [true, true, true, true, true, false],
      [true, false, true, false, true, false],
      [true, false, true, false, true, true],
      [true, false, true, false, false, false],
      [true, false, true, false, true, true],
      [true, true, true, true, true, true],
    ],
    start: { x: 0, y: 0 },
    end: { x: 4, y: 0 },
    mirrorStart: { x: 0, y: 4 },
    mirrorEnd: { x: 7, y: 7 },

    mustGoThrough: [
      { x: 2, y: 0 },
      { x: 2, y: 7 },
    ], // Modifiez cette ligne pour définir plusieurs cases
  },

];
