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
      </div>
    </footer>
  );
}
