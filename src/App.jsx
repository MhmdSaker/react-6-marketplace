import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import {Routes, Route, Link} from 'react-router-dom'
import About from "./components/About";
import ProductList from "./components/ProductList";
import Product from "./components/Product";
import SingProd from "./components/SingProd";
import ProductTable from "./components/ProductTable";






function App() {
  return (
    <>
      <NavBar />




      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path=":id" element={<SingProd />} />
        </Route>
        <Route path="/products-table" element={<ProductTable/>}></Route>
        <Route path="/about-us" element={<About />} />
        

      </Routes>
    </>
  );
}

export default App;
