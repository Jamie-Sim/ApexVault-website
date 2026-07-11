import "../v2.css";
import SmoothScrollProvider from "@/components/v2/SmoothScrollProvider";
import { MotionGate } from "@/components/v2/MotionGate";
import Ignition from "@/components/v2/Ignition/Ignition";
import SmokeTest from "@/components/v2/SmokeTest";

/* Dev build route for the v2 redesign. Swapped into "/" when complete. */
export default function V2Page() {
  return (
    <MotionGate>
      <SmoothScrollProvider>
        <main className="av2">
          <Ignition />
          <SmokeTest />
        </main>
      </SmoothScrollProvider>
    </MotionGate>
  );
}
