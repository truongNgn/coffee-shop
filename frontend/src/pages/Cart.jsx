import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-bg">
      <div className="cart-container">
        <h2 className="cart-title">🛒 Giỏ hàng của bạn</h2>

        {cart.length === 0 && (
          <p className="cart-empty">Giỏ hàng của bạn đang trống.</p>
        )}

        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-img"
                style={{
                  width: "48px",
                  height: "48px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              />
              <div>
                <strong className="cart-item-name">{item.name}</strong>
                <span className="cart-item-size">({item.size})</span>
                <span className="cart-item-detail">
                  {item.qty} x {item.price.toLocaleString()}đ ={" "}
                  <span className="cart-item-total">
                    {(item.price * item.qty).toLocaleString()}đ
                  </span>
                </span>
              </div>
            </div>
            <button
              className="cart-remove-btn"
              onClick={() => removeFromCart(item.id, item.size)}
            >
              Xóa
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="cart-total-row">
              <span className="cart-total-label">Tổng cộng:</span>
              <span className="cart-total-value">
                {total.toLocaleString()}đ
              </span>
            </div>
            <div className="cart-actions">
              <button className="cart-clear-btn" onClick={clearCart}>
                Xóa tất cả
              </button>
              <button className="cart-pay-btn">
                Thanh toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}