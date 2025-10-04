import "./Sidebar.css";

export default function Sidebar({ onFilter }) {
  return (
    <div className="sidebar">
      <button onClick={() => onFilter("all")}>TẤT CẢ</button>
      <button onClick={() => onFilter("coffee")}>COFFEE</button>
      <button onClick={() => onFilter("tea")}>TRÀ</button>
    </div>
  );
}
