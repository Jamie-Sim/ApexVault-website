"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { FOUNDING_SPOTS_TOTAL } from "@/config";
import { useCounter } from "@/hooks/useCounter";

export default function Hero() {
  const { remaining, closed } = useCounter();
  const brandRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = brandRef.current;
    if (!el) return;

    let raf = 0;
    let mx = 50;
    let my = 50;
    const apply = () => {
      el.style.setProperty("--mx", `${mx}%`);
      el.style.setProperty("--my", `${my}%`);
      raf = 0;
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx = ((e.clientX - rect.left) / rect.width) * 100;
      my = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const onEnter = () => el.style.setProperty("--gleam", "1");
    const onLeave = () => el.style.setProperty("--gleam", "0");

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero-stage">
      <div className="hero-image">
        <Image
          src="/apexvault-garage.png"
          alt="Apex Vault fleet — the garage"
          fill
          priority
          sizes="100vw"
          quality={92}
          className="hero-image-img"
        />
        <div className="hero-image-vignette" aria-hidden="true" />
        <div className="hero-image-grade" aria-hidden="true" />
      </div>

      <div className="hero-wrap">
        <p className="hero-eyebrow">
          <span className="hero-eyebrow-line" />
          Glasgow · Est. 2026
          <span className="hero-eyebrow-line" />
        </p>

        <h1 className="hero-brand" ref={brandRef} aria-label="Apex Vault">
          APEX VAULT
        </h1>

        <h2 className="hero-sub-heading">
          The <em>Drive</em> Society.
        </h2>

        <p className="hero-sub">
          {closed ? (
            <>Founding intake closed &mdash; join the launch waitlist.</>
          ) : (
            <>
              Founding intake open &mdash; {remaining} of {FOUNDING_SPOTS_TOTAL} spots remain.
            </>
          )}
        </p>

        <div className="hero-actions">
          <a href="#join" className="btn btn-primary">
            {closed ? "Join Waitlist" : "Secure Founding Membership"}
          </a>
        </div>
      </div>
    </section>
  );
}
