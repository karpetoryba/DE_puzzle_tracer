import { Position, GameState, Level } from '@/types/game';
import { isValidMove } from '@/lib/gameLogic';

export function handleMove(
  position: Position,
  currentPath: Position[],
  lastValidPosition: React.MutableRefObject<Position>,
  level: Level,
  getMirrorPosition: (pos: Position) => Position,
  setCurrentPath: React.Dispatch<React.SetStateAction<Position[]>>,
  onMove: () => void,
  onGameStateChange: (state: GameState) => void,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) {
  const mirrorPos = getMirrorPosition(position);

  if (!level.grid[position.y][position.x] || !level.grid[mirrorPos.y][mirrorPos.x]) {
    return;
  }

  if (!isValidMove(position, lastValidPosition.current)) {
    return;
  }

  // Vérifiez si les trajectoires se chevauchent
  if (currentPath.some((p) => p.x === mirrorPos.x && p.y === mirrorPos.y)) {
    return;
  }

  const existingIndex = currentPath.findIndex(
    (p) => p.x === position.x && p.y === position.y
  );

  let newPath: Position[];
  if (existingIndex !== -1) {
    newPath = currentPath.slice(0, existingIndex + 1);
  } else {
    newPath = [...currentPath, position];
    onMove(); // Incrémentez le compteur de mouvements
  }

  lastValidPosition.current = position;
  setCurrentPath(newPath);

  const mustGoThroughVisited = level.mustGoThrough
    ? newPath.some((p) => p.x === level.mustGoThrough!.x && p.y === level.mustGoThrough!.y)
    : true;

  const isComplete = 
    (position.x === level.end.x && position.y === level.end.y) &&
    (mirrorPos.x === level.mirrorEnd.x && mirrorPos.y === level.mirrorEnd.y) &&
    mustGoThroughVisited;

  if (isComplete) {
    setIsDragging(false);
  }

  onGameStateChange({
    currentPath: newPath,
    mirrorPath: newPath.map(getMirrorPosition),
    isComplete,
    isValid: true,
    errorMessage: null,
  });
}