import { useState, useEffect } from "react";
import Product from "./Product";
import Modal from "./Modal"; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open/close state
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  const apiUrl = `http://localhost:9000/products`;

  const fetchProducts = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); // Fetch only on component mount

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const applyPriceFilter = (product) => {
    if (min && max) {
      return product.price >= min && product.price <= max;
    }
    return true;
  };

  // Combined filtering logic for search term, category, and price
  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "all" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    )
    .filter(applyPriceFilter);

  return (
    <div>
      <div className="search-filter">
        <div className="search">
          <input
            type="search"
            name="search"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="filters">
          <div className="category-filter">
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory}
            >
              <option value="all">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="price-filter">
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              name="minPrice"
              placeholder="Min"
            />
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              name="maxPrice"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)}>
            <Product productId={product.id} button={true} />
          </div>
        ))}
      </div>

      {/* Modal for Product Details */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          product={selectedProduct}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ProductList;
