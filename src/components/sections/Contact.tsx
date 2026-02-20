'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('sent');
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--text-muted)' }}>
            Contact
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s Talk
          </h2>
          <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            Open to discussing opportunities, projects, or just connecting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 md:gap-16">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="md:col-span-7 space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              {['name', 'email'].map((field) => (
                <div key={field}>
                  <label className="block text-[11px] font-medium tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                    {field}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    required
                    value={formState[field as keyof typeof formState]}
                    onChange={(e) => setFormState({ ...formState, [field]: e.target.value })}
                    className="w-full px-0 py-3 text-[15px] bg-transparent outline-none transition-all duration-300"
                    style={{
                      borderBottom: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                    }}
                    placeholder={field === 'email' ? 'your@email.com' : 'Your name'}
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-[11px] font-medium tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--text-muted)' }}>
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full px-0 py-3 text-[15px] bg-transparent outline-none resize-none transition-all duration-300"
                style={{
                  borderBottom: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                }}
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              disabled={status === 'sending'}
              className="mt-4 px-8 py-3.5 rounded-full text-[14px] font-medium transition-all duration-300 disabled:opacity-50"
              style={{
                border: '1px solid var(--border-hover)',
                color: status === 'sent' ? 'var(--highlight)' : 'var(--text-primary)',
                background: 'transparent',
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {status === 'idle' && 'Send Message →'}
              {status === 'sending' && 'Sending...'}
              {status === 'sent' && 'Sent ✓'}
              {status === 'error' && 'Try Again'}
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="md:col-span-5"
          >
            <div className="space-y-0">
              {[
                { label: 'Email', value: 'chidimicheal17@gmail.com', href: 'mailto:chidimicheal17@gmail.com' },
                { label: 'Phone', value: '+1-437-556-0303', href: 'tel:+14375560303' },
                { label: 'LinkedIn', value: 'linkedin.com/in/slimzycm', href: 'https://linkedin.com/in/slimzycm' },
                { label: 'GitHub', value: 'github.com/SlimzyCM', href: 'https://github.com/SlimzyCM' },
                { label: 'Location', value: 'Ajax, Ontario, Canada', href: undefined },
              ].map((item) => (
                <div
                  key={item.label}
                  className="py-5"
                  style={{ borderBottom: '1px solid var(--border)' }}
                >
                  <p className="text-[11px] font-medium tracking-[0.15em] uppercase mb-2" style={{ color: 'var(--text-muted)' }}>
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="text-[15px] font-medium transition-all duration-300 hover:opacity-70"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-[15px] font-medium" style={{ color: 'var(--text-primary)' }}>
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
