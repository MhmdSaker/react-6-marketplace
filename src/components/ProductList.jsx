// ProductList.js
import React, { useState, useEffect } from "react";
import Product from "./Product";
import Modal from "./Modal";
import SearchFilter from "./Filters/SearchFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import PriceFilter from "./Filters/PriceFilter";
import { useCart } from "./CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [input, setInput] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const { handleAddToCart } = useCart();

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
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleModalClick = (product) => {
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
        <SearchFilter input={input} setInput={setInput} />
        <div className="filters">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <PriceFilter min={min} max={max} setMin={setMin} setMax={setMax} />
        </div>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <Product
              productId={product.id}
              button={true}
              handleModalClick={handleModalClick}
              handleAddToCart={() => handleAddToCart(product)}
            />
          </div>
        ))}
      </div>

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
