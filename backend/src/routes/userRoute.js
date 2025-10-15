const express = require("express");
const User = require("../controllers/userController");
const router = express.Router();

// Đăng ký
router.post("/register", User.postRegister);

// Đăng nhập
router.post("/login", User.postLogin);

module.exports = router;

