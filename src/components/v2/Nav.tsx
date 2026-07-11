"use client";

import { useEffect, useState } from "react";
import { useScrollTo } from "./SmoothScrollProvider";
import "./nav.css";

const LINKS = [
  { href: "#about", label: "Ethos" },
  { href: "#fleet", label: "Fleet" },
  { href: "#tiers", label: "Membership" },
];

export default function Nav() {
  const scrollTo = useScrollTo();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <header className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <a
        className="nav-brand"
        href="#top"
        aria-label="Apex Vault, back to top"
        onClick={(e) => go(e, "#top")}
      >
        AV
      </a>
      <nav className="nav-links" aria-label="Site">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)}>
            {l.label}
          </a>
        ))}
      </nav>
      <a className="nav-cta" href="#join" onClick={(e) => go(e, "#join")}>
        Join
      </a>
    </header>
  );
}
