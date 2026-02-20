'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const roles = [
  'Senior Software Engineer',
  'Cloud Architect',
  'Full-Stack Engineer',
  'Systems Designer',
  'Problem Solver',
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for roles
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setDisplayText(
            isDeleting
              ? currentRole.substring(0, displayText.length - 1)
              : currentRole.substring(0, displayText.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'var(--hero-gradient)' }}
    >
      {/* Animated Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(var(--accent) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'var(--accent)', top: '10%', left: '10%' }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{ background: 'var(--accent-secondary)', bottom: '10%', right: '10%' }}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-base font-medium tracking-widest uppercase mb-6"
          style={{ color: 'var(--accent)' }}
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          <span style={{ color: 'var(--text-primary)' }}>Chidi </span>
          <span className="gradient-text">Okobia</span>
        </motion.h1>

        {/* Typewriter Role */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl font-light mb-8 h-10"
          style={{ color: 'var(--text-secondary)' }}
        >
          <span>{displayText}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block w-[3px] h-[1.1em] ml-1 align-middle"
            style={{ background: 'var(--accent)' }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg max-w-2xl mx-auto mb-12"
          style={{ color: 'var(--text-muted)' }}
        >
          Engineering systems that scale. Building products that matter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 cursor-pointer"
            style={{
              background: 'var(--accent)',
              color: 'var(--bg-primary)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px var(--accent-glow)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            View My Work
          </motion.a>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 cursor-pointer"
            style={{
              border: '1px solid var(--border-hover)',
              color: 'var(--text-primary)',
              background: 'transparent',
            }}
            whileHover={{
              scale: 1.05,
              borderColor: 'var(--accent)',
              boxShadow: '0 0 20px var(--accent-glow)',
            }}
            whileTap={{ scale: 0.95 }}
          >
            Download Resume
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Scroll
            </span>
            <div
              className="w-[1px] h-8"
              style={{
                background: `linear-gradient(to bottom, var(--accent), transparent)`,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
