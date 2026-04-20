"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import { FOUNDING_FEE_GBP, FOUNDING_SPOTS_TOTAL, LAUNCH_MONTH } from "@/config";
import { useCounter } from "@/hooks/useCounter";

const perks = [
  "Permanent exemption from all future joining fees.",
  "Lifetime VIP access to The Drive Club meetups and unveilings.",
  "Early access to Vault Builds on YouTube.",
  "First-look and first-drive at every new fleet addition.",
];

type SubmitStatus = "pending_payment" | "waitlist";

export default function Waitlist() {
  const counter = useCounter();
  const intakeClosed = counter.closed;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedAs, setSubmittedAs] = useState<SubmitStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data: { ok: boolean; status?: SubmitStatus; error?: string } = await res
        .json()
        .catch(() => ({ ok: false, error: "Unexpected response." }));

      if (!res.ok || !data.ok || !data.status) {
        setError(data.error ?? "Could not submit. Try again shortly.");
        setSubmitting(false);
        return;
      }

      setSubmittedAs(data.status);
    } catch {
      setError("Network error. Try again shortly.");
      setSubmitting(false);
    }
  };

  const headingRemaining = counter.remaining;
  const buttonLabel = intakeClosed ? "Join Waitlist" : "Secure Founding Membership";

  return (
    <div className="waitlist-outer" id="join">
      <div className="waitlist-inner-wrap">
        <Reveal>
          <p className="section-label no-dash" style={{ justifyContent: "center" }}>
            {intakeClosed ? "Launch Waitlist" : "Founding Members"}
          </p>
          {intakeClosed ? (
            <h2 className="waitlist-heading">
              Founding intake closed.
              <br />
              <em>Join the launch waitlist.</em>
            </h2>
          ) : (
            <h2 className="waitlist-heading">
              Secure your spot.
              <br />
              <em>
                {headingRemaining} of {FOUNDING_SPOTS_TOTAL} remain.
              </em>
            </h2>
          )}
          {intakeClosed ? (
            <p className="waitlist-desc">
              All {FOUNDING_SPOTS_TOTAL} founding places are committed. Leave your details to
              be first in line when public memberships open in {LAUNCH_MONTH}.
            </p>
          ) : (
            <p className="waitlist-desc">
              Memberships are strictly limited by fleet size. A £{FOUNDING_FEE_GBP} founding fee
              locks in your place before public intake opens in {LAUNCH_MONTH}. Full refund if the
              launch doesn&apos;t proceed.
            </p>
          )}
          {!intakeClosed && (
            <ul className="perks-list">
              {perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal delay={1} className="waitlist-card">
          {submittedAs ? (
            <div className="success-msg" style={{ display: "block" }}>
              {submittedAs === "pending_payment" ? (
                <>
                  You&apos;re on the founding list. Ross will be in touch within 48 hours with
                  payment details &mdash; no spam, just the call to action when it&apos;s time.
                </>
              ) : (
                <>
                  Founding intake is closed, but you&apos;re on the waitlist for public launch
                  in {LAUNCH_MONTH}. We&apos;ll reach out the moment a spot opens.
                </>
              )}
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ textAlign: "left" }}>
              <div className="form-row">
                <div className="form-group">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="James"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Mitchell"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  placeholder="james@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? "Sending…" : buttonLabel}
              </button>
              {error && (
                <p
                  role="alert"
                  style={{
                    marginTop: "0.75rem",
                    color: "#e8eaf0",
                    fontSize: "0.85rem",
                    opacity: 0.8,
                  }}
                >
                  {error}
                </p>
              )}
            </form>
          )}
        </Reveal>

        <Reveal delay={2}>
          <p className="waitlist-note">
            No newsletters. No sold details. One message when it&apos;s time to pay &mdash; and
            full refund if the launch doesn&apos;t happen.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
