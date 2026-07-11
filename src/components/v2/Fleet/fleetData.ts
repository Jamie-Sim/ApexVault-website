/*
 * Launch line-up. Spec figures pending verification by research pass;
 * anything marked verify:false must be confirmed before go-live.
 */
export type FleetCar = {
  slug: string;
  name: string;
  fullName: string;
  years: string;
  engine: string;
  power: string;
  sprint: string; /* 0-62 mph */
  weight: string;
  gearbox: string;
  line: string; /* feel line, not a spec claim */
  image: string | null; /* /cars/<slug>.avif once graded, null = slot awaiting asset */
  credit?: string;
  verified: boolean;
};

export const FLEET: FleetCar[] = [
  {
    slug: "rs4",
    name: "RS4",
    fullName: "Audi RS4 B7",
    years: "2006",
    engine: "4.2 V8 · NA",
    power: "414 bhp",
    sprint: "4.8 s",
    weight: "1,650 kg",
    gearbox: "6-speed manual",
    line: "A V8 that revs to the sky and a chassis that lets you use it.",
    image: null,
    verified: false,
  },
  {
    slug: "focusrs",
    name: "FOCUS RS",
    fullName: "Ford Focus RS Mk1",
    years: "2002",
    engine: "2.0 turbo · I4",
    power: "212 bhp",
    sprint: "6.4 s",
    weight: "1,278 kg",
    gearbox: "5-speed manual",
    line: "Front-drive fury. It writhes, you grin, it grips.",
    image: null,
    verified: false,
  },
  {
    slug: "mr2",
    name: "MR2",
    fullName: "Toyota MR2 W30",
    years: "2000",
    engine: "1.8 · mid-engine",
    power: "138 bhp",
    sprint: "7.9 s",
    weight: "975 kg",
    gearbox: "5-speed manual",
    line: "A featherweight roadster with the engine behind your ears.",
    image: null,
    verified: false,
  },
  {
    slug: "xkr",
    name: "XKR",
    fullName: "Jaguar XKR X100",
    years: "1998",
    engine: "4.0 V8 · supercharged",
    power: "370 bhp",
    sprint: "5.2 s",
    weight: "1,640 kg",
    gearbox: "5-speed auto",
    line: "A supercharged grand tourer that whines like it means it.",
    image: null,
    verified: false,
  },
  {
    slug: "elise",
    name: "ELISE",
    fullName: "Lotus Elise S2",
    years: "2001",
    engine: "1.8 · K-series",
    power: "120 bhp",
    sprint: "5.8 s",
    weight: "860 kg",
    gearbox: "5-speed manual",
    line: "Steering so honest it feels wired to your fingertips.",
    image: null,
    verified: false,
  },
];
