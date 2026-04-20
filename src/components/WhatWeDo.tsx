import Reveal from "./Reveal";

type Item = { title: string; desc: string };

const items: Item[] = [
  {
    title: "The Apex Fuel Card",
    desc: "Fleet cards, billed back at cost on your monthly invoice. No markup. No admin. More bang for your buck.",
  },
  {
    title: "Member Repair Plan",
    desc: "We don't chase you for stone chips or standard wear. Major mishap? Interest-free finance over your membership term — no upfront sting.",
  },
  {
    title: "The Pit Check",
    desc: "Every car gets an overnight inspection between members. Peak performance, safety, and a showroom-ready finish before you turn the key.",
  },
];

export default function WhatWeDo() {
  return (
    <div className="fleet-outer" id="peace-of-mind">
      <div className="section-inner">
        <div className="fleet-header">
          <p
            className="section-label no-dash"
            style={{ marginBottom: 0, justifyContent: "center", width: "100%" }}
          >
            Peace of Mind
          </p>
        </div>

        <Reveal>
          <h2 className="wwd-heading">All the thrill. None of the niggles.</h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="wwd-intro">
            Owning a modern classic in Scotland is a labor of love &mdash; mostly labor. The
            heated garage, the moisture control, the specialist mechanic, the insurance. We
            take the hit. You take the keys.
          </p>
        </Reveal>

        <div className="what-we-do-list">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i as 0 | 1 | 2} className="wwd-item">
              <h3 className="wwd-title">{item.title}</h3>
              <p className="wwd-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
