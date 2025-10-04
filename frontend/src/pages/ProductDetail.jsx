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
        return <p>Sản phẩm không tồn tại!</p>;
    }

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
                    Giá: <span>{(product.price + extra).toLocaleString()} đ</span>
                </p>
                <p className="product-detail-desc">{product.desc || "Thức uống thơm ngon, phù hợp mọi khoảnh khắc!"}</p>

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
                            price: product.price + extra,
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