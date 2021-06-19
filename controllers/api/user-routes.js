////=================\\\\
///|   User Routes   |\\\
//||=================||\\
const router = require('express').Router();
const { User, Post, Comment } = require('../../models')

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
      attributes: {
        exclude: ['password']
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'url', 'createdAt']
        },
        {
          model: Comment,
          attributes: ['text', 'createdAt']
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

// POST route to login with email and password
//===============================================
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    // email check
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: "I'm sorry, no user with that email address was found" });
        return;
      }
      // password check
      // this method compares the password passed in req.body to the hashed password from dbUserData
      const validPw = dbUserData.passwordCheck(req.body.password);
      if (!validPw) {
        res.status(400).json({ message: "I'm sorry, this password is incorrect" });
        return;
      }
      res.json(
        { 
          user: dbUserData,
          message: `${dbUserData.username} is now logged in`
        }
      );
    });
});

module.exports = router;