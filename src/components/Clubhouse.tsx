import Reveal from "./Reveal";

export default function Clubhouse() {
  return (
    <div className="clubhouse-outer" id="clubhouse">
      <div className="section-inner">
        <p className="section-label no-dash" style={{ justifyContent: "center", width: "100%" }}>
          What&apos;s Next
        </p>
        <Reveal className="clubhouse-inner">
          <h2 className="clubhouse-heading">
            Phase 2 &mdash; <em>The Social Sanctuary.</em>
          </h2>
          <p className="clubhouse-body">
            The Vault is more than a garage. We&apos;re developing the clubhouse &mdash; a
            private bar, café, and gym. A place to talk shop with people who get it.
          </p>
          <p className="clubhouse-body">
            Follow the build on YouTube and socials. Watch the fleet come to life, from the
            MR2 custom build to the XKR restoration.
          </p>
          <div className="socials-row">
            <a href="#" aria-label="YouTube">
              YouTube
            </a>
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
            <a href="#" aria-label="TikTok">
              TikTok
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
