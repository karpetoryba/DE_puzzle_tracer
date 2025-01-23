"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Level, Position, GameState } from "@/types/game";
import { MazeCell } from "./MazeCell";
import { handleMove } from "./moveHandler";
import { drawPaths } from "./drawPaths";
import { handleMouseDown, handleMouseUp } from "./mouseHandler";

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
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastValidPosition = useRef<Position>(level.start);
  const [hasStarted, setHasStarted] = useState(false);

  const getMirrorPosition = useCallback(
    (pos: Position): Position => {
      if (!level.mirrorStart || !level.mirrorEnd) return pos;
      return { x: pos.x, y: level.size - 1 - pos.y };
    },
    [level.size, level.mirrorStart, level.mirrorEnd]
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
        onMove,
        onGameStateChange,
        setIsDragging,
        setCurrentLevel,
        resetMoveCount
      );
    },
    [currentPath, level, onMove, onGameStateChange, hasStarted, setCurrentLevel, getMirrorPosition, resetMoveCount]
  );

  useEffect(() => {
    drawPaths(canvasRef, currentPath, level.size, getMirrorPosition);
  }, [currentPath, level.size, getMirrorPosition]);

  useEffect(() => {
    const handleMouseUpWrapper = () => handleMouseUp(setIsDragging);
    window.addEventListener("mouseup", handleMouseUpWrapper);
    window.addEventListener("touchend", handleMouseUpWrapper);
    return () => {
      window.removeEventListener("mouseup", handleMouseUpWrapper);
      window.removeEventListener("touchend", handleMouseUpWrapper);
    };
  }, []);

  // Réinitialiser le chemin lorsque le niveau change
  useEffect(() => {
    setCurrentPath([level.start]);
    lastValidPosition.current = level.start;
  }, [level]);

  const gridCells = useMemo(
    () =>
      level.grid.map((row, y) =>
        row.map((isWalkable, x) => {
          const position = { x, y };
          const isPath = currentPath.some((p) => p.x === x && p.y === y);
          const isMirrorPath = currentPath
            .map(getMirrorPosition)
            .some((p) => p.x === x && p.y === y);
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
              onMouseDown={() => handleMouseDown(position, level, setHasStarted, onFirstInput, hasStarted, setIsDragging, handleCellInteraction)}
            />
          );
        })
      ),
    [currentPath, level, handleCellInteraction, hasStarted, onFirstInput, getMirrorPosition]
  );

  return (
    <div className="relative inline-block">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none z-10"
      />
      <div
        className="grid gap-0.5 bg-gray-200 p-2 rounded-lg shadow-lg"
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