"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
}

/*
 * Bridges Lenis into GSAP's ticker. Lives inside <ReactLenis> and uses
 * the useLenis hook so it wires up whenever the instance is ready,
 * with no mount-order race: autoRaf is off, so until this runs, wheel
 * input goes nowhere.
 */
function LenisTicker() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const onFontsReady = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onFontsReady);

    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      delete window.__lenis;
    };
  }, [lenis]);

  return null;
}

/*
 * Lenis smooth scroll wired into GSAP's ticker (autoRaf off) with
 * ScrollTrigger kept in sync. syncTouch stays false so iOS keeps
 * native touch scrolling.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{ autoRaf: false, duration: 1.1, syncTouch: false }}
    >
      <LenisTicker />
      {children}
    </ReactLenis>
  );
}

/* Anchor navigation helper — always route in-page jumps through Lenis. */
export function useScrollTo() {
  const lenis = useLenis();
  return (target: string | number, offset = 0) => {
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4 });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView();
    }
  };
}
