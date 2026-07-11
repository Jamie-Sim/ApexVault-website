"use client";

import Reveal from "./Reveal";
import { FOUNDING_SPOTS_TOTAL, LAUNCH_MONTH } from "@/config";
import { useCounter } from "@/hooks/useCounter";
import "./tiers.css";

type Tier = {
  name: string;
  price: number;
  hours: string;
  days: string;
  window: string;
  fraction: number; /* needle position on the mini dial */
  red?: boolean;
};

const TIERS: Tier[] = [
  { name: "Ignition", price: 275, hours: "72 hours", days: "3 days a month", window: "4 weeks", fraction: 0.22 },
  { name: "Rev", price: 500, hours: "144 hours", days: "6 days a month", window: "6 weeks", fraction: 0.5 },
  { name: "Red Line", price: 700, hours: "216 hours", days: "9 days a month", window: "8 weeks", fraction: 0.86, red: true },
  { name: "Apex Unlimited", price: 1500, hours: "Unlimited", days: "No cap", window: "4 months", fraction: 1 },
];

/* tiny tachometer glyph; needle angle maps the tier's place in the range */
function TierDial({ fraction, red }: { fraction: number; red?: boolean }) {
  const start = -210;
  const sweep = 240;
  const deg = start + fraction * sweep;
  const rad = (deg * Math.PI) / 180;
  const x = 28 + 17 * Math.cos(rad);
  const y = 28 + 17 * Math.sin(rad);
  return (
    <svg className="tier-dial" viewBox="0 0 56 56" width="56" height="56" aria-hidden="true">
      <path
        d="M 13.3 39.5 A 21 21 0 1 1 42.7 39.5"
        fill="none"
        stroke="rgba(244,241,234,0.18)"
        strokeWidth="1.5"
      />
      <path
        d="M 40.3 15.7 A 21 21 0 0 1 42.7 39.5"
        fill="none"
        stroke="rgba(230,57,43,0.7)"
        strokeWidth="2"
      />
      <line
        x1="28"
        y1="28"
        x2={x}
        y2={y}
        stroke={red || fraction >= 0.99 ? "var(--av-redline)" : "var(--av-ember)"}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="2.4" fill="none" stroke="rgba(244,241,234,0.4)" strokeWidth="1" />
    </svg>
  );
}

export default function Tiers() {
  const { remaining, closed } = useCounter();

  return (
    <section className="tiers" id="tiers">
      <div className="tiers-inner">
        <Reveal>
          <p className="gauge">Membership</p>
          <h2 className="tiers-title">Pick your pace.</h2>
          <p className="tiers-sub">
            {closed ? (
              <>Launches {LAUNCH_MONTH}. Founding intake is closed.</>
            ) : (
              <>
                Launches {LAUNCH_MONTH}. Tiers open to members at launch, and{" "}
                <span className="tiers-count">
                  {remaining} of {FOUNDING_SPOTS_TOTAL}
                </span>{" "}
                founding places remain.
              </>
            )}
          </p>
        </Reveal>

        <div className="tiers-rows">
          {TIERS.map((t) => (
            <Reveal
              key={t.name}
              className={`tier-row${t.red ? " tier-row--red" : ""}`}
            >
              <TierDial fraction={t.fraction} red={t.red} />
              <div className="tier-id">
                <h3 className="tier-title">{t.name}</h3>
                <p className="tier-rate">
                  £{t.price.toLocaleString("en-GB")}
                  <span> / month</span>
                </p>
              </div>
              <dl className="tier-specs">
                <div>
                  <dt className="gauge gauge--dim">Driving</dt>
                  <dd>{t.hours}</dd>
                </div>
                <div>
                  <dt className="gauge gauge--dim">Cadence</dt>
                  <dd>{t.days}</dd>
                </div>
                <div>
                  <dt className="gauge gauge--dim">Booking</dt>
                  <dd>{t.window}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="tiers-foot">
            A one-time £275 joining fee applies at launch. Founding members
            never pay it, now or ever.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
