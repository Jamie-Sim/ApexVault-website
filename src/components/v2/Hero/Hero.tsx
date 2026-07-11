"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import HeroCanvas from "./HeroCanvas.client";
import "./hero.css";

/*
 * Hero. Content is SSR'd (LCP lives here); the WebGL instrument mounts
 * behind it. The entrance choreography waits for the ignition intro to
 * lift, then staggers the content in.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const played = useRef(false);

  useGSAP(
    () => {
      if (!root.current) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const reveal = () => {
        if (played.current) return;
        played.current = true;
        if (reduced) {
          gsap.set("[data-animate]", { autoAlpha: 1 });
          return;
        }
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .fromTo(
            "[data-animate]",
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.1,
              stagger: 0.12,
            },
          )
          .fromTo(
            ".hero-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.2, ease: "power4.out" },
            0.4,
          );
      };

      if (document.documentElement.dataset.ignition === "done") {
        /* ignition already finished (skip param, revisit) — small delay
           so fonts settle */
        gsap.delayedCall(0.15, reveal);
      } else {
        window.addEventListener("av:ignition:done", reveal, { once: true });
      }

      return () => window.removeEventListener("av:ignition:done", reveal);
    },
    { scope: root },
  );

  /* safety net: never leave content hidden */
  useEffect(() => {
    const t = setTimeout(() => {
      if (!played.current && root.current) {
        played.current = true;
        gsap.set(root.current.querySelectorAll("[data-animate]"), {
          autoAlpha: 1,
        });
      }
    }, 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero-poster" aria-hidden="true" />
      <HeroCanvas />

      <div className="hero-content">
        <p className="gauge hero-kicker" data-animate>
          Glasgow · Private car club · Founding 2026
        </p>
        <h1 className="hero-word" data-animate>
          APEX
          <br />
          VAULT
        </h1>
        <div className="hero-rule" aria-hidden="true" data-animate />
        <p className="hero-lede" data-animate>
          The Drive Society. A members&rsquo; fleet of analog-era performance
          cars, kept warm, insured and ready. You&nbsp;just&nbsp;drive.
        </p>
        <div className="hero-ctas" data-animate>
          <a className="av-btn" href="#join">
            Secure a founding place
          </a>
          <a className="av-btn-ghost" href="#fleet">
            See the fleet
          </a>
        </div>
      </div>

      <div className="hero-foot" data-animate>
        <p className="gauge gauge--dim">Scroll to rev</p>
        <p className="gauge hero-foot-right">30 founding places · £275 to join</p>
      </div>
    </section>
  );
}
