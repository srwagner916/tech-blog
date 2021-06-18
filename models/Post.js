const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {};

Post.init(
  {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true
    },
    title: {
      type: Datatypes.STRING,
      allowNull: false
    },
    text: {
      type: Datatypes.STRING,
      allowNull: true
    },
    url: {
      type: Datatypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    user_id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)