'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

function AnimatedCounter({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const end = target;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { label: 'Years', value: 8, suffix: '+' },
  { label: 'Daily Transactions', value: 1000000, suffix: '+' },
  { label: 'Businesses Scaled', value: 10000, suffix: '+' },
  { label: 'Cost Reduced', value: 50, suffix: '%' },
];

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
            About
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold" style={{ color: 'var(--text-primary)' }}>
            The Engineer Behind The Code
          </h2>
        </motion.div>

        {/* Bio */}
        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <div className="space-y-6">
              <p className="text-[17px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                With over 8 years of engineering experience across fintech, enterprise platforms, and cloud-native systems, I don&apos;t just write code — I architect solutions that handle millions. From payment systems processing 1M+ daily transactions to platforms serving 10,000+ businesses, I&apos;ve turned complex problems into elegant, reliable software.
              </p>
              <p className="text-[17px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                I&apos;m a full-stack engineer equally comfortable designing microservice architectures as crafting polished interfaces. My approach centers on TDD, clean architecture, and systems thinking — because great software isn&apos;t just about making things work, it&apos;s about making things last.
              </p>
              <p className="text-[17px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
                Currently consulting as a Senior Full-Stack Engineer at Mission in Canada, bringing deep expertise in .NET, React, and cloud infrastructure to every project.
              </p>
            </div>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="space-y-0">
              {[
                { label: 'Location', value: 'Ajax, Ontario, Canada' },
                { label: 'Education', value: 'M.Sc. Computer Science' },
                { label: 'Focus', value: '.NET · Cloud · Microservices' },
                { label: 'Methodology', value: 'TDD · Clean Architecture · DDD' },
                { label: 'Certified', value: 'Azure AI · Google Cloud · CS50' },
              ].map((fact, i) => (
                <div
                  key={fact.label}
                  className="py-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    {fact.label}
                  </p>
                  <p className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-0"
          style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="py-10 text-center"
              style={{
                borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <p className="text-3xl md:text-4xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-[12px] tracking-wide" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
