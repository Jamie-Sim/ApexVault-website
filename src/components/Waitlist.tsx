"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";

export default function Waitlist() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="waitlist-outer" id="waitlist">
      <div className="waitlist-inner-wrap">
        <Reveal>
          <p className="section-label no-dash" style={{ justifyContent: "center" }}>
            Join the Club
          </p>
          <h2 className="waitlist-heading">
            We&apos;re not open yet.
            <br />
            <em>Be the first to know.</em>
          </h2>
          <p className="waitlist-desc">
            Apex Vault is building its member list. Get your name on it and we&apos;ll be in touch
            when we&apos;re ready to go &mdash; including a say in how things are run from the
            start.
          </p>
        </Reveal>

        <Reveal delay={1} className="waitlist-card">
          {submitted ? (
            <div className="success-msg" style={{ display: "block" }}>
              You&apos;re on the list. We&apos;ll be in touch when we&apos;re ready to roll &mdash;
              no spam, just a note when the time comes.
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
              <button type="submit" className="submit-btn">
                Get on the List
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={2}>
          <p className="waitlist-note">
            We don&apos;t send newsletters. We won&apos;t sell your details. One message, when
            we&apos;re ready to go.
          </p>
        </Reveal>
      </div>
    </div>
  );
}
