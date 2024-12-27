import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Bot, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { dialogBaseStyles as styles, iconWrapper, iconStyles } from '@/components/ui/dialog-styles';
import { RoomContent } from '@/components/room-experience/room-content';

interface RoomDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
}

export function RoomDialog({
  open,
  onOpenChange,
  title,
  icon: Icon,
  color,
  glowColor,
}: RoomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(styles.backdrop, "sm:max-w-[800px]")}
        style={{
          '--theme-glow': glowColor,
          boxShadow: `0 0 60px -20px ${glowColor}`
        }}
      >
        {/* Background gradients */}
        <div className={styles.gradients.wrapper}>
          <div className={cn(styles.gradients.primary, color.replace('border-', 'from-').replace('/30', '/5'))} />
          <div className={styles.gradients.radial} />
          <div className={styles.gradients.noise} />
        </div>

        {/* Header */}
        <div className={styles.header.wrapper}>
          <div className={cn(iconWrapper({ size: "md", variant: "solid" }))}>
            <Icon className={cn(
              iconStyles.base,
              iconStyles.sizes.md,
              iconStyles.variants.primary
            )} />
          </div>
          <div className="flex-1">
            <DialogTitle asChild>
              <h2 className={styles.header.title}>{title}</h2>
            </DialogTitle>
            <p className={styles.header.subtitle}>Room Monitoring System</p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className={styles.header.closeButton}
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content.wrapper}>
          <div className="grid grid-cols-5 gap-4 mb-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  'aspect-square rounded-xl border-white/5 p-6',
                  'flex flex-col items-center justify-center cursor-pointer relative overflow-hidden',
                  'transition-all duration-300',
                  'hover:scale-[1.02] bg-white/[0.02] backdrop-blur-sm',
                  'hover:bg-white/[0.03]',
                  color.replace('border-', 'hover:border-').replace('/30', '/20')
                )}
                style={{
                  '--cell-glow': glowColor,
                  boxShadow: `0 0 30px -10px ${glowColor}`
                }}
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br" style={{
                    backgroundImage: `linear-gradient(135deg, ${glowColor}, transparent 60%)`
                  }} />
                </div>
                <div className="relative flex flex-col items-center">
                  <Icon className={cn(
                    iconStyles.base,
                    iconStyles.sizes.lg,
                    iconStyles.variants.secondary,
                    "mb-3"
                  )} />
                  <span className="text-sm font-light tracking-widest text-white/40">
                    enter window
                  </span>
                </div>
              </div>
            ))}
          </div>
          <RoomContent 
            type={title.toLowerCase().split(' ')[0]}
            className="w-full"
          />
        </div>

        {/* Footer */}
        <div className={styles.footer.wrapper}>
          <Bot className="h-4 w-4 text-white/30" />
          <span className={styles.footer.text}>
            rifts.fun
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}