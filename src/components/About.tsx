import Reveal from "./Reveal";

export default function About() {
  return (
    <div className="about-outer" id="about">
      <div className="section-inner">
        <p className="section-label">Our Ethos</p>
        <div className="about-grid">
          <Reveal>
            <h2 className="about-heading">
              The death of
              <br />
              the dial.
            </h2>
          </Reveal>
          <Reveal delay={1} className="about-body">
            <p>
              Finding a car with soul is harder than it should be. We&apos;re sold screens
              instead of steering feel. Software instead of spirit. The mechanical symphony of
              a V8 traded for the synthetic hum of a battery.
            </p>
            <p>
              <em>Apex Vault is the antidote.</em>
            </p>
            <p>
              A Glasgow-based sanctuary for the analog age. We celebrate peak engineering
              &mdash; mid-90s to mid-00s &mdash; when build quality meant something and every
              gear change was a conversation. Not just a garage. A preservation of the driving
              experience.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
