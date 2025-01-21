'use client';

import { Position } from '@/types/game';
import { cn } from '@/lib/utils';

interface MazeCellProps {
  isWalkable: boolean;
  isStart: boolean;
  isEnd: boolean;
  isMirrorStart: boolean;
  isMirrorEnd: boolean;
  isPath: boolean;
  isMirrorPath: boolean;
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
  position,
  onCellInteraction,
  onMouseDown,
}: MazeCellProps) {
  return (
    <div
      className={cn(
        'w-12 h-12 border border-gray-200 transition-colors',
        {
          'bg-destructive/20': !isWalkable,
          'bg-primary': isStart,
          'bg-green-500': isEnd,
          'bg-purple-500': isMirrorStart,
          'bg-emerald-500': isMirrorEnd,
          'cursor-pointer hover:bg-blue-200': isWalkable && !isPath && !isStart && !isEnd && !isMirrorStart && !isMirrorEnd,
          'cursor-not-allowed': !isWalkable,
        }
      )}
      onMouseDown={() => {
        onMouseDown();
        onCellInteraction(position);
      }}
      onMouseEnter={() => onCellInteraction(position)}
      onTouchStart={(e) => {
        e.preventDefault();
        onMouseDown();
        onCellInteraction(position);
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        if (element?.classList.contains('w-12')) {
          onCellInteraction(position);
        }
      }}
    />
  );
}