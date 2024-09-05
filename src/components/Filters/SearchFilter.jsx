import React from "react";

const SearchFilter = ({ input, setInput }) => {
  return (
    <div className="search">
      <input
        type="search"
        name="search"
        placeholder="Search"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
