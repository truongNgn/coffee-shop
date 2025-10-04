export default function About() {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: "url('/about_background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Lớp overlay mờ để chữ dễ nhìn */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      ></div>

      {/* Nội dung */}
      <div
        style={{
          position: "relative",
          color: "#fff",
          padding: "40px",
          maxWidth: "800px",
          lineHeight: "1.8",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#FFDAB9" }}>
          Về Brown Beans
        </h1>

        <p style={{ fontSize: "1.1rem", marginBottom: "16px" }}>
          Chào mừng bạn đến với <strong>Brown Beans Coffee Shop</strong> – nơi hương cà phê rang mới 
          đã lan tỏa khắp không gian từ năm <strong>1999</strong>. Bắt đầu từ một quán nhỏ trên con phố quen thuộc, 
          chúng tôi đã trở thành điểm đến yêu thích của những ai trân trọng sự mộc mạc và tinh tế trong từng tách cà phê.
        </p>

        <p style={{ fontSize: "1.1rem", marginBottom: "16px" }}>
          Tại Brown Beans, chúng tôi tin rằng cà phê không chỉ là một thức uống – 
          đó là một khoảnh khắc thư giãn, một nhịp dừng giữa cuộc sống vội vã 
          và là sợi dây kết nối giữa con người với nhau. 
          Mỗi ly cà phê được phục vụ từ những hạt được tuyển chọn kỹ lưỡng, rang vừa đủ độ, 
          và pha chế bằng cả niềm đam mê.
        </p>

        <p style={{ fontSize: "1.1rem", marginBottom: "16px" }}>
          Dù bạn ghé Brown Beans để bắt đầu buổi sáng bằng một ly latte, tận hưởng buổi chiều yên ả bên bạn bè, 
          hay khám phá hương vị mới, chúng tôi mong rằng mỗi lần đến với Brown Beans 
          đều sẽ là một trải nghiệm ấm áp và đáng nhớ.
        </p>

        <p style={{ fontSize: "1.2rem", fontStyle: "italic", marginTop: "30px", color: "#FFD700" }}>
          Brown Beans – Hạnh phúc khởi nguồn từ một tách cà phê.
        </p>
      </div>
    </div>
  );
}
