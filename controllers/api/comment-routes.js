////=================\\\\
///| Comment Routes  |\\\
//||=================||\\

const router = require('express').Router();
const { Comment } = require('../../models');

// GET route to find all comments
//===============================================
router.get('/', (req, res) => {
  Comment.findAll({}).then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

// POST route to create a comment
//===============================================
router.post('/', (req, res) => {
  Comment.create({
    text: req.body.text,
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;