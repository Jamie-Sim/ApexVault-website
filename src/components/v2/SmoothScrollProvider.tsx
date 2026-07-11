"use client";

import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: import("lenis").default;
  }
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
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
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
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, duration: 1.1, syncTouch: false }}
    >
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
