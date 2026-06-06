'use client';
import { useState, useRef, useEffect } from 'react';

const COLORS = ['gold', 'emerald', 'sapphire', 'rose', 'violet', 'copper'] as const;
type Color = typeof COLORS[number];

export default function ThemePanel() {
  const [open, setOpen] = useState(false);
  const [activeColor, setActiveColor] = useState<Color>('gold');
  const [activeMode, setActiveMode] = useState<'dark' | 'light'>('dark');
  const panelRef = useRef<HTMLDivElement>(null);

  const setColor = (c: Color) => {
    document.documentElement.dataset.color = c;
    setActiveColor(c);
  };
  const setMode = (m: 'dark' | 'light') => {
    document.documentElement.dataset.theme = m;
    setActiveMode(m);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div id="theme-panel" className={open ? 'open' : ''} ref={panelRef}>
      <button id="theme-toggle-btn" onClick={() => setOpen(v => !v)}>Themes</button>
      <h4>Colour Theme</h4>
      <div className="color-grid">
        {COLORS.map(c => (
          <button
            key={c}
            className={`color-swatch${activeColor === c ? ' active' : ''}`}
            data-c={c}
            onClick={() => setColor(c)}
          >
            <span>{c}</span>
          </button>
        ))}
      </div>
      <h4 style={{ marginTop: '0.5rem' }}>Mode</h4>
      <div className="mode-toggle">
        <button className={`mode-btn${activeMode === 'dark' ? ' active' : ''}`} data-mode="dark" onClick={() => setMode('dark')}>🌙 Dark</button>
        <button className={`mode-btn${activeMode === 'light' ? ' active' : ''}`} data-mode="light" onClick={() => setMode('light')}>☀️ Light</button>
      </div>
    </div>
  );
}
