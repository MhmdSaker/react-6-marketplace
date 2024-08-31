import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import {Routes, Route} from 'react-router-dom'
import About from "./components/About";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import SingProd from "./components/SingProd";





function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/products/:id" element={<SingProd />} />
      </Routes>
    </>
  );
}

export default App;
