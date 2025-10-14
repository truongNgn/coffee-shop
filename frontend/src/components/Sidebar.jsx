import "./Sidebar.css";
import { useState } from "react";

export default function Sidebar({ onFilter }) {
  const [active, setActive] = useState("all");

  const categories = [
    { key: "all", label: "🌟 Tất cả" },
    { key: "Coffee", label: "☕ Cà phê" },
    { key: "Tea", label: "🍵 Trà" },
    { key: "Juice", label: "🍹 Nước ép" },
    { key: "Smoothie", label: "🥤 Sinh tố" },
    { key: "Milk Tea", label: "🧋 Trà sữa" },
    { key: "Soda", label: "🍋 Soda" },
    { key: "Chocolate", label: "🍫 Chocolate" },
  ];

  const handleClick = (category) => {
    setActive(category);
    onFilter(category);
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Danh mục</h3>
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => handleClick(c.key)}
          className={active === c.key ? "active" : ""}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
