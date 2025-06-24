const express = require("express");
const router = express.Router();

const personsRouter = require("./persons");
const usersRouter = require("./users");  // user router dosyan varsa buraya ekle
const auditlogsRouter = require("./auditlogs");  // Burada import ettik
const authRouter = require("./auth"); // auth.js'i ekle
router.use("/api/persons", personsRouter);
router.use("/api/users", usersRouter);  // user route’larını bu şekilde ekle
router.use("/api/auditlogs", auditlogsRouter);  // Audit log rotası
router.use("/api/auth", authRouter);  // /api/auth/register ve /api/auth/login kullanılabilir

module.exports = router;
