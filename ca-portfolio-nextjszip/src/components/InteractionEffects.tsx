'use client';
import { useEffect } from 'react';

export default function InteractionEffects() {
  useEffect(() => {
    // Magnetic buttons
    const magnetics = document.querySelectorAll<HTMLElement>('.magnetic');
    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = '';
    };
    magnetics.forEach(el => {
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });

    // Ripple
    const ripples = document.querySelectorAll<HTMLElement>('.ripple-container');
    const onRippleClick = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const wave = document.createElement('span');
      wave.className = 'ripple-wave';
      const size = Math.max(rect.width, rect.height);
      wave.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
      el.appendChild(wave);
      setTimeout(() => wave.remove(), 700);
    };
    ripples.forEach(el => el.addEventListener('click', onRippleClick as EventListener));

    // Keyboard shortcuts — skip when user is typing in a form field
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 't' || e.key === 'T') {
        document.getElementById('theme-panel')?.classList.toggle('open');
      }
      if (e.key === 'd' || e.key === 'D') {
        const isDark = document.documentElement.dataset.theme === 'dark';
        document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      magnetics.forEach(el => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
      ripples.forEach(el => el.removeEventListener('click', onRippleClick as EventListener));
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
