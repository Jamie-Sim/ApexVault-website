"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import "./ignition.css";

const SESSION_KEY = "av-ignition-done";
const CX = 200;
const CY = 200;
const R_TICK_OUT = 168;
const R_TICK_IN_MAJOR = 148;
const R_TICK_IN_MINOR = 158;
const R_NUM = 126;
const START_DEG = -210; /* 0 rpm */
const END_DEG = 30; /* 8000 rpm */
const SWEEP = END_DEG - START_DEG; /* 240° */

function rpmToDeg(rpm: number) {
  return START_DEG + (rpm / 8000) * SWEEP;
}

function polar(deg: number, r: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(rad), CY + r * Math.sin(rad)];
}

function arcPath(fromDeg: number, toDeg: number, r: number) {
  const [x1, y1] = polar(fromDeg, r);
  const [x2, y2] = polar(toDeg, r);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

function markDone() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private browsing */
  }
  document.documentElement.dataset.ignition = "done";
  window.dispatchEvent(new CustomEvent("av:ignition:done"));
}

export default function Ignition() {
  const [mounted, setMounted] = useState(false);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const skippedRef = useRef(false);

  /* Decide on the client whether the intro runs at all. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skip =
      params.has("skipVault") ||
      params.has("skip") ||
      sessionStorage.getItem(SESSION_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (skip) {
      markDone();
      setGone(true);
    } else {
      setMounted(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!mounted || !root.current) return;

      const q = gsap.utils.selector(root);
      document.documentElement.style.overflow = "hidden";

      const finish = () => {
        document.documentElement.style.overflow = "";
        markDone();
        setGone(true);
      };

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finish,
      });

      /* one slow breath: the whole cluster wakes from black */
      tl.fromTo(
        q(".ign-center"),
        { autoAlpha: 0, scale: 0.965 },
        { autoAlpha: 1, scale: 1, duration: 1.1, ease: "power2.out" },
        0,
      )
        .fromTo(
          q(".ign-arc"),
          { strokeDashoffset: 600 },
          { strokeDashoffset: 0, duration: 1.15, ease: "power2.inOut" },
          0.15,
        )
        .fromTo(
          q(".ign-tick"),
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.016, ease: "power1.out" },
          0.45,
        )
        .fromTo(
          q(".ign-num"),
          { opacity: 0, y: 4 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.05 },
          0.85,
        )
        /* warning lamps glow up together, hold, then dim as one */
        .fromTo(
          q(".ign-lamp"),
          { opacity: 0 },
          { opacity: 1, duration: 0.5, stagger: 0.07, ease: "power1.inOut" },
          1.5,
        )
        /* the sweep: deliberate climb, a breath at the redline */
        .fromTo(
          q(".ign-needle"),
          { rotation: rpmToDeg(0) + 90, transformOrigin: "50% 100%" },
          {
            rotation: rpmToDeg(7600) + 90,
            duration: 1.0,
            ease: "power2.inOut",
          },
          2.15,
        )
        .to(
          q(".ign-glow"),
          { opacity: 1, duration: 0.8, ease: "power1.inOut" },
          2.45,
        )
        /* fall back to idle: heavy, damped, no bounce */
        .to(
          q(".ign-needle"),
          {
            rotation: rpmToDeg(900) + 90,
            duration: 1.35,
            ease: "power3.inOut",
          },
          3.35,
        )
        .to(
          q(".ign-glow"),
          { opacity: 0, duration: 1.0, ease: "power1.inOut" },
          3.5,
        )
        .to(
          q(".ign-lamp"),
          { opacity: 0.18, duration: 0.8, ease: "power1.inOut" },
          3.5,
        )
        .to(q(".ign-status"), { opacity: 0, duration: 0.4 }, 3.55)
        .fromTo(
          q(".ign-status--ready"),
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          3.95,
        )
        /* the hero starts waking underneath as the curtain begins to move */
        .call(markDone, [], 4.85)
        .to(
          q(".ign-center"),
          { y: -60, autoAlpha: 0, duration: 0.9, ease: "power2.in" },
          4.75,
        )
        .to(
          root.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.15,
            ease: "power3.inOut",
          },
          4.9,
        );

      /* skip affordances */
      const skipNow = () => {
        if (skippedRef.current) return;
        skippedRef.current = true;
        tl.kill();
        gsap.to(root.current, {
          autoAlpha: 0,
          duration: 0.25,
          onComplete: finish,
        });
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === "Escape" || e.key === " ") skipNow();
      };
      window.addEventListener("keydown", onKey);
      const btn = root.current.querySelector(".ign-skip");
      btn?.addEventListener("click", skipNow);

      return () => {
        window.removeEventListener("keydown", onKey);
        btn?.removeEventListener("click", skipNow);
        document.documentElement.style.overflow = "";
      };
    },
    { dependencies: [mounted] },
  );

  if (gone || !mounted) return null;

  /* build dial geometry */
  const ticks: React.ReactNode[] = [];
  for (let rpm = 0; rpm <= 8000; rpm += 250) {
    const major = rpm % 1000 === 0;
    const deg = rpmToDeg(rpm);
    const [x1, y1] = polar(deg, R_TICK_OUT);
    const [x2, y2] = polar(deg, major ? R_TICK_IN_MAJOR : R_TICK_IN_MINOR);
    const red = rpm >= 6500;
    ticks.push(
      <line
        key={rpm}
        className="ign-tick"
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={red ? "var(--av-redline)" : "var(--av-amber)"}
        strokeWidth={major ? 2.5 : 1}
        opacity={major ? 0.95 : 0.55}
      />,
    );
  }

  const nums: React.ReactNode[] = [];
  for (let n = 0; n <= 8; n++) {
    const deg = rpmToDeg(n * 1000);
    const [x, y] = polar(deg, R_NUM);
    nums.push(
      <text
        key={n}
        className="ign-num"
        x={x}
        y={y}
        fill={n >= 7 ? "var(--av-redline)" : "var(--av-phosphor)"}
      >
        {n}
      </text>,
    );
  }

  return (
    <div ref={root} className="ign" id="ignition-overlay" aria-hidden="true">
      <div className="ign-center">
        <svg
          className="ign-dial"
          viewBox="0 0 400 400"
          width="400"
          height="400"
        >
          <path
            className="ign-arc"
            d={arcPath(START_DEG, END_DEG, R_TICK_OUT + 8)}
            fill="none"
            stroke="rgba(255,158,44,0.35)"
            strokeWidth="1.5"
            strokeDasharray="600"
          />
          <path
            d={arcPath(rpmToDeg(6500), END_DEG, R_TICK_OUT + 8)}
            fill="none"
            stroke="var(--av-redline)"
            strokeWidth="3"
            className="ign-tick"
          />
          {ticks}
          {nums}
          <text className="ign-unit" x={CX} y={CY + 58}>
            RPM ×1000
          </text>
          <g className="ign-needle-wrap">
            <line
              className="ign-needle"
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY - 150}
            />
          </g>
          <circle cx={CX} cy={CY} r="10" fill="#151009" stroke="var(--av-ember)" strokeWidth="1.5" />
        </svg>

        <div className="ign-glow" />

        <div className="ign-readout">
          <span className="ign-lamp ign-lamp--oil">OIL</span>
          <span className="ign-lamp">FUEL</span>
          <span className="ign-lamp">CHARGE</span>
          <span className="ign-lamp">ABS</span>
        </div>

        <div className="ign-statuses">
          <p className="ign-status gauge">IGNITION</p>
          <p className="ign-status--ready gauge">READY · EST. 2026 · GLASGOW</p>
        </div>
      </div>

      <button className="ign-skip gauge gauge--dim" type="button">
        SKIP ⏎
      </button>
    </div>
  );
}
