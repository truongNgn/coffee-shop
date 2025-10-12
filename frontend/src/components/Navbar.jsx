import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  return (
    <nav className="navbar">
      <div className="logo">Brown Beans</div>
      <ul>
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/products">PRODUCTS</Link></li>
        <li><Link to="/cart">CART ({cart.length})</Link></li>
      </ul>
    </nav>
  );
}
