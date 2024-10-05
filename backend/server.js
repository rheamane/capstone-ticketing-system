const express = require("express");
const cors = require("cors");
require("dotenv").config();
//const userRoutes = require("./routes/userRoutes");
const sequelize = require("./config/db");

// DB Schemas
const Role = require("./models/Role");

const app = express();

(async () => {
  try {
    // Sync all models
    await sequelize.sync();
    console.log("Database & tables created!");

    // Start Express Server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Database connection error:", err);
  }
})();
