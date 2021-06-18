////=================\\\\
///|   User Routes   |\\\
//||=================||\\
const router = require('express').Router();
const { User, Post } = require('../../models');


// GET route to get all Users
//===============================================
router.get('/', (req, res) => {
  User.findAll({}).then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

// GET route to find one User by ID
//===============================================
router.get('/:id', (req, res) => {
  User.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'url', 'createdAt']
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "I'm sorry, no user with this ID was found" });
          return;
        }
        res.json(dbUserData);
      })
        .catch(err => res.status(500).json(err));
});

// POST route to create new User
//===============================================
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(500).json(err));
});

module.exports = router;