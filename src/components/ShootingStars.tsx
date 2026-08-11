import React, { useRef, useEffect } from 'react';

export const ShootingStars = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{x: number, y: number, length: number, speed: number, opacity: number, active: boolean, thickness: number}> = [];

    const isMobile = window.innerWidth < 768;
    const starCount = isMobile ? 6 : 10;

    const resize = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const createStar = () => ({
      x: Math.random() * canvas.width * 1.3,
      y: Math.random() * canvas.height * -0.3,
      length: Math.random() * 80 + 30,
      speed: Math.random() * 8 + 6,
      opacity: Math.random() * 0.5 + 0.3,
      thickness: Math.random() * 1.2 + 0.5,
      active: true
    });

    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }

    let lastTime = 0;
    const fps = isMobile ? 30 : 45;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!star.active) {
          if (Math.random() < 0.03) {
            stars[i] = createStar();
          }
          continue;
        }

        ctx.strokeStyle = `rgba(199, 210, 254, ${star.opacity})`;
        ctx.lineWidth = star.thickness;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y - star.length);
        ctx.stroke();

        star.x -= star.speed;
        star.y += star.speed;

        if (star.x < -star.length || star.y > canvas.height + star.length) {
          star.active = false;
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 will-change-transform" 
    />
  );
};
