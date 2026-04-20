"use client";

import { FOUNDING_SPOTS_TOTAL } from "@/config";
import { useCounter } from "@/hooks/useCounter";

export default function Hero() {
  const { remaining, closed } = useCounter();

  return (
    <div className="hero-wrap">
      <h1 className="hero-brand">Apex Vault</h1>
      <p className="hero-city">Glasgow</p>
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
  );
}
