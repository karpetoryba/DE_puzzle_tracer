import { Position } from "@/types/game";
import {
  CELL_SIZE,
  GAP_SIZE,
  PADDING_SIZE,
} from "@/components/game/game_ui/cell/cellSize";

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
    ctx.strokeStyle = "rgba(255, 182, 239, 0.8)";
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(255, 182, 239, 0.8)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

    const start = getCellCenter(mirrorPath[0]);
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < mirrorPath.length; i++) {
      const pos = getCellCenter(mirrorPath[i]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();
  }
}
