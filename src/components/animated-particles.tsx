export function AnimatedParticles() {
  return (
    <div className="absolute inset-0 opacity-30">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 bg-primary rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
    </div>
  );
}