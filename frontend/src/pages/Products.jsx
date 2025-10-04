import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import products from "../data";
import "./Products.css";
export default function Products() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // filter by category
  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  // filter by search keyword
  const searchedProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar filter */}
      <Sidebar onFilter={setFilter} />

      <div style={{ flex: 1, padding: "20px" }}>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Tìm đồ uống..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        {/* Product list */}
        <div className="products-grid">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm nào.</p>
          )}
        </div>
      </div>
    </div>
  );
}
