import Reveal from "./Reveal";

export default function FounderNote() {
  return (
    <div className="founder-outer">
      <Reveal className="founder-inner">
        <blockquote>
          <p>
            {"\u201C"}I&apos;m a student of the road. From imported Datsuns to RS4s, I&apos;ve
            owned them all. I&apos;ve driven the £200k supercars, and they&apos;re impressive
            &mdash; but they aren&apos;t always <em>fun</em>.
          </p>
          <p>
            I built Apex Vault because I wanted to get back to the grit: fast hot hatches,
            analog dials, cars you can actually <em>push</em>. Just a guy who hates screens and
            loves the drive. Welcome to the Society.{"\u201D"}
          </p>
        </blockquote>
        <cite>Ross</cite>
      </Reveal>
    </div>
  );
}
