import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

export default function ProductDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [size, setSize] = useState("M");
    const [qty, setQty] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:8000/api/products/${id}/`)
            .then(res => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching product:", err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p style={{ padding: "40px", textAlign: "center" }}>Đang tải sản phẩm...</p>;
    if (error || !product) return <p style={{ padding: "40px", textAlign: "center", color: "red" }}>Sản phẩm không tồn tại!</p>;

    // Size pricing: example M = base price, L = +10000
    const extra = size === "L" ? 10000 : 0;
    const finalPrice = (Number(product.price) + extra) * qty;

    return (
        <div className="product-detail-container">
            <img
                src={product.image}
                alt={product.name}
                className="product-detail-img"
            />
            <div className="product-detail-info">
                <h2 className="product-detail-title">{product.name}</h2>
                <p className="product-detail-sku">Mã sản phẩm: <b>65000{id}</b></p>
                <p className="product-detail-price">
                    Giá: <span>{(Number(product.price) + extra).toLocaleString()} đ</span>
                </p>
                <p className="product-detail-desc">{product.description || "Thức uống thơm ngon, phù hợp mọi khoảnh khắc!"}</p>

                <div className="product-detail-section">
                    <h4>Chọn kích cỡ</h4>
                    <div className="product-detail-size-group">
                        <button
                            className={`product-detail-size-btn${size === "M" ? " active" : ""}`}
                            onClick={() => setSize("M")}
                        >
                            M
                        </button>
                        <button
                            className={`product-detail-size-btn${size === "L" ? " active" : ""}`}
                            onClick={() => setSize("L")}
                        >
                            L +10.000đ
                        </button>
                    </div>
                </div>

                <div className="product-detail-section">
                    <h4>Số lượng</h4>
                    <div className="product-detail-qty-group">
                        <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                        <span>{qty}</span>
                        <button onClick={() => setQty((q) => q + 1)}>+</button>
                    </div>
                </div>

                <button
                    className="add-to-cart-btn"
                    onClick={() =>
                        addToCart({
                            ...product,
                            size: size,
                            price: Number(product.price) + extra,
                            qty: qty,
                        })
                    }
                >
                    🛒 Thêm vào giỏ hàng ({finalPrice.toLocaleString()} đ)
                </button>
            </div>
        </div>
    );
}