"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speedX: number;
  speedY: number;
  swaySpeed: number;
  swayDist: number;
  originalX: number;
}

export const FlourDust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 700;
    };
    window.addEventListener("resize", onResize);

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    // Create 45 subtle flour dust particles
    const particleCount = 45;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      particles.push({
        x,
        originalX: x,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.4 + 0.15,
        swaySpeed: Math.random() * 0.02 + 0.005,
        swayDist: Math.random() * 15 + 5,
      });
    }

    let frame = 0;
    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);
        frame++;

        for (let i = 0; i < particleCount; i++) {
          const p = particles[i];
          p.y -= p.speedY; // Drift upwards slowly like fine flour dust
          p.x = p.originalX + Math.sin(frame * p.swaySpeed + i) * p.swayDist;

          // Wrap around
          if (p.y < -10) {
            p.y = height + 10;
            p.originalX = Math.random() * width;
            p.x = p.originalX;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 252, 245, ${p.alpha})`;
          ctx.fill();
        }
      }
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
};
