export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <ul>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#what-we-do">What We Do</a>
          </li>
          <li>
            <a href="#waitlist" className="nav-join">
              Get on the List
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
