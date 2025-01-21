import { Position } from "@/types/game";

export function isValidMove(newPos: Position, lastPos: Position): boolean {
  const dx = Math.abs(newPos.x - lastPos.x);
  const dy = Math.abs(newPos.y - lastPos.y);

  // Permet de se déplacer le long d'un seul axe (horizontal ou vertical)
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
}
