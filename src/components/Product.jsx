import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-image"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-footer"></div>
  </div>
);

const Product = ({ productId, button, handleModalClick, handleAddToCart }) => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9000/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (error) return <div>Error: {error}</div>;
  if (!product) return <SkeletonLoader />;

  return (
    <div className="product-container">
      <span>{product.category || "Unknown Category"}</span>
      <img onClick={() => handleModalClick(product)} src={product.image} alt={product.title || "Product Image"} />
      <h2>{truncateDesc(product.title || "No Title", 20)}</h2>
      <p className="desc">{truncateDesc(product.description || "No Description", 80)}</p>

      <div className="pr-foot">
        <div className="pr-right">
          <p className="price">{product.price ? `${product.price} $` : "Price Not Available"}</p>
        </div>

        <div className="pr-left">
          <span>Rating: {product.rating?.rate || "N/A"}</span>
          <span>Count: {product.rating?.count || "N/A"}</span>
        </div>
      </div>
      {button && <Link className="link" to={`/products/${productId}`}>Details</Link>}
      <div style={{display: "flex", justifyContent: "right"}}>
        <button className="btn" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      
    </div>
  );
};

// Truncate function to shorten text
const truncateDesc = (desc, maxLength) => {
  if (desc.length > maxLength) {
    return desc.substring(0, maxLength) + "...";
  }
  return desc;
};

export default Product;
