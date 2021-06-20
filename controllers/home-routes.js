////=================\\\\
///|   Home Routes   |\\\
//||=================||\\
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// GET route to find all posts to use on the homepage
//====================================================
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
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('homepage', { posts })
      })
      .catch(err => res.status(500).json(err));
  });

module.exports = router;