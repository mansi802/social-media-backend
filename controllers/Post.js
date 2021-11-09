const Post = require("./../models/PostModel");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(posts);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const createPost = async (req, res) => {
  try {
    const { name, body, avatar } = req.body;

    if (body.trim() === "") return res.status(500).json({message:"Body cannot be empty"});

    const post = await Post({ name, body, avatar });
    await post.save();

    res.status(201).json(post);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const getPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id);
    res.status(201).json(post);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { post_id } = req.params;

    await Post.findByIdAndDelete(post_id);
    res.status(201).json({ message: "Post deleted successfully" });
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { email } = req.body;
    const { post_id } = req.params;

    const post = await Post.findById(post_id);

    const already = post.likes.find((curr) => curr.email == email);

    if (!already) {
      post.likes.push({ email });
    } else {
      post.likes = post.likes.filter((curr) => curr.email != email);
    }

    post.save();
    res.status(201).json(post);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const toggleUnlike = async (req, res) => {
  try {
    const { email } = req.body;
    const { post_id } = req.params;

    const post = await Post.findById(post_id);

    const already = post.unlikes.find((curr) => curr.email == email);
    if (!already) {
      post.unlikes.push({ email });
    } else {
      post.unlikes = post.likes.filter((curr) => curr.email != email);
    }
    post.save();
    res.status(201).json(post);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const addComment = async (req, res) => {
  try {
    const { name, content, avatar } = req.body;
    const { post_id } = req.params;

    if (content.trim() === "") return res.status(500).json({message:"Comment cannot be empty"});

    const post = await Post.findById(post_id);

    post.comments = [{ name, content, avatar }, ...post.comments];
    post.save();
    res.status(201).json(post);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

const deletComment = async (req, res) => {
  try {
    const { post_id, comment_id } = req.params;

    const post = await Post.findById(post_id);
    post.comments = post.comments.filter((curr) => curr._id != comment_id);

    post.save();
    res.status(201).json(post);
  } catch ({ message }) {
    res.status(404).json({ message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  deletePost,
  toggleLike,
  toggleUnlike,
  addComment,
  deletComment,
};
