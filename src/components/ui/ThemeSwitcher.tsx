'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { themes, themeNames, ThemeName } from '@/lib/themes';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = themes[theme];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute bottom-16 right-0 p-3 rounded-2xl glass"
            style={{
              minWidth: '180px',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <p
              className="text-xs font-medium mb-2 px-2"
              style={{ color: 'var(--text-muted)' }}
            >
              Switch Theme
            </p>
            <div className="flex flex-col gap-1">
              {themeNames.map((name) => {
                const t = themes[name];
                const isActive = theme === name;
                return (
                  <motion.button
                    key={name}
                    onClick={() => {
                      setTheme(name);
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full text-left"
                    style={{
                      background: isActive ? 'var(--accent-glow)' : 'transparent',
                      color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-base">{t.emoji}</span>
                    <span>{t.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTheme"
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ background: 'var(--accent)' }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center glass"
        style={{
          boxShadow: isOpen
            ? '0 0 20px var(--accent-glow), var(--card-shadow)'
            : 'var(--card-shadow)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        aria-label="Toggle theme switcher"
      >
        <span className="text-lg">{currentTheme.emoji}</span>
      </motion.button>
    </div>
  );
}
