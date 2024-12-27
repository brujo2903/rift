import { Terminal } from './terminal';
import { NetworkVisualization } from './network-visualization';
import { SocialVisualization } from './social-visualization';
import { ChatVisualization } from './chat-visualization';
import { cn } from '@/lib/utils';

interface RoomContentProps {
  type: string;
  className?: string;
}

export function RoomContent({ type, className }: RoomContentProps) {
  const getContent = () => {
    switch (type) {
      case 'control':
        return <Terminal className={className} />;
      case 'swarm':
        return <NetworkVisualization />;
      case 'social':
        return <SocialVisualization />;
      case 'chat':
        return <ChatVisualization />;
      default:
        return (
          <div className={cn(
            "bg-black/80 rounded-lg p-4 h-[400px] border border-white/10",
            "flex items-center justify-center text-white/50 font-mono",
            className
          )}>
            Accessing {type} interface...
          </div>
        );
    }
  };

  return getContent();
}