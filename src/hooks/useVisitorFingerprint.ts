'use client';

import { useEffect, useState } from 'react';

/**
 * Generates a unique-ish seed for each visitor based on browser properties.
 * This seed drives the 3D scene generation so every visitor sees something unique.
 * Not a true fingerprint — just enough entropy for visual variation.
 */
export function useVisitorFingerprint(): number {
  const [seed, setSeed] = useState(42); // Default seed

  useEffect(() => {
    const generateSeed = () => {
      const factors = [
        navigator.userAgent,
        navigator.language,
        screen.width.toString(),
        screen.height.toString(),
        screen.colorDepth.toString(),
        new Date().getTimezoneOffset().toString(),
        navigator.hardwareConcurrency?.toString() || '4',
        (navigator as unknown as Record<string, unknown>).deviceMemory?.toString() || '8',
      ];

      // Simple hash function
      const str = factors.join('|');
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash + char) | 0;
      }

      // Add some time-based variation (changes daily)
      const dayFactor = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
      hash = ((hash << 5) - hash + dayFactor) | 0;

      return Math.abs(hash);
    };

    setSeed(generateSeed());
  }, []);

  return seed;
}

/**
 * Seeded random number generator (mulberry32)
 * Produces deterministic "random" numbers from a seed.
 */
export function seededRandom(seed: number): () => number {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
