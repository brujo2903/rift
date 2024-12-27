import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalProps {
  className?: string;
}

export function Terminal({ className }: TerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const bootSequence = [
    'INITIALIZING NEURAL INTERFACE...',
    'ESTABLISHING QUANTUM LINK...',
    'ACCESSING BACKROOMS PROTOCOL...',
    'BREACH DETECTED IN SECTOR 7G...',
    'RECALIBRATING REALITY ANCHORS...',
    '[WARNING] DIMENSIONAL STABILITY AT 47%',
    'READY FOR INPUT...'
  ];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    bootSequence.forEach((line, index) => {
      timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, index * 1000);
    });

    return () => clearTimeout(timeout);
  }, []);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      setLines(prev => [...prev, `> ${currentInput}`, processCommand(currentInput)]);
      setCurrentInput('');
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }
  };

  const processCommand = (input: string): string => {
    const command = input.toLowerCase().trim();
    
    if (command.includes('help')) {
      return 'Available commands: status, scan, breach, help';
    }
    if (command.includes('status')) {
      return 'SYSTEM STATUS: UNSTABLE\nReality anchors: COMPROMISED\nQuantum coherence: 72%';
    }
    if (command.includes('scan')) {
      return 'SCANNING...\nDetected anomalies in sectors: 3F, 7G, 12B\nTemporal distortions present';
    }
    if (command.includes('breach')) {
      return '[ALERT] Breach containment protocols active\nProceed with caution';
    }
    
    return 'Unknown command. Type "help" for available commands.';
  };

  return (
    <div className={cn(
      "bg-black/80 rounded-lg p-4 font-mono text-sm h-[400px] flex flex-col",
      "border border-white/10",
      className
    )}>
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto space-y-1 mb-2 scrollbar-thin scrollbar-thumb-white/10"
      >
        {lines.map((line, i) => (
          <div 
            key={i}
            className={cn(
              "text-white/80",
              line.startsWith('[WARNING]') && "text-yellow-400",
              line.startsWith('[ALERT]') && "text-red-400",
              line.startsWith('>') && "text-cyan-400"
            )}
          >
            {line}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-white/10 pt-2">
        <span className="text-green-400 mr-2">{'>'}</span>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleInput}
          className="bg-transparent flex-1 focus:outline-none text-white/90"
          placeholder="Enter command..."
        />
      </div>
    </div>
  );
}