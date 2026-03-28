const router = require('express').Router();
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort('-createdAt');
  res.json(posts);
});

// Get single post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username');
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// Create post (protected)
router.post('/', auth, async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user.id });
  res.status(201).json(post);
});

// Update post (protected)
router.put('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' });
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});

// Delete post (protected)
router.delete('/:id', auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Not found' });
  if (post.author.toString() !== req.user.id)
    return res.status(403).json({ error: 'Unauthorized' });
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});

// Add comment
router.post('/:id/comments', auth, async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    author: req.user.id,
    post: req.params.id,
  });
  res.status(201).json(comment);
});

// Get comments for a post
router.get('/:id/comments', async (req, res) => {
  const comments = await Comment.find({ post: req.params.id }).populate('author', 'username');
  res.json(comments);
});

module.exports = router;