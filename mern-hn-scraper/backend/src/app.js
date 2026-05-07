const express = require("express");
const cors = require("cors");

const scrapeRoutes = require("./routes/scrapeRoutes");
const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/scrape", scrapeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

module.exports = app;