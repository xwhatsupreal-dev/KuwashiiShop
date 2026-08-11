import React, { useEffect, useState } from 'react';

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number, left: number, animationDuration: number, animationDelay: number, opacity: number, scale: number }>>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 10 : 18;
    const flakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 12 + Math.random() * 18,
      animationDelay: -Math.random() * 20,
      opacity: 0.15 + Math.random() * 0.3,
      scale: 0.5 + Math.random() * 1.0,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-5vh) translateX(0) rotate(0deg); }
          100% { transform: translateY(105vh) translateX(15px) rotate(360deg); }
        }
      `}</style>
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute top-0 text-white select-none pointer-events-none"
          style={{
            left: `${flake.left}%`,
            opacity: flake.opacity,
            fontSize: `${12 * flake.scale}px`,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            animationDelay: `${flake.animationDelay}s`,
            willChange: 'transform'
          }}
        >
          ❄️
        </div>
      ))}
    </div>
  );
}
