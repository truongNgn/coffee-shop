import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:3000/order/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerName, phone, address, cartItems }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ " + data.message);
      clearCart(); // xoá giỏ
    } else {
      setMessage("❌ " + data.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Thanh toán</h2>
      <input placeholder="Họ tên" value={customerName} onChange={e => setCustomerName(e.target.value)} />
      <input placeholder="Số điện thoại" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="Địa chỉ" value={address} onChange={e => setAddress(e.target.value)} />

      <button onClick={handleCheckout}>Đặt hàng</button>

      {message && <p>{message}</p>}
    </div>
  );
}
