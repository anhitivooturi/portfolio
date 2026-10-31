'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const commands = [
  { label: 'Jump to selected work', hint: 'SECTION', action: () => location.assign('#work') },
  { label: 'Jump to system profile', hint: 'SECTION', action: () => location.assign('#about') },
  { label: 'Jump to experience', hint: 'SECTION', action: () => location.assign('#experience') },
  { label: 'Open contact channel', hint: 'ACTION', action: () => location.assign('#contact') },
  { label: 'Copy email address', hint: 'ACTION', action: () => navigator.clipboard.writeText('anivooturi@gmail.com') },
  { label: 'Download resume', hint: 'FILE', action: () => window.open('/resume.pdf', '_blank', 'noopener,noreferrer') },
];

export default function Hud() {
  const [booting, setBooting] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorOn, setCursorOn] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => commands.filter((entry) => entry.label.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setPaletteOpen((open) => !open); setQuery(''); setActiveIndex(0);
      }
      if (event.key === 'Escape') { setPaletteOpen(false); setBooting(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { if (paletteOpen) inputRef.current?.focus(); }, [paletteOpen]);
  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      const target = event.target as HTMLElement;
      setCursorOn(Boolean(target.closest('a, button, [role="button"]')));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return <>
    <div className="scroll-progress" aria-hidden="true"/>
    <button className="palette-hint" onClick={() => { setPaletteOpen(true); setQuery(''); setActiveIndex(0); }} aria-label="Open command palette">⌘ K</button>
    <div className={`magnetic-cursor ${cursorOn ? 'cursor-active' : ''}`} aria-hidden="true"/>
    {booting && <div className="boot-screen" role="status" aria-label="Portfolio loading"><div className="boot-panel"><div className="boot-logo">AV<span> / SYSTEMS</span></div><div className="boot-lines"><p><b>&gt;</b> initializing anhiti.os <i>OK</i></p><p><b>&gt;</b> loading neural network <i>OK</i></p><p><b>&gt;</b> establishing connection <i>OK</i></p></div><div className="boot-bar"><span/></div><button onClick={() => setBooting(false)}>SKIP INTRO <span>↗</span></button></div></div>}
    {paletteOpen && <div className="palette-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setPaletteOpen(false); }}>
      <section className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette"><div className="command-label"><span>COMMAND / NAVIGATE</span><button onClick={() => setPaletteOpen(false)}>ESC</button></div><div className="command-input"><span>⌕</span><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} onKeyDown={(event) => {
        if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, filtered.length - 1)); }
        if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
        if (event.key === 'Enter' && filtered[activeIndex]) { event.preventDefault(); setPaletteOpen(false); filtered[activeIndex].action(); }
      }} placeholder="Search commands…" aria-label="Search commands"/></div><div className="command-list">{filtered.length ? filtered.map((entry, index) => <button className={index === activeIndex ? 'command-active' : ''} key={entry.label} onMouseEnter={() => setActiveIndex(index)} onClick={() => { setPaletteOpen(false); entry.action(); }}><span>{entry.label}</span><small>{entry.hint}</small><b>↵</b></button>) : <p className="no-commands">NO MATCHING COMMANDS</p>}</div><div className="command-foot"><span>ANHITI.OS · COMMAND MODULE</span><span>↑↓ SELECT &nbsp; ENTER RUN</span></div></section>
    </div>}
  </>;
}
