"use client";

import { useEffect, useRef } from "react";
import "./vault-overlay.css";

const CX = 164;
const CY = 164;
const R_OUTER = 152;
const R_NUM = 122;
const TICK_MAJOR_LEN = 18;
const TICK_MID_LEN = 10;
const TICK_MINOR_LEN = 5;

const toRad = (d: number) => (d * Math.PI) / 180;

function DialScale() {
  const textureRings: number[] = [];
  for (let r = 18; r <= 148; r += 5) textureRings.push(r);

  const highlightRings: number[] = [];
  for (let rh = 30; rh <= 140; rh += 20) highlightRings.push(rh);

  const ticks: Array<{ x1: number; y1: number; x2: number; y2: number; sw: number; color: string }> = [];
  for (let i = 0; i < 50; i++) {
    const unit = i * 2;
    const svgAngle = -90 + unit * 3.6;
    const rad = toRad(svgAngle);
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const isMajor = unit % 10 === 0;
    const isMid = !isMajor && unit % 5 === 0;

    const len = isMajor ? TICK_MAJOR_LEN : isMid ? TICK_MID_LEN : TICK_MINOR_LEN;
    ticks.push({
      x1: +(CX + R_OUTER * cos).toFixed(2),
      y1: +(CY + R_OUTER * sin).toFixed(2),
      x2: +(CX + (R_OUTER - len) * cos).toFixed(2),
      y2: +(CY + (R_OUTER - len) * sin).toFixed(2),
      sw: isMajor ? 2.2 : isMid ? 1.4 : 0.75,
      color: isMajor
        ? "rgba(18,22,30,0.95)"
        : isMid
          ? "rgba(18,22,30,0.72)"
          : "rgba(18,22,30,0.42)",
    });
  }

  const numbers = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((n) => {
    const ang = toRad(-90 + n * 3.6);
    return {
      n,
      x: +(CX + R_NUM * Math.cos(ang)).toFixed(2),
      y: +(CY + R_NUM * Math.sin(ang)).toFixed(2),
    };
  });

  return (
    <svg id="vd-scale" viewBox="0 0 328 328" xmlns="http://www.w3.org/2000/svg">
      {textureRings.map((rr) => {
        const op = rr < 60 ? 0.07 : rr < 110 ? 0.06 : 0.05;
        return (
          <circle
            key={`tr-${rr}`}
            cx="164"
            cy="164"
            r={rr}
            fill="none"
            stroke={`rgba(20,24,34,${op})`}
            strokeWidth="0.6"
          />
        );
      })}
      {highlightRings.map((rh) => (
        <circle
          key={`hr-${rh}`}
          cx="164"
          cy="164"
          r={rh}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth="1.2"
        />
      ))}
      <circle cx="164" cy="164" r="152" fill="none" stroke="rgba(20,24,34,0.7)" strokeWidth="1" />
      <circle cx="164" cy="164" r="92" fill="none" stroke="rgba(20,24,34,0.3)" strokeWidth="0.7" />
      <circle cx="164" cy="164" r="70" fill="none" stroke="rgba(20,24,34,0.2)" strokeWidth="0.5" />
      {ticks.map((t, i) => (
        <line
          key={`t-${i}`}
          x1={t.x1}
          y1={t.y1}
          x2={t.x2}
          y2={t.y2}
          stroke={t.color}
          strokeWidth={t.sw}
          strokeLinecap="round"
        />
      ))}
      {numbers.map(({ n, x, y }) => (
        <text
          key={`n-${n}`}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="'DM Sans',sans-serif"
          fontSize="14"
          fontWeight="500"
          letterSpacing="0.01em"
          fill="rgba(16,20,30,0.92)"
        >
          {n}
        </text>
      ))}
    </svg>
  );
}

