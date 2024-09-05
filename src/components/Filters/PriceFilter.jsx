import React from "react";

const PriceFilter = ({ min, max, setMin, setMax }) => {
  return (
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
  );
};

export default PriceFilter;
