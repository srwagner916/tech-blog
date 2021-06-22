////=================\\\\
///|Single post Route|\\\
//||=================||\\

const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// GET route to find one post and
// send to single post page
//====================================================
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
      const posts = dbPostData.get({ plain: true });
      res.render('single-post', { 
        posts,
        loggedIn: req.session.loggedIn
      })
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;