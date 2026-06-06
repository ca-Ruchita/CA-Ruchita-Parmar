'use client';
import { useEffect } from 'react';

export default function TiltCards() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('.tilt-card');

    const handleMove = (e: MouseEvent) => {
      const card = (e.currentTarget as HTMLElement);
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateZ(4px)`;
      const shine = card.querySelector<HTMLElement>('.card-shine');
      if (shine) {
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        shine.style.setProperty('--mx', mx + '%');
        shine.style.setProperty('--my', my + '%');
      }
    };
    const handleLeave = (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.transform = '';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMove);
      card.addEventListener('mouseleave', handleLeave);
    });
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMove);
        card.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, []);

  return null;
}
