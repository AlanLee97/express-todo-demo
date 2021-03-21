const express = require("express");
const router = express.Router();
const ApiJson = require("../../dto/apiJson");

const { CRUD } = require("../../db/crud");
const modelNameMap = require("../../db/model/modelNameMap");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

// 通过用户id查询数据
router.get("/list/:user_id", (req, res) => {
  let {user_id} = req.params;
  CRUD.selectAll(modelNameMap.todo, {user_id}).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});


// 通过id查询数据
router.get("/:id", (req, res) => {
  const {id} = req.params;
  CRUD.selectOneById(modelNameMap.todo, id).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

// 添加数据
router.post("", (req, res) => {
  const {body} = req;
  
  CRUD.insert(modelNameMap.todo, body).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

// 更新数据
router.put("", (req, res) => {
  const {body} = req;
  
  CRUD.updateById(modelNameMap.todo, body, body.id).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});


// 删除数据
router.delete("", (req, res) => {
  const {body} = req;
  
  CRUD.deleteById(modelNameMap.todo, body.id).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

module.exports = router;