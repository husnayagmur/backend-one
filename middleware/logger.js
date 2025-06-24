// middleware/logger.js

// Winston kütüphanesinden gerekli modülleri alıyoruz
const { createLogger, format, transports } = require("winston");

// Logger nesnesini oluşturuyoruz
const logger = createLogger({
  // Loglama seviyesini 'info' olarak ayarlıyoruz (info ve üzeri seviyeleri yakalar)
  level: "info",
  
  // Log formatını belirliyoruz
  format: format.combine(
    // Zaman damgası ekle, format: YYYY-AA-GG SS:DD:SS
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    
    // Log mesajının görünümünü özelleştiriyoruz
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  
  // Log mesajlarının nereye kaydedileceğini ayarlıyoruz
  transports: [
    // Hata (error) seviyesindeki logları logs/error.log dosyasına yaz
    new transports.File({ filename: "logs/error.log", level: "error" }),
    
    // Info ve üzeri seviyedeki logları logs/system.log dosyasına yaz
    new transports.File({ filename: "logs/system.log", level: "info" }),
  ],
});

// Logger'ı dışa aktarıyoruz, böylece başka dosyalarda kullanılabilir
module.exports = logger;
