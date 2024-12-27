import { useEffect, useRef } from 'react';
import { useRoom } from '@/hooks/use-room';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { NetworkVisualization } from './network-visualization';
import { Terminal } from './terminal';

interface MultiplayerRoomProps {
  roomId: string;
  className?: string;
}

export function MultiplayerRoom({ roomId, className }: MultiplayerRoomProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerId = useRef(crypto.randomUUID());

  const {
    roomState,
    error,
    actions: {
      moveCard,
      updatePlayerAction,
      updateResource,
      triggerEnvironmentalEffect
    }
  } = useRoom(roomId, playerId.current);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !roomState) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    let animationFrameId: number;

    const render = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render players
      roomState.players.forEach(player => {
        ctx.beginPath();
        ctx.arc(player.position.x, player.position.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = player.id === playerId.current ? '#00ff00' : '#ff0000';
        ctx.fill();
      });

      // Render cards
      roomState.cards.forEach(card => {
        ctx.save();
        ctx.translate(card.position.x, card.position.y);
        ctx.rotate(card.rotation);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-15, -20, 30, 40);
        ctx.restore();
      });

      // Render environmental effects
      roomState.environmentalEffects.forEach(effect => {
        const elapsed = Date.now() - effect.startTime;
        if (elapsed < effect.duration) {
          const alpha = 1 - (elapsed / effect.duration);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.2})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [roomState]);

  // Handle mouse interactions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      updatePlayerAction('move');
      // Update player position in room state
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [updatePlayerAction]);

  if (error) {
    return (
      <div className="text-red-500">
        Error connecting to room: {error.message}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Main game canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Network visualization overlay */}
      <div className="absolute top-4 right-4 w-64 h-48">
        <NetworkVisualization />
      </div>

      {/* Terminal overlay */}
      <div className="absolute bottom-4 left-4 w-96">
        <Terminal />
      </div>

      {/* Player list */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-sm font-bold mb-2">Players Online</h3>
        <div className="space-y-1">
          {Array.from(roomState?.players.values() ?? []).map(player => (
            <div
              key={player.id}
              className="flex items-center gap-2 text-sm"
            >
              <div className={cn(
                "w-2 h-2 rounded-full",
                player.status === 'active' ? "bg-green-500" : "bg-yellow-500"
              )} />
              <span>
                {player.id === playerId.current ? "You" : "Player"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resource display */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
        <h3 className="text-sm font-bold mb-2">Resources</h3>
        <div className="space-y-1">
          {Array.from(roomState?.resources.entries() ?? []).map(([id, amount]) => (
            <div key={id} className="flex justify-between text-sm">
              <span>{id}:</span>
              <span>{amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}