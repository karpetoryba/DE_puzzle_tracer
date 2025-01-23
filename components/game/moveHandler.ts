import { Position, GameState, Level } from "@/types/game";
import { isValidMove } from "@/lib/gameLogic";
import { levels } from "@/lib/levels";

export function handleMove(
  position: Position,
  currentPath: Position[],
  lastValidPosition: React.MutableRefObject<Position>,
  level: Level,
  getMirrorPosition: (pos: Position) => Position,
  setCurrentPath: React.Dispatch<React.SetStateAction<Position[]>>,
  onMove: () => void,
  onGameStateChange: (state: GameState) => void,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>,
  resetMoveCount: () => void // Ajoutez cette ligne pour réinitialiser le compteur de mouvements
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
    newPath = currentPath.slice(0, existingIndex + 1);
    onMove();
  } else if (existingIndex === -1) {
    newPath = [...currentPath, position];
    onMove();
  } else {
    return;
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
      : true);

  if (isComplete) {
    if (!mustGoThroughVisited) {
      // Réinitialiser le chemin et le dragging si la case fin est atteinte sans que toutes les cases mustGoThrough soient traversées
      setCurrentPath([level.start]);
      lastValidPosition.current = level.start;
      setIsDragging(false); // Réinitialiser le dragging
      onGameStateChange({
        currentPath: [level.start],
        mirrorPath: [getMirrorPosition(level.start)],
        isComplete: false,
        isValid: false,
        errorMessage: "You must go through all required cells before reaching the end.",
      });
      return;
    } else {
      setIsDragging(false);
      setCurrentLevel((prevLevel) => {
        const nextLevel = prevLevel + 1;
        if (nextLevel < levels.length) {
          return nextLevel;
        } else {
          return prevLevel; // Stay on the current level if there are no more levels
        }
      });
      resetMoveCount(); // Réinitialiser le compteur de mouvements
      onGameStateChange({
        currentPath: [level.start],
        mirrorPath: [getMirrorPosition(level.start)],
        isComplete: false,
        isValid: true,
        errorMessage: null,
      });
      return;
    }
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