const mongoose = require("mongoose");

class Database {
  constructor() {
    this.mongoConnection = null;
  }

  async connect(options) {
    try {
      console.log("DB Connecting...");
      const db = await mongoose.connect(options.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.mongoConnection = db;
      console.log("✅ DB Connected");
    } catch (err) {
      console.error("❌ DB Connection Error:", err.message);
      process.exit(1);
    }
  }
}

module.exports = Database;
