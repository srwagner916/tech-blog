const router = require('express').Router();
const { Post } = require('../../models');

// GET route to find all posts
//===============================================
router.get('/', (req, res) => {
  Post.findAll({}).then(dbPostData => res.json(dbPostData))
    .catch(err => res.json(status).json(err));
});

//  GET route to find one post by ID
//===============================================
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: "I'm sorry, no post with this ID was found" });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
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

// PUT route to update a post by ID
//===============================================
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title,
      text: req.body.text,
      url: req.body.url
    },
    {
      where: {
      id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: "I'm sorry, no post with this ID was found" });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;