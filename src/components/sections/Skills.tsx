'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { skillCategories } from '@/data/skills';

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [activeCategory, setActiveCategory] = useState(0);

  const currentCategory = skillCategories[activeCategory];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.07]"
        style={{ background: currentCategory.color }}
      />

      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <p
            className="text-sm font-medium tracking-widest uppercase mb-3"
            style={{ color: 'var(--accent)' }}
          >
            Tech Stack
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Skills &{' '}
            <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            8+ years of building with a diverse, battle-tested stack across backend, frontend, cloud, and architecture.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {skillCategories.map((cat, index) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(index)}
              className="relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                color: activeCategory === index ? '#fff' : 'var(--text-secondary)',
                background: activeCategory === index ? cat.color + '22' : 'var(--bg-card)',
                border: `1px solid ${activeCategory === index ? cat.color + '66' : 'var(--border)'}`,
              }}
            >
              {activeCategory === index && (
                <motion.div
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: cat.color + '22', border: `1px solid ${cat.color}44` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {currentCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group p-5 rounded-2xl theme-transition cursor-default"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {skill.name}
                  </h3>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background: currentCategory.color + '18',
                      color: currentCategory.color,
                    }}
                  >
                    {skill.years}y
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ background: currentCategory.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                  />
                </div>

                {/* Proficiency Label */}
                <div className="flex justify-between mt-2">
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Proficiency
                  </span>
                  <span className="text-xs font-medium" style={{ color: currentCategory.color }}>
                    {skill.proficiency}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Total Skills Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0)} technologies across{' '}
            {skillCategories.length} domains — and always learning more.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
