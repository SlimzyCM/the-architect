export type ThemeName = 'dark' | 'minimal' | 'vibrant' | 'glass';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  emoji: string;
  colors: {
    '--bg-primary': string;
    '--bg-secondary': string;
    '--bg-card': string;
    '--bg-card-hover': string;
    '--text-primary': string;
    '--text-secondary': string;
    '--text-muted': string;
    '--accent': string;
    '--accent-secondary': string;
    '--accent-glow': string;
    '--border': string;
    '--border-hover': string;
    '--nav-bg': string;
    '--nav-border': string;
    '--card-shadow': string;
    '--gradient-start': string;
    '--gradient-end': string;
    '--hero-gradient': string;
  };
}

export const themes: Record<ThemeName, ThemeConfig> = {
  dark: {
    name: 'dark',
    label: 'Dark Cinematic',
    emoji: '🖤',
    colors: {
      '--bg-primary': '#0a0a0f',
      '--bg-secondary': '#12121a',
      '--bg-card': 'rgba(20, 20, 35, 0.8)',
      '--bg-card-hover': 'rgba(25, 25, 45, 0.9)',
      '--text-primary': '#f0f0f5',
      '--text-secondary': '#a0a0b5',
      '--text-muted': '#6b6b80',
      '--accent': '#00d4ff',
      '--accent-secondary': '#7b61ff',
      '--accent-glow': 'rgba(0, 212, 255, 0.3)',
      '--border': 'rgba(255, 255, 255, 0.08)',
      '--border-hover': 'rgba(0, 212, 255, 0.4)',
      '--nav-bg': 'rgba(10, 10, 15, 0.85)',
      '--nav-border': 'rgba(255, 255, 255, 0.06)',
      '--card-shadow': '0 8px 32px rgba(0, 0, 0, 0.6)',
      '--gradient-start': '#0a0a0f',
      '--gradient-end': '#1a1a2e',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 50%, #1a1a3e 0%, #0a0a0f 70%)',
    },
  },
  minimal: {
    name: 'minimal',
    label: 'Clean Minimal',
    emoji: '⚪',
    colors: {
      '--bg-primary': '#fafafa',
      '--bg-secondary': '#ffffff',
      '--bg-card': 'rgba(255, 255, 255, 0.9)',
      '--bg-card-hover': 'rgba(245, 245, 250, 1)',
      '--text-primary': '#111111',
      '--text-secondary': '#444444',
      '--text-muted': '#888888',
      '--accent': '#111111',
      '--accent-secondary': '#ff4d4d',
      '--accent-glow': 'rgba(17, 17, 17, 0.1)',
      '--border': 'rgba(0, 0, 0, 0.08)',
      '--border-hover': 'rgba(0, 0, 0, 0.2)',
      '--nav-bg': 'rgba(250, 250, 250, 0.9)',
      '--nav-border': 'rgba(0, 0, 0, 0.06)',
      '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.06)',
      '--gradient-start': '#fafafa',
      '--gradient-end': '#f0f0f5',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 50%, #ffffff 0%, #f0f0f5 70%)',
    },
  },
  vibrant: {
    name: 'vibrant',
    label: 'Vibrant Bold',
    emoji: '🔥',
    colors: {
      '--bg-primary': '#0f0326',
      '--bg-secondary': '#1a0533',
      '--bg-card': 'rgba(30, 10, 60, 0.8)',
      '--bg-card-hover': 'rgba(40, 15, 75, 0.9)',
      '--text-primary': '#ffffff',
      '--text-secondary': '#c8b8e8',
      '--text-muted': '#8878a8',
      '--accent': '#ff6b35',
      '--accent-secondary': '#ff2d95',
      '--accent-glow': 'rgba(255, 107, 53, 0.3)',
      '--border': 'rgba(255, 255, 255, 0.1)',
      '--border-hover': 'rgba(255, 45, 149, 0.5)',
      '--nav-bg': 'rgba(15, 3, 38, 0.85)',
      '--nav-border': 'rgba(255, 255, 255, 0.08)',
      '--card-shadow': '0 8px 32px rgba(100, 0, 150, 0.3)',
      '--gradient-start': '#0f0326',
      '--gradient-end': '#1a0a3e',
      '--hero-gradient': 'radial-gradient(ellipse at 30% 50%, #2a0a5e 0%, #0f0326 70%)',
    },
  },
  glass: {
    name: 'glass',
    label: 'Glassmorphism',
    emoji: '💎',
    colors: {
      '--bg-primary': '#0c1220',
      '--bg-secondary': '#111a2e',
      '--bg-card': 'rgba(255, 255, 255, 0.05)',
      '--bg-card-hover': 'rgba(255, 255, 255, 0.1)',
      '--text-primary': '#f0f4ff',
      '--text-secondary': '#a8b8d8',
      '--text-muted': '#6878a8',
      '--accent': '#60a5fa',
      '--accent-secondary': '#a78bfa',
      '--accent-glow': 'rgba(96, 165, 250, 0.25)',
      '--border': 'rgba(255, 255, 255, 0.12)',
      '--border-hover': 'rgba(167, 139, 250, 0.4)',
      '--nav-bg': 'rgba(12, 18, 32, 0.6)',
      '--nav-border': 'rgba(255, 255, 255, 0.1)',
      '--card-shadow': '0 8px 32px rgba(0, 0, 0, 0.3)',
      '--gradient-start': '#0c1220',
      '--gradient-end': '#162040',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 30%, #1e3060 0%, #0c1220 70%)',
    },
  },
};

export const themeNames: ThemeName[] = ['dark', 'minimal', 'vibrant', 'glass'];
