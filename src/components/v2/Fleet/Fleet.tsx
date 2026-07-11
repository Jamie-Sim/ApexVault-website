"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionTier } from "../MotionGate";
import { FLEET } from "./fleetData";
import "./fleet.css";

/*
 * The fleet — a pinned horizontal run through the five launch cars.
 * Desktop: the track scrubs sideways while the section pins; per-panel
 * details ride the containerAnimation. Mobile / static tier: native
 * horizontal scroll with snap points.
 */
export default function Fleet() {
  const root = useRef<HTMLElement>(null);
  const tier = useMotionTier();

  useGSAP(
    () => {
      if (!root.current || tier === "static") return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        const track = root.current!.querySelector<HTMLElement>(".fleet-track");
        if (!track) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        const scrollTween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        /* per-panel choreography riding the horizontal tween */
        gsap.utils.toArray<HTMLElement>(".fleet-car").forEach((panel) => {
          const bars = panel.querySelectorAll(".fleet-bar-fill");
          gsap.from(bars, {
            scaleX: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 65%",
            },
          });

          const name = panel.querySelector(".fleet-name");
          if (name) {
            gsap.fromTo(
              name,
              { xPercent: 12 },
              {
                xPercent: -6,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [tier] },
  );

  return (
    <section ref={root} className="fleet" id="fleet">
      <div className="fleet-track">
        <div className="fleet-intro">
          <p className="gauge">The fleet · launch line-up</p>
          <h2>
            Five cars.
            <br />
            Chosen for feel.
          </h2>
          <p className="fleet-intro-sub">
            Not lap times. Not spec sheets. Steering, sound and the shift in
            your palm. The garage grows with the membership.
          </p>
          <p className="gauge gauge--dim fleet-hint">Keep scrolling</p>
        </div>

        {FLEET.map((car) => (
          <article className="fleet-car" key={car.slug}>
            <div className="fleet-media">
              {car.image ? (
                <Image
                  src={car.image}
                  alt={car.fullName}
                  fill
                  sizes="(max-width: 768px) 92vw, 74vw"
                  className="fleet-img"
                />
              ) : (
                <div className="fleet-img fleet-img--slot" aria-hidden="true" />
              )}
              <div className="fleet-media-grade" aria-hidden="true" />
            </div>

            <div className="fleet-meta">
              <p className="gauge fleet-fullname">
                {car.fullName} · {car.years}
              </p>
              <h3 className="fleet-name">{car.name}</h3>
              <p className="fleet-line">{car.line}</p>

              <dl className="fleet-specs">
                <div className="fleet-spec">
                  <dt className="gauge gauge--dim">Engine</dt>
                  <dd>{car.engine}</dd>
                </div>
                <div className="fleet-spec">
                  <dt className="gauge gauge--dim">Power</dt>
                  <dd>{car.power}</dd>
                  <div className="fleet-bar">
                    <div className="fleet-bar-fill" />
                  </div>
                </div>
                <div className="fleet-spec">
                  <dt className="gauge gauge--dim">0-62</dt>
                  <dd>{car.sprint}</dd>
                  <div className="fleet-bar">
                    <div className="fleet-bar-fill" />
                  </div>
                </div>
                <div className="fleet-spec">
                  <dt className="gauge gauge--dim">Weight</dt>
                  <dd>{car.weight}</dd>
                </div>
                <div className="fleet-spec">
                  <dt className="gauge gauge--dim">Gearbox</dt>
                  <dd>{car.gearbox}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
