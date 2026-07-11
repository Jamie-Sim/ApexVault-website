import Reveal from "./Reveal";
import "./foundernote.css";

export default function FounderNote() {
  return (
    <section className="founder">
      <Reveal className="founder-wrap">
        <p className="gauge founder-eyebrow">From the founder</p>
        <blockquote className="founder-quote editorial">
          <p>
            &ldquo;I&rsquo;ve owned everything from imported Datsuns to RS4s.
            I&rsquo;ve driven the £200k supercars, and they&rsquo;re
            impressive. They aren&rsquo;t always fun.
          </p>
          <p>
            I built Apex Vault to get back to the grit: fast hot hatches,
            analog dials, cars you can actually push. Just a guy who hates
            screens and loves the drive. Welcome to the Society.&rdquo;
          </p>
        </blockquote>
        <cite className="founder-cite">
          <span className="founder-name">Ross Taylor</span>
          <span className="gauge gauge--dim">Founder · Apex Vault</span>
        </cite>
      </Reveal>
    </section>
  );
}
