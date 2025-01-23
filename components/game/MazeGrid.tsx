"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { Level, Position, GameState } from "@/types/game";
import { MazeCell } from "./MazeCell";
import { handleMove } from "./moveHandler";

interface MazeGridProps {
  level: Level;
  onGameStateChange: (state: GameState) => void;
  onFirstInput: () => void;
  onMove: () => void;
}

export function MazeGrid({
  level,
  onGameStateChange,
  onFirstInput,
  onMove,
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

  const drawPaths = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = 48;
    const gap = 2;
    const padding = 8;

    const totalSize = cellSize * level.size + (level.size - 1) * gap;
    canvas.width = totalSize + padding * 2;
    canvas.height = totalSize + padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const getCellCenter = (pos: Position) => ({
      x: padding + pos.x * (cellSize + gap) + cellSize / 2,
      y: padding + pos.y * (cellSize + gap) + cellSize / 2,
    });

    const drawPath = (path: Position[], color: string) => {
      if (path.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const start = getCellCenter(path[0]);
        ctx.moveTo(start.x, start.y);

        for (let i = 1; i < path.length; i++) {
          const pos = getCellCenter(path[i]);
          ctx.lineTo(pos.x, pos.y);
        }
        ctx.stroke();
      }
    };

    drawPath(currentPath, "rgba(59, 130, 246, 0.8)");
    const mirrorPath = currentPath.map(getMirrorPosition);
    if (mirrorPath.length > 0) {
      drawPath(mirrorPath, "rgba(168, 85, 247, 0.8)");
    }
  }, [currentPath, level.size, getMirrorPosition]);

  useEffect(() => {
    drawPaths();
  }, [drawPaths]);

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
        setIsDragging
      );
    },
    [currentPath, level, getMirrorPosition, onMove, onGameStateChange]
  );

  const handleMouseDown = useCallback(
    (position: Position) => {
      // Vérifier si la position est la position de départ
      if (position.x === level.start.x && position.y === level.start.y) {
        setHasStarted(true); //Démarrer le jeu
        onFirstInput(); // Démarrer la minuterie
      }

      if (hasStarted) {
        setIsDragging(true);
        handleCellInteraction(position);
      }
    },
    [handleCellInteraction, onFirstInput, hasStarted, level.start]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMouseUp]);

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
          ); // Modifiez cette ligne pour permettre plusieurs cases

          return (
            <MazeCell
              key={`${x}-${y}`}
              isWalkable={isWalkable}
              isMustGoThrough={isMustGoThrough} // Modifiez cette ligne pour permettre plusieurs cases
              isStart={isStart}
              isEnd={isEnd}
              isMirrorStart={isMirrorStart}
              isMirrorEnd={isMirrorEnd}
              isPath={isPath}
              isMirrorPath={isMirrorPath}
              position={position}
              onCellInteraction={handleCellInteraction}
              onMouseDown={() => handleMouseDown(position)}
            />
          );
        })
      ),
    [
      currentPath,
      level,
      getMirrorPosition,
      handleCellInteraction,
      handleMouseDown,
    ]
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
