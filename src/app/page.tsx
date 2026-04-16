import VaultOverlay from "@/components/VaultOverlay/VaultOverlay";
import BgOrbs from "@/components/BgOrbs";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  return (
    <>
      <VaultOverlay />
      <BgOrbs />
      <Nav />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
