const router = require('express').Router();
const { Post } = require('../../models');

// GET route to find all posts
//===============================================
router.get('/', (req, res) => {
  Post.findAll({}).then(dbPostData => res.json(dbPostData))
    .catch(err => res.json(status).json(err));
});

// POST route to create a post
//===============================================
router.post('/', (req, res) => {
  Post.create({
    title: req.body.title,
    text: req.body.text,
    url: req.body.url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;