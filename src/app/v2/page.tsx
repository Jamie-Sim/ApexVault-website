import "../v2.css";
import SmoothScrollProvider from "@/components/v2/SmoothScrollProvider";
import { MotionGate } from "@/components/v2/MotionGate";
import Ignition from "@/components/v2/Ignition/Ignition";
import Nav from "@/components/v2/Nav";
import Hero from "@/components/v2/Hero/Hero";
import Manifesto from "@/components/v2/Manifesto/Manifesto";
import Fleet from "@/components/v2/Fleet/Fleet";
import Perks from "@/components/v2/Perks";
import Tiers from "@/components/v2/Tiers";
import Clubhouse from "@/components/v2/Clubhouse";
import FounderNote from "@/components/v2/FounderNote";
import Waitlist from "@/components/v2/Waitlist/Waitlist";
import Footer from "@/components/v2/Footer";

/* Dev build route for the v2 redesign. Swapped into "/" when complete. */
export default function V2Page() {
  return (
    <MotionGate>
      <SmoothScrollProvider>
        <main className="av2">
          <Ignition />
          <Nav />
          <Hero />
          <Manifesto />
          <Fleet />
          <Perks />
          <Tiers />
          <FounderNote />
          <Clubhouse />
          <Waitlist />
          <Footer />
        </main>
      </SmoothScrollProvider>
    </MotionGate>
  );
}
