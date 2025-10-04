import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        padding: "20px",
        minHeight: "100vh",
        backgroundImage: "url('/background.png')", // update to your correct image
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
        textShadow: "1px 1px 4px #333",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <div
        className="hero-text"
        style={{
          textAlign: "left",
          marginBottom: "40px",
          maxWidth: "600px",
          alignSelf: "flex-start",
          background: "rgba(0,0,0,0.3)",
          padding: "32px 40px",
          borderRadius: "16px",
        }}
      >
        <h1 style={{ fontSize: "3.5rem", marginBottom: "12px" }}>
          Đậm vị - Trọn khoảnh khắc
        </h1>
        <div>
          <h2 style={{ fontWeight: "normal", fontSize: "1.5rem" }}>
            Không chỉ là cà phê, mà còn là khoảnh khắc để bạn thư giãn và tận hưởng
          </h2>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1>Welcome to Brown Beans Coffee Shop</h1>
        <p>Tận hưởng trọn vẹn hương vị cà phê</p>
        <Link
          to="/products"
          style={{
            marginTop: "30px",
            background: "#388e3c",
            color: "#fff",
            padding: "14px 32px",
            borderRadius: "8px",
            textDecoration: "none",
            fontSize: "1.2rem",
            fontWeight: "bold",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            transition: "background 0.2s",
            display: "inline-block",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#256029")}
          onMouseOut={e => (e.currentTarget.style.background = "#388e3c")}
        >
          Đặt hàng ngay
        </Link>
      </div>
    </div>
  );
}