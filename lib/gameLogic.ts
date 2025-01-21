import { Position } from '@/types/game';

export function isValidMove(newPos: Position, lastPos: Position): boolean {
  const dx = Math.abs(newPos.x - lastPos.x);
  const dy = Math.abs(newPos.y - lastPos.y);
  
  // Valid move is to an adjacent cell (including diagonals)
  return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
}