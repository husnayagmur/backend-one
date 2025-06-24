const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(401).json({ message: "Token gerekli" });

  // "Bearer TOKEN" içinden sadece TOKEN kısmını al
  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token eksik" });

  try {
    const verified = jwt.verify(token, "gizliAnahtar"); // .env'den çekmelisin
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ message: "Geçersiz token" });
  }
};

module.exports = auth;