export default function VaultOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const bezelRef = useRef<HTMLDivElement>(null);
  const faceRef = useRef<HTMLDivElement>(null);
  const isOpeningRef = useRef(false);
  const pendingAnimsRef = useRef<Animation[]>([]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bezel = bezelRef.current;
    const face = faceRef.current;
    if (!overlay || !bezel || !face) return;

    if (new URLSearchParams(window.location.search).has("skipVault")) {
      overlay.classList.add("done");
      return;
    }

    const htmlEl = document.documentElement;
    const previousOverflow = htmlEl.style.overflow;
    htmlEl.style.overflow = "hidden";

    const onEnter = () => {
      if (!isOpeningRef.current) bezel.classList.add("hovered");
    };
    const onLeave = () => bezel.classList.remove("hovered");

    function triggerDoorOpen() {
      const panelR = overlay!.querySelector<HTMLDivElement>(".vd-panel-r");
      if (!panelR) return;
      const handler = () => {
        panelR.removeEventListener("animationend", handler);
        overlay!.classList.add("done");
        htmlEl.style.overflow = previousOverflow;
        const navLink = document.querySelector<HTMLAnchorElement>("nav a");
        if (navLink) navLink.focus({ preventScroll: true });
      };
      panelR.addEventListener("animationend", handler);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay!.classList.add("opening");
        });
      });
    }

    function openVault() {
      if (isOpeningRef.current) return;
      isOpeningRef.current = true;
      bezel!.classList.remove("hovered");
      bezel!.style.pointerEvents = "none";

      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced || !face!.animate) {
        triggerDoorOpen();
        return;
      }

      const DIAL_EASE = "cubic-bezier(0.45, 0, 0.08, 1)";

      const spin = face!.animate(
        [{ transform: "rotate(0deg)" }, { transform: "rotate(90deg)" }],
        { duration: 2000, easing: DIAL_EASE, fill: "forwards" },
      );
      pendingAnimsRef.current.push(spin);

      spin.finished
        .then(() => {
          const click = face!.animate(
            [
              { transform: "rotate(90deg)", offset: 0, easing: "cubic-bezier(0.3, 0, 0.1, 1)" },
              { transform: "rotate(96deg)", offset: 0.38, easing: "cubic-bezier(0.1, 1.55, 0.4, 1)" },
              { transform: "rotate(90deg)", offset: 1 },
            ],
            { duration: 200, fill: "forwards" },
          );
          pendingAnimsRef.current.push(click);
          return click.finished;
        })
        .then(() => new Promise<void>((resolve) => setTimeout(resolve, 420)))
        .then(triggerDoorOpen)
        .catch(() => {
          /* animation cancelled on unmount — ignore */
        });
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openVault();
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      openVault();
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isOpeningRef.current) {
        openVault();
      }
    };

    bezel.addEventListener("mouseenter", onEnter);
    bezel.addEventListener("mouseleave", onLeave);
    bezel.addEventListener("click", openVault);
    bezel.addEventListener("keydown", onKeyDown);
    bezel.addEventListener("touchend", onTouchEnd, { passive: false });
    document.addEventListener("keydown", onEscape);

    return () => {
      bezel.removeEventListener("mouseenter", onEnter);
      bezel.removeEventListener("mouseleave", onLeave);
      bezel.removeEventListener("click", openVault);
      bezel.removeEventListener("keydown", onKeyDown);
      bezel.removeEventListener("touchend", onTouchEnd);
      document.removeEventListener("keydown", onEscape);
      pendingAnimsRef.current.forEach((a) => a.cancel());
      pendingAnimsRef.current = [];
      htmlEl.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div id="vault-overlay" aria-hidden="true" ref={overlayRef}>
      <div className="vd-panel vd-panel-l"></div>
      <div className="vd-panel vd-panel-r"></div>

      <div id="vd-scene">
        <div
          id="vd-bezel"
          role="button"
          aria-label="Enter ApexVault"
          tabIndex={0}
          ref={bezelRef}
        >
          <div className="vd-bezel-ring"></div>
          <div className="vd-pointer"></div>
          <div id="vd-face" ref={faceRef}>
            <DialScale />
          </div>
          <div id="vd-hub">
            <span className="vd-label">AV</span>
          </div>
        </div>
        <p id="vault-hint">
          <span className="hint-line"></span>
          turn to enter
          <span className="hint-line"></span>
        </p>
      </div>
    </div>
  );
}
