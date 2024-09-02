import "../styles/newproduct.css";
import { useState, useEffect } from "react";

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  
  const [nextId, setNextId] = useState(null);

  useEffect(() => {
    // Fetch existing products to determine the next ID
    fetch(`http://localhost:9000/products`)
      .then((res) => res.json())
      .then((data) => {
        const maxId = Math.max(...data.map(product => product.id));
        setNextId(maxId + 1);
      });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct();
  };



  const addProduct = () => {
    fetch(`http://localhost:9000/products`, {
      method: "POST",
      body: JSON.stringify({
        id: nextId,  // Manually set the next ID
        title,
        price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  return (
    <div className="newproduct-bd">
      <h1>Add New Product</h1>
      <form onSubmit={handleSubmit} className="newproduct-form">
        <div>
          <label>Title</label>
          <input
            value={title}
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Price</label>
          <input
            value={price}
            type="number"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button className="btn">Add Product</button>
      </form>
    </div>
  );
};

export default NewProduct;
