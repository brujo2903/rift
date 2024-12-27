import { useState } from 'react';
import { Bot, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRoomStore } from '@/lib/store/room-store';
import { dialogBaseStyles as styles, iconWrapper, iconStyles } from '@/components/ui/dialog-styles';

interface CreateRoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ROOM_TYPES = [
  { 
    id: 'RED_ROOM', 
    name: 'RED ROOM', 
    description: 'Control Center',
    color: 'border-rose-500/30 bg-rose-950/20',
    buttonColor: 'bg-rose-500/30 hover:bg-rose-500/40',
  },
  { 
    id: 'TWITTER_ROOM', 
    name: 'TWITTER ROOM', 
    description: 'Twitter Agent',
    color: 'border-sky-500/30 bg-sky-950/20',
    buttonColor: 'bg-sky-500/30 hover:bg-sky-500/40',
  },
  { 
    id: 'WAIFU_ROOM', 
    name: 'WAIFU ROOM', 
    description: 'Chat Agent',
    color: 'border-pink-500/30 bg-pink-950/20',
    buttonColor: 'bg-pink-500/30 hover:bg-pink-500/40',
  },
  { 
    id: 'QUANT_ROOM', 
    name: 'QUANT ROOM', 
    description: 'Trading Agent',
    color: 'border-emerald-500/30 bg-emerald-950/20',
    buttonColor: 'bg-emerald-500/30 hover:bg-emerald-500/40',
  },
  { 
    id: 'SWARM_ROOM', 
    name: 'SWARM ROOM', 
    description: 'Swarm Agent',
    color: 'border-amber-500/30 bg-amber-950/20',
    buttonColor: 'bg-amber-500/30 hover:bg-amber-500/40',
  },
];

export function CreateRoomDialog({ open, onOpenChange }: CreateRoomDialogProps) {
  const [roomName, setRoomName] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const createRoom = useRoomStore(state => state.createRoom);
  const selectedRoom = ROOM_TYPES.find(room => room.id === selectedType);

  const handleCreateRoom = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!e.currentTarget.contains(e.target as Node)) return;

    // Prevent multiple submissions
    if (isLoading || isTransitioning) return;
    
    if (!roomName || !selectedType) return;
    if (isPrivate && !passcode) return;

    setIsLoading(true);
    setIsTransitioning(true);

    try {
      const roomId = crypto.randomUUID();
      createRoom(roomId, roomName, selectedType, isPrivate);

      // Reset form
      setRoomName('');
      setSelectedType('');
      setPasscode('');
      setIsPrivate(false);
      
      // Close dialog after successful creation
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setIsLoading(false);
      setIsTransitioning(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(styles.backdrop, "sm:max-w-[500px]")}>
        {/* Background gradients */}
        <div className={styles.gradients.wrapper}>
          <div className={styles.gradients.primary} />
          <div className={styles.gradients.radial} />
          <div className={styles.gradients.noise} />
        </div>

        <div className="relative" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-light tracking-widest flex items-center justify-center gap-2 mb-2 text-white/90">
            <div className={cn(iconWrapper({ size: "sm", variant: "ghost" }))}>
              <span className={cn(iconStyles.variants.accent)}>⌬</span>
            </div>
            Create Your Room
            <div className={cn(iconWrapper({ size: "sm", variant: "ghost" }))}>
              <span className={cn(iconStyles.variants.accent)}>⌬</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className={styles.content.section}>
          {/* Room Name */}
          <Input
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className={styles.input}
            placeholder="Enter room designation"
          />

          {/* Room Type Selection */}
          <div className="grid grid-cols-2 gap-4">
            {ROOM_TYPES.map((type) => (
              <div
                key={type.id}
                className={cn(
                  'relative rounded-lg border p-4 cursor-pointer transition-all duration-300',
                  'hover:scale-[1.02] bg-white/[0.02] backdrop-blur-sm border-white/5',
                  'hover:bg-white/[0.03]',
                  selectedType === type.id && 'ring-2 ring-violet-500/50 shadow-lg shadow-violet-500/20'
                )}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="relative text-center">
                  <h3 className="text-base font-light tracking-widest mb-2 text-white/90">{type.name}</h3>
                  <p className="text-sm text-white/40">{type.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-center space-x-2">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded border-white/10 bg-white/[0.02] focus:ring-white/20"
              />
              <label htmlFor="private" className="text-sm text-gray-400">
                Make room private
              </label>
            </div>

            {/* Passcode Input */}
            {isPrivate && (
              <div className="animate-fade-in">
                <Input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="bg-white/[0.02] border-white/10 text-white placeholder:text-white/30 backdrop-blur-sm"
                  placeholder="Enter room passcode"
                  minLength={4}
                  required
                />
                <p className="text-xs text-white/30 mt-1 text-center">
                  Minimum 4 characters required
                </p>
              </div>
            )}
          </div>

          {/* Create Button */}
          <Button
            onClick={handleCreateRoom}
            disabled={!roomName || !selectedType || isLoading || (isPrivate && !passcode)}
            className={styles.button}
          >
            {isLoading ? 'Creating...' : 'Create Room'}
          </Button>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}