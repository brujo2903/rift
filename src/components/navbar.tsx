import { Bot, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Rift</span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost">Solutions</Button>
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Portfolio</Button>
            <Button variant="ghost">Resources</Button>
            <Button>Apply Now</Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
}