'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeName, themes } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'architect-theme';
const themeOrder: ThemeName[] = ['dark', 'minimal', 'vibrant', 'glass'];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>('dark');
  const [mounted, setMounted] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    if (saved && themes[saved]) {
      setThemeState(saved);
    }
    setMounted(true);
  }, []);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const themeConfig = themes[theme];

    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });

    // Set data attribute for conditional Tailwind classes
    root.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState(newTheme);
  }, []);

  const cycleTheme = useCallback(() => {
    setThemeState((current) => {
      const idx = themeOrder.indexOf(current);
      return themeOrder[(idx + 1) % themeOrder.length];
    });
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return defaults for SSG/prerendering
    return {
      theme: 'dark' as ThemeName,
      setTheme: () => {},
      cycleTheme: () => {},
    };
  }
  return context;
}
