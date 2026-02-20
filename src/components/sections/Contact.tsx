'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending — replace with real API route later
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[180px] opacity-[0.06]"
        style={{ background: 'var(--accent)' }}
      />

      <motion.div
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <p className="text-sm font-medium tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s Build{' '}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            Whether you have a project in mind, want to discuss opportunities, or just want to connect — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Form — 3 columns */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="md:col-span-3 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                Message
              </label>
              <textarea
                required
                rows={6}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Tell me about your project..."
              />
            </div>

            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 disabled:opacity-50"
              style={{
                background: status === 'sent' ? '#22c55e' : 'var(--accent)',
                color: 'var(--bg-primary)',
              }}
              whileHover={{ scale: 1.03, boxShadow: '0 0 25px var(--accent-glow)' }}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && '✓ Message Sent!'}
              {status === 'error' && 'Try Again'}
            </motion.button>
          </motion.form>

          {/* Contact Info — 2 columns */}
          <motion.div variants={itemVariants} className="md:col-span-2 space-y-5">
            {[
              { label: 'Email', value: 'chidimicheal17@gmail.com', href: 'mailto:chidimicheal17@gmail.com', icon: '✉️' },
              { label: 'Phone', value: '+1-437-556-0303', href: 'tel:+14375560303', icon: '📱' },
              { label: 'LinkedIn', value: 'linkedin.com/in/slimzycm', href: 'https://linkedin.com/in/slimzycm', icon: '💼' },
              { label: 'GitHub', value: 'github.com/SlimzyCM', href: 'https://github.com/SlimzyCM', icon: '🐙' },
              { label: 'Location', value: 'Ajax, Ontario, Canada', href: undefined, icon: '📍' },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="p-4 rounded-xl theme-transition"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                whileHover={{ x: 4, borderColor: 'var(--border-hover)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                        style={{ color: 'var(--accent)' }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
