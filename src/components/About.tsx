import Reveal from "./Reveal";

export default function About() {
  return (
    <div className="about-outer" id="about">
      <div className="section-inner">
        <p className="section-label">What is Apex Vault</p>
        <div className="about-grid">
          <Reveal>
            <h2 className="about-heading">
              Built by drivers,
              <br />
              for drivers.
            </h2>
          </Reveal>
          <Reveal delay={1} className="about-body">
            <p>
              Apex Vault is a private car club for people who buy cars to drive them. That&apos;s
              it. Whether you&apos;re daily-driving an M3 or keeping an Evo on a private plate for
              weekends &mdash; if you love how a car feels on a proper road, you&apos;ll fit right
              in.
            </p>
            <p>
              There&apos;s no entry criteria based on what you drive or what it cost. Just a shared
              appreciation for cars that were built to go, not to sit on a driveway looking the
              part.
            </p>
            <p>
              The club is small by design. A few organised runs through decent roads, a casual meet
              or two, and a group chat that&apos;s actually worth checking. We&apos;re not trying
              to be the biggest car club in Scotland &mdash; just one worth being part of.
            </p>
            <p>
              We&apos;re currently building the member list. Once we&apos;re ready, we&apos;ll get
              the first run organised and take it from there.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
