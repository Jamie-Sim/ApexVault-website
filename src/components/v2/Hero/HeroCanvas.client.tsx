"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "../MotionGate";

const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => null,
});

/*
 * Mounts the WebGL instrument only on the "full" motion tier, fades it
 * in over the poster once the first frame exists, and stops mattering
 * entirely if WebGL is unavailable (poster stays).
 */
export default function HeroCanvas() {
  const tier = useMotionTier();
  const wrap = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mount, setMount] = useState(false);

  /* boot three.js off the critical path; the poster covers the gap */
  useEffect(() => {
    const start = () => setMount(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1600 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 900);
    return () => clearTimeout(t);
  }, []);

  /* pause rendering when the hero is off screen */
  useEffect(() => {
    if (!wrap.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  if (tier !== "full") return null;

  return (
    <div
      ref={wrap}
      className="hero-canvas"
      data-ready={ready ? "true" : "false"}
      aria-hidden="true"
    >
      {mount && (
        <Scene
          frameloop={visible ? "always" : "never"}
          onReady={() => setReady(true)}
        />
      )}
    </div>
  );
}
