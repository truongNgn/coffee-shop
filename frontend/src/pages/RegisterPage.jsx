import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // dùng chung style

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    address: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ " + data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch {
      setMessage("⚠️ Không thể kết nối đến server.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="brand-title">☕ Brown Beans Coffee</h2>
        <h3>Đăng ký tài khoản</h3>

        <form onSubmit={handleRegister}>
          <input
            name="customerName"
            placeholder="Họ và tên"
            value={form.customerName}
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Số điện thoại"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            placeholder="Địa chỉ giao hàng"
            value={form.address}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Đăng ký</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <p className="register-text">
          Đã có tài khoản?{" "}
          <span className="register-link" onClick={() => navigate("/login")}>
            Đăng nhập
          </span>
        </p>
      </div>
    </div>
  );
}
