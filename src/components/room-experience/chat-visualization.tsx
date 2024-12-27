import { useEffect, useRef, useState } from 'react';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

export function ChatVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const animationFrameId = useRef<number>();

  // Simulated chat messages
  useEffect(() => {
    const sampleMessages: Message[] = [
      { id: '1', type: 'user', content: 'Hello AI!', timestamp: Date.now() - 5000 },
      { id: '2', type: 'bot', content: 'Hi! How can I help you today?', timestamp: Date.now() - 4000 },
      { id: '3', type: 'user', content: 'Tell me about neural networks', timestamp: Date.now() - 3000 },
      { id: '4', type: 'bot', content: 'Neural networks are computational systems inspired by biological neural networks...', timestamp: Date.now() - 2000 },
    ];

    setMessages(sampleMessages);

    // Add new messages periodically
    const interval = setInterval(() => {
      const isBot = Math.random() > 0.5;
      const newMessage: Message = {
        id: crypto.randomUUID(),
        type: isBot ? 'bot' : 'user',
        content: isBot ? 'Processing neural patterns...' : 'Analyzing data streams...',
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Create particles for new message
      createMessageParticles(isBot);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const createMessageParticles = (isBot: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startX = isBot ? 0 : canvas.width;
    const color = isBot ? 'rgba(56, 189, 248, 0.8)' : 'rgba(232, 121, 249, 0.8)';

    const newParticles = Array.from({ length: 20 }, () => ({
      x: startX,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2 * (isBot ? 1 : -1),
      vy: (Math.random() - 0.5) * 2,
      life: 1,
      maxLife: 1 + Math.random(),
      color
    }));

    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 0.01;

        if (particle.life <= 0) return false;

        const alpha = (particle.life / particle.maxLife) * 0.5;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particle.color.replace('0.8', alpha.toString());
        ctx.fill();

        return true;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden bg-black/80 border border-white/10 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-white/10 bg-white/5">
        <h3 className="text-lg font-light tracking-wider">AI Chat Interface</h3>
        <p className="text-sm text-white/60">Real-time conversation visualization</p>
      </header>

      {/* Main content area */}
      <div className="flex-1 relative">
        {/* Particle animation canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
        
        {/* Chat messages */}
        <div className="absolute inset-0 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 max-w-[80%] animate-fade-in",
                message.type === 'bot' ? 'ml-0' : 'ml-auto'
              )}
            >
              {message.type === 'bot' && (
                <Bot className="w-6 h-6 text-sky-400 flex-shrink-0" />
              )}
              <div
                className={cn(
                  "rounded-lg p-3 text-sm backdrop-blur-sm",
                  message.type === 'bot'
                    ? "bg-sky-500/20 text-sky-100"
                    : "bg-pink-500/20 text-pink-100"
                )}
              >
                {message.content}
              </div>
              {message.type === 'user' && (
                <User className="w-6 h-6 text-pink-400 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input area */}
      <footer className="p-4 border-t border-white/10 bg-white/5">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-white/20"
          />
          <button 
            className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <Bot className="w-4 h-4" />
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}