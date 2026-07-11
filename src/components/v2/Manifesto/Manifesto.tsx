"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";
import { useMotionTier } from "../MotionGate";
import "./manifesto.css";

/*
 * "The Death of the Dial" — pinned kinetic-type manifesto.
 * One viewport, ~320% of scroll scrubbed through four movements:
 *   1. the hook line
 *   2. three indictments, each dimming the last
 *   3. the climax title with a red line that draws flat then tilts,
 *      a flatline becoming a needle
 *   4. the resolve, in amber
 * On the static tier nothing pins; all copy reads top to bottom.
 */
export default function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      if (
        !root.current ||
        tier === "static" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;

      const q = gsap.utils.selector(root);

      /* make the staged copy visible to GSAP, hidden states are set here,
         not in CSS, so no-JS users see everything */
      gsap.set(q("[data-mnf]"), { autoAlpha: 1 });

      const hook = new SplitText(q(".mnf-hook"), { type: "words" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: q(".mnf-stage")[0],
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      /* 1 — hook in, word by word */
      tl.from(hook.words, {
        yPercent: 130,
        autoAlpha: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power2.out",
      })
        .to(q(".mnf-hook"), { autoAlpha: 0, y: -60, duration: 0.7 }, "+=0.5")

        /* 2 — indictments */
        .from(
          q(".mnf-charge"),
          {
            autoAlpha: 0,
            y: 46,
            stagger: 0.55,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.15",
        )
        .to(
          q(".mnf-charge:not(:last-child)"),
          { color: "var(--av-ash)", stagger: 0.55, duration: 0.4 },
          "<+=0.55",
        )
        .to(
          q(".mnf-charges"),
          { autoAlpha: 0, y: -60, duration: 0.7 },
          "+=0.6",
        )

        /* 3 — climax: title + flatline that becomes a needle */
        .from(
          q(".mnf-title-line"),
          {
            yPercent: 110,
            stagger: 0.18,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.2",
        )
        .fromTo(
          q(".mnf-flatline"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
          "<+=0.4",
        )
        .to(
          q(".mnf-flatline"),
          { rotation: -24, duration: 0.5, ease: "power2.out" },
          "+=0.3",
        )
        .to(
          q(".mnf-flatline"),
          { rotation: -18, duration: 0.3, ease: "power1.inOut" },
        )

        /* 4 — resolve */
        .from(
          q(".mnf-resolve"),
          { autoAlpha: 0, y: 30, duration: 0.6, ease: "power2.out" },
          "+=0.4",
        )
        .to({}, { duration: 0.8 }); /* hold before unpin */

      return () => {
        hook.revert();
      };
    },
    { scope: root, dependencies: [tier] },
  );

  return (
    <section ref={root} className="mnf" id="about">
      <div className="mnf-stage">
        <p className="gauge gauge--dim mnf-eyebrow">Our ethos</p>

        <h2 className="mnf-hook" data-mnf>
          Somewhere along the way, cars stopped talking to you.
        </h2>

        <div className="mnf-charges" data-mnf>
          <p className="mnf-charge">Steering went light.</p>
          <p className="mnf-charge">Dials became screens.</p>
          <p className="mnf-charge">The feel got filtered out.</p>
        </div>

        <div className="mnf-climax" data-mnf>
          <h3 className="mnf-title">
            <span className="mnf-title-mask">
              <span className="mnf-title-line">THE DEATH</span>
            </span>
            <span className="mnf-title-mask">
              <span className="mnf-title-line">OF THE DIAL</span>
            </span>
          </h3>
          <div className="mnf-flatline" aria-hidden="true" />
          <p className="mnf-resolve" data-mnf>
            Not in this garage.
          </p>
        </div>
      </div>

      <div className="mnf-ethos">
        <p>
          We think road car engineering peaked between 1995 and 2005.
          Hydraulic steering. Gated shifts. Cables and cams instead of code.
          The fleet is built from that window: cars you drive with your hands
          and hear with your chest.
        </p>
      </div>
    </section>
  );
}
