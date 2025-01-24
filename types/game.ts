export interface Position {
  x: number;
  y: number;
}

export interface Level {
  id: number;
  size: number;
  start: Position;
  end: Position;
  mirrorStart?: Position;
  mirrorEnd?: Position;
  grid: boolean[][];
  mustGoThrough?: Position[];
  mirrorAxis?: 'horizontal' | 'vertical' | 'both'; // Ajoutez cette ligne
}

export interface GameState {
  currentPath: Position[];
  mirrorPath: Position[];
  isComplete: boolean;
  isValid: boolean;
  errorMessage: string | null;
}
