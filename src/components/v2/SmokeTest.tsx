"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const SmokeScene = dynamic(() => import("./SmokeScene"), {
  ssr: false,
  loading: () => null,
});

/* Throwaway M0 smoke test: proves R3F + GSAP ScrollTrigger + Lenis
   all run together on this stack before real sections are built. */
export default function SmokeTest() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to("[data-smoke-needle]", {
        rotation: 240,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-smoke-scrub]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <SmokeScene />
        </div>
        <div style={{ position: "relative", textAlign: "center" }}>
          <p className="gauge">M0 SMOKE TEST · R3F + GSAP + LENIS</p>
          <h1 style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}>APEX VAULT</h1>
        </div>
      </section>

      <section
        data-smoke-scrub
        style={{
          minHeight: "150vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div
          data-smoke-needle
          style={{
            width: 4,
            height: 160,
            background: "var(--av-redline)",
            transformOrigin: "50% 100%",
          }}
        />
      </section>
    </div>
  );
}
