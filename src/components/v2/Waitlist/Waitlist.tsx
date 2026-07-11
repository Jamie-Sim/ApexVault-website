"use client";

import { useState, type FormEvent } from "react";
import Reveal from "../Reveal";
import { FOUNDING_FEE_GBP, FOUNDING_SPOTS_TOTAL, LAUNCH_MONTH } from "@/config";
import { useCounter } from "@/hooks/useCounter";
import "./waitlist.css";

const PERKS = [
  "Never pay a joining fee, now or at any point later.",
  "Lifetime VIP access to The Drive Club meetups and unveilings.",
  "Early access to Vault Builds on YouTube.",
  "First look and first drive of every new fleet addition.",
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
  const buttonLabel = intakeClosed ? "Join the waitlist" : "Secure founding membership";

  return (
    <section className="join" id="join">
      <div className="join-inner">
        <Reveal className="join-left">
          <p className="gauge">
            {intakeClosed ? "Launch waitlist" : "Founding members"}
          </p>

          {intakeClosed ? (
            <h2 className="join-heading">
              Founding intake closed.
              <br />
              Join the launch waitlist.
            </h2>
          ) : (
            <h2 className="join-heading">
              Take a founding place.
              <br />
              <span className="join-heading-count">
                {headingRemaining} of {FOUNDING_SPOTS_TOTAL} remain.
              </span>
            </h2>
          )}

          {intakeClosed ? (
            <p className="join-desc">
              All {FOUNDING_SPOTS_TOTAL} founding places are committed. Leave
              your details to be first in line when public memberships open in{" "}
              {LAUNCH_MONTH}.
            </p>
          ) : (
            <p className="join-desc">
              Memberships are strictly limited by fleet size. A £
              {FOUNDING_FEE_GBP} founding fee locks in your place before public
              intake opens in {LAUNCH_MONTH}. Full refund if the launch
              doesn&apos;t proceed.
            </p>
          )}

          {!intakeClosed && (
            <ul className="join-perks">
              {PERKS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
        </Reveal>

        <Reveal className="join-card" y={56}>
          {submittedAs ? (
            <div className="join-success" role="status">
              <p className="gauge">
                {submittedAs === "pending_payment"
                  ? "Founding place reserved"
                  : "On the waitlist"}
              </p>
              <p className="join-success-body">
                {submittedAs === "pending_payment" ? (
                  <>
                    You&apos;re on the founding list. Ross will be in touch
                    within 48 hours with payment details. No spam, just the one
                    message that matters.
                  </>
                ) : (
                  <>
                    Founding intake is closed, but you&apos;re on the waitlist
                    for public launch in {LAUNCH_MONTH}. We&apos;ll reach out
                    the moment a place opens.
                  </>
                )}
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit}>
              <div className="join-row">
                <div className="join-field">
                  <label htmlFor="join-first" className="gauge gauge--dim">
                    First name
                  </label>
                  <input
                    id="join-first"
                    type="text"
                    placeholder="James"
                    autoComplete="given-name"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="join-field">
                  <label htmlFor="join-last" className="gauge gauge--dim">
                    Last name
                  </label>
                  <input
                    id="join-last"
                    type="text"
                    placeholder="Mitchell"
                    autoComplete="family-name"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="join-field">
                <label htmlFor="join-email" className="gauge gauge--dim">
                  Email address
                </label>
                <input
                  id="join-email"
                  type="email"
                  placeholder="james@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="av-btn join-submit"
                disabled={submitting}
              >
                {submitting ? "Sending…" : buttonLabel}
              </button>
              {error && (
                <p role="alert" className="join-error">
                  {error}
                </p>
              )}
            </form>
          )}

          <p className="join-note">
            No newsletters. No sold details. One message when it&apos;s time to
            pay, and a full refund if the launch doesn&apos;t happen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
