export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#tiers">Tiers</a>
          </li>
          <li>
            <a href="#join" className="nav-join">
              Secure Spot
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
