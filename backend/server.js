const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
