import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "./Home.css";


// bổ sung carousel và footer
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../components/Footer";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((res) => res.json())
      .then((data) => {
        // lấy ngẫu nhiên 6 sản phẩm nổi bật
        const shuffled = data.sort(() => 0.5 - Math.random());
        setFeatured(shuffled.slice(0, 6));
      })
      .catch((err) => console.error("Error fetching featured products:", err));
  }, []);

  return (
    <div className="home-container">
      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Đậm vị - Trọn khoảnh khắc</h1>
            <p>
              Không chỉ là cà phê, mà còn là khoảnh khắc để bạn thư giãn và tận hưởng.
            </p>
            <Link to="/products" className="hero-button">
              Đặt hàng ngay
            </Link>
          </div>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section className="intro-section">
        <h2>Brown Beans Signature</h2>
        <p>
          Tại Brown Beans, mỗi ly cà phê là một hành trình hương vị — nơi sự đam mê,
          chất lượng và cảm xúc hòa quyện để tạo nên trải nghiệm khó quên.
          Hãy bắt đầu ngày mới của bạn với năng lượng từ ly cà phê đậm đà và tươi mới nhất!
        </p>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="featured-section">
        <h2>Sản phẩm nổi bật</h2>
        <Slider
          dots={true}
          infinite={true}
          slidesToShow={4}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={2500}
          responsive={[
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
          ]}
        >
          {featured.map((p) => (
            <div key={p.id_product}>
              <ProductCard product={p} />
            </div>
          ))}
        </Slider>
      </section>
      <Footer />
    </div>
    
  );
}
