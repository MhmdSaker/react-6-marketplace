import "../styles/newproduct.css";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const NewProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [nextId, setNextId] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Fixing New IDs being random hashed
    fetch(`http://localhost:9000/products`)
      .then((res) => res.json())
      .then((data) => {
        const maxId = Math.max(...data.map(product => product.id));
        setNextId(maxId + 1);
      });
  }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    if(!title || !price) {
      return 0;
    }else {
      addProduct();
    }
    navigate('/products-table')
  };



  const addProduct = () => {
    fetch(`http://localhost:9000/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: String(nextId),  
        title,
        price: Number(price)
      })
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
            type="text"
            name="price"
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <button className="btn">Add Product</button>
      </form>
    </div>
  );
};

export default NewProduct;
