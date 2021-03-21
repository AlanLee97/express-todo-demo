
// 返回结果的统一形式
class ApiJson {
  static success(data) {
    return {
      code: 1,
      msg: "ok",
      data
    }
  }

  static fail(error) {
    return {
      code: 0,
      msg: "fail",
      error
    }
  }
}

module.exports = ApiJson;