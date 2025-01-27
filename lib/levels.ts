import { Level } from "@/types/game";

export const levels: Level[] = [
  {
    id: 4,
    size: 9,
    grid: [
      [false, false, false, false, false, false, true, false, false],
      [false, false, false, false, false, false, true, false, false],
      [false, false, true, true, true, true, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, true, true, true, true, false, false],
      [false, false, true, false, false, false, false, false, false],
      [false, false, true, false, false, false, false, false, false],
      [false, false, true, false, false, false, false, false, false],
    ],
    start: { x: 2, y: 8 },
    end: { x: 6, y: 0 },
    mustGoThrough: [
      { x: 6, y: 5 },
    ], // Modifiez cette ligne pour définir plusieurs cases
  },
  {
    id: 4,
    size: 9,
    grid: [
      [false, false, false, false, false, false, true, false, false],
      [false, false, false, false, false, false, true, false, false],
      [false, false, true, true, true, true, true, false, false],
      [false, false, true, false, true, false, true, false, false],
      [false, false, true, false, true, false, true, false, false],
      [false, false, true, false, true, false, true, false, false],
      [false, false, true, true, true, true, true, false, false],
      [false, false, true, false, false, false, false, false, false],
      [false, false, true, false, false, false, false, false, false],
    ],
    start: { x: 2, y: 8 },
    end: { x: 6, y: 0 },
    mustGoThrough: [
      { x: 6, y: 6 },
      { x: 2, y: 2 },
    ], // Modifiez cette ligne pour définir plusieurs cases
  },
  // Add more levels here
];
