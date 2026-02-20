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
    '--highlight': string;
  };
}

export const themes: Record<ThemeName, ThemeConfig> = {
  dark: {
    name: 'dark',
    label: 'Noir',
    emoji: '◼',
    colors: {
      '--bg-primary': '#0a0a0f',
      '--bg-secondary': '#0e0e14',
      '--bg-card': 'rgba(255, 255, 255, 0.03)',
      '--bg-card-hover': 'rgba(255, 255, 255, 0.06)',
      '--text-primary': '#e8e8ed',
      '--text-secondary': '#8a8a9a',
      '--text-muted': '#55556a',
      '--accent': '#c8c8d0',
      '--accent-secondary': '#7b7b8a',
      '--accent-glow': 'rgba(200, 200, 210, 0.06)',
      '--border': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(255, 255, 255, 0.14)',
      '--nav-bg': 'rgba(10, 10, 15, 0.8)',
      '--nav-border': 'rgba(255, 255, 255, 0.04)',
      '--card-shadow': '0 1px 2px rgba(0, 0, 0, 0.2)',
      '--gradient-start': '#0a0a0f',
      '--gradient-end': '#111118',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 40%, #12121a 0%, #0a0a0f 70%)',
      '--highlight': '#a0a0ff',
    },
  },
  minimal: {
    name: 'minimal',
    label: 'Blanc',
    emoji: '◻',
    colors: {
      '--bg-primary': '#f8f8f8',
      '--bg-secondary': '#ffffff',
      '--bg-card': 'rgba(0, 0, 0, 0.02)',
      '--bg-card-hover': 'rgba(0, 0, 0, 0.04)',
      '--text-primary': '#1a1a1a',
      '--text-secondary': '#666666',
      '--text-muted': '#999999',
      '--accent': '#1a1a1a',
      '--accent-secondary': '#444444',
      '--accent-glow': 'rgba(0, 0, 0, 0.04)',
      '--border': 'rgba(0, 0, 0, 0.06)',
      '--border-hover': 'rgba(0, 0, 0, 0.12)',
      '--nav-bg': 'rgba(248, 248, 248, 0.85)',
      '--nav-border': 'rgba(0, 0, 0, 0.04)',
      '--card-shadow': '0 1px 3px rgba(0, 0, 0, 0.04)',
      '--gradient-start': '#f8f8f8',
      '--gradient-end': '#f0f0f0',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 40%, #ffffff 0%, #f4f4f4 70%)',
      '--highlight': '#2a2aff',
    },
  },
  vibrant: {
    name: 'vibrant',
    label: 'Electric',
    emoji: '◆',
    colors: {
      '--bg-primary': '#08060e',
      '--bg-secondary': '#0c0a14',
      '--bg-card': 'rgba(255, 255, 255, 0.03)',
      '--bg-card-hover': 'rgba(255, 255, 255, 0.06)',
      '--text-primary': '#f0eef5',
      '--text-secondary': '#8a85a0',
      '--text-muted': '#5a5570',
      '--accent': '#e0d8f0',
      '--accent-secondary': '#8878b0',
      '--accent-glow': 'rgba(140, 120, 200, 0.08)',
      '--border': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(180, 140, 255, 0.15)',
      '--nav-bg': 'rgba(8, 6, 14, 0.85)',
      '--nav-border': 'rgba(255, 255, 255, 0.04)',
      '--card-shadow': '0 1px 3px rgba(80, 40, 120, 0.15)',
      '--gradient-start': '#08060e',
      '--gradient-end': '#0e0a18',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 40%, #14102a 0%, #08060e 70%)',
      '--highlight': '#b090ff',
    },
  },
  glass: {
    name: 'glass',
    label: 'Frost',
    emoji: '◇',
    colors: {
      '--bg-primary': '#0b1018',
      '--bg-secondary': '#0e1420',
      '--bg-card': 'rgba(255, 255, 255, 0.04)',
      '--bg-card-hover': 'rgba(255, 255, 255, 0.07)',
      '--text-primary': '#e8eaf0',
      '--text-secondary': '#8090a8',
      '--text-muted': '#506078',
      '--accent': '#c0cce0',
      '--accent-secondary': '#7888a8',
      '--accent-glow': 'rgba(130, 160, 200, 0.08)',
      '--border': 'rgba(255, 255, 255, 0.06)',
      '--border-hover': 'rgba(140, 180, 240, 0.15)',
      '--nav-bg': 'rgba(11, 16, 24, 0.7)',
      '--nav-border': 'rgba(255, 255, 255, 0.04)',
      '--card-shadow': '0 1px 3px rgba(0, 0, 0, 0.15)',
      '--gradient-start': '#0b1018',
      '--gradient-end': '#101828',
      '--hero-gradient': 'radial-gradient(ellipse at 50% 30%, #162030 0%, #0b1018 70%)',
      '--highlight': '#80b0ff',
    },
  },
};

export const themeNames: ThemeName[] = ['dark', 'minimal', 'vibrant', 'glass'];
