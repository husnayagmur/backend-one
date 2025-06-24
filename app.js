if (process.env.NODE_ENV !== "production")
  require("dotenv").config();

const Database = require("./db/Database"); // db klasöründeki Database.js dosyasını çağır
const db = new Database();
db.connect({ CONNECTION_STRING: process.env.CONNECTION_STRING });

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const personsRouter = require("./routes/persons");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware'ler (önce body parser vs)
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routerlar (middleware’den sonra)
app.use("/api/persons", personsRouter);
app.use("/", indexRouter);

// 404 handler (en sona)
app.use(function (req, res, next) {
  next(createError(404));
});

// Hata handler
app.use(function (err, req, res, next) {
  // Sadece development ortamında hata detaylarını göster
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
