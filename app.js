if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");

// Veritabanı bağlantısı
const Database = require("./db/Database");
const db = new Database();
db.connect({ CONNECTION_STRING: process.env.CONNECTION_STRING });

// Tüm route yönlendirmelerinin merkezi
const indexRouter = require("./routes/index");

const app = express();

// View engine ayarları
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middleware’ler
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Tüm routerlar sadece index.js üzerinden yönetiliyor
app.use("/", indexRouter);

// 404 hatası yakalayıcı
app.use(function (req, res, next) {
  next(createError(404));
});

// Genel hata yakalayıcı
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
