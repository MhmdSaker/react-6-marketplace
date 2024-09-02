import { Link } from "react-router-dom";
import About from "./About";
import ProductTable from "./ProductTable";

const NavBar = () => {


  return (
    <>
      <div className="navContainer">
        <h1 className="heading">Clother.</h1>
        <ul>
          <Link className="link" to="/">Our Products</Link>
          <Link className="link" to="/products-table">Table</Link>
          <Link className="link" to="/about-us">About Us</Link>
          <Link className="link" to="/products/add">Add Product</Link>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
