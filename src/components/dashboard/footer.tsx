import { Bot } from 'lucide-react';

export function DashboardFooter() {
  return (
    <div className="flex items-center justify-center gap-2 mt-8 py-4 text-sm text-gray-500">
      <Bot className="h-4 w-4" />
      <span>rifts.fun</span>
    </div>
  );
}