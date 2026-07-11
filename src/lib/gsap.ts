"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

/*
 * Single registration point for all GSAP plugins. Every v2 component
 * imports gsap/ScrollTrigger/SplitText/useGSAP from here, never from
 * the packages directly, so registration happens exactly once.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

ScrollTrigger.config({ ignoreMobileResize: true });

if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  (window as unknown as Record<string, unknown>).__ScrollTrigger = ScrollTrigger;
}

export { gsap, useGSAP, ScrollTrigger, SplitText };
