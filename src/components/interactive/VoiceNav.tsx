'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { ThemeName } from '@/lib/themes';

interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

export default function VoiceNav() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [supported, setSupported] = useState(false);
  const recognitionRef = useRef<unknown>(null);
  const { setTheme } = useTheme();

  useEffect(() => {
    const SpeechRecognition =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;
    setSupported(!!SpeechRecognition);
  }, []);

  const processVoiceCommand = useCallback(
    (text: string) => {
      const lower = text.toLowerCase().trim();
      setTranscript(text);

      // Navigation commands
      const sections: Record<string, string[]> = {
        about: ['about', 'about me', 'who is', 'bio', 'biography'],
        skills: ['skills', 'tech', 'technologies', 'stack', 'tech stack'],
        projects: ['projects', 'portfolio', 'work', 'case studies'],
        experience: ['experience', 'career', 'timeline', 'history', 'jobs'],
        contact: ['contact', 'email', 'reach', 'touch', 'hire', 'message'],
      };

      for (const [section, keywords] of Object.entries(sections)) {
        if (keywords.some((kw) => lower.includes(kw))) {
          const el = document.getElementById(section);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setFeedback(`Navigating to ${section}...`);
            setTimeout(() => setFeedback(''), 2000);
            return;
          }
        }
      }

      // Scroll to top
      if (lower.includes('top') || lower.includes('home') || lower.includes('hero')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFeedback('Going to the top...');
        setTimeout(() => setFeedback(''), 2000);
        return;
      }

      // Theme commands
      const themeMap: Record<string, ThemeName> = {
        dark: 'dark',
        cinematic: 'dark',
        minimal: 'minimal',
        clean: 'minimal',
        light: 'minimal',
        vibrant: 'vibrant',
        bold: 'vibrant',
        colorful: 'vibrant',
        glass: 'glass',
        glassmorphism: 'glass',
        frosted: 'glass',
      };

      if (lower.includes('theme') || lower.includes('switch') || lower.includes('change')) {
        for (const [keyword, theme] of Object.entries(themeMap)) {
          if (lower.includes(keyword)) {
            setTheme(theme);
            setFeedback(`Theme switched to ${theme}`);
            setTimeout(() => setFeedback(''), 2000);
            return;
          }
        }
      }

      // Resume
      if (lower.includes('resume') || lower.includes('download') || lower.includes('cv')) {
        window.open('/resume.pdf', '_blank');
        setFeedback('Opening resume...');
        setTimeout(() => setFeedback(''), 2000);
        return;
      }

      setFeedback(`Didn't catch that: "${text}"`);
      setTimeout(() => setFeedback(''), 3000);
    },
    [setTheme]
  );

  const toggleListening = useCallback(() => {
    if (!supported) return;

    if (isListening) {
      const recognition = recognitionRef.current as { stop: () => void } | null;
      recognition?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as unknown as Record<string, unknown>).SpeechRecognition ||
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new (SpeechRecognition as new () => {
      continuous: boolean;
      interimResults: boolean;
      lang: string;
      onresult: (event: SpeechRecognitionEvent) => void;
      onerror: () => void;
      onend: () => void;
      start: () => void;
      stop: () => void;
    })();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const text = event.results[0][0].transcript;
      processVoiceCommand(text);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setFeedback('Voice recognition error. Try again.');
      setTimeout(() => setFeedback(''), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setFeedback('Listening...');
  }, [isListening, supported, processVoiceCommand]);

  if (!supported) return null;

  return (
    <>
      {/* Mic Button in Navbar area */}
      <motion.button
        onClick={toggleListening}
        className="fixed top-5 right-36 md:right-44 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          background: isListening ? 'var(--accent)' : 'var(--bg-card)',
          border: '1px solid',
          borderColor: isListening ? 'var(--accent)' : 'var(--border)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Voice navigation"
        title="Voice navigation — say a section name"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isListening ? 'var(--bg-primary)' : 'var(--text-muted)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>

        {/* Pulsing ring when listening */}
        {isListening && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid var(--accent)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>

      {/* Feedback Toast */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-xl text-sm font-medium glass"
            style={{
              color: 'var(--text-primary)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            {isListening && (
              <motion.span
                className="inline-block w-2 h-2 rounded-full mr-2 align-middle"
                style={{ background: '#ef4444' }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
