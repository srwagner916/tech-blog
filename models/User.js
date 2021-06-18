const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {};

User.init(
  {
    id: {
      type: Datatypes.INTEGER,
      autoIncrement: true
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [5]
      }
    },
    email: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;