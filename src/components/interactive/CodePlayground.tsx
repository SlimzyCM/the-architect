'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeExample {
  id: string;
  label: string;
  method: string;
  endpoint: string;
  code: string;
  description: string;
}

const codeExamples: CodeExample[] = [
  {
    id: 'get-profile',
    label: 'GET Profile',
    method: 'GET',
    endpoint: '/api/playground/profile',
    description: 'Fetch Chidi\'s developer profile',
    code: `// GET /api/playground/profile
// Fetch developer profile data

const response = await fetch('/api/playground/profile');
const data = await response.json();

console.log(data);
// Try editing this code and hitting Run!`,
  },
  {
    id: 'get-skills',
    label: 'GET Skills',
    method: 'GET',
    endpoint: '/api/playground/skills',
    description: 'Retrieve tech stack with proficiency scores',
    code: `// GET /api/playground/skills
// Returns all skills grouped by category

const response = await fetch('/api/playground/skills');
const { categories } = await response.json();

// Filter backend skills with 85%+ proficiency
const seniorSkills = categories
  .flatMap(c => c.skills)
  .filter(s => s.proficiency >= 85);

console.log(\`Found \${seniorSkills.length} senior-level skills\`);
console.log(seniorSkills);`,
  },
  {
    id: 'post-contact',
    label: 'POST Contact',
    method: 'POST',
    endpoint: '/api/playground/contact',
    description: 'Send a message (demo — doesn\'t actually send)',
    code: `// POST /api/playground/contact
// Send a message (demo mode)

const response = await fetch('/api/playground/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Your Name',
    email: 'you@example.com',
    message: 'I love this portfolio!'
  })
});

const result = await response.json();
console.log(result);`,
  },
  {
    id: 'get-experience',
    label: 'GET Experience',
    method: 'GET',
    endpoint: '/api/playground/experience',
    description: 'Career timeline with highlights',
    code: `// GET /api/playground/experience
// Full career timeline

const response = await fetch('/api/playground/experience');
const { timeline } = await response.json();

// Calculate total years
const totalYears = new Date().getFullYear() - 2016;
console.log(\`\${totalYears} years of experience\`);
console.log(\`\${timeline.length} positions held\`);
console.log(timeline.map(t => \`\${t.period}: \${t.role} @ \${t.company}\`));`,
  },
];

// Mock API responses (these run client-side for the demo)
function mockApiCall(endpoint: string, method: string, body?: string): unknown {
  if (endpoint.includes('profile')) {
    return {
      status: 200,
      data: {
        name: 'Chidi Michael Okobia',
        title: 'Senior Software Engineer',
        location: 'Ajax, Ontario, Canada',
        experience: '8+ years',
        specialties: ['.NET', 'React', 'AWS', 'Microservices'],
        education: 'M.Sc. Computer Science — University of Benin',
        certifications: ['Azure AI Engineer', 'Google Cloud Expert', 'CS50'],
        currently: 'Senior Full-Stack Consultant @ Mission',
      },
    };
  }

  if (endpoint.includes('skills')) {
    return {
      status: 200,
      categories: [
        { name: 'Backend', skills: [
          { name: 'C#', proficiency: 95, years: 8 },
          { name: '.NET Core', proficiency: 95, years: 8 },
          { name: 'Node.js', proficiency: 88, years: 6 },
        ]},
        { name: 'Frontend', skills: [
          { name: 'React', proficiency: 92, years: 6 },
          { name: 'Angular', proficiency: 85, years: 5 },
          { name: 'TypeScript', proficiency: 90, years: 5 },
        ]},
        { name: 'Cloud', skills: [
          { name: 'AWS', proficiency: 88, years: 5 },
          { name: 'Azure', proficiency: 85, years: 5 },
          { name: 'Docker', proficiency: 88, years: 5 },
        ]},
      ],
    };
  }

  if (endpoint.includes('contact') && method === 'POST') {
    let parsedBody: unknown = {};
    try { parsedBody = body ? JSON.parse(body) : {}; } catch { /* invalid json */ }
    return {
      status: 200,
      message: 'Message received! (Demo mode — no actual message was sent)',
      received: parsedBody,
      note: 'In production, this connects to an email service via Next.js API Routes',
    };
  }

  if (endpoint.includes('experience')) {
    return {
      status: 200,
      timeline: [
        { period: '2022-Present', role: 'Senior Full-Stack Consultant', company: 'Mission' },
        { period: '2021-2024', role: 'Function Lead', company: 'Qore' },
        { period: '2021-2023', role: 'Software Consultant', company: 'Voodoo Park' },
        { period: '2021-2022', role: 'Senior Software Engineer', company: '3Line' },
        { period: '2020-2021', role: 'Software Engineer', company: 'Decagon' },
        { period: '2016-2020', role: 'Full-Stack → Senior Engineer', company: 'SNET Track' },
      ],
    };
  }

  return { status: 404, error: 'Endpoint not found' };
}

