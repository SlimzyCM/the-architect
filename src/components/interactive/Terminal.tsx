'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { terminalCommands } from '@/data/terminal-commands';
import { useTheme } from '@/context/ThemeContext';
import { ThemeName } from '@/lib/themes';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: '╔══════════════════════════════════════════════╗' },
    { type: 'system', content: '║  Welcome to The Architect Terminal v1.0      ║' },
    { type: 'system', content: '║  Type "help" for available commands           ║' },
    { type: 'system', content: '╚══════════════════════════════════════════════╝' },
    { type: 'system', content: '' },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  // Toggle with backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' && !e.ctrlKey && !e.metaKey) {
        const active = document.activeElement;
        const isTyping =
          active instanceof HTMLInputElement ||
          active instanceof HTMLTextAreaElement ||
          (active instanceof HTMLElement && active.isContentEditable);
        // Only toggle if not typing in another input
        if (!isTyping || (isTyping && active === inputRef.current)) {
          if (!isOpen) {
            e.preventDefault();
            setIsOpen(true);
          }
        }
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  // Auto-complete suggestions
  useEffect(() => {
    if (input.length === 0) {
      setSuggestions([]);
      return;
    }
    const allCommands = terminalCommands.flatMap((cmd) => [
      cmd.command,
      ...(cmd.aliases || []),
    ]);
    const matches = allCommands.filter((c) => c.startsWith(input.toLowerCase()));
    setSuggestions(matches.slice(0, 3));
  }, [input]);

  const addLines = useCallback((newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines]);
  }, []);

  const processCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) return;

      // Add input line
      addLines([{ type: 'input', content: `visitor@architect:~$ ${trimmed}` }]);

      // Add to history
      setHistory((prev) => [trimmed, ...prev].slice(0, 50));
      setHistoryIndex(-1);

      const parts = trimmed.toLowerCase().split(' ');
      const cmd = parts[0];
      const args = parts.slice(1).join(' ');

      // Special commands
      if (cmd === 'clear') {
        setLines([]);
        return;
      }

      if (cmd === 'exit' || cmd === 'quit') {
        setIsOpen(false);
        return;
      }

      if (cmd === 'date') {
        addLines([{ type: 'output', content: new Date().toString() }]);
        return;
      }

      if (cmd === 'echo') {
        addLines([{ type: 'output', content: args || '' }]);
        return;
      }

      if (cmd === 'theme') {
        const validThemes: ThemeName[] = ['dark', 'minimal', 'vibrant', 'glass'];
        if (validThemes.includes(args as ThemeName)) {
          setTheme(args as ThemeName);
          addLines([
            { type: 'system', content: `✓ Theme switched to "${args}"` },
          ]);
        } else {
          addLines([
            { type: 'error', content: `Invalid theme. Available: ${validThemes.join(', ')}` },
          ]);
        }
        return;
      }

      if (cmd === 'goto' || cmd === 'nav' || cmd === 'navigate') {
        const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
        if (sections.includes(args)) {
          const el = document.getElementById(args);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            setIsOpen(false);
            addLines([{ type: 'system', content: `Navigating to #${args}...` }]);
          }
        } else {
          addLines([
            { type: 'error', content: `Unknown section. Available: ${sections.join(', ')}` },
          ]);
        }
        return;
      }

      if (cmd === 'matrix') {
        addLines([
          { type: 'system', content: '🟢 Entering the Matrix...' },
          { type: 'system', content: 'Wake up, Neo...' },
          { type: 'system', content: 'The Matrix has you...' },
          { type: 'system', content: 'Follow the white rabbit. 🐇' },
        ]);
        // Trigger matrix effect on document
        document.dispatchEvent(new CustomEvent('matrix-activate'));
        return;
      }

      if (cmd === 'resume' || cmd === 'cv' || cmd === 'download') {
        window.open('/resume.pdf', '_blank');
      }

      // Check for full command match (including multi-word like "sudo hire chidi")
      const fullMatch = terminalCommands.find(
        (c) =>
          c.command === trimmed.toLowerCase() ||
          c.aliases?.includes(trimmed.toLowerCase())
      );

      if (fullMatch) {
        const response = Array.isArray(fullMatch.response)
          ? fullMatch.response
          : [fullMatch.response];
        addLines(response.map((r) => ({ type: 'output' as const, content: r })));
        return;
      }

      // Check for single-word command match
      const singleMatch = terminalCommands.find(
        (c) => c.command === cmd || c.aliases?.includes(cmd)
      );

      if (singleMatch) {
        const response = Array.isArray(singleMatch.response)
          ? singleMatch.response
          : [singleMatch.response];
        addLines(response.map((r) => ({ type: 'output' as const, content: r })));
        return;
      }

      // Unknown command
      addLines([
        {
          type: 'error',
          content: `command not found: ${cmd}. Type "help" for available commands.`,
        },
      ]);
    },
    [addLines, setTheme]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'var(--accent)';
      case 'output':
        return 'var(--text-secondary)';
      case 'error':
        return '#ef4444';
      case 'system':
        return 'var(--text-muted)';
    }
  };

  return (
    <>
      {/* Terminal Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center glass"
        style={{ boxShadow: 'var(--card-shadow)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle terminal"
        title="Terminal (press ` to toggle)"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-20 left-6 z-50 w-[calc(100%-3rem)] sm:w-[560px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Title Bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs font-medium ml-2" style={{ color: 'var(--text-muted)' }}>
                  visitor@the-architect — bash
                </span>
              </div>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                press esc to close
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="h-[350px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
              style={{ background: 'var(--bg-primary)' }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Output Lines */}
              {lines.map((line, i) => (
                <div key={i} style={{ color: getLineColor(line.type) }} className="whitespace-pre-wrap">
                  {line.content || '\u00A0'}
                </div>
              ))}

              {/* Input Line */}
              <div className="flex items-center gap-0 mt-1">
                <span style={{ color: 'var(--accent)' }}>visitor@architect:~$&nbsp;</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent outline-none font-mono text-[13px]"
                    style={{ color: 'var(--text-primary)', caretColor: 'var(--accent)' }}
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {/* Tab completion hint */}
                  {suggestions.length > 0 && input.length > 0 && (
                    <span
                      className="absolute left-0 top-0 pointer-events-none font-mono text-[13px]"
                      style={{ color: 'var(--text-muted)', opacity: 0.4 }}
                    >
                      {suggestions[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
