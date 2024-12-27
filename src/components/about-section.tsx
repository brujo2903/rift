import { Card, CardContent } from '@/components/ui/card';

export function AboutSection() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">What is Rift?</h2>
        <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/20 transition-colors duration-300">
          <CardContent className="pt-6">
            <p className="text-xl leading-relaxed text-muted-foreground">
              Rift is a cutting-edge AI incubator, empowering creators, innovators, and visionaries 
              to bring their ideas to life. With a mission to nurture groundbreaking technologies, 
              we provide the tools, expertise, and community needed to redefine the boundaries of 
              artificial intelligence. Whether you're building tomorrow's solutions or exploring 
              uncharted territories, Rift is where innovation thrives.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}