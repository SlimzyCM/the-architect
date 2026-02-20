'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects, Project } from '@/data/projects';

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-8 md:p-10 relative"
        style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[13px] transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Close
        </button>

        <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-4" style={{ color: 'var(--text-muted)' }}>
          {project.company}
        </p>
        <h3 className="text-2xl md:text-3xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>

        {/* Problem */}
        <div className="mb-8">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            The Problem
          </p>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-8">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            The Solution
          </p>
          <p className="text-[15px] leading-[1.8]" style={{ color: 'var(--text-secondary)' }}>
            {project.solution}
          </p>
        </div>

        {/* Impact */}
        <div className="mb-8">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Impact
          </p>
          <div className="space-y-2">
            {project.impact.map((item) => (
              <p
                key={item}
                className="text-[14px] pl-4"
                style={{ color: 'var(--text-secondary)', borderLeft: '1px solid var(--border)' }}
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div>
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-[12px] px-3 py-1.5 rounded-full"
                style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
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
            Work
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Selected Projects
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Systems I&apos;ve architected and built — each solving complex problems at scale.
          </p>
        </motion.div>

        {/* Project List */}
        <div className="space-y-0">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + index * 0.08, duration: 0.6 }}
              onClick={() => setExpandedProject(project)}
              className="group cursor-pointer py-10 transition-all duration-300"
              style={{ borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-[12px] font-medium tracking-wide mb-3" style={{ color: 'var(--text-muted)' }}>
                    {project.company}
                  </p>
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-3 transition-colors duration-300 group-hover:translate-x-2"
                    style={{
                      color: 'var(--text-primary)',
                      transition: 'color 0.3s, transform 0.3s',
                    }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed max-w-xl" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>

                  {/* Inline tech tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2.5 py-1 rounded-full"
                        style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="text-[11px] px-2.5 py-1" style={{ color: 'var(--text-muted)' }}>
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 self-start mt-1 transition-all duration-300 group-hover:translate-x-1"
                  style={{ border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  <span className="text-sm">→</span>
                </div>
              </div>

              {/* Key metric */}
              {project.impact[0] && (
                <p className="mt-6 text-[13px] font-medium" style={{ color: 'var(--text-muted)' }}>
                  {project.impact[0]}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expandedProject && (
          <ProjectDetail
            project={expandedProject}
            onClose={() => setExpandedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
