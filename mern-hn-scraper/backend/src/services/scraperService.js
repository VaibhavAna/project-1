const axios = require("axios");
const cheerio = require("cheerio");

const Story = require("../models/Story");

const scrapeStories = async () => {
  try {
    console.log("Starting scraper...");

    const { data } = await axios.get("https://news.ycombinator.com");

    const $ = cheerio.load(data);

    const stories = [];

    $(".athing").each((index, element) => {
      if (index >= 10) return false;

      const title = $(element)
        .find(".titleline a")
        .text()
        .trim();

      const url = $(element)
        .find(".titleline a")
        .attr("href");

      const subtext = $(element).next();

      const pointsText = subtext
        .find(".score")
        .text()
        .replace(" points", "")
        .replace(" point", "");

      const points = parseInt(pointsText) || 0;

      const author = subtext
        .find(".hnuser")
        .text()
        .trim();

      const postedAt = subtext
        .find(".age")
        .text()
        .trim();

      stories.push({
        title,
        url,
        points,
        author,
        postedAt,
      });
    });

    for (const story of stories) {
      await Story.findOneAndUpdate(
        {
          title: story.title,
          author: story.author,
        },
        story,
        {
          upsert: true,
          new: true,
        }
      );
    }

    console.log(`${stories.length} stories scraped successfully`);

    return stories;
  } catch (error) {
    console.error("Scraper Error:", error.message);
  }
};

module.exports = scrapeStories;