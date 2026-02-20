'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { projects, Project, ArchitectureNode } from '@/data/projects';

// Architecture Node Visualization
function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full h-[300px] rounded-xl overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Connection Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {nodes.map((node) =>
          node.connections.map((targetId) => {
            const target = nodes.find((n) => n.id === targetId);
            if (!target) return null;
            return (
              <motion.line
                key={`${node.id}-${targetId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="var(--accent)"
                strokeWidth="1.5"
                strokeOpacity={0.3}
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            );
          })
        )}
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute cursor-pointer"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.1, type: 'spring' }}
          onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
        >
          <motion.div
            className="px-3 py-2 rounded-lg text-center"
            style={{
              background: activeNode === node.id ? 'var(--accent)' : 'var(--bg-card)',
              border: '1px solid',
              borderColor: activeNode === node.id ? 'var(--accent)' : 'var(--border)',
              color: activeNode === node.id ? 'var(--bg-primary)' : 'var(--text-primary)',
              minWidth: '90px',
            }}
            whileHover={{ scale: 1.1, borderColor: 'var(--accent)' }}
          >
            <p className="text-[10px] font-bold">{node.label}</p>
            <p className="text-[8px] opacity-70">{node.tech}</p>
          </motion.div>

          {/* Expanded detail tooltip */}
          <AnimatePresence>
            {activeNode === node.id && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 p-3 rounded-lg w-48 text-left"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  backdropFilter: 'blur(20px)',
                  zIndex: 10,
                }}
              >
                <p className="text-[11px] font-medium mb-1" style={{ color: 'var(--accent)' }}>
                  {node.tech}
                </p>
                <p className="text-[10px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {node.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

// Project Card
function ProjectCard({ project, index, onExpand }: { project: Project; index: number; onExpand: () => void }) {
  const categoryColors: Record<string, string> = {
    fintech: '#00d4ff',
    enterprise: '#7b61ff',
    blockchain: '#22c55e',
    mobile: '#ff6b35',
    analytics: '#f59e0b',
    ai: '#ff2d95',
  };

  const color = categoryColors[project.category] || 'var(--accent)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onExpand}
      className="group p-6 rounded-2xl cursor-pointer theme-transition relative overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Category indicator */}
      <div
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Category tag */}
      <span
        className="inline-block text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full mb-4"
        style={{ background: color + '18', color }}
      >
        {project.category}
      </span>

      <h3
        className="text-lg font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
        style={{
          color: 'var(--text-primary)',
          backgroundImage: `linear-gradient(135deg, var(--accent), var(--accent-secondary))`,
        }}
      >
        {project.title}
      </h3>

      <p className="text-sm mb-4" style={{ color: 'var(--accent)' }}>
        {project.company}
      </p>

      <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>
        {project.description}
      </p>

      {/* Stack Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 5).map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-2 py-1 rounded-md font-medium"
            style={{
              background: 'var(--bg-primary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
            }}
          >
            {tech}
          </span>
        ))}
        {project.stack.length > 5 && (
          <span className="text-[10px] px-2 py-1 rounded-md font-medium" style={{ color: 'var(--text-muted)' }}>
            +{project.stack.length - 5}
          </span>
        )}
      </div>

      {/* Expand hint */}
      <div
        className="mt-5 pt-4 flex items-center gap-2 text-xs font-medium transition-all duration-300"
        style={{ borderTop: '1px solid var(--border)', color: 'var(--accent)' }}
      >
        <span>View Case Study</span>
        <motion.span
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          →
        </motion.span>
      </div>
    </motion.div>
  );
}

// Expanded Project Detail
function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl p-6 md:p-8"
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ background: 'var(--bg-card)', color: 'var(--text-muted)' }}
        >
          ✕
        </button>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h3>
        <p className="text-base mb-8" style={{ color: 'var(--accent)' }}>
          {project.company}
        </p>

        {/* Problem */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            The Problem
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.problem}
          </p>
        </div>

        {/* Solution */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
            The Solution
          </h4>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.solution}
          </p>
        </div>

        {/* Architecture Diagram */}
        {project.architectureNodes && (
          <div className="mb-6">
            <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
              Architecture — Click nodes to explore
            </h4>
            <ArchitectureDiagram nodes={project.architectureNodes} />
          </div>
        )}

        {/* Impact */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Impact
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {project.impact.map((item) => (
              <div
                key={item}
                className="p-3 rounded-xl text-sm font-medium"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1.5 rounded-lg font-medium"
                style={{
                  background: 'var(--accent)' + '15',
                  color: 'var(--accent)',
                  border: '1px solid var(--accent)' + '30',
                }}
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

// Main Projects Section
export default function Projects() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
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
            Portfolio
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            Real-world systems I&apos;ve architected and built — each one solving complex problems at scale.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onExpand={() => setExpandedProject(project)}
            />
          ))}
        </div>
      </motion.div>

      {/* Expanded Project Overlay */}
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
