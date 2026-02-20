'use client';

import { useEffect, useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { useVisitorFingerprint } from '@/hooks/useVisitorFingerprint';
import { themes } from '@/lib/themes';

const HeroScene = lazy(() => import('@/components/three/HeroScene'));

const roles = [
  'Senior Software Engineer',
  'Cloud Architect',
  'Full-Stack Engineer',
  'Systems Designer',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const { theme } = useTheme();
  const seed = useVisitorFingerprint();

  const currentTheme = themes[theme];
  const accentColor = currentTheme.colors['--accent'];
  const secondaryColor = currentTheme.colors['--accent-secondary'];

  // Load 3D scene after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else if (isDeleting) {
      timeout = setTimeout(() => setDisplayText((prev) => prev.slice(0, -1)), 40);
    } else {
      timeout = setTimeout(
        () => setDisplayText(currentRole.slice(0, displayText.length + 1)),
        80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      {showScene && (
        <div className="absolute inset-0 z-0">
          <Suspense fallback={null}>
            <HeroScene
              seed={seed}
              accentColor={accentColor}
              secondaryColor={secondaryColor}
            />
          </Suspense>
        </div>
      )}

      {/* Gradient overlay for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, transparent 30%, var(--bg-primary) 80%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtle label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[11px] font-medium tracking-[0.3em] uppercase mb-8"
          style={{ color: 'var(--text-muted)' }}
        >
          Portfolio · 2025
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
        >
          Chidi Okobia
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-10"
        >
          <span
            className="text-lg md:text-xl font-normal"
            style={{ color: 'var(--text-secondary)' }}
          >
            {displayText}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[2px] h-5 ml-1 align-middle"
            style={{ background: 'var(--text-muted)' }}
          />
        </motion.div>

        {/* Subtle description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-[15px] max-w-lg mx-auto mb-12 leading-[1.8]"
          style={{ color: 'var(--text-muted)' }}
        >
          Engineering systems that scale to millions. Building products that matter.
        </motion.p>

        {/* CTAs — minimal, refined */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="#projects"
            className="px-7 py-3 rounded-full text-[13px] font-medium transition-all duration-300 hover:scale-[1.02]"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--text-primary)',
            }}
          >
            View Work
          </a>
          <a
            href="#contact"
            className="text-[13px] font-medium transition-opacity duration-300 hover:opacity-60"
            style={{ color: 'var(--text-muted)' }}
          >
            Get in touch →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-[1px] h-8"
            style={{ background: 'var(--border-hover)' }}
          />
        </motion.div>
      </div>
    </section>
  );
}
