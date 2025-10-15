import "./Contact.css";
import { useState } from "react";
import Footer from "../components/Footer";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Giả lập gửi form
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="contact-page">
      {/* HEADER SECTION */}
      <section className="contact-hero">
        <div className="overlay">
          <h1>Liên hệ với Brown Beans ☕</h1>
          <p>Chúng tôi luôn sẵn lòng lắng nghe bạn!</p>
        </div>
      </section>

      {/* INFO SECTION */}
      <section className="contact-info">
        
        <div className="info-box">
          <h2>Thông tin liên hệ</h2>
          <p>📍 123 Nguyễn Văn Cừ, Quận 5, TP. Hồ Chí Minh</p>
          <p>📞 0909 123 456</p>
          <p>📧 brownbeans.coffee@gmail.com</p>
          <p>🕒 Thời gian mở cửa: 7:00 - 22:00 mỗi ngày</p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Gửi tin nhắn cho chúng tôi</h2>

          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Nội dung tin nhắn..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Gửi ngay</button>

          {status === "success" && (
            <p className="success-message">✅ Cảm ơn bạn! Chúng tôi sẽ phản hồi sớm nhất.</p>
          )}
        </form>
      </section>

      {/* MAP SECTION */}
      <section className="contact-map">
        <iframe
          title="Brown Beans Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.630864308312!2d106.68159417587306!3d10.762835659392005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f36f3a7a0c9%3A0x4d482122fb8a5a03!2zMTIzIE5ndXnhu4VuIFbEg24gQ-G7qywgUXXhuq1uIDUsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>

      <Footer />
    </div>
  );
}
