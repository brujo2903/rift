import { Bot, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedParticles } from './animated-particles';

export function HeroSection() {
  return (
    <div className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5 animate-gradient" />
        <AnimatedParticles />
      </div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8">
            <Bot className="w-5 h-5" />
            <span>The Best AI Incubator. ⌭</span>
          </div>
          <h1 className="text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent animate-gradient">
            Unlocking the future of artificial intelligence, one innovative idea at a time.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the next generation of AI innovators. We provide the resources, expertise, and community to turn groundbreaking AI ideas into successful ventures.
          </p>
          <div className="flex gap-6 justify-center items-center">
            <Button size="lg" className="group hover:scale-105 transition-all duration-300">
              Explore Rift Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="hover:bg-primary/5">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}