'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Level, Position, GameState } from '@/types/game';
import { MazeCell } from './MazeCell';
import { isValidMove } from '@/lib/gameLogic';

interface MazeGridProps {
  level: Level;
  onGameStateChange: (state: GameState) => void;
  onFirstInput: () => void; // Ajoutez cette ligne
}

export function MazeGrid({ level, onGameStateChange, onFirstInput }: MazeGridProps) {
  const [currentPath, setCurrentPath] = useState<Position[]>([level.start]);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastValidPosition = useRef<Position>(level.start);
  const hasStarted = useRef(false); // Ajoutez cette ligne

  const getMirrorPosition = useCallback((pos: Position): Position => ({
    x: pos.x,
    y: level.size - 1 - pos.y,
  }), [level.size]);

  const drawPaths = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const start = getCellCenter(path[0]);
        ctx.moveTo(start.x, start.y);

        for (let i = 1; i < path.length; i++) {
          const pos = getCellCenter(path[i]);
          ctx.lineTo(pos.x, pos.y);
        }
        ctx.stroke();
      }
    };

    drawPath(currentPath, 'rgba(59, 130, 246, 0.8)');
    drawPath(currentPath.map(getMirrorPosition), 'rgba(168, 85, 247, 0.8)');
  }, [currentPath, level.size, getMirrorPosition]);

  useEffect(() => {
    drawPaths();
  }, [drawPaths]);

  const handleCellInteraction = useCallback(
    (position: Position) => {
      if (!isDragging) return;

      if (!hasStarted.current) {
        onFirstInput();
        hasStarted.current = true;
      }

      const mirrorPos = getMirrorPosition(position);
      
      if (!level.grid[position.y][position.x] || !level.grid[mirrorPos.y][mirrorPos.x]) {
        return;
      }

      if (!isValidMove(position, lastValidPosition.current)) {
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
      }

      lastValidPosition.current = position;
      setCurrentPath(newPath);

      const isComplete = 
        (position.x === level.end.x && position.y === level.end.y) &&
        (mirrorPos.x === level.mirrorEnd.x && mirrorPos.y === level.mirrorEnd.y);

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
    },
    [currentPath, isDragging, level, getMirrorPosition, onGameStateChange, onFirstInput]
  );

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleMouseUp]);

  const gridCells = useMemo(() => (
    level.grid.map((row, y) =>
      row.map((isWalkable, x) => {
        const position = { x, y };
        const isPath = currentPath.some(
          (p) => p.x === x && p.y === y
        );
        const isMirrorPath = currentPath.map(getMirrorPosition).some(
          (p) => p.x === x && p.y === y
        );
        const isStart = level.start.x === x && level.start.y === y;
        const isEnd = level.end.x === x && level.end.y === y;
        const isMirrorStart = level.mirrorStart.x === x && level.mirrorStart.y === y;
        const isMirrorEnd = level.mirrorEnd.x === x && level.mirrorEnd.y === y;

        return (
          <MazeCell
            key={`${x}-${y}`}
            isWalkable={isWalkable}
            isStart={isStart}
            isEnd={isEnd}
            isMirrorStart={isMirrorStart}
            isMirrorEnd={isMirrorEnd}
            isPath={isPath}
            isMirrorPath={isMirrorPath}
            position={position}
            onCellInteraction={handleCellInteraction}
            onMouseDown={handleMouseDown}
          />
        );
      })
    )
  ), [currentPath, level, getMirrorPosition, handleCellInteraction, handleMouseDown]);

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