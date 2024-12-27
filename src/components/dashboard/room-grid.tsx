import { Plus, ArrowRight, Bot, Zap, MessageSquare, Globe, Network } from 'lucide-react';
import { useState, useCallback } from 'react';
import { RoomCard } from './room-card';
import { MetricsSection } from './metrics-section';
import { DashboardFooter } from './footer';
import { CreateRoomDialog } from '../create-room-dialog';

const rooms = [
  {
    id: 'create',
    type: 'action',
    title: 'Create Room',
    icon: Plus,
    description: 'Start a new agent room',
    color: 'border-violet-500/20 bg-violet-950/10',
    glowColor: 'rgba(139, 92, 246, 0.07)',
  },
  {
    id: 'join',
    type: 'action',
    title: 'Join Room',
    icon: ArrowRight,
    description: 'Connect to existing room',
    color: 'border-violet-500/20 bg-violet-950/10',
    glowColor: 'rgba(139, 92, 246, 0.07)',
  },
  {
    id: 'control',
    title: 'Control Room',
    icon: Zap,
    description: 'Agent Control Center',
    color: 'border-rose-500/30 bg-rose-950/20',
    buttonText: 'ENTER CONTROL',
    buttonColor: 'bg-rose-500/30 hover:bg-rose-500/40',
    glowColor: 'rgba(244, 63, 94, 0.07)',
  },
  {
    id: 'social',
    title: 'Social Room',
    icon: Globe,
    description: 'Social Media Agent',
    color: 'border-teal-500/30 bg-teal-950/20',
    buttonText: 'ENTER SOCIAL',
    buttonColor: 'bg-teal-500/30 hover:bg-teal-500/40',
    glowColor: 'rgba(20, 184, 166, 0.07)',
  },
  {
    id: 'chat',
    title: 'Chat Room',
    icon: MessageSquare,
    description: 'Chat Agent Interface',
    color: 'border-blue-500/30 bg-blue-950/20',
    buttonText: 'ENTER CHAT',
    buttonColor: 'bg-blue-500/30 hover:bg-blue-500/40',
    glowColor: 'rgba(59, 130, 246, 0.07)',
  },
  {
    id: 'swarm',
    title: 'Swarm Room',
    icon: Network,
    description: 'Swarm Intelligence Hub',
    color: 'border-amber-500/30 bg-amber-950/20',
    buttonText: 'ENTER SWARM',
    buttonColor: 'bg-amber-500/30 hover:bg-amber-500/40',
    glowColor: 'rgba(245, 158, 11, 0.07)',
  },
];

export function RoomGrid() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleCreateClick = useCallback((e: React.MouseEvent) => {
    // Prevent multiple clicks during transition
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    e.stopPropagation();
    setCreateDialogOpen(true);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-lg font-bold tracking-wider text-white/90 mb-4 text-center">
        AVAILABLE ROOMS
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            {...room}
            onClick={room.id === 'create' ? handleCreateClick : undefined}
          />
        ))}
      </div>
      <div className="mt-4 text-center">
        <MetricsSection />
      </div>
      <CreateRoomDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </div>
  );
}