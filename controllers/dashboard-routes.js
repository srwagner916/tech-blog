const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const authguard = require('../utils/authguard');

// GET route to find all users posts for user dashboard
//=======================================================
router.get('/', authguard, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
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
  }).then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        loggedIn: true
      });
  })
    .catch(err => res.json(status).json(err));
});

module.exports = router;
