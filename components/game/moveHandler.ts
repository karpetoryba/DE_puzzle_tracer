import { Position, GameState, Level } from "@/types/game";
import { isValidMove } from "@/lib/gameLogic";

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
  const mirrorPos =
    level.mirrorStart && level.mirrorEnd
      ? getMirrorPosition(position)
      : position;

  if (
    !level.grid[position.y][position.x] ||
    (level.mirrorStart &&
      level.mirrorEnd &&
      !level.grid[mirrorPos.y][mirrorPos.x])
  ) {
    return;
  }

  if (!isValidMove(position, lastValidPosition.current)) {
    return;
  }

  // Vérifiez si les trajectoires se chevauchent
  if (
    level.mirrorStart &&
    level.mirrorEnd &&
    currentPath.some((p) => p.x === mirrorPos.x && p.y === mirrorPos.y)
  ) {
    return;
  }

  const existingIndex = currentPath.findIndex(
    (p) => p.x === position.x && p.y === position.y
  );

  let newPath: Position[];
  if (existingIndex !== -1 && existingIndex === currentPath.length - 2) {
    // Permet de revenir en arrière sur le tracé
    newPath = currentPath.slice(0, existingIndex + 1);
  } else if (existingIndex === -1) {
    newPath = [...currentPath, position];
    onMove(); // Incrémentez le compteur de mouvements
  } else {
    return; // Empêche de revenir sur une case non contiguë
  }

  lastValidPosition.current = position;
  setCurrentPath(newPath);

  const mustGoThroughVisited = level.mustGoThrough
    ? level.mustGoThrough.every(
        (mustGoThroughPos) =>
          newPath.some(
            (p) => p.x === mustGoThroughPos.x && p.y === mustGoThroughPos.y
          ) ||
          (level.mirrorStart &&
            level.mirrorEnd &&
            newPath
              .map(getMirrorPosition)
              .some(
                (p) => p.x === mustGoThroughPos.x && p.y === mustGoThroughPos.y
              ))
      )
    : true;

  const isComplete =
    position.x === level.end.x &&
    position.y === level.end.y &&
    (level.mirrorEnd
      ? mirrorPos.x === level.mirrorEnd.x && mirrorPos.y === level.mirrorEnd.y
      : true) &&
    mustGoThroughVisited;

  if (isComplete) {
    setIsDragging(false);
  }

  onGameStateChange({
    currentPath: newPath,
    mirrorPath:
      level.mirrorStart && level.mirrorEnd
        ? newPath.map(getMirrorPosition)
        : [],
    isComplete,
    isValid: true,
    errorMessage: null,
  });
}