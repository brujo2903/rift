import { Brain, Rocket, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const process = [
  {
    icon: Brain,
    title: 'Ideation & Research',
    description: 'Collaborate with mentors to refine your vision.',
  },
  {
    icon: Users,
    title: 'Development',
    description: 'Access advanced tools and support to build your project.',
  },
  {
    icon: Zap,
    title: 'Launch',
    description: 'Showcase your innovation to the world.',
  },
];

export function ProcessSection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">How Rift Works</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We turn big ideas into impactful realities through a seamless, guided process.
          Rift is more than an incubator—it's your launchpad for success.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {process.map((step, index) => (
          <Card key={step.title} className="relative group hover:border-primary/50 hover:scale-105 transition-all duration-300">
            {index < process.length - 1 && (
              <div className="hidden lg:block absolute -right-4 top-1/2 w-8 h-0.5 bg-border z-10" />
            )}
            <CardHeader>
              <div className="mb-4">
                <step.icon className="h-12 w-12 text-primary transition-all duration-300 group-hover:scale-110 group-hover:rotate-3" />
              </div>
              <CardTitle className="text-xl">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-lg">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}