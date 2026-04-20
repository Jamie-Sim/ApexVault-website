import VaultOverlay from "@/components/VaultOverlay/VaultOverlay";
import BgOrbs from "@/components/BgOrbs";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import MemberCars from "@/components/MemberCars";
import WhatWeDo from "@/components/WhatWeDo";
import Tiers from "@/components/Tiers";
import Clubhouse from "@/components/Clubhouse";
import FounderNote from "@/components/FounderNote";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <VaultOverlay />
      <BgOrbs />
      <Nav />
      <main>
        <Hero />
        <About />
        <MemberCars />
        <WhatWeDo />
        <Tiers />
        <Clubhouse />
        <FounderNote />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
