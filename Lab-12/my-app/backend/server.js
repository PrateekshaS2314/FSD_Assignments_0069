require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/database");
const petRoutes = require("./routes/petRoutes");
const requestRoutes = require("./routes/requestRoutes");
const authRoutes = require("./routes/authRoutes");
const requestLogger = require("./middleware/requestLogger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = Number(process.env.PORT) || 5000;

app.disable("x-powered-by");
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(requestLogger);
app.use(express.json({ limit: "1mb" }));
app.get("/api/health", (req, res) => res.json({ status: "ok", service: "pawconnect-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);
app.use("/api/requests", requestRoutes);
app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use(errorHandler);

async function start() {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is required to start PawConnect.");
  await connectDatabase();
  app.listen(port, () => console.log(`PawConnect API listening on http://localhost:${port}`));
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  });
}

module.exports = app;
