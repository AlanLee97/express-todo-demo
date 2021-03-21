const modelNameMap = require("./model/modelNameMap");
const { Todo } = require("./model/TodoModel");
const { User } = require("./model/UserModel");




const CRUD = {
  insert: async function(modelName, data) {
    let result;
    switch(modelName){
      case modelNameMap.user:
        result = await User.create(data);
        break;
      case modelNameMap.todo:
        result = await Todo.create(data);
        break;
    }
    return await result;
  },

  selectAll: async function(modelName, condiction) {
    let result;
    let cond = {
      where: {
        user_id: condiction.user_id
      }
    }
    switch(modelName){
      case modelNameMap.user:
        result = await User.findAll();
        break;
      case modelNameMap.todo:
        result = await Todo.findAll(cond);
        break;
    }
    return await result;
  },

  selectOneById: async function(modelName, id) {
    let result;
    let condiction = {
      where: {
        id
      }
    }
    switch(modelName){
      case modelNameMap.user:
        result = await User.findOne(condiction);
        break;
      case modelNameMap.todo:
        result = await Todo.findOne(condiction);
        break;
    }
    return await result;
  },

  updateById: async function (modelName, data, id) {
    let result;
    let condiction = {
      where: {
        id
      }
    }
    switch(modelName){
      case modelNameMap.user:
        result = await User.update(data, condiction);
        break;
      case modelNameMap.todo:
        result = await Todo.update(data, condiction);
        break;
    }
    return await result;
  },

  deleteById: async function (modelName, id) {
    let result;
    let condiction = {
      where: {
        id
      }
    }
    switch(modelName){
      case modelNameMap.user:
        result = await User.destroy(condiction);
        break;
      case modelNameMap.todo:
        result = await Todo.destroy(condiction);
        break;
    }
    return await result;
  },

  login: async function(data) {
    let result;
    let condiction = {
      where: {
        username: data.username,
        password: data.password
      }
    }
    result = await User.findOne(condiction);
    return await result;
  },

  register: async function(data) {
    let result;
    result = await User.create(data);
    return await result;
  },

  selectOneByUsername: async function(data) {
    let result;
    let condiction = {
      where: {
        username: data.username,
      }
    }
    result = await User.findOne(condiction);
    return await result;
  },
}

module.exports = {CRUD};

