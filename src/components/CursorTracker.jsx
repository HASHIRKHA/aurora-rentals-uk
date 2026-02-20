'use client';

import { useEffect, useState } from 'react';
import styles from './CursorTracker.module.css';

export default function CursorTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleOver = (e) => {
      const target = e.target;
      if (target.closest('button, a, input, textarea, [data-cursor="pointer"]')) setCursorVariant('pointer');
      else if (target.closest('[data-cursor="grab"]')) setCursorVariant('grab');
      else if (target.closest('[data-cursor="text"]')) setCursorVariant('text');
      else setCursorVariant('default');
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseleave', leave);

    let raf;
    const animateRing = () => {
      setRingPosition((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15
      }));
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      <div
        className={`${styles.cursor} ${styles[cursorVariant]} ${isVisible ? styles.visible : ''}`}
        style={{ transform: `translate3d(${mousePosition.x - 12}px, ${mousePosition.y - 12}px, 0)` }}
      />
      <div
        className={`${styles.cursorRing} ${styles[cursorVariant]} ${isVisible ? styles.visible : ''}`}
        style={{ transform: `translate3d(${ringPosition.x - 24}px, ${ringPosition.y - 24}px, 0)` }}
      />
    </>
  );
}
