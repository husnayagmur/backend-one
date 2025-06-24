const express = require("express");
const router = express.Router();
const AuditLog = require("../models/AuditLogs");

// GET: Tüm audit logları listele
router.get("/", async (req, res) => {
  try {
    const logs = await AuditLog.find().populate("userId", "username email"); // user bilgilerini ekle
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Belirli bir logu id ile getir
router.get("/:id", async (req, res) => {
  try {
    const log = await AuditLog.findById(req.params.id).populate("userId", "username email");
    if (!log) {
      return res.status(404).json({ message: "Audit log bulunamadı" });
    }
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
