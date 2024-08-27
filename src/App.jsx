import { useEffect, useState } from "react";
import "./App.css";
import Product from "./components/Product";
import NavBar from "./components/Navbar";

function App() {
  const [products, setProducts] = useState([]);
  const apiUrl = "https://fakestoreapi.com/products";

  useEffect(() => {
    fetch(apiUrl)
    .then((res) => (res.json())
    .then((product) => setProducts(product))
    );
  }, []);

  return (
    <>

      <NavBar />
      <div className="products">
        {products.map((product) => {
          return(
            <Product key={product.id} product={product} />
          )
                })}
      </div>
    </>
  );
}

export default App;
