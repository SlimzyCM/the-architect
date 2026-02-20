'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences, certifications, education } from '@/data/experience';

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p
            className="text-[11px] font-medium tracking-[0.2em] uppercase mb-5"
            style={{ color: 'var(--text-muted)' }}
          >
            Career
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Experience
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            From Lagos to London to Canada — building, leading, and scaling across industries.
          </p>
        </motion.div>

        {/* Experience List */}
        <div className="space-y-0">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const isCurrent = exp.endYear === null;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.6 }}
                className="group cursor-pointer transition-all duration-300"
                style={{ borderBottom: '1px solid var(--border)' }}
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="py-8 md:py-10">
                  {/* Top row: period + current badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[12px] font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
                      {exp.period}
                    </span>
                    {isCurrent && (
                      <span
                        className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
                        style={{ border: '1px solid var(--border-hover)', color: 'var(--text-secondary)' }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--highlight)' }} />
                        Current
                      </span>
                    )}
                  </div>

                  {/* Main content */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <h3
                        className="text-xl md:text-2xl font-semibold mb-1 transition-colors duration-300"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-[15px] mb-1" style={{ color: 'var(--text-secondary)' }}>
                        {exp.company}
                      </p>
                      <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        {exp.location}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 self-start mt-1"
                      style={{
                        border: '1px solid var(--border)',
                        color: 'var(--text-muted)',
                      }}
                    >
                      <span className="text-sm leading-none">+</span>
                    </motion.div>
                  </div>

                  {/* Description — always visible */}
                  <p className="mt-4 text-[14px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-8 grid md:grid-cols-2 gap-8">
                          {/* Highlights */}
                          <div>
                            <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                              Key Contributions
                            </p>
                            <div className="space-y-3">
                              {exp.highlights.map((h, i) => (
                                <motion.p
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="text-[13px] leading-relaxed pl-4"
                                  style={{
                                    color: 'var(--text-secondary)',
                                    borderLeft: '1px solid var(--border)',
                                  }}
                                >
                                  {h}
                                </motion.p>
                              ))}
                            </div>
                          </div>

                          {/* Stack */}
                          <div>
                            <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
                              Technologies
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exp.stack.map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[12px] px-3 py-1.5 rounded-full font-medium"
                                  style={{
                                    border: '1px solid var(--border)',
                                    color: 'var(--text-muted)',
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education & Certifications */}
        <div className="mt-28 grid md:grid-cols-2 gap-16">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
              Education
            </p>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.degree}>
                  <h4 className="text-[15px] font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {edu.degree}
                  </h4>
                  <p className="text-[13px]" style={{ color: 'var(--text-secondary)' }}>{edu.school}</p>
                  <p className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>
                    {edu.period}{edu.gpa && ` · ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase mb-8" style={{ color: 'var(--text-muted)' }}>
              Certifications
            </p>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-start gap-3">
                  <span className="text-[13px] mt-0.5" style={{ color: 'var(--text-muted)' }}>→</span>
                  <div>
                    <p className="text-[14px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                      {cert.name}
                    </p>
                    <p className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
