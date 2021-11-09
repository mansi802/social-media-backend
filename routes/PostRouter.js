const router = require("express").Router();
const {
  getPosts,
  createPost,
  getPost,
  deletePost,
  toggleLike,
  toggleUnlike,
  addComment,
  deletComment,
} = require("../controllers/Post");

router.get("/", getPosts);
router.post("/", createPost);

// Single Post
router.get("/:post_id", getPost);
router.delete("/:post_id", deletePost);

// Like Post
router.patch("/like/:post_id", toggleLike);
router.patch("/unlike/:post_id", toggleUnlike);

// Comment Post
router.patch("/comment/:post_id", addComment);
router.patch("/comment/:post_id/:comment_id", deletComment);

module.exports = router;
