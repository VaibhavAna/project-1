require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Story = require("./src/models/Story");
const scrapeStories = require("./src/services/scraperService");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json({ message: "Server Running Successfully" });
});

const startServer = async () => {
  try {
    // Connect MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // Run scraper automatically
    await scrapeStories();

    // Count stories
    const count = await Story.countDocuments();

    console.log(`Stories in DB: ${count}`);

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();