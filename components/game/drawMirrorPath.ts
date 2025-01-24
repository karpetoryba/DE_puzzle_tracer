import { Position } from "@/types/game";
import { CELL_SIZE, GAP_SIZE, PADDING_SIZE } from "../../lib/config";

export function drawMirrorPath(
  ctx: CanvasRenderingContext2D,
  mirrorPath: Position[],
  levelSize: number
) {
  const cellSize = CELL_SIZE;
  const gap = GAP_SIZE;
  const padding = PADDING_SIZE;

  const getCellCenter = (pos: Position) => ({
    x: padding + pos.x * (cellSize + gap) + cellSize / 2,
    y: padding + pos.y * (cellSize + gap) + cellSize / 2,
  });

  if (mirrorPath.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = "rgba(168, 85, 247, 0.8)";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const start = getCellCenter(mirrorPath[0]);
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < mirrorPath.length; i++) {
      const pos = getCellCenter(mirrorPath[i]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
  }
}