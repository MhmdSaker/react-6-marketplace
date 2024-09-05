import { useState, useEffect } from "react";
import Product from "./Product";
import Modal from "./Modal"; // Import the Modal component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open/close state

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
  }, [input]);

  const inputInLower = input.toLowerCase();
  const SearchedProducts = products.filter((product) =>
    product.title.toLowerCase().includes(inputInLower)
  );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const prices = products.map((product) => product.price);
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);



  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="search-filter">
        <div className="search">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
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
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)}>
            <Product productId={product.id} button={true} />
          </div>
        )) && SearchedProducts.map((product) => (
          <div key={product.id} onClick={() => handleProductClick(product)}>
            <Product product={product} productId={product.id} button={true} />
          </div>
        ))}
      </div>

      {/* Modal for Product Details */}
      <Modal
        isOpen={isModalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProductList;
