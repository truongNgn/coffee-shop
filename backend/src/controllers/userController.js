const User = require("../models/userModel");

// Lấy thông tin người dùng 
const postLogin = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone, password });
        if (!user) return res.status(401).json({ message: "Sai số điện thoại hoặc mật khẩu!" });
        res.json({ message: "Đăng nhập thành công!", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const postRegister = async (req, res) => {
    try {
        const { customerName, phone, address, password } = req.body;
        const exist = await User.findOne({ phone });
        if (exist) return res.status(400).json({ message: "Số điện thoại đã tồn tại!" });

        const newUser = new User({ customerName, phone, address, password });
        await newUser.save();
        res.json({ message: "Đăng ký thành công!", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Lỗi server khi đăng ký." });
    }
};
module.exports = {
    postLogin,
    postRegister
};