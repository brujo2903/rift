import { Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function VisionSection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Our Vision for the Future</h2>
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-6 animate-pulse" />
        </div>
        <Card className="bg-gradient-to-br from-background to-primary/5 hover:to-primary/10 transition-colors duration-300">
          <CardHeader>
            <p className="text-xl leading-relaxed text-muted-foreground">
              AI isn't just a tool—it's a revolution. At Rift, we envision a future where 
              artificial intelligence drives creativity, solves complex problems, and improves 
              lives. By fostering bold ideas and groundbreaking technologies, we aim to lead 
              the charge toward an AI-powered tomorrow.
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-center bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Join us as we shape the future.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}