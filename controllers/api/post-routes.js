////=================\\\\
///|   Post Routes   |\\\
//||=================||\\
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const authguard = require('../../utils/authguard');

// GET route to find all posts
//===============================================
router.get('/', (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      }
    ]
  }).then(dbPostData => res.json(dbPostData))
    .catch(err => res.json(status).json(err));
});

//  GET route to find one post by ID
//===============================================
router.get('/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['username']
          }
        ]
      }
    ]
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
router.post('/', authguard, (req, res) => {
  Post.create({
    title: req.body.title,
    text: req.body.text,
    url: req.body.url,
    user_id: req.session.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.status(500).json(err));
});

// PUT route to update a post by ID
//===============================================
router.put('/:id', authguard, (req, res) => {
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

// DELETE route to delete a post by ID
//===============================================
router.delete('/:id', authguard, (req, res) => {
  Post.destroy({
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

module.exports = router;