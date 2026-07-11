import "./footer.css";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot-inner">
        <p className="foot-brand">APEX VAULT</p>
        <p className="gauge gauge--dim foot-line">
          The Drive Society · Glasgow · © 2026
        </p>
        <nav className="foot-links" aria-label="Footer">
          <a href="#about">Ethos</a>
          <a href="#fleet">Fleet</a>
          <a href="#tiers">Membership</a>
          <a href="#join">Join</a>
        </nav>
        <p className="foot-credits">
          Fleet photography via{" "}
          <a href="https://commons.wikimedia.org/wiki/File:2007_B7_RS4_Phantom_Black.jpg">
            RS4 Power (CC BY-SA 3.0)
          </a>
          ,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:2003_Ford_Focus_RS_(40212921751).jpg">
            Kieran White (CC BY 2.0)
          </a>
          ,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:2002_Toyota_MR2_1.8_Front.jpg">
            Vauxford (CC BY-SA 4.0)
          </a>
          ,{" "}
          <a href="https://commons.wikimedia.org/wiki/File:2003_Jaguar_XKR_green.jpg">
            Kees Janssens (CC0)
          </a>{" "}
          and{" "}
          <a href="https://commons.wikimedia.org/wiki/File:2004_Lotus_Elise_111S.jpg">
            Calreyn88 (CC BY-SA 4.0)
          </a>
          , Wikimedia Commons. Images graded.
        </p>
      </div>
    </footer>
  );
}
