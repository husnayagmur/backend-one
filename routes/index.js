const express = require("express");
const router = express.Router();

const personsRouter = require("./persons"); // diğer routerlar da buraya eklenebilir
// örnek: const usersRouter = require("./users");

router.use("/api/persons", personsRouter);
// router.use("/api/users", usersRouter);

module.exports = router;
