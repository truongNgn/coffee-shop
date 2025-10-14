import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ hook phải gọi ở đây, không trong function

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json(); // ✅ parse JSON response

      if (res.ok) {
        login(data.user); // ✅ cập nhật context + localStorage
        setMessage("✅ Đăng nhập thành công!");
        await new Promise((r) => setTimeout(r, 500));
        navigate("/");
      } else {
        setMessage("❌ " + (data.message || "Sai thông tin đăng nhập"));
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Không thể kết nối đến server.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="brand-title">☕ Brown Beans Coffee</h2>
        <h3>Đăng nhập</h3>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Đăng nhập</button>
        </form>

        {message && <p className="login-message">{message}</p>}

        <p className="register-text">
          Chưa có tài khoản?{" "}
          <span className="register-link" onClick={() => navigate("/register")}>
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}
