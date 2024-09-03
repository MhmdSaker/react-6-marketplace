import '../styles/newproduct.css';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:9000/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setTitle(data.title);
        setPrice(data.price);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const saveProduct = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9000/products/${id}`, {
      method: "PATCH", // Use PUT or PATCH to update the existing product
      body: JSON.stringify({ title, price }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to update product');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Product updated:", data);
        navigate(`/products/${id}`); // Redirect to the product details page after saving
      })
      .catch((error) => console.error("Failed to update product:", error));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
