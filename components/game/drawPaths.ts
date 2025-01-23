import { Position } from "@/types/game";

export function drawPaths(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  currentPath: Position[],
  levelSize: number,
  getMirrorPosition: (pos: Position) => Position
) {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const cellSize = 48;
  const gap = 2;
  const padding = 8;

  const totalSize = cellSize * levelSize + (levelSize - 1) * gap;
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
}