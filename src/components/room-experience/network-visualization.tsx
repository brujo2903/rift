import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export function NetworkVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodes = useRef<Node[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes
    const nodeCount = 50;
    nodes.current = Array.from({ length: nodeCount }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      connections: Array.from({ length: 3 }, () => 
        Math.floor(Math.random() * nodeCount)
      ).filter(n => n !== i)
    }));

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.current.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const connectedNode = nodes.current[connectionIndex];
          const distance = Math.hypot(
            connectedNode.x - node.x,
            connectedNode.y - node.y
          );

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(connectedNode.x, connectedNode.y);
            ctx.strokeStyle = `rgba(102, 255, 255, ${0.5 - distance / 300})`;
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(102, 255, 255, 0.8)';
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[400px] rounded-lg bg-black/80 border border-white/10"
    />
  );
}