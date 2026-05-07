const express = require("express");

const router = express.Router();

const {
  getStories,
  getSingleStory,
  toggleBookmark,
  getBookmarks,
} = require("../controllers/storyController");

const protect = require("../middleware/authMiddleware");


// GET ALL STORIES
router.get("/", getStories);


// GET BOOKMARKED STORIES
router.get(
  "/bookmarks/all",
  protect,
  getBookmarks
);


// GET SINGLE STORY
router.get("/:id", getSingleStory);


// TOGGLE BOOKMARK
router.post(
  "/:id/bookmark",
  protect,
  toggleBookmark
);


module.exports = router;