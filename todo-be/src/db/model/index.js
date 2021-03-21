const {sequelize} = require("../db")
const {User} = require("./UserModel");
const {Todo} = require("./TodoModel");

// 同步模型到数据库
async function syncModel(data) {
  // await User.sync();
  // await Todo.sync();
  await sequelize.sync(data);
}

module.exports.syncModel = syncModel;