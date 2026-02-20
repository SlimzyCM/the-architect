'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { experiences, certifications, education } from '@/data/experience';

export default function Experience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-[160px] opacity-[0.06]"
        style={{ background: 'var(--accent-secondary)' }}
      />

      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Experience &{' '}
            <span className="gradient-text">Growth</span>
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            From Lagos to London to Canada — 8+ years of building, leading, and scaling.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <motion.div
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 origin-top"
            style={{ background: 'var(--border)' }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          {/* Timeline Entries */}
          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
                className={`relative mb-12 md:w-1/2 pl-8 md:pl-0 ${
                  isLeft
                    ? 'md:pr-12 md:text-right md:ml-0'
                    : 'md:pl-12 md:ml-auto'
                }`}
              >
                {/* Timeline Dot - Desktop */}
                <div
                  className="absolute w-4 h-4 rounded-full top-1 hidden md:block"
                  style={{
                    background: exp.endYear === null ? 'var(--accent)' : 'var(--bg-card)',
                    border: '3px solid var(--accent)',
                    ...(isLeft
                      ? { right: '-8px', left: 'auto' }
                      : { left: '-8px' }),
                  }}
                >
                  {exp.endYear === null && (
                    <span className="absolute inset-0 rounded-full animate-ping" style={{ background: 'var(--accent)', opacity: 0.3 }} />
                  )}
                </div>

                {/* Mobile dot */}
                <div
                  className="absolute left-0 w-3 h-3 rounded-full -translate-x-1/2 top-2 md:hidden"
                  style={{
                    background: exp.endYear === null ? 'var(--accent)' : 'var(--bg-card)',
                    border: '2px solid var(--accent)',
                  }}
                />

                {/* Card */}
                <div
                  className="p-5 rounded-2xl cursor-pointer theme-transition"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                  }}
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  {/* Period Badge */}
                  <span
                    className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full mb-3"
                    style={{
                      background: exp.endYear === null ? 'var(--accent)' + '22' : 'var(--bg-primary)',
                      color: exp.endYear === null ? 'var(--accent)' : 'var(--text-muted)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {exp.period}
                  </span>

                  <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--accent)' }}>
                    {exp.company}
                  </p>
                  <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
                    {exp.location}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {exp.description}
                  </p>

                  {/* Expanded Details */}
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                      <p className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                        Key Achievements
                      </p>
                      <ul className="space-y-2">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: 'var(--accent)' }}>▸</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {exp.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] px-2 py-1 rounded-md"
                            style={{
                              background: 'var(--bg-primary)',
                              color: 'var(--text-muted)',
                              border: '1px solid var(--border)',
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Expand hint */}
                  <p className="mt-3 text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                    {isExpanded ? 'Click to collapse' : 'Click to expand'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Education & Certifications */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="p-4 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <h4 className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    {edu.degree}
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--accent)' }}>{edu.school}</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                    {edu.period} • {edu.location}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Certifications
            </h3>
            <div className="space-y-3">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  <span className="text-lg">{cert.icon}</span>
                  <div>
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {cert.name}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
