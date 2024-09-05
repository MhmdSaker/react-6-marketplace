import React from "react";

const CategoryFilter = ({ categories, selectedCategory, handleCategoryChange }) => {
  return (
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
  );
};

export default CategoryFilter;
