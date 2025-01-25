import { Level } from "@/types/game";

export const levels: Level[] = [
  {
    id: 2,
    size: 9,
    grid: [
      [false, false, false, false, false, false, false, false, false],
      [false, true, true, true, true, true, true, true, false],
      [false, false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, false, true, false],
      [false, false, false, false, false, false, false, true, false],
      [false, true, true, true, true, true, true, true, false],
      [false, false, false, false, false, false, false, false, false],
    ],
    start: { x: 1, y: 7 },
    end: { x: 1, y: 1 },
  },
  {
    id: 3,
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
    mustGoThrough: [{ x: 6, y: 5 }], // Modifiez cette ligne pour définir plusieurs cases
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
  {
    id: 5,
    size: 9,
    grid: [
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, true, true, true, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, true, true, true, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
    ],
    start: { x: 2, y: 3 },
    end: { x: 5, y: 6 },

    mirrorStart: { x: 6, y: 5 },
    mirrorEnd: { x: 3, y: 2 },
    mirrorAxis: "both",
  },
  {
    id: 6,
    size: 9,
    grid: [
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, true, true, true, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, false, false, false, true, false, false],
      [false, false, true, true, true, true, false, false, false],
      [false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false],
    ],
    start: { x: 2, y: 3 },
    end: { x: 5, y: 6 },

    mirrorStart: { x: 6, y: 5 },
    mirrorEnd: { x: 3, y: 2 },
    mirrorAxis: "both",
  },
  {
    id: 5,
    size: 10,
    grid: [
      [false, false, false, false, false, false, false, false, false, false],
      [false, true, true, true, true, true, true, true, true, false],
      [false, true, false, true, false, true, false, false, true, false],
      [false, true, true, true, true, true, true, true, true, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, false, false, false, false, false, false, false, false, false],
      [false, true, true, true, true, true, true, true, true, false],
      [false, true, false, true, false, true, false, false, true, false],
      [false, true, true, true, true, true, true, true, true, false],
      [false, false, false, false, false, false, false, false, false, false],
    ],
    start: { x: 1, y: 3 },
    end: { x: 8, y: 3 },

    mirrorStart: { x: 1, y: 6 },
    mirrorEnd: { x: 8, y: 6 },

    mirrorAxis: "vertical",

    mustGoThrough: [
      { x: 5, y: 1 },
      { x: 6, y: 6 },
      { x: 1, y: 8 },
    ],
  },

  // Add more levels here
];
