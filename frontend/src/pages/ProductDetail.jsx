import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ dùng để quay lại trang trước
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) {
    return <p style={{ padding: "40px" }}>Đang tải thông tin sản phẩm...</p>;
  }

  const selectedSize = product.sizes?.find((s) => s.size === size);
  const basePrice = selectedSize ? selectedSize.price : 0;
  const finalPrice = basePrice * qty;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: product.id_product,
      size: size,
      price: basePrice,
      qty: qty,
    });
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="product-detail-container">
      {/* ✅ Nút quay lại */}
      <button className="back-btn" onClick={() => navigate("/products")}>
        ⬅ Quay lại danh sách
      </button>

      <img src={product.image} alt={product.name} className="product-detail-img" />

      <div className="product-detail-info">
        <h2 className="product-detail-title">{product.name}</h2>
        <p className="product-detail-sku">
          Mã sản phẩm: <b>{product.id_product}</b>
        </p>
        <p className="product-detail-price">
          Giá: <span>{basePrice.toLocaleString()} đ</span>
        </p>
        <p className="product-detail-desc">
          {product.description || "Thức uống thơm ngon, phù hợp mọi khoảnh khắc!"}
        </p>

        {/* chọn size */}
        <div className="product-detail-section">
          <h4>Chọn kích cỡ</h4>
          <div className="product-detail-size-group">
            {product.sizes?.map((s) => (
              <button
                key={s._id}
                className={`product-detail-size-btn${size === s.size ? " active" : ""}`}
                onClick={() => setSize(s.size)}
              >
                {s.size}{" "}
                {s.size === "L"
                  ? `+${(s.price - product.sizes[0].price).toLocaleString()}đ`
                  : ""}
              </button>
            ))}
          </div>
        </div>

        {/* chọn số lượng */}
        <div className="product-detail-section">
          <h4>Số lượng</h4>
          <div className="product-detail-qty-group">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>
        </div>

        {/* thêm giỏ */}
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          🛒 Thêm vào giỏ hàng ({finalPrice.toLocaleString()} đ)
        </button>

        {/* thông báo */}
        {showMessage && (
          <div className="add-success-msg">✅ Đã thêm sản phẩm vào giỏ hàng!</div>
        )}
      </div>
    </div>
  );
}
