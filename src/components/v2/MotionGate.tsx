"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type MotionTier = "full" | "lite" | "static";

const MotionContext = createContext<MotionTier>("full");

function detectTier(): MotionTier {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "static";
  }

  let webgl = false;
  try {
    const canvas = document.createElement("canvas");
    webgl = !!(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    );
  } catch {
    webgl = false;
  }

  const nav = navigator as Navigator & { deviceMemory?: number };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 8;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;

  if (!webgl) return "lite";
  if ((coarse && narrow) || cores <= 4 || memory <= 4) return "lite";
  return "full";
}

/*
 * Computes the motion tier once on mount and stamps it on <html> as
 * data-motion, so CSS can gate hidden animation start-states behind
 * it (no-JS and reduced-motion users always see content).
 *   full   — WebGL hero + all scroll choreography
 *   lite   — poster hero + scroll choreography
 *   static — poster hero, no pinning, simple fades
 */
export function MotionGate({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<MotionTier>("full");

  useEffect(() => {
    const detected = detectTier();
    setTier(detected);
    document.documentElement.dataset.motion = detected;
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, []);

  return (
    <MotionContext.Provider value={tier}>{children}</MotionContext.Provider>
  );
}

export function useMotionTier() {
  return useContext(MotionContext);
}
