import Image, { type StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import focusRS from "@/../BrandAssets/FocusRS_Image.avif";
import nissanGTR from "@/../BrandAssets/NissanGTR.png";
import golfR32 from "@/../BrandAssets/GOLF R32.jpg";

type Car = {
  src: StaticImageData;
  alt: string;
  num: string;
  name: string;
  year: string;
  tags: string[];
  desc: string;
  imgStyle?: CSSProperties;
};

const cars: Car[] = [
  {
    src: focusRS,
    alt: "Ford Focus RS",
    num: "01",
    name: "Ford Focus RS",
    year: "Mk2 · 305bhp · AWD",
    tags: ["Hot Hatch", "Analog"],
    desc: "The kind of car that ruins you for everything else. Proper fast, properly loud, and completely impractical in the best possible way.",
  },
  {
    src: nissanGTR,
    alt: "Nissan GT-R",
    num: "02",
    name: "Nissan GT-R",
    year: "R35 · 2009 · AWD",
    tags: ["565 hp", "Twin-Turbo"],
    desc: "3.8-litre twin-turbo V6, AWD, 0–60 in 2.9 seconds. The kind of car that makes motorway junctions feel like a track day.",
    imgStyle: { objectFit: "cover", objectPosition: "center" },
  },
  {
    src: golfR32,
    alt: "Volkswagen Golf R32",
    num: "03",
    name: "VW Golf R32",
    year: "Mk5 · 250bhp · 4Motion",
    tags: ["VR6", "Analog"],
    desc: "The sound alone is worth the price of entry. A naturally aspirated VR6 with four-wheel drive and nothing to prove — one of the last great analog Golfs.",
    imgStyle: { objectPosition: "center 60%" },
  },
];

export default function MemberCars() {
  return (
    <div className="cars-outer" id="fleet">
      <div className="section-inner">
        <p className="section-label">The Fleet</p>
        <Reveal>
          <h2 className="fleet-heading">Peak engineering. Pick your machine.</h2>
        </Reveal>
        <Reveal delay={1} className="fleet-grid">
          {cars.map((car) => (
            <div key={car.num} className="car-card">
              <div className="car-img">
                <Image
                  src={car.src}
                  alt={car.alt}
                  fill
                  sizes="(max-width: 1100px) 100vw, 33vw"
                  style={car.imgStyle}
                />
              </div>
              <div className="car-info">
                <p className="car-num">{car.num}</p>
                <h3 className="car-name">{car.name}</h3>
                <p className="car-year">{car.year}</p>
                <div className="car-tags">
                  {car.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="car-desc">{car.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
        <p className="fleet-note">
          Launch line-up: RS4 B7 · Focus RS · MR2 · XKR · Lotus Elise.
        </p>
      </div>
    </div>
  );
}
