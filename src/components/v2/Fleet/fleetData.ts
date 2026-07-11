/*
 * Launch line-up. Figures verified against published UK-market specs
 * on 2026-07-11 (sources in the redesign notes). Sprint figures use the
 * metric each source actually published, named per row in sprintLabel.
 */
export type FleetCar = {
  slug: string;
  name: string;
  fullName: string;
  years: string;
  engine: string;
  power: string;
  sprint: string;
  sprintLabel: string;
  weight: string;
  gearbox: string;
  line: string; /* feel line, not a spec claim */
  image: string | null;
  credit: string;
  verified: boolean;
};

export const FLEET: FleetCar[] = [
  {
    slug: "rs4",
    name: "RS4",
    fullName: "Audi RS4 B7",
    years: "2006",
    engine: "4.2 V8 · naturally aspirated",
    power: "414 bhp",
    sprint: "4.8 s",
    sprintLabel: "0-62",
    weight: "1,650 kg",
    gearbox: "6-speed manual",
    line: "A V8 that revs past eight thousand and a chassis that lets you use it.",
    image: "/cars/rs4.avif",
    credit: "Photo: RS4 Power, Wikimedia Commons, CC BY-SA 3.0",
    verified: true,
  },
  {
    slug: "focusrs",
    name: "FOCUS RS",
    fullName: "Ford Focus RS Mk1",
    years: "2002",
    engine: "2.0 turbo · inline 4",
    power: "212 bhp",
    sprint: "6.7 s",
    sprintLabel: "0-62",
    weight: "1,278 kg",
    gearbox: "5-speed manual",
    line: "Front-drive fury. It writhes, you grin, it grips.",
    image: "/cars/focusrs.avif",
    credit: "Photo: Kieran White, Wikimedia Commons, CC BY 2.0",
    verified: true,
  },
  {
    slug: "mr2",
    name: "MR2",
    fullName: "Toyota MR2 W30",
    years: "2000",
    engine: "1.8 · mid-engine",
    power: "138 bhp",
    sprint: "7.7 s",
    sprintLabel: "0-60",
    weight: "975 kg",
    gearbox: "5-speed manual",
    line: "A featherweight roadster with the engine behind your ears.",
    image: "/cars/mr2.avif",
    credit: "Photo: Vauxford, Wikimedia Commons, CC BY-SA 4.0",
    verified: true,
  },
  {
    slug: "xkr",
    name: "XKR",
    fullName: "Jaguar XKR X100",
    years: "1998",
    engine: "4.0 V8 · supercharged",
    power: "370 bhp",
    sprint: "5.2 s",
    sprintLabel: "0-60",
    weight: "1,717 kg",
    gearbox: "5-speed auto",
    line: "A supercharged grand tourer that whines like it means it.",
    image: "/cars/xkr.avif",
    credit: "Photo: Kees Janssens, Wikimedia Commons, CC0",
    verified: true,
  },
  {
    slug: "elise",
    name: "ELISE",
    fullName: "Lotus Elise S2 111S",
    years: "2004",
    engine: "1.8 K-series VVC",
    power: "156 bhp",
    sprint: "5.1 s",
    sprintLabel: "0-60",
    weight: "880 kg",
    gearbox: "5-speed manual",
    line: "Steering so honest it feels wired to your fingertips.",
    image: "/cars/elise.avif",
    credit: "Photo: Calreyn88, Wikimedia Commons, CC BY-SA 4.0",
    verified: true,
  },
];
