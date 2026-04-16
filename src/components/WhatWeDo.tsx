import Reveal from "./Reveal";

type Item = { title: string; desc: string };

const items: Item[] = [
  {
    title: "Organised drives",
    desc: "Scenic routes through proper roads — the kind you actually look forward to. No convoy of 50, no pace car, just a sensible group heading somewhere worth going.",
  },
  {
    title: "Casual meets",
    desc: "Turn up, have a look at each other's cars, have a coffee. Nothing formal. We're not doing trophies and marquees — just a decent excuse to get the car out.",
  },
  {
    title: "A proper group",
    desc: "A members chat for routes, tips, mechanical chat, and the occasional \u201Canyone fancy a run this weekend?\u201D message. Low noise, actually useful.",
  },
];

export default function WhatWeDo() {
  return (
    <div className="fleet-outer" id="what-we-do">
      <div className="section-inner">
        <div className="fleet-header">
          <p
            className="section-label no-dash"
            style={{ marginBottom: 0, justifyContent: "center", width: "100%" }}
          >
            What We Do
          </p>
        </div>

        <div className="what-we-do-list">
          {items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i as 0 | 1 | 2}
              className="wwd-item"
            >
              <h3 className="wwd-title">{item.title}</h3>
              <p className="wwd-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
