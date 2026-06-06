'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const getAccent = () =>
      getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#d4a03a';

    const w = canvas.width;
    const h = canvas.height;

    class Particle {
      x = 0; y = 0; size = 0; speedX = 0; speedY = 0;
      opacity = 0; life = 0; maxLife = 0;
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * (canvas?.width ?? w);
        this.y = Math.random() * (canvas?.height ?? h);
        this.size = Math.random() * 1.5 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = 0;
        this.maxLife = Math.random() * 200 + 100;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life++;
        const cw = canvas?.width ?? w;
        const ch = canvas?.height ?? h;
        if (this.life > this.maxLife || this.x < 0 || this.x > cw || this.y < 0 || this.y > ch) {
          this.reset();
        }
      }
      draw() {
        if (!ctx) return;
        const alpha = this.life < 30 ? this.life / 30 : this.life > this.maxLife - 30 ? (this.maxLife - this.life) / 30 : 1;
        ctx.globalAlpha = this.opacity * alpha;
        ctx.fillStyle = getAccent();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    type MP = { x: number; y: number; vx: number; vy: number; life: number; size: number };
    const mouseParticles: MP[] = [];

    const onMove = (e: MouseEvent) => {
      if (Math.random() < 0.15) {
        mouseParticles.push({
          x: e.clientX, y: e.clientY,
          vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2,
          life: 40, size: Math.random() * 2 + 1,
        });
      }
    };
    document.addEventListener('mousemove', onMove);

    let animId: number;
    const animate = () => {
      if (ctx) ctx.clearRect(0, 0, canvas?.width ?? w, canvas?.height ?? h);
      particles.forEach(p => { p.update(); p.draw(); });
      for (let i = mouseParticles.length - 1; i >= 0; i--) {
        const p = mouseParticles[i];
        p.x += p.vx; p.y += p.vy; p.life--;
        if (ctx) {
          ctx.globalAlpha = (p.life / 40) * 0.4;
          ctx.fillStyle = getAccent();
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
        }
        if (p.life <= 0) mouseParticles.splice(i, 1);
      }
      if (ctx) ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="particle-canvas" ref={canvasRef} />;
}
