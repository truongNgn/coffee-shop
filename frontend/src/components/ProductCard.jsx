import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}đ</p>

      {/* 👇 Button now navigates to detail page */}
      <Link to={`/products/${product.id}`}>
        <button>Đặt mua</button>
      </Link>
    </div>
  );
}
