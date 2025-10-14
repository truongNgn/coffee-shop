import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT: Brand info */}
        <div className="footer-section">
          <h2 className="footer-logo">Brown Beans ☕</h2>
          <p className="footer-desc">
            Nâng niu từng hương vị, lưu giữ trọn khoảnh khắc.  
            Brown Beans – nơi khởi đầu của những buổi sáng tràn năng lượng.
          </p>
        </div>

        {/* MIDDLE: Quick Links */}
        <div className="footer-section">
          <h3>Liên kết nhanh</h3>
          <ul>
            <li><Link to="/">🏠 Trang chủ</Link></li>
            <li><Link to="/products">🛍️ Sản phẩm</Link></li>
            <li><Link to="/about">📖 Giới thiệu</Link></li>
            <li><Link to="/contact">✉️ Liên hệ</Link></li>
          </ul>
        </div>

        {/* RIGHT: Contact info */}
        <div className="footer-section">
          <h3>Liên hệ</h3>
          <p>📍 123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
          <p>📞 0909 123 456</p>
          <p>📧 brownbeans.coffee@gmail.com</p>

          <div className="footer-social">
            <a href="#"><Facebook size={22} /></a>
            <a href="#"><Instagram size={22} /></a>
            <a href="#"><Twitter size={22} /></a>
            <a href="#"><Mail size={22} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Brown Beans Coffee Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}
