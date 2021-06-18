//////|====== Associations ======\\\|||
/////||==========================|\\|||
/////||       Note to self       ||\\||
////|||       Add to these       |||\\|
///||||       as you go          ||||\|
//////|||||||||||||||||||||||||||||||||

// require models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User and Post associations
//=====================================
User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  // on delete set user_id to null
  onDelete: 'SET NULL'
});

//  User and Comment associations
//=====================================
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

// Post and Comment associations
//=====================================
Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'SET NULL'
});

//=====================================
module.exports = { User, Post, Comment };