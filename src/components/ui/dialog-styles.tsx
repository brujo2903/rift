import { cva } from 'class-variance-authority';

// Color themes for different room types
export const roomThemes = {
  RED_ROOM: {
    accent: 'rose',
    border: 'border-rose-500/30',
    bg: 'bg-rose-950/20',
    glow: 'rgba(244, 63, 94, 0.07)',
    button: 'bg-rose-500/30 hover:bg-rose-500/40',
    gradient: 'from-rose-500/5 via-transparent to-rose-500/5'
  },
  TWITTER_ROOM: {
    accent: 'sky',
    border: 'border-sky-500/30',
    bg: 'bg-sky-950/20',
    glow: 'rgba(59, 130, 246, 0.07)',
    button: 'bg-sky-500/30 hover:bg-sky-500/40',
    gradient: 'from-sky-500/5 via-transparent to-sky-500/5'
  },
  WAIFU_ROOM: {
    accent: 'pink',
    border: 'border-pink-500/30',
    bg: 'bg-pink-950/20',
    glow: 'rgba(236, 72, 153, 0.07)',
    button: 'bg-pink-500/30 hover:bg-pink-500/40',
    gradient: 'from-pink-500/5 via-transparent to-pink-500/5'
  },
  QUANT_ROOM: {
    accent: 'emerald',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-950/20',
    glow: 'rgba(16, 185, 129, 0.07)',
    button: 'bg-emerald-500/30 hover:bg-emerald-500/40',
    gradient: 'from-emerald-500/5 via-transparent to-emerald-500/5'
  },
  SWARM_ROOM: {
    accent: 'amber',
    border: 'border-amber-500/30',
    bg: 'bg-amber-950/20',
    glow: 'rgba(245, 158, 11, 0.07)',
    button: 'bg-amber-500/30 hover:bg-amber-500/40',
    gradient: 'from-amber-500/5 via-transparent to-amber-500/5'
  },
  DEFAULT: {
    accent: 'violet',
    border: 'border-violet-500/30',
    bg: 'bg-violet-950/20',
    glow: 'rgba(139, 92, 246, 0.07)',
    button: 'bg-violet-500/30 hover:bg-violet-500/40',
    gradient: 'from-violet-500/5 via-transparent to-violet-500/5'
  }
};

export const dialogBaseStyles = {
  backdrop: `
    bg-[#070B14]/95 border-0 p-0 gap-0 
    backdrop-blur-xl shadow-2xl
    data-[state=open]:animate-in 
    data-[state=closed]:animate-out 
    data-[state=open]:fade-in-0 
    data-[state=closed]:fade-out-0 
    data-[state=open]:zoom-in-95 
    data-[state=closed]:zoom-out-95 
    data-[state=open]:duration-200
    data-[state=closed]:duration-150
  `,

  gradients: {
    wrapper: "absolute inset-0 pointer-events-none overflow-hidden",
    primary: "absolute inset-0 bg-gradient-to-br opacity-50",
    radial: "absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_50%)]",
    noise: "absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-[0.02]"
  },

  header: {
    wrapper: "flex items-center gap-3 p-4 border-b border-white/[0.02]",
    iconWrapper: "p-2 rounded-lg bg-white/[0.02] backdrop-blur-sm",
    title: "text-xl font-light tracking-wide text-white/90",
    subtitle: "text-sm text-white/40",
    closeButton: "p-2 rounded-lg transition-all duration-300 hover:bg-white/[0.02] hover:scale-105"
  },

  content: {
    wrapper: "p-6 space-y-4",
    section: "space-y-4"
  },

  input: `
    bg-white/[0.02] border-white/10 
    text-white placeholder:text-white/30 
    backdrop-blur-sm
    transition-all duration-200
    focus:border-white/20 focus:ring-white/10
  `,

  button: `
    w-full font-light tracking-widest py-3
    bg-white/[0.02] hover:bg-white/[0.04]
    border border-white/10 hover:border-white/20
    transition-all duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    text-white/90
  `,

  footer: {
    wrapper: "flex items-center justify-center gap-2 py-3 border-t border-white/[0.02]",
    text: "text-sm font-light tracking-wider text-white/30"
  }
};

export const iconStyles = {
  base: "transition-all duration-300",
  sizes: {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  },
  variants: {
    primary: "text-white/80",
    secondary: "text-white/60",
    muted: "text-white/40",
    accent: "text-violet-400"
  }
};

export const iconWrapper = cva(
  "flex items-center justify-center rounded-lg backdrop-blur-sm transition-all duration-300",
  {
    variants: {
      size: {
        sm: "p-1",
        md: "p-2",
        lg: "p-3"
      },
      variant: {
        solid: "bg-white/[0.02] hover:bg-white/[0.04]",
        ghost: "hover:bg-white/[0.02]"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "solid"
    }
  }
);