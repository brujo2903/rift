import { Bot, Twitter, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onClose?: () => void;
}

export function DashboardHeader({ onClose }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-4 pt-2">
      <div className="flex w-full max-w-2xl mx-auto items-center justify-center relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-0 top-0 p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <div className="flex flex-col space-y-4">
          <h1 className="relative">
            <span className="text-3xl font-black tracking-widest text-white relative group">
              <span className="relative z-10">RIFT BACKROOMS</span>
              <span className="absolute inset-0 blur-md bg-white/50 group-hover:bg-white/70 transition-colors duration-500" />
              <span className="absolute inset-0 animate-pulse blur-xl bg-white/30" />
            </span>
          </h1>
          <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-medium tracking-wide">
            [CLASSIFIED] Neural network control system for autonomous AI agents.
            <br />
            <span className="text-emerald-400/80 font-mono">STATUS: OPERATIONAL</span>
          </p>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <a
          href="#"
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="h-5 w-5 text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-5 w-5 text-white" />
        </a>
      </div>
    </div>
  );
}