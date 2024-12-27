import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { value: '$50M+', label: 'Funding Secured' },
  { value: '100+', label: 'AI Startups' },
  { value: '92%', label: 'Success Rate' },
  { value: '500+', label: 'Industry Mentors' },
];

export function StatsSection() {
  return (
    <div className="bg-primary/5 py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none bg-transparent">
              <CardContent className="text-center pt-6">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}