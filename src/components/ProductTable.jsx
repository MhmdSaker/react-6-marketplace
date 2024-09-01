import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductTable.css";
import toast, { Toaster } from "react-hot-toast";

const notify = () =>
  toast.success("Item deleted successfully.", {
    duration: 4000,
    position: "top-center",
    style: {
      backgroundColor: "#111",
      color: "#fff",
      borderRadius: "20px",
      padding: "5px 20px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    icon: "🥳",
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });

const ProductTable = () => {
  const [ProductMock, setProductsMock] = useState([]);

  useEffect(() => {
    const fetchProductsMock = async () => {
      try {
        const response = await fetch(`http://localhost:9000/products`);
        const data = await response.json();
        setProductsMock(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProductsMock();
  }, []);

  const deleteProduct = (product) => {
    fetch(`http://localhost:9000/products/${product.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          return fetch(`http://localhost:9000/products`);
        } else {
          throw new Error("failed to delete product");
        }
      })
      .then((updatedResponse) => updatedResponse.json())
      .then((updatedData) => {
        setProductsMock(updatedData);
        notify();
      });
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {ProductMock.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title.slice(0, 20)}</td>
                <td>{product.price} $</td>
                <td>
                  <Link className="button" to={`/products/${product.id}`}>
                    View
                  </Link>
                  <button className="button">Edit</button>
                  <button
                    onClick={() => deleteProduct(product)}
                    className="button"
                  >
                    Delete
                  </button>
                  <Toaster></Toaster>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductTable;
