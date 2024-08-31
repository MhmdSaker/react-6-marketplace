import { useState, useEffect } from "react";
import Product from "./Product";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products">
      {products.map((product) => (
        <Product key={product.id} productId={product.id} button={true} />
      ))}
    </div>
  );
};

export default ProductList;
