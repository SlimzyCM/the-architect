'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface SkillGroup {
  label: string;
  description: string;
  skills: string[];
}

const skillGroups: SkillGroup[] = [
  {
    label: 'Backend & Systems',
    description: 'Core platform engineering',
    skills: ['C#', '.NET 8', 'ASP.NET Core', 'Node.js', 'NestJS', 'Express', 'Golang', 'Entity Framework', 'SignalR'],
  },
  {
    label: 'Frontend & UI',
    description: 'Interface development',
    skills: ['React', 'Angular', 'Vue.js', 'Next.js', 'Blazor', 'TypeScript', 'Tailwind CSS', 'Redux', 'Framer Motion'],
  },
  {
    label: 'Cloud & Infrastructure',
    description: 'Scalable deployments',
    skills: ['AWS Lambda', 'AWS S3 / EC2', 'DynamoDB', 'SQS / SNS', 'Azure Cloud', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    label: 'Data & Messaging',
    description: 'Storage and event systems',
    skills: ['PostgreSQL', 'MS-SQL', 'MongoDB', 'Redis', 'CosmosDB', 'RabbitMQ', 'Elastic Search', 'HangFire'],
  },
  {
    label: 'Testing & Quality',
    description: 'Reliability engineering',
    skills: ['Jest', 'NUnit', 'XUnit', 'Cypress', 'Selenium', 'React Testing Library', 'TDD'],
  },
  {
    label: 'Architecture & Design',
    description: 'System thinking',
    skills: ['Microservices', 'Event-Driven', 'Domain-Driven Design', 'REST APIs', 'GraphQL', 'SOLID', 'Design Patterns'],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  return (
    <section
      id="skills"
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
            Tech Stack
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Skills &amp; Technologies
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            8+ years building with a diverse stack across backend, frontend, cloud, and systems architecture.
          </p>
        </motion.div>

        {/* Skill Groups */}
        <div className="space-y-1">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
              onMouseEnter={() => setHoveredGroup(i)}
              onMouseLeave={() => setHoveredGroup(null)}
              className="group py-8 cursor-default transition-all duration-500"
              style={{
                borderBottom: '1px solid var(--border)',
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                {/* Label */}
                <div className="md:w-64 shrink-0">
                  <h3
                    className="text-base font-semibold mb-1 transition-colors duration-300"
                    style={{
                      color: hoveredGroup === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {group.label}
                  </h3>
                  <p className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    {group.description}
                  </p>
                </div>

                {/* Skills as tags */}
                <div className="flex flex-wrap gap-2 flex-1">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.08 + j * 0.02 }}
                      className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-300"
                      style={{
                        border: '1px solid var(--border)',
                        color: hoveredGroup === i ? 'var(--text-primary)' : 'var(--text-secondary)',
                        background: hoveredGroup === i ? 'var(--bg-card-hover)' : 'transparent',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-[13px]"
          style={{ color: 'var(--text-muted)' }}
        >
          {skillGroups.reduce((acc, g) => acc + g.skills.length, 0)} technologies across {skillGroups.length} domains
        </motion.p>
      </div>
    </section>
  );
}
