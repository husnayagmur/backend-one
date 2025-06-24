const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // İşlemi yapan kullanıcı
  action: { type: String, required: true }, // Ör: "CREATE_USER", "UPDATE_USER", "DELETE_USER"
  details: { type: Object }, // İşlemle ilgili ekstra bilgiler (örneğin hangi alanlar değişti)
  timestamp: { type: Date, default: Date.now }, // İşlemin yapıldığı tarih
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
