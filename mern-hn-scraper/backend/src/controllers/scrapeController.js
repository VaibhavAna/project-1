const scrapeStories = require("../services/scraperService");

const triggerScrape = async (req, res) => {
  try {
    const stories = await scrapeStories();

    res.status(200).json({
      success: true,
      message: "Stories scraped successfully",
      total: stories.length,
      stories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  triggerScrape,
};