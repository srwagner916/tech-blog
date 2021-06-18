//////|====== Associations ======\\\|||
/////||==========================|\\|||
/////||       Note to self       ||\\||
////|||       Add to these       |||\\|
///||||       as you go          ||||\|
//////|||||||||||||||||||||||||||||||||

const User = require('./User');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  // on delete set user_id to null
  onDelete: 'SET NULL'
});

module.exports = { User, Post };