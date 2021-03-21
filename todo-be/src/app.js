const { CRUD } = require("./db/crud");
const modelNameMap = require("./db/model/modelNameMap");
const bodyParser = require("body-parser");
const {syncModel} = require("./db/model/index");

// 模型同步（第一次运行的时候打开此注释，它会去数据库创建数据表）
// syncModel({force: true}).then(res => {
//   console.log("模型同步成功");
// });

const express = require("express");

let app = new express();

const userService = require("./service/userService/userService");
const todoService = require("./service/todoService/todoService");


app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


app.use('/api/user', userService);
app.use('/api/todo', todoService);


app.get("*", (req, res) => {
  res.json({
    message: "Hello Express"
  });
});


app.listen(3000, 'localhost', () => {
  console.log("服务启动成功：http://localhost:3000");
});


