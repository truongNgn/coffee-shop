import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail"; // NEW
import LoginPage from "./pages/LoginPage"; 
import RegisterPage from "./pages/RegisterPage"; // NEW
import ContactPage from "./pages/Contact"; // NEW
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* NEW */}
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* NEW */}
        <Route path="/contact" element={<ContactPage />} /> {/* NEW */}
      </Routes>
    </Router>
  );
}

export default App;
