// jsonwebtoken modülünü projeye dahil ediyoruz
const jwt = require("jsonwebtoken");
require("dotenv").config(); // .env dosyasını okuyabilmek için bu gerekli
// Bu middleware, gelen isteklerde token kontrolü yapar
const auth = (req, res, next) => {
  // Authorization başlığını alıyoruz (genelde "Bearer TOKEN" formatındadır)
  const authHeader = req.headers["authorization"];

  // Authorization başlığı yoksa 401 (Unauthorized) hatası döneriz
  if (!authHeader) return res.status(401).json({ message: "Token gerekli" });

  // "Bearer TOKEN" içinden sadece TOKEN kısmını al
  const token = authHeader.split(" ")[1];

  // Eğer token eksikse yine 401 hatası döneriz
  if (!token) return res.status(401).json({ message: "Token eksik" });

  try {
    // Token'ı doğruluyoruz (.env dosyasındaki gizli anahtarla)
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Token geçerli ise, kullanıcı bilgilerini req.user içine ekliyoruz
    req.user = verified;

    // Middleware zincirinde bir sonraki işleme geçiyoruz
    next();
  } catch (error) {
    // Token doğrulanamazsa 403 (Forbidden) hatası döneriz
    res.status(403).json({ message: "Geçersiz token" });
  }
};

// auth middleware'i dışa aktarılır, diğer dosyalarda kullanılabilir
module.exports = auth;
