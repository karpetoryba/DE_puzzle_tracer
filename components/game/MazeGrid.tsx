"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Level, Position, GameState } from "@/types/game";
import { MazeCell } from "./MazeCell";
import { handleMove } from "./moveHandler";
import { drawMainPath } from "./drawMainPath";
import { drawMirrorPath } from "./drawMirrorPath";
import { handleMouseDown, handleMouseUp } from "./mouseHandler";
import { CELL_SIZE } from "../../lib/blockSize";

interface MazeGridProps {
  level: Level;
  onGameStateChange: (state: GameState) => void;
  onFirstInput: () => void;
  onMove: () => void;
  setCurrentLevel: React.Dispatch<React.SetStateAction<number>>;
  resetMoveCount: () => void;
}

export function MazeGrid({
  level,
  onGameStateChange,
  onFirstInput,
  onMove,
  setCurrentLevel,
  resetMoveCount,
}: MazeGridProps) {
  const [currentPath, setCurrentPath] = useState<Position[]>([level.start]);
  const [mirrorPath, setMirrorPath] = useState<Position[]>(
    level.mirrorStart ? [level.mirrorStart] : []
  );
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastValidPosition = useRef<Position>(level.start);
  const [hasStarted, setHasStarted] = useState(false);

  const getMirrorPosition = useCallback(
    (pos: Position): Position => {
      if (!level.mirrorStart) return pos;
      const dx = pos.x - level.start.x;
      const dy = pos.y - level.start.y;
      let mirrorX = level.mirrorStart.x;
      let mirrorY = level.mirrorStart.y;

      if (level.mirrorAxis === "horizontal" || level.mirrorAxis === "both") {
        mirrorX -= dx;
      } else {
        mirrorX += dx;
      }

      if (level.mirrorAxis === "vertical" || level.mirrorAxis === "both") {
        mirrorY -= dy;
      } else {
        mirrorY += dy;
      }

      return { x: mirrorX, y: mirrorY };
    },
    [level.start, level.mirrorStart, level.mirrorAxis]
  );

  const handleCellInteraction = useCallback(
    (position: Position) => {
      if (!hasStarted) return;
      handleMove(
        position,
        currentPath,
        lastValidPosition,
        level,
        getMirrorPosition,
        setCurrentPath,
        setMirrorPath, // Pass this line to update the mirror path
        onMove,
        onGameStateChange,
        setIsDragging,
        setCurrentLevel,
        resetMoveCount
      );
    },
    [
      currentPath,
      level,
      onMove,
      onGameStateChange,
      hasStarted,
      setCurrentLevel,
      getMirrorPosition,
      resetMoveCount,
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMainPath(ctx, currentPath, level.size);
        drawMirrorPath(ctx, mirrorPath, level.size);
      }
    }
  }, [currentPath, mirrorPath, level.size]);

  useEffect(() => {
    const handleMouseUpWrapper = () => handleMouseUp(setIsDragging);
    window.addEventListener("mouseup", handleMouseUpWrapper);
    window.addEventListener("touchend", handleMouseUpWrapper);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpWrapper);
      window.removeEventListener("touchend", handleMouseUpWrapper);
    };
  }, []);

  // Reset the path when the level changes
  useEffect(() => {
    setCurrentPath([level.start]);
    setMirrorPath(level.mirrorStart ? [level.mirrorStart] : []);
    lastValidPosition.current = level.start;
  }, [level]);

  const gridCells = useMemo(
    () =>
      level.grid.map((row, y) =>
        row.map((isWalkable, x) => {
          const position = { x, y };
          const isPath = currentPath.some((p) => p.x === x && p.y === y);
          const isMirrorPath = mirrorPath.some((p) => p.x === x && p.y === y);
          const isStart = level.start.x === x && level.start.y === y;
          const isEnd = level.end.x === x && level.end.y === y;
          const isMirrorStart = !!(
            level.mirrorStart &&
            level.mirrorStart.x === x &&
            level.mirrorStart.y === y
          );
          const isMirrorEnd = !!(
            level.mirrorEnd &&
            level.mirrorEnd.x === x &&
            level.mirrorEnd.y === y
          );

          const isMustGoThrough = level.mustGoThrough?.some(
            (pos) => pos.x === x && pos.y === y
          );

          return (
            <MazeCell
              key={`${x}-${y}`}
              isWalkable={isWalkable}
              isMustGoThrough={isMustGoThrough}
              isStart={isStart}
              isEnd={isEnd}
              isMirrorStart={isMirrorStart}
              isMirrorEnd={isMirrorEnd}
              isPath={isPath}
              isMirrorPath={isMirrorPath}
              position={position}
              onCellInteraction={handleCellInteraction}
              onMouseDown={() =>
                handleMouseDown(
                  position,
                  level,
                  setHasStarted,
                  onFirstInput,
                  hasStarted,
                  setIsDragging,
                  handleCellInteraction
                )
              }
            />
          );
        })
      ),
    [
      currentPath,
      mirrorPath,
      level,
      handleCellInteraction,
      hasStarted,
      onFirstInput,
    ]
  );

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-10"
        width={level.size * (CELL_SIZE + 2)} // Adjust the width based on cell size and gap
        height={level.size * (CELL_SIZE + 2)} // Adjust the height based on cell size and gap
      />
      <div
        className="grid gap-0.5 bg-gray-200 p-2 rounded-lg shadow-lg]"
        style={{
          gridTemplateColumns: `repeat(${level.size}, minmax(0, 1fr))`,
        }}
      >
        {gridCells}
      </div>
    </div>
  );
}

export default MazeGrid;
