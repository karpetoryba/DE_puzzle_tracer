"use client";

import { Position } from "@/types/game";
import { cn } from "@/lib/utils";
import { CELL_SIZE } from "../../lib/blockSize";

interface MazeCellProps {
  isWalkable: boolean;
  isStart: boolean;
  isEnd: boolean;
  isMirrorStart: boolean;
  isMirrorEnd: boolean;
  isPath: boolean;
  isMirrorPath: boolean;
  isMustGoThrough: boolean | undefined; // Modifiez cette ligne pour permettre plusieurs cases
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
  isMustGoThrough, // Modifiez cette ligne pour permettre plusieurs cases
  position,
  onCellInteraction,
  onMouseDown,
}: MazeCellProps) {
  return (
    <div
      className={cn("border border-gray-200 transition-colors", {
        "bg-destructive/20": !isWalkable,
        "bg-primary": isStart,
        "bg-green-500": isEnd,
        "bg-purple-500": isMirrorStart,
        "bg-emerald-500": isMirrorEnd,
        "bg-yellow-500": isMustGoThrough, // Modifiez cette ligne pour permettre plusieurs cases
        "hover:bg-blue-200":
          isWalkable &&
          !isPath &&
          !isStart &&
          !isEnd &&
          !isMirrorStart &&
          !isMirrorEnd,
      })}
      style={{ width: CELL_SIZE, height: CELL_SIZE }} // Set the cell size
      onMouseDown={() => {
        onMouseDown();
        onCellInteraction(position);
      }}
      onMouseEnter={() => {
        // Si le curseur s'ouvre sur la clé de démarrage, activez la procédure
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
