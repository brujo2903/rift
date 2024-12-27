import { ArrowRight, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="bg-card rounded-3xl p-12 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        <Bot className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-4xl font-bold mb-6">Let's Innovate Together</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Have an idea, question, or partnership opportunity? We'd love to hear from you. 
          Reach out to join the Rift journey and be part of the next wave of AI innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary relative group/button hover:scale-105 transition-all duration-300"
          >
            Contact Us
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}