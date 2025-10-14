import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false); // toggle menu user

  const handleLogout = () => {
    logout(); // ✅ gọi hàm từ AuthContext
    setShowMenu(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Brown Beans</div>

      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/products">PRODUCTS</Link></li>
        <li><Link to="/cart">CART ({cart.length})</Link></li>

        {/* ✅ Nếu chưa login */}
        {!user && (
          <>
            <li><Link to="/login">ĐĂNG NHẬP</Link></li>
            <li><Link to="/register">ĐĂNG KÝ</Link></li>
          </>
        )}

        {/* ✅ Nếu đã login */}
        {user && (
          <li
            className="user-menu"
            onClick={() => setShowMenu(!showMenu)}
          >
            👤 {user.customerName}
            {showMenu && (
              <div className="dropdown">
                <button onClick={handleLogout}>Đăng xuất</button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
