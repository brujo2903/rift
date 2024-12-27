import { Code2, Layers, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Built on cutting-edge technology for maximum performance and minimal latency. Deploy in seconds, not minutes.',
  },
  {
    icon: Code2,
    title: 'Developer First',
    description:
      'Intuitive APIs, comprehensive documentation, and powerful developer tools that make coding a joy.',
  },
  {
    icon: Layers,
    title: 'Scalable Architecture',
    description:
      'Built to scale from day one. Handle millions of requests without breaking a sweat.',
  },
];

export function FeatureSection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div key={feature.title} className="animate-fade-in">
            <Card className="border-2 group hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4 transition-transform duration-300 group-hover:scale-110" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>{feature.description}</CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}