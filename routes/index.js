const express = require("express");
const router = express.Router();

const personsRouter = require("./persons");
const usersRouter = require("./users");
const auditlogsRouter = require("./auditlogs"); 
const authRouter = require("./auth"); 
router.use("/api/persons", personsRouter);
router.use("/api/users", usersRouter); 
router.use("/api/auditlogs", auditlogsRouter);  
router.use("/api/auth", authRouter);

module.exports = router;
