const {sequelize} = require("../db");
const {DataTypes} = require("sequelize");


let feilds = {
  title: {
    type: DataTypes.TEXT
  },
  content: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.TINYINT
  },
  user_id: {
    type: DataTypes.TINYINT
  },
};

let Todo = sequelize.define('Todo', feilds, {
  tableName: 't_todo'
});

module.exports = {Todo};