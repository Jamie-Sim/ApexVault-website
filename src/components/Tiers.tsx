"use client";

import Reveal from "./Reveal";
import { FOUNDING_SPOTS_TOTAL, LAUNCH_MONTH } from "@/config";
import { useCounter } from "@/hooks/useCounter";

type Tier = {
  name: string;
  price: number;
  hours: string;
  days: string;
  window: string;
};

const tiers: Tier[] = [
  { name: "Ignition", price: 275, hours: "72 hours", days: "3 days / month", window: "4 weeks" },
  { name: "Rev", price: 500, hours: "144 hours", days: "6 days / month", window: "6 weeks" },
  { name: "Red Line", price: 700, hours: "216 hours", days: "9 days / month", window: "8 weeks" },
  { name: "Apex Unlimited", price: 1500, hours: "Unlimited", days: "No cap", window: "4 months" },
];

export default function Tiers() {
  const { remaining, closed } = useCounter();

  return (
    <div className="tiers-outer" id="tiers">
      <div className="section-inner">
        <p className="section-label no-dash" style={{ justifyContent: "center", width: "100%" }}>
          Membership
        </p>
        <Reveal>
          <h2 className="tiers-heading">The tiers, from launch.</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="tiers-scarcity">
            {closed ? (
              <>Launches {LAUNCH_MONTH} &mdash; founding intake closed.</>
            ) : (
              <>
                Launches {LAUNCH_MONTH} &mdash; {remaining} of {FOUNDING_SPOTS_TOTAL} founding
                places remain.
              </>
            )}
          </p>
          <p className="tiers-scarcity tiers-subnote">
            Tiers open to members after launch. Lock in your founding spot below.
          </p>
        </Reveal>

        <Reveal delay={2} className="tiers-grid">
          {tiers.map((t) => (
            <div key={t.name} className="tier-card">
              <p className="tier-name">{t.name}</p>
              <p className="tier-price">
                £{t.price.toLocaleString("en-GB")}
                <span className="tier-price-suffix">/ month</span>
              </p>
              <ul className="tier-meta">
                <li>
                  <span className="tier-meta-label">Driving</span>
                  <span>{t.hours}</span>
                </li>
                <li>
                  <span className="tier-meta-label">Days</span>
                  <span>{t.days}</span>
                </li>
                <li>
                  <span className="tier-meta-label">Booking advance</span>
                  <span>{t.window}</span>
                </li>
              </ul>
            </div>
          ))}
        </Reveal>

        <p className="tiers-note">
          Concierge drop-off and collection available across Scotland. Additional fees apply.
        </p>
      </div>
    </div>
  );
}
