import Reveal from "./Reveal";
import "./clubhouse.css";

export default function Clubhouse() {
  return (
    <section className="club" id="clubhouse">
      <div className="club-inner">
        <Reveal>
          <p className="gauge">What&apos;s next</p>
          <h2 className="club-heading">
            Phase two: <span className="club-em">the clubhouse.</span>
          </h2>
          <p className="club-body">
            The Vault is more than a garage. Somewhere to talk shop with
            people who get it.
          </p>
          <p className="club-body">
            The fleet builds will be documented along the way, from the MR2
            custom build to the XKR restoration.
          </p>
          <div className="club-socials">
            <span className="gauge gauge--dim">Follow the build</span>
            <span className="club-socials-links">
              YouTube · Instagram · TikTok
              <span className="gauge gauge--dim club-soon"> · Launching soon</span>
            </span>
          </div>
        </Reveal>

        <Reveal className="club-board" y={30}>
          <p className="gauge gauge--dim">On the drawing board</p>
          <ul className="club-board-list">
            <li>Private bar</li>
            <li>Café</li>
            <li>Gym</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
