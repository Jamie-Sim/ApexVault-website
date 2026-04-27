"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: 0 | 1 | 2 | 3;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export default function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (new URLSearchParams(window.location.search).has("showAll")) {
      el.classList.add("in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -24px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";
  const delayClass = delay ? ` d${delay}` : "";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal${delayClass}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}