export default function CodePlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeExample, setActiveExample] = useState(0);
  const [code, setCode] = useState(codeExamples[0].code);
  const [output, setOutput] = useState<string>('// Click "Run" to execute the code');
  const [isRunning, setIsRunning] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleExampleChange = (index: number) => {
    setActiveExample(index);
    setCode(codeExamples[index].code);
    setOutput('// Click "Run" to execute the code');
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('// Running...\n');

    await new Promise((r) => setTimeout(r, 500));

    try {
      const example = codeExamples[activeExample];

      // Extract body from code if POST
      let body: string | undefined;
      const bodyMatch = code.match(/body:\s*JSON\.stringify\(([^)]+)\)/);
      if (bodyMatch) {
        try {
          body = bodyMatch[1]
            .replace(/(\w+):/g, '"$1":')
            .replace(/'/g, '"');
        } catch {}
      }

      const result = mockApiCall(example.endpoint, example.method, body);
      setOutput(
        `// Response from ${example.method} ${example.endpoint}\n` +
        `// Status: 200 OK\n\n` +
        JSON.stringify(result, null, 2)
      );
    } catch (err) {
      setOutput(`// Error: ${err}`);
    }

    setIsRunning(false);
  };

  const methodColors: Record<string, string> = {
    GET: '#22c55e',
    POST: '#3b82f6',
    PUT: '#f59e0b',
    DELETE: '#ef4444',
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[8.5rem] right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center glass"
        style={{ boxShadow: 'var(--card-shadow)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Code Playground"
        title="Live Code Playground"
      >
        <span className="text-lg">{isOpen ? '✕' : '⚡'}</span>
      </motion.button>

      {/* Playground Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-48 right-6 z-50 w-[calc(100%-3rem)] sm:w-[600px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">⚡</span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Live Code Playground
                </span>
              </div>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                Edit code & hit Run
              </span>
            </div>

            {/* Endpoint Tabs */}
            <div
              className="flex gap-1 px-3 py-2 overflow-x-auto"
              style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
            >
              {codeExamples.map((ex, i) => (
                <button
                  key={ex.id}
                  onClick={() => handleExampleChange(i)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all"
                  style={{
                    background: activeExample === i ? 'var(--bg-card)' : 'transparent',
                    border: activeExample === i ? '1px solid var(--border)' : '1px solid transparent',
                    color: activeExample === i ? 'var(--text-primary)' : 'var(--text-muted)',
                  }}
                >
                  <span
                    className="text-[9px] font-bold px-1 py-0.5 rounded"
                    style={{
                      background: methodColors[ex.method] + '22',
                      color: methodColors[ex.method],
                    }}
                  >
                    {ex.method}
                  </span>
                  {ex.label.replace(ex.method + ' ', '')}
                </button>
              ))}
            </div>

            {/* Code Editor + Output Split */}
            <div className="flex flex-col" style={{ height: '350px' }}>
              {/* Code Editor */}
              <div className="flex-1 relative" style={{ borderBottom: '1px solid var(--border)' }}>
                <textarea
                  ref={textareaRef}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-full p-4 font-mono text-[12px] leading-relaxed resize-none outline-none"
                  style={{
                    background: 'var(--bg-primary)',
                    color: 'var(--text-secondary)',
                    tabSize: 2,
                  }}
                  spellCheck={false}
                />
                {/* Run Button */}
                <motion.button
                  onClick={runCode}
                  disabled={isRunning}
                  className="absolute top-3 right-3 px-4 py-1.5 rounded-lg text-xs font-bold disabled:opacity-50"
                  style={{
                    background: '#22c55e',
                    color: '#000',
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isRunning ? '⏳ Running...' : '▶ Run'}
                </motion.button>
              </div>

              {/* Output */}
              <div
                className="h-[140px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed"
                style={{
                  background: 'var(--bg-secondary)',
                  color: output.includes('Error') ? '#ef4444' : 'var(--accent)',
                }}
              >
                <pre className="whitespace-pre-wrap">{output}</pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
