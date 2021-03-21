
const {Sequelize} = require('sequelize');

// 数据库配置
const config = {
  host: "localhost",  // 主机名
  username: "root",   // 数据库用户名
  password: "123456", // 数据库密码
  port: 3306,         // 端口
  database: "express_todo_demo",   // 数据库名
  dialect: "mysql",
};

const sequelize = new Sequelize(config);
module.exports = {sequelize};