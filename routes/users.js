const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 1) GET: Tüm kullanıcıları listele
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // şifreyi dönme
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2) POST: Yeni kullanıcı oluştur
router.post("/add", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Basit kontrol, ileri geliştirmede validator eklenebilir
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Eksik alanlar var" });
    }

    // Aynı username veya email varsa hata döner
    const userExists = await User.findOne({ $or: [{ username }, { email }] });
    if (userExists) {
      return res.status(400).json({ error: "Kullanıcı zaten mevcut" });
    }

    // Yeni kullanıcı oluştur
    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: "Kullanıcı oluşturuldu", data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3) PUT: Kullanıcıyı güncelle
router.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({ message: "Kullanıcı güncellendi", data: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4) DELETE: Kullanıcıyı sil
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.json({ message: "Kullanıcı silindi", data: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
