import { DashboardHeader } from '@/components/dashboard/header';
import { RoomGrid } from '@/components/dashboard/room-grid';

export default function App() {
  return (
    <div className="h-screen bg-[#070B14] text-white relative overflow-hidden animate-noise animate-scanline">
      {/* Primary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-fuchsia-900/30 to-cyan-900/20 animate-gradient-slow" />
      
      {/* Ethereal overlay gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5),transparent_80%)]" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-[0.02]" />
      
      {/* Content wrapper */}
      <div className="relative max-w-5xl mx-auto px-4 h-full flex flex-col justify-center">
        <DashboardHeader />
        <RoomGrid />
      </div>
    </div>
  );
}