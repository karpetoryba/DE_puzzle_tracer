import { Position, Level } from "@/types/game";

export function handleMouseDown(
  position: Position,
  level: Level,
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>,
  onFirstInput: () => void,
  hasStarted: boolean,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
  handleCellInteraction: (position: Position) => void
) {
  if (!hasStarted) {
    setHasStarted(true);
    onFirstInput();
  }
  setIsDragging(true);
  handleCellInteraction(position);
}

export function handleMouseUp(setIsDragging: React.Dispatch<React.SetStateAction<boolean>>) {
  setIsDragging(false);
}