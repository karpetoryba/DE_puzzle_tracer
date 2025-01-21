export interface Position {
  x: number;
  y: number;
}

export interface Level {
  id: number;
  grid: boolean[][];  // true represents walkable path, false represents barrier
  start: Position;
  end: Position;
  mirrorStart: Position;
  mirrorEnd: Position;
  size: number;
}

export interface GameState {
  currentPath: Position[];
  mirrorPath: Position[];
  isComplete: boolean;
  isValid: boolean;
  errorMessage: string | null;
}