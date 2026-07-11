import "../v2.css";
import SmoothScrollProvider from "@/components/v2/SmoothScrollProvider";
import { MotionGate } from "@/components/v2/MotionGate";
import Ignition from "@/components/v2/Ignition/Ignition";
import Hero from "@/components/v2/Hero/Hero";

/* Dev build route for the v2 redesign. Swapped into "/" when complete. */
export default function V2Page() {
  return (
    <MotionGate>
      <SmoothScrollProvider>
        <main className="av2">
          <Ignition />
          <Hero />
          {/* temporary scroll runway while sections are built */}
          <div style={{ height: "180vh" }} />
        </main>
      </SmoothScrollProvider>
    </MotionGate>
  );
}
