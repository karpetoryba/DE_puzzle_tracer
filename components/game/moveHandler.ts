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
  setMirrorPath: React.Dispatch<React.SetStateAction<Position[]>>, // Add this line to update the mirror path
  onMove: () => void,
  onGameStateChange: (state: GameState) => void,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>,
  resetMoveCount: () => void
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

  const newMirrorPath = [level.mirrorStart || { x: 0, y: 0 }, ...newPath.map(getMirrorPosition)];
  setMirrorPath(newMirrorPath);

  const mustGoThroughVisited = level.mustGoThrough
    ? level.mustGoThrough.every(
        (mustGoThroughPos) =>
          newPath.some(
            (p) => p.x === mustGoThroughPos.x && p.y === mustGoThroughPos.y
          ) ||
          (level.mirrorStart &&
            level.mirrorEnd &&
            newMirrorPath.some(
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
      // Reset the path and dragging if the end cell is reached without visiting all mustGoThrough cells
      setCurrentPath([level.start]);
      setMirrorPath([level.mirrorStart || { x: 0, y: 0 }]);
      lastValidPosition.current = level.start;
      setIsDragging(false); // Reset dragging
      onGameStateChange({
        currentPath: [level.start],
        mirrorPath: [level.mirrorStart || { x: 0, y: 0 }],
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
      resetMoveCount(); // Reset the move count
      onGameStateChange({
        currentPath: [level.start],
        mirrorPath: [level.mirrorStart || { x: 0, y: 0 }],
        isComplete: false,
        isValid: true,
        errorMessage: null,
      });
      return;
    }
  }

  onGameStateChange({
    currentPath: newPath,
    mirrorPath: newMirrorPath,
    isComplete,
    isValid: true,
    errorMessage: null,
  });
}