const express = require("express");
const router = express.Router();

const personsRouter = require("./persons");
const usersRouter = require("./users");  // user router dosyan varsa buraya ekle
const auditlogsRouter = require("./auditlogs");  // Burada import ettik
router.use("/api/persons", personsRouter);
router.use("/api/users", usersRouter);  // user route’larını bu şekilde ekle
router.use("/api/auditlogs", auditlogsRouter);  // Audit log rotası
module.exports = router;
