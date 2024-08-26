import { useEffect, useState } from "react";
import "./App.css";
import Product from "./components/Product";

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
      <h1 className="heading">Our Products</h1>
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
