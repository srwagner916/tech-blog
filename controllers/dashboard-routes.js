/////=================\\\\\
////|    Dashboard    |\\\\
///||     Routes      ||\\\
//|||=================|||\\

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
    order: [['createdAt', 'DESC']],
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

// GET route to find one user post for user dashboard
// to edit
//=======================================================
router.get('/edit/:id', authguard, (req, res) => {
  Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'text', 'createdAt'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
          post,
          loggedIn: true
        });
      }
      else {
        res.status(404).end();
      }
    })
    .catch(err => res.status(500).json(err));
});

// Render the dashboard/submit page to add a post
//=======================================================
router.get('/submit', (req, res) => {
  res.render('add-post', { loggedIn: true })
});

module.exports = router;
