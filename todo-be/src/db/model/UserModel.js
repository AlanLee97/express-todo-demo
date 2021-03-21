const {sequelize} = require("../db");
const {DataTypes} = require("sequelize");


let feilds = {
  username: {
    type: DataTypes.CHAR
  },
  password: {
    type: DataTypes.CHAR
  },
  nickname: {
    type: DataTypes.CHAR
  },
  avatar: {
    type: DataTypes.CHAR
  },
};

let User = sequelize.define('User', feilds, {
  tableName: 't_user'
});

module.exports = {User};