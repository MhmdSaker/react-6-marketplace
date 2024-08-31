import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = ({ productId, button }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/${productId}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-container">
      <span>{product.category}</span>
      <img src={product.image} alt={product.title} />
      <h2>{truncateDesc(product.title, 20)}</h2>
      <p className="desc">{truncateDesc(product.description, 80)}</p>

      <div className="pr-foot">
        <div className="pr-right">
          <p className="price">{`${product.price} $`}</p>
        </div>

        <div className="pr-left">
          <span>Rating: {product.rating.rate}</span>
          <span>Count: {product.rating.count}</span>
        </div>
      </div>
      {button && <Link className="link" to={`/products/${productId}`}>Details</Link>}
    </div>
  );
};

const truncateDesc = (desc, maxLength) => {
  if (desc.length > maxLength) {
    return desc.substring(0, maxLength) + "...";
  }
  return desc;
};

export default Product;
