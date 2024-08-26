const Product = (props) => {

  const { product } = props;

  const truncateDesc = (desc, maxLength) => {
    if (desc.length > maxLength) {
      return desc.substring(0, maxLength) + "...";
    }
    return desc;
  };

  return (
    <div className="product-container">
      <span>{product.category}</span>
      <img src={product.image} alt={product.title} />
      <h2>{truncateDesc(product.title, 20)}</h2>
      <p className="desc">{truncateDesc(product.description, 100)}</p>

      <div className="pr-foot">
        <div className="pr-right">
          <p className="price">{`${product.price} $`}</p>
        </div>

        <div className="pr-left">
          <span>Rating: {product.rating.rate}</span>
          <span>Count: {product.rating.count}</span>
        </div>
      </div>
      <hr />
      <button>Add to Cart</button>
    </div>
  );
};

export default Product;
