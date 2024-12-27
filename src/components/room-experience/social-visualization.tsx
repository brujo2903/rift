import { useEffect, useRef } from 'react';
import { MessageSquare, User, Share2 } from 'lucide-react';

interface Node {
  id: string;
  type: 'user' | 'message' | 'connection';
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: string[];
}

export function SocialVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes
    const colors = {
      user: 'rgba(56, 189, 248, 0.8)',      // Sky blue
      message: 'rgba(232, 121, 249, 0.8)',   // Pink
      connection: 'rgba(52, 211, 153, 0.8)', // Emerald
    };

    nodesRef.current = [
      // Users
      ...Array.from({ length: 5 }, (_, i) => ({
        id: `user-${i}`,
        type: 'user' as const,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: 8,
        color: colors.user,
        connections: []
      })),
      // Messages
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `message-${i}`,
        type: 'message' as const,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5),
        vy: (Math.random() - 0.5),
        radius: 6,
        color: colors.message,
        connections: []
      })),
      // Connection points
      ...Array.from({ length: 4 }, (_, i) => ({
        id: `connection-${i}`,
        type: 'connection' as const,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 7,
        color: colors.connection,
        connections: []
      }))
    ];

    // Create random connections
    nodesRef.current.forEach(node => {
      const numConnections = Math.floor(Math.random() * 3) + 1;
      const otherNodes = nodesRef.current.filter(n => n.id !== node.id);
      node.connections = Array.from({ length: numConnections }, () => 
        otherNodes[Math.floor(Math.random() * otherNodes.length)].id
      );
    });

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodesRef.current.forEach(node => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls
        if (node.x <= node.radius || node.x >= canvas.width - node.radius) node.vx *= -1;
        if (node.y <= node.radius || node.y >= canvas.height - node.radius) node.vy *= -1;

        // Draw connections
        node.connections.forEach(connectionId => {
          const connectedNode = nodesRef.current.find(n => n.id === connectionId);
          if (connectedNode) {
            const distance = Math.hypot(
              connectedNode.x - node.x,
              connectedNode.y - node.y
            );

            if (distance < 200) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(connectedNode.x, connectedNode.y);
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 - distance / 600})`;
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Draw icon
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.font = '10px "Lucida Console"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          node.type === 'user' ? '👤' :
          node.type === 'message' ? '💬' : '🔗',
          node.x,
          node.y
        );
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
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-black/80 border border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/5">
        <h3 className="text-lg font-light tracking-wider">Social Network Analysis</h3>
        <p className="text-sm text-white/60">Visualizing user interactions and connections</p>
      </div>

      {/* Main visualization */}
      <canvas
        ref={canvasRef}
        className="flex-1 w-full"
      />

      {/* Legend and stats */}
      <div className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-sky-400" />
              <span className="text-sm">Users (5)</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-pink-400" />
              <span className="text-sm">Messages (8)</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">Connections (12)</span>
            </div>
          </div>
          <div className="text-xs text-white/40">
            Updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}