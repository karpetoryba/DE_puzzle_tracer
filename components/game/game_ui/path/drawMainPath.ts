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

  let animationProgress = 0;
  const animationSpeed = 0.01; // Slower speed

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const animatePath = () => {
    animationProgress += animationSpeed;
    if (animationProgress > 1) animationProgress = 0;

    const easedProgress = easeInOutQuad(animationProgress);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Add glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgb(255, 255, 255)";

    // Animate line width
    ctx.lineWidth = 16 + 4 * Math.sin(easedProgress * Math.PI * 2);

    const start = getCellCenter(currentPath[0]);
    ctx.moveTo(start.x, start.y);

    for (let i = 1; i < currentPath.length; i++) {
      const pos = getCellCenter(currentPath[i]);
      ctx.lineTo(pos.x, pos.y);
    }
    ctx.stroke();

    // Draw pulsating effect
    const pulseIndex = Math.floor(easedProgress * (currentPath.length - 1));
    const pulsePos = getCellCenter(currentPath[pulseIndex]);
    ctx.beginPath();
    ctx.arc(pulsePos.x, pulsePos.y, 10 + 5 * Math.sin(easedProgress * Math.PI * 2), 0, Math.PI * 2);
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fill();

    // Reset shadow properties to avoid affecting other drawings
    ctx.shadowBlur = 0;
    ctx.shadowColor = "transparent";

    requestAnimationFrame(animatePath);
  };

  // Reset animation progress when the path changes
  animationProgress = 0;
  animatePath();
}
