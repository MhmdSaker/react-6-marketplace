import '../styles/newproduct.css'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const saveProduct = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9000/products/${id}`, {
      method: "PUT", // Use PUT or PATCH to update the existing product
      body: JSON.stringify({
        title,
        price,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log("Product updated:", data))
      .catch((error) => console.error("Failed to update product:", error));
  };





  

  useEffect(() => {
    fetch(`http://localhost:9000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title)
        setPrice(data.price)
      });
  }, [id]);

  return (
    <>
      <div className="newproduct-bd">
        <h1>Edit Product No. {id}</h1>
        <form onSubmit={saveProduct} className="newproduct-form">
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

          <button className="btn">Save</button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
