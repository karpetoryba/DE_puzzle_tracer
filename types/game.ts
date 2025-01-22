export interface Position {
  x: number;
  y: number;
}

export interface Level {
  size: number;
  id: number;
  grid: boolean[][];  // true represents walkable path, false represents barrier
  start: Position;
  end: Position;
  mirrorStart: Position;
  mirrorEnd: Position;
  mustGoThrough?: Position[]; // Modifiez cette ligne pour permettre plusieurs cases
}

export interface GameState {
  currentPath: Position[];
  mirrorPath: Position[];
  isComplete: boolean;
  isValid: boolean;
  errorMessage: string | null;
}