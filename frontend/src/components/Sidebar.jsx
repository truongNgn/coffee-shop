import "./Sidebar.css";

export default function Sidebar({ onFilter }) {
  return (
    <div className="sidebar">
      <button onClick={() => onFilter("all")}>TẤT CẢ</button>
      <button onClick={() => onFilter("Cà phê")}>Cà phê</button>
      <button onClick={() => onFilter("Trà")}>Trà</button>
    </div>
  );
}
