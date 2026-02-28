import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import "./Products.css";

export default function Products() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // filter by category
  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category?.slug === filter);

  // filter by search keyword
  const searchedProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-bg">
      <div style={{ display: "flex", background: "#f8f8f8", minHeight: "100vh" }}>
        {/* Sidebar filter */}
        <Sidebar onFilter={setFilter} />

        <div style={{ flex: 1, padding: "32px 40px" }}>
          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "28px",
              gap: "12px",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Tìm kiếm đồ uống yêu thích..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "14px 18px",
                borderRadius: "8px",
                border: "1.5px solid #bdbdbd",
                fontSize: "1.1rem",
                outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                background: "#fff",
                transition: "border 0.2s",
              }}
              onFocus={e => (e.target.style.border = "1.5px solid #388e3c")}
              onBlur={e => (e.target.style.border = "1.5px solid #bdbdbd")}
            />
          </div>

          {/* Product list */}
          <div className="products-header">
            <h2 style={{ margin: 0, color: "#471E22", fontWeight: "bold" }}>
              Danh sách sản phẩm
            </h2>
            <span style={{ color: "#888", fontSize: "1rem" }}>
              {searchedProducts.length} sản phẩm
            </span>
          </div>
          <div className="products-grid">
            {loading ? (
              <p style={{ marginTop: "32px", color: "#666" }}>Đang tải sản phẩm...</p>
            ) : searchedProducts.length > 0 ? (
              searchedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{ color: "#d84315", fontWeight: "bold", marginTop: "32px" }}>
                Không tìm thấy sản phẩm nào phù hợp.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}