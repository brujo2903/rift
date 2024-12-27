import { LucideIcon } from 'lucide-react';
import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { RoomDialog } from './room-dialog';
import { iconStyles } from '@/components/ui/dialog-styles';

interface RoomCardProps {
  type?: 'action';
  title: string;
  icon: LucideIcon;
  description: string;
  color: string;
  glowColor?: string;
  buttonText?: string;
  buttonColor?: string;
  onClick?: () => void;
}

export function RoomCard({
  type,
  title,
  icon: Icon,
  description,
  color,
  glowColor = 'rgba(139, 92, 246, 0.1)',
  buttonText,
  buttonColor,
  onClick,
}: RoomCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = useCallback((e: React.MouseEvent) => {
    // Prevent event bubbling
    e.stopPropagation();
    e.preventDefault();

    // Prevent multiple clicks during transition
    if (isTransitioning) return;

    // Prevent opening the room dialog if this is the create room card
    if (type === 'action' && onClick) {
      onClick(e);
      return;
    }
    
    if (onClick) {
      onClick(e);
      return;
    }
    
    setIsTransitioning(true);
    setDialogOpen(true);
    
    // Reset transition state after animation completes
    setTimeout(() => setIsTransitioning(false), 300);
  }, [type, onClick, isTransitioning]);

  return (
    <>
      <div
        className={cn(
          'group relative rounded-xl border p-6 backdrop-blur-lg overflow-hidden',
          'transition-all duration-300 ease-out min-h-[180px]',
          'hover:scale-[1.02] hover:shadow-lg',
          'cursor-pointer select-none touch-none',
          isTransitioning && 'pointer-events-none',
          color
        )}
        onClick={handleClick}
        onMouseDown={(e) => e.preventDefault()}
        style={{
          '--glow-color': glowColor,
          boxShadow: `0 0 40px -10px ${glowColor}`,
        }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.08] to-transparent backdrop-blur-xl" />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
            backgroundImage: `linear-gradient(135deg, ${glowColor}, transparent 60%)`
          }} />
        </div>
        <div className="relative flex flex-col items-center justify-center text-center">
          <Icon className={cn(
            iconStyles.base,
            iconStyles.sizes.lg,
            "text-white/80 group-hover:text-white transition-colors duration-300",
            "mb-3 group-hover:scale-110 group-hover:rotate-3"
          )} />
          <h3 className="text-lg font-light mb-1 tracking-widest text-white/90">{title}</h3>
          {description && (
            <p className="text-white/50 text-sm mb-6 font-mono">
              <span className="text-emerald-400/80">&gt;</span> {description}
            </p>
          )}
          {buttonText && (
            <button
              className={cn(
                'w-full py-3 rounded-lg text-sm font-bold tracking-widest',
                'transition-all duration-300 hover:scale-105 backdrop-blur-sm',
                'shadow-xl shadow-black/40',
                buttonColor
              )}
            >
              {buttonText}
            </button>
          )}
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-white/30">
          {Math.random().toString(16).substring(2, 8).toUpperCase()}
        </div>
      </div>
      <RoomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={title}
        icon={Icon}
        color={color}
        glowColor={glowColor}
      />
    </>
  );
}