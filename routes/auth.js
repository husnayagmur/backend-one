const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();
require("dotenv").config();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Aynı email var mı kontrol et
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Bu email zaten kayıtlı." });

    // Şifreyi hash'le
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Veritabanına kaydet
    await newUser.save();

    res.status(201).json({ message: "Kayıt başarılı", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Kullanıcı kayıt endpoint'i
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Email ile kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    // Şifre karşılaştırması yap
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Şifre yanlış" });

    // JWT token oluştur
    const token = jwt.sign(
      { id: user._id, role: user.role }, process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Token ile başarılı cevap dön
    res.json({ message: "Giriş başarılı", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Korunmuş kullanıcı profili endpoint'i
router.get("/profile", auth, async (req, res) => {
  try {
    // Auth middleware ile doğrulanmış kullanıcı bilgilerini kullan
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    // Kullanıcı bilgilerini gönder
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
