'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Local AI responses based on keyword matching (swap to Claude API for production)
function generateResponse(query: string): string {
  const q = query.toLowerCase();

  // Greetings
  if (q.match(/^(hi|hello|hey|sup|what'?s up|howdy)/)) {
    return "Hey! 👋 I'm Chidi's AI assistant. Ask me anything about his experience, skills, projects, or how to get in touch!";
  }

  // Skills
  if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('language') || q.includes('know')) {
    if (q.includes('backend') || q.includes('.net') || q.includes('c#')) {
      return "Chidi's backend expertise is rock solid — 8 years with C# and .NET/ASP.NET Core, 6 years with Node.js, plus experience with NestJS, Express, and Golang. He's particularly strong in microservices architecture and event-driven systems.";
    }
    if (q.includes('frontend') || q.includes('react') || q.includes('angular')) {
      return "On the frontend, Chidi has 6 years with React, 5 with Angular, 5 with TypeScript, and experience with Vue.js, Next.js, and Blazor. He's a TDD advocate — expect 85-90% test coverage with Jest and React Testing Library.";
    }
    if (q.includes('cloud') || q.includes('aws') || q.includes('azure') || q.includes('devops')) {
      return "Chidi is cloud-native through and through — 5 years on AWS (Lambda, S3, EC2, DynamoDB, SQS, SNS, CodePipeline) and Azure. He's experienced with Docker, Kubernetes, Terraform, and CI/CD pipelines. He holds Azure AI Engineer and Google Cloud certifications.";
    }
    if (q.includes('database') || q.includes('data') || q.includes('sql')) {
      return "For data, Chidi works with MS-SQL (8y), PostgreSQL (6y), MongoDB (5y), Redis (5y), CosmosDB, RabbitMQ, and Elastic Search. He's optimized complex stored procedures achieving 40% performance improvements.";
    }
    return "Chidi's stack spans 44+ technologies across backend (C#, .NET, Node.js), frontend (React, Angular, TypeScript), cloud (AWS, Azure), data (PostgreSQL, Redis, MongoDB), and DevOps (Docker, Kubernetes). What specific area interests you?";
  }

  // Experience / years
  if (q.includes('experience') || q.includes('years') || q.includes('how long')) {
    return "Chidi has 8+ years of professional experience. He started at SNET Track in Lagos (2016), grew through roles at Decagon in Texas, 3Line, Voodoo Park in London, led fintech at Qore, and currently consults as a Senior Full-Stack Engineer at Mission in Canada.";
  }

  // Current role
  if (q.includes('current') || q.includes('now') || q.includes('doing') || q.includes('present')) {
    return "Currently, Chidi is a Senior Full-Stack Engineering Consultant at Mission (ePACT Network) in North Vancouver, Canada. He's leading a .NET 8 migration, architecting AWS microservices, and mentoring a team of 8 developers.";
  }

  // Projects
  if (q.includes('project') || q.includes('built') || q.includes('build') || q.includes('portfolio')) {
    return "Some standout projects: payment middleware handling 1M+ daily transactions at 3Line, an event-driven fintech platform serving 10,000+ businesses at Qore, a blockchain environmental app with 100K+ users at Decagon, and enterprise fund administration at Bravura Solutions with 90% test coverage. Scroll down to the Projects section for full case studies!";
  }

  // Payment / fintech
  if (q.includes('payment') || q.includes('fintech') || q.includes('transaction')) {
    return "Chidi has deep fintech experience. At 3Line, he built payment middleware handling 1M+ daily transactions across Nigeria with multi-bank API integration. At Qore, he designed an event-driven PayWithTransfer system using DDD principles that scaled to serve 10,000+ businesses.";
  }

  // Education
  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('school')) {
    return "Chidi holds a Master's degree in Computer Science from the University of Benin (2021-2023) and a Higher National Diploma from Heritage Polytechnic with a 3.70/4.00 GPA (2015-2017).";
  }

  // Certifications
  if (q.includes('cert') || q.includes('certified') || q.includes('qualification')) {
    return "Chidi is certified as a Microsoft Azure AI Engineer Associate, Google Africa Cloud Engineering Expert, and has completed Harvard's CS50. He also holds Azure Fundamentals, ML.NET, and Scrum certifications.";
  }

  // Contact
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('hire') || q.includes('available')) {
    return "You can reach Chidi at chidimicheal17@gmail.com or +1-437-556-0303. He's also on LinkedIn (linkedin.com/in/slimzycm) and GitHub (github.com/SlimzyCM). Scroll down to the Contact section to send a message directly!";
  }

  // Location
  if (q.includes('where') || q.includes('location') || q.includes('based') || q.includes('live')) {
    return "Chidi is based in Ajax, Ontario, Canada. He's originally from Nigeria and has worked across Lagos, Austin (Texas), and London (UK) before settling in Canada.";
  }

  // Testing / TDD
  if (q.includes('test') || q.includes('tdd') || q.includes('quality')) {
    return "Chidi is a strong TDD advocate! He consistently achieves 85-90%+ test coverage using Jest, NUnit, XUnit, Cypress, and React Testing Library. At Bravura Solutions, he achieved 90% coverage resulting in 65% fewer post-deployment bugs.";
  }

  // Architecture
  if (q.includes('architect') || q.includes('microservice') || q.includes('design') || q.includes('pattern')) {
    return "Chidi specializes in microservices architecture, event-driven systems, and Domain-Driven Design (DDD). He's experienced with RESTful APIs, GraphQL, SOLID principles, and various design patterns. His work at Qore on the PayWithTransfer system is a great example of DDD in action.";
  }

  // This portfolio / website
  if (q.includes('portfolio') || q.includes('website') || q.includes('site') || q.includes('this')) {
    return "This portfolio was built with Next.js, Three.js (for the 3D hero scene), Framer Motion (for animations), and Tailwind CSS. It features 4 switchable themes, interactive terminal, voice navigation, and more. Pretty cool, right? 😎";
  }

  // Fallback
  return "Great question! I can tell you about Chidi's skills, experience, projects, education, certifications, or how to get in touch. What would you like to know?";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Chidi's AI assistant. Ask me anything about his skills, experience, or projects!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

    const response = generateResponse(userMsg.content);
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Chat Toggle */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center glass"
        style={{ boxShadow: 'var(--card-shadow)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="AI Chatbot"
        title="Ask About Chidi"
      >
        <span className="text-lg">{isOpen ? '✕' : '🤖'}</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-[8.5rem] left-6 z-50 w-[calc(100%-3rem)] sm:w-[380px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
            >
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Ask About Chidi
                </p>
                <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  AI-powered • Ask anything
                </p>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-[300px] overflow-y-auto p-4 space-y-3"
              style={{ background: 'var(--bg-primary)' }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className="max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed"
                    style={{
                      background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-card)',
                      color: msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                      border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                      borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                      borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 px-4 py-2.5 rounded-2xl w-fit"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: 'var(--text-muted)' }}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-2 p-3"
              style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about skills, experience..."
                className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
              />
              <motion.button
                onClick={handleSend}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--accent)', color: 'var(--bg-primary)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ↑
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
