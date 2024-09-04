import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);


  const linkStyle = {
    color: theme === 'light' ? '#000' : '#fff',
    textDecoration: 'none',
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
            Our Products
          </Link>
          <Link style={linkStyle} className="link" to="/products-table">
            Table
          </Link>
          <Link style={linkStyle} className="link" to="/about-us">
            About Us
          </Link>
          <Link style={linkStyle} className="link" to="/products/add">
            Add Product
          </Link>
          <button
            onClick={toggleTheme}
            className={`link`}
            style={{
              color: theme === 'light' ? '#111' : '#fff',
              boxShadow: "none",
              backgroundColor: "transparent",
              border: "none",
        
              
            }}
          >
            Toggle
          </button>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
