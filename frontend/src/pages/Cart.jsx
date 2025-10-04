import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <strong>{item.name}</strong> 
          <span style={{ marginLeft: "10px" }}>({item.size})</span> {/* ✅ show size */}
          — {item.qty} x {item.price.toLocaleString()}đ ={" "}
          {(item.price * item.qty).toLocaleString()}đ
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => removeFromCart(item.id, item.size)}  // ✅ pass size too
          >
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <>
          <h3>Total: {total.toLocaleString()}đ</h3>
          <button onClick={clearCart}>Clear Cart</button>
          <button style={{ marginLeft: "10px" }}>Proceed to Payment</button>
        </>
      )}
    </div>
  );
}
