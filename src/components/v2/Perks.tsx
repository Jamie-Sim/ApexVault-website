import Reveal from "./Reveal";
import "./perks.css";

const ITEMS = [
  {
    label: "Fuel",
    title: "The Apex Fuel Card",
    desc: "Fill up on the fleet card and it lands on your monthly invoice at cost. No markup, no admin.",
  },
  {
    label: "Repairs",
    title: "Member Repair Plan",
    desc: "Stone chips and normal wear are our problem, not yours. A major mishap goes on an interest-free plan across your membership term.",
  },
  {
    label: "Prep",
    title: "The Pit Check",
    desc: "Every car gets an overnight inspection between members. It reaches you healthy, safe and showroom clean.",
  },
  {
    label: "Delivery",
    title: "Concierge Drop-off",
    desc: "The car comes to you and goes home after, anywhere in Scotland. Additional fees apply.",
  },
];

export default function Perks() {
  return (
    <section className="perks" id="peace-of-mind">
      <div className="perks-inner">
        <Reveal>
          <p className="gauge">Peace of mind</p>
          <h2 className="perks-heading">
            All the thrill.
            <br />
            None of the niggles.
          </h2>
          <p className="perks-intro">
            Owning a modern classic in Scotland is a labour of love. Mostly
            labour. The heated garage, the moisture control, the specialist
            mechanic, the insurance. We take the hit. You take the keys.
          </p>
        </Reveal>

        <div className="perks-ledger">
          {ITEMS.map((item) => (
            <Reveal key={item.title} className="perks-row">
              <p className="gauge gauge--dim perks-row-label">{item.label}</p>
              <h3 className="perks-row-title">{item.title}</h3>
              <p className="perks-row-desc">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
