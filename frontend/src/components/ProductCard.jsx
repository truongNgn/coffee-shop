import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  // 👉 Lấy giá từ mảng sizes (ví dụ size M)
  const firstSize = product?.sizes?.[0];
  const displayPrice = firstSize ? firstSize.price.toLocaleString() : "0";

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>

      {/* Nếu có nhiều size, hiển thị hết */}
      <div style={{ marginBottom: "10px" }}>
        {product.sizes?.map((s) => (
          <p key={s.id_product}>
            {s.size} - {s.price.toLocaleString()}đ
          </p>
        ))}
      </div>

      {/* Nút dẫn đến trang chi tiết */}
      <Link to={`/products/${product.id_product}`}>
        <button>Đặt mua</button>
      </Link>
    </div>
  );
}
