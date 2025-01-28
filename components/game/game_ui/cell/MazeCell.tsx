"use client";

import { Position } from "@/types/game";
import { cn } from "@/components/game/settings/utils";
import { CELL_SIZE } from "@/components/game/game_ui/cell/cellSize";

interface MazeCellProps {
  isWalkable: boolean;
  isStart: boolean;
  isEnd: boolean;
  isMirrorStart: boolean;
  isMirrorEnd: boolean;
  isPath: boolean;
  isMirrorPath: boolean;
  isMustGoThrough: boolean | undefined;
  position: Position;
  onCellInteraction: (position: Position) => void;
  onMouseDown: () => void;
}

export function MazeCell({
  isWalkable,
  isStart,
  isEnd,
  isMirrorStart,
  isMirrorEnd,
  isPath,
  isMirrorPath,
  isMustGoThrough,
  position,
  onCellInteraction,
  onMouseDown,
}: MazeCellProps) {
  return (
    <div
      className={cn("border border-gray-200 transition-colors", {
        "bg-destructive/20 pointer-events-none": !isWalkable,
        "buttonStart bg-transparent": isStart,
        "bg-green-500": isEnd,
        "bg-purple-500": isMirrorStart,
        "bg-emerald-500": isMirrorEnd,
        "buttonCheckpoint": isMustGoThrough,
        "buttonCheckpointOn": isMustGoThrough && (isPath || isMirrorPath),
      })}
      style={{ width: CELL_SIZE, height: CELL_SIZE }}
      onMouseDown={() => {
        onMouseDown();
        onCellInteraction(position);
      }}
      onMouseEnter={() => {
        if (isStart || isMirrorStart) {
          onMouseDown();
        }
        onCellInteraction(position);
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        onMouseDown();
        onCellInteraction(position);
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element?.classList.contains("w-12")) {
          onCellInteraction(position);
        }
      }}
    />
  );
}