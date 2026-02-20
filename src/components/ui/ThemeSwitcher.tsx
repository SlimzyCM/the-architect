'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { themes, themeNames, ThemeName } from '@/lib/themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-14 right-0 p-2 rounded-xl"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <div className="flex flex-col gap-1">
              {themeNames.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setTheme(name);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[12px] font-medium transition-all duration-200 whitespace-nowrap"
                  style={{
                    color: theme === name ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: theme === name ? 'var(--bg-card-hover)' : 'transparent',
                  }}
                >
                  <span className="text-[10px]">{themes[name].emoji}</span>
                  {themes[name].label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          color: 'var(--text-muted)',
          backdropFilter: 'blur(20px)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch theme"
      >
        <span className="text-[11px]">{themes[theme].emoji}</span>
      </motion.button>
    </div>
  );
}
