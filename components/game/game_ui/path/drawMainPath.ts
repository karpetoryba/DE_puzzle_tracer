import { Position } from "@/types/game";
import {
  CELL_SIZE,
  GAP_SIZE,
  PADDING_SIZE,
} from "@/components/game/game_ui/cell/cellSize";

export function drawMainPath(
  ctx: CanvasRenderingContext2D,
  currentPath: Position[],
  levelSize: number
) {
  const cellSize = CELL_SIZE;
  const gap = GAP_SIZE;
  const padding = PADDING_SIZE;

  const getCellCenter = (pos: Position) => ({
    x: padding + pos.x * (cellSize + gap) + cellSize / 2,
    y: padding + pos.y * (cellSize + gap) + cellSize / 2,
  });

  if (currentPath.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Add glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const start = getCellCenter(currentPath[0]);
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < currentPath.length; i++) {
      const pos = getCellCenter(currentPath[i]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();

    // Reset shadow properties to avoid affecting other drawings
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";
  }
}