"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "./MotionGate";

/*
 * Scroll-entrance wrapper for v2 sections. Content is visible by
 * default (SSR, no-JS, static tier); on motion tiers the element
 * fades up when it enters the viewport.
 */
export default function Reveal({
  children,
  className,
  y = 40,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "section" | "article" | "li" | "p";
}) {
  const ref = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      if (
        !ref.current ||
        tier === "static" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
          },
        },
      );
    },
    { scope: ref, dependencies: [tier] },
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
