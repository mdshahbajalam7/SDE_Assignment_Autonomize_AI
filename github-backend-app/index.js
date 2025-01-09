const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./src/routes/GithubuserRoutes");
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/start", (req, res) => {
  res.send("This Backend Basic For Curd Opertion");
});

// Routes
app.use("/api", userRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8080;
// Start server
app.listen(PORT, async () => {
  // await mongooseDBconnection;
  console.log(`Server running on http://localhost:${PORT}`);
});
