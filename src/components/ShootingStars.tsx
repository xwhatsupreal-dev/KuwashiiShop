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

    const resize = () => {
      // Only resize if actually changed to prevent mobile scroll lag
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const createStar = () => {
      return {
        x: Math.random() * canvas.width * 1.5,
        y: Math.random() * canvas.height * -0.5,
        length: Math.random() * 100 + 40,
        speed: Math.random() * 10 + 8,
        opacity: Math.random() * 0.6 + 0.4,
        thickness: Math.random() * 1.5 + 0.5,
        active: true
      };
    };

    // Initial stars
    for (let i = 0; i < 15; i++) {
        stars.push(createStar());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star, index) => {
        if (!star.active) {
           if (Math.random() < 0.05) { // 5% chance per frame to respawn a dead star
               stars[index] = createStar();
           }
           return;
        }

        ctx.beginPath();
        // Create gradient for a nice tail effect
        const grad = ctx.createLinearGradient(star.x, star.y, star.x + star.length, star.y - star.length);
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = star.thickness;
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y - star.length);
        ctx.stroke();

        star.x -= star.speed;
        star.y += star.speed;

        if (star.x < -star.length || star.y > canvas.height + star.length) {
          star.active = false;
        }
      });
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0" 
    />
  );
};
