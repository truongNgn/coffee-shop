import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import products from "../data";
import "./ProductDetail.css";

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find((p) => p.id === parseInt(id));
    const { addToCart } = useCart();

    const [size, setSize] = useState("M");
    const [qty, setQty] = useState(1);

    // Size pricing: example M = base price, L = +10000
    const extra = size === "L" ? 10000 : 0;
    const finalPrice = (product.price + extra) * qty;

    if (!product) {
        return <p>Product not found!</p>;
    }

    return (
        <div style={{ display: "flex", padding: "20px", gap: "40px" }}>
            <img
                src={product.image}
                alt={product.name}
                style={{ width: "300px", borderRadius: "8px" }}
            />
            <div>
                <h2>{product.name}</h2>
                <p>SKU: 65000{id}</p>
                <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {(product.price + extra).toLocaleString()} đ
                </p>

                <h4>Chọn kích cỡ</h4>
                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    <button
                        style={{
                            background: size === "M" ? "#ccc" : "#fff",
                            padding: "8px 14px",
                        }}
                        onClick={() => setSize("M")}
                    >
                        M
                    </button>
                    <button
                        style={{
                            background: size === "L" ? "#ccc" : "#fff",
                            padding: "8px 14px",
                        }}
                        onClick={() => setSize("L")}
                    >
                        L +10.000đ
                    </button>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)}>+</button>
                </div>

                <button
                    className="add-to-cart-btn"
                    style={{
                        marginTop: "20px",
                        // background: "green",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",

                    }}
                    
                    onClick={() =>
                        addToCart({
                            ...product,
                            size: size,
                            price: product.price + extra,
                            qty: qty,   // ✅ pass selected quantity
                        })
                    }
                >
                    🛒 Thêm vào giỏ hàng : {finalPrice.toLocaleString()} đ
                </button>


            </div>
        </div>
    );
}
