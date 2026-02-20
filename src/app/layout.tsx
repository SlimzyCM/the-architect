import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';
import Terminal from '@/components/interactive/Terminal';
import VoiceNav from '@/components/interactive/VoiceNav';
import AIChatbot from '@/components/interactive/AIChatbot';
import CodePlayground from '@/components/interactive/CodePlayground';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chidi Okobia — Senior Software Engineer',
  description:
    'Engineering systems that scale. Building products that matter. Senior Full-Stack Engineer specializing in .NET, React, Cloud Architecture, and Microservices.',
  keywords: [
    'Senior Software Engineer',
    'Full Stack Developer',
    '.NET',
    'React',
    'AWS',
    'Microservices',
    'Cloud Architecture',
    'Chidi Okobia',
  ],
  authors: [{ name: 'Chidi Michael Okobia' }],
  openGraph: {
    title: 'Chidi Okobia — Senior Software Engineer',
    description: 'Engineering systems that scale. Building products that matter.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased noise-overlay">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ThemeSwitcher />
          <Terminal />
          <VoiceNav />
          <AIChatbot />
          <CodePlayground />
        </ThemeProvider>
      </body>
    </html>
  );
}
