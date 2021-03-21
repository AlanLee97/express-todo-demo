const express = require("express");
const router = express.Router();

const { CRUD } = require("../../db/crud");
const modelNameMap = require("../../db/model/modelNameMap");
const bodyParser = require("body-parser");
const ApiJson = require("../../dto/apiJson");

router.use(bodyParser.json());

// 查询全部数据
router.get("/list", (req, res) => {
  CRUD.selectAll(modelNameMap.user).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

// 通过id查询数据
router.get("/:id", (req, res) => {
  const {id} = req.params;
  CRUD.selectOneById(modelNameMap.user, id).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});


// 添加数据
router.post("", (req, res) => {
  const {body} = req;
  CRUD.insert(modelNameMap.user, body).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

// 登录
router.post("/login", (req, res) => {
  const {body} = req;
  
  CRUD.login(body).then(data => {
    console.log("查询成功：", data);
    res.json(data ? ApiJson.success(data) : ApiJson.fail("登录失败"));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

// 注册
router.post("/register", (req, res) => {
  const {body} = req;

  CRUD.selectOneByUsername(body).then(data => {
    console.log("查询成功：", data);
    if (data) {
      res.json(ApiJson.fail("用户已存在"));
    }else {
      CRUD.register(body).then(data => {
        res.json(data ? ApiJson.success(data) : ApiJson.fail("注册失败"));
      }).catch(err => {
        console.log("查询失败：", err);
      });
    }
  }).catch(err => {
    console.log("查询失败：", err);
  });
});


// 更新数据
router.put("", (req, res) => {
  const {body} = req;
  
  CRUD.updateById(modelNameMap.user, body, body.id).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

// 删除数据
router.delete("", (req, res) => {
  const {body} = req;
  
  CRUD.deleteById(modelNameMap.user, body.id).then(data => {
    console.log("查询成功：", data);
    res.json(ApiJson.success(data));
  }).catch(err => {
    console.log("查询失败：", err);
  });
});

module.exports = router;