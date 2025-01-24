import { Position } from "@/types/game";
import { CELL_SIZE, GAP_SIZE, PADDING_SIZE } from "../../lib/blockSize";

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
    ctx.strokeStyle = "rgba(59, 130, 246, 0.8)";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const start = getCellCenter(currentPath[0]);
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < currentPath.length; i++) {
      const pos = getCellCenter(currentPath[i]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
  }
}