import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTable,
  faInfoCircle,
  faPlus,
  faToggleOn,
  faToggleOff,
  faCartShopping,
  faShoppingCart,
  faShoppingBasket
} from "@fortawesome/free-solid-svg-icons";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const linkStyle = {
    color: theme === "light" ? "#000" : "#fff",
    textDecoration: "none",
  };

  return (
    <>
      <div
        className="navContainer"
        style={{
          background: theme === "light" ? "#fff" : "#111",
          color: theme === "light" ? "#111" : "#fff",
        }}
      >
        <h1 className="heading">Clother.</h1>
        <ul>
          <Link style={linkStyle} className="link" to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
          <Link style={linkStyle} className="link" to="/products-table">
            <FontAwesomeIcon icon={faTable} />
          </Link>
          <Link style={linkStyle} className="link" to="/about-us">
            <FontAwesomeIcon icon={faInfoCircle} />
          </Link>
          <Link style={linkStyle} className="link" to="/products/add">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
          <Link style={linkStyle} className="link" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <button
            onClick={toggleTheme}
            className={`link`}
            style={{
              color: theme === "light" ? "#111" : "#fff",
              boxShadow: "none",
              backgroundColor: "transparent",
              border: "none",
            }}
          >
            {theme === 'light' ? <FontAwesomeIcon icon={faToggleOn}/> : <FontAwesomeIcon icon={faToggleOff}/>}
          </button>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
