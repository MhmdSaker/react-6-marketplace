import React from "react";
import "../styles/Modal.css";

const Modal = ({ isOpen, product, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
        <p>Price: ${product.price}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
