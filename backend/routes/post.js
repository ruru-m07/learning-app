const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Post = require("../models/Post");
const POsts = require("../models/Post");

const { body, validationResult } = require("express-validator");

// Route 1: Get all the notes using : GET "/api/notes/fetchallnotes". login required
router.get("/fetchallposts", fetchuser, async (req, res) => {
  try {
    const post = await Post.find({ user: req.user.id });
    // res.json(Post);
    res.send(post)
  } catch (error) {
    console.error(error.message);
  }
});


// Route 2: Add a new  Note using : using "/api/notes/addnote". login required
router.post(
  "/addpost",
  fetchuser,
  [
    body("title", "Title must contains at least 3 characters.").isLength({
      min: 3,
    }),
    body(
      "description",
      "description must contain at least 5 characters."
    ).isLength({ min: 5 }),
    body(
      "image",
      "description must contain at least 5 characters."
    ),
  ],
  async (req, res) => {
    // if there are errors return bad request and the errors
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag, image } = req.body;
      const post = new Post({
        title,
        description,
        tag,
        image,
        user: req.user.id,
      });
      const savedPost = await post.save();
      res.json(savedPost);
    } catch (error) {
      res.status(500).send("Internal server error occured.");
    }
  }
);

module.exports = router;