import { Link } from "react-router-dom";
import About from "./About";

const NavBar = () => {


  return (
    <>
      <div className="navContainer">
        <h1 className="heading">Clother.</h1>
        <ul>
          <Link className="link" to="/">Our Products</Link>
          <Link className="link" to="/about-us">About Us</Link>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
