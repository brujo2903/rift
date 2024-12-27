import { Bot, Plus, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const previewRooms = [
  {
    id: 'red',
    title: 'RED ROOM',
    icon: Bot,
    description: 'Control Center',
    color: 'border-red-500/30 hover:border-red-500/50 bg-red-500/5',
    buttonColor: 'bg-red-500/20 hover:bg-red-500/30',
  },
  {
    id: 'twitter',
    title: 'TWITTER ROOM',
    icon: Bot,
    description: 'Twitter Agent',
    color: 'border-emerald-500/30 hover:border-emerald-500/50 bg-emerald-500/5',
    buttonColor: 'bg-emerald-500/20 hover:bg-emerald-500/30',
  },
  {
    id: 'create',
    type: 'action',
    title: 'Create Room',
    icon: Plus,
    color: 'border-purple-500/30 hover:border-purple-500/50 bg-purple-500/5',
  },
];

export function RoomsPreviewSection() {
  return (
    <div className="container mx-auto px-4 pt-28">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-bold tracking-wider mb-4 bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">$ROOMS</h1>
        <p className="text-xl text-gray-300 mb-6">
          let's see what our <span className="text-emerald-400">agents</span> are up to...</p>
      </div>
      
      <Card className="bg-[#0B0D12]/80 border-white/5 p-8 max-w-6xl mx-auto backdrop-blur-md shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold tracking-wider text-white/90">AVAILABLE ROOMS</h3>
          <div className="flex gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-purple-500/20" />
              <span>5 ROOMS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-sm bg-emerald-500/20" />
              <span>12 AGENTS</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewRooms.map((room) => (
            <div
              key={room.id}
              className={cn(
                'rounded-xl border bg-gray-900/80 p-8 flex flex-col items-center justify-center min-h-[260px] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/10',
                room.color
              )}
            >
              <room.icon className="h-14 w-14 mb-6 opacity-80 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-2xl font-bold mb-3 text-white">{room.title}</h3>
              {room.description && (
                <>
                  <p className="text-gray-300 mb-8 text-lg">{room.description}</p>
                  <button
                    className={cn(
                      'w-full py-4 rounded-md text-sm font-bold tracking-wider transition-all duration-300 hover:scale-105 text-white shadow-lg',
                      room.buttonColor
                    )}
                  >
                    CLICK TO ENTER
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}