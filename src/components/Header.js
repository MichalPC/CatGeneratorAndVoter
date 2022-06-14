import { Link } from "react-router-dom"
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <h1> Cat API App </h1>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/random">Random Image</Link>
      </div>
    </div>
  );
}

export default Header;
