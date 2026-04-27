import Image from "next/image";
import Reveal from "./Reveal";
import mockup from "@/../BrandAssets/ApexVault_Mockup_02.png";

const fleet = ["RS4 B7", "Focus RS", "MR2", "XKR", "Lotus Elise"];

export default function MemberCars() {
  return (
    <div className="cars-outer" id="fleet">
      <div className="cars-bg" aria-hidden="true">
        <Image
          src={mockup}
          alt=""
          fill
          sizes="100vw"
          quality={90}
          className="cars-bg-img"
        />
        <div className="cars-bg-overlay" />
      </div>

      <div className="section-inner cars-inner">
        <p className="section-label">The Fleet</p>
        <Reveal>
          <h2 className="fleet-heading">Peak engineering. Pick your machine.</h2>
        </Reveal>
        <p className="fleet-launch-label">Launch line-up</p>
      </div>

      <div className="fleet-marquee" role="marquee" aria-label={`Launch line-up: ${fleet.join(", ")}`}>
        <ul className="fleet-marquee-track" aria-hidden="true">
          {[...fleet, ...fleet].map((name, i) => (
            <li key={i} className="fleet-marquee-item">
              <span className="fleet-marquee-name">{name}</span>
              <span className="fleet-marquee-sep" aria-hidden="true">·</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
