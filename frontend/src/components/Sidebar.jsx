import { useState, useEffect } from "react";
import "./Sidebar.css";

export default function Sidebar({ onFilter }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="sidebar">
      <button onClick={() => onFilter("all")}>TẤT CẢ</button>
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onFilter(cat.slug)}>
          {cat.name.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
