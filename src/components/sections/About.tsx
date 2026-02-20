'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Animated counter component
function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      setCount(current);
      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { label: 'Years Experience', value: 8, suffix: '+' },
  { label: 'Daily Transactions', value: 1000000, suffix: '+' },
  { label: 'Businesses Scaled', value: 10000, suffix: '+' },
  { label: 'Cost Reduction', value: 50, suffix: '%' },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Subtle gradient accent */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] opacity-10"
        style={{ background: 'var(--accent)' }}
      />

      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            About Me
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            The Engineer Behind{' '}
            <span className="gradient-text">The Code</span>
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Bio Text — 3 columns */}
          <motion.div variants={itemVariants} className="md:col-span-3 space-y-6">
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              With over 8 years of engineering experience spanning fintech,
              enterprise platforms, and cloud-native systems, I don&apos;t just write
              code — I architect solutions that scale to millions. From building
              payment systems processing 1M+ daily transactions across Nigeria to
              leading cloud migrations on AWS and Azure, I&apos;ve consistently turned
              complex business problems into elegant, high-performance software.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m a full-stack engineer at heart, equally comfortable designing
              microservice architectures as I am crafting pixel-perfect React
              interfaces. My approach centers on Test-Driven Development, clean
              architecture, and systems thinking — because great software isn&apos;t
              just about making things work, it&apos;s about making things last.
            </p>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Currently consulting as a Senior Full-Stack Engineer at Mission in
              Canada, I bring deep expertise in .NET, C#, Node.js, React, and
              cloud infrastructure to every project I touch. I&apos;m driven by the
              challenge of building systems where every component has purpose and
              every decision is intentional.
            </p>
          </motion.div>

          {/* Quick Facts — 2 columns */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-4">
            {[
              { label: 'Location', value: 'Ajax, Ontario, Canada' },
              { label: 'Education', value: 'M.Sc. Computer Science' },
              { label: 'Focus', value: '.NET / Cloud / Microservices' },
              { label: 'Approach', value: 'TDD • Clean Architecture • DDD' },
              { label: 'Certified', value: 'Azure AI Engineer • Google Cloud' },
            ].map((fact) => (
              <div
                key={fact.label}
                className="p-4 rounded-xl theme-transition"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <p className="text-xs font-medium tracking-wider uppercase mb-1" style={{ color: 'var(--accent)' }}>
                  {fact.label}
                </p>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {fact.value}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl theme-transition"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
              }}
            >
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
