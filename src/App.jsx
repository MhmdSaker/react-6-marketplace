import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import About from "./components/About";
import ProductList from "./components/ProductList";
import SingProd from "./components/SingProd";
import ProductTable from "./components/ProductTable";
import NewProduct from "./components/NewProduct";
import EditProduct from "./components/EditProduct";
import ThemeProvider from "./components/ThemeContext";
import Cart from "./components/Cart";
import Product from "./components/Product";
import { CartProvider} from './components/CartContext'



function App() {
  return (
    <>
      <ThemeProvider>
        <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products">
            <Route index element={<ProductList />} />
            <Route path=":id" element={<SingProd />} />
            <Route path="edit/:id" element={<EditProduct />} />
            <Route path="add" element={<NewProduct />} />
          </Route>
          <Route path="/products-table" element={<ProductTable />}></Route>
          <Route path="/about-us" element={<About />} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
        </CartProvider>
      </ThemeProvider>

    </>
  );
}

export default App;
