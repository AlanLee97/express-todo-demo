<template>

  <div class="page">
    <div class="title-bar">
      <div class="title">
        <img alt="Vue logo" src="../../assets/logo.png" class="logo">
        <h1>Vue-Todo</h1>
      </div>

      <el-link @click="logout" type="primary">退出登录</el-link>
    </div>

    <div class="operation-bar">
      <div>
        <el-button type="primary" @click="handleOpenAddBtn">添加</el-button>
      </div>
      <div>
        筛选：
      <el-select v-model="currentStatus" placeholder="请选择"  @change="handleFilterStatus">
        <el-option
          v-for="item in statusList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
    </div>

    <div>
      <el-table
        ref="multipleTable"
        :data="currentTodoList"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column label="标题" width="120">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
          width="240"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :width="100"
          show-overflow-tooltip
        >
          <!-- <span>{{getStatus(scope.row.status)}}</span> -->
          <template slot-scope="scope">
            <span>{{getStatus(scope.row.status)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="updatedAt"
          label="更新时间"
        >
          <template slot-scope="scope">
            {{ scope.row.updatedAt| datetimeFilter}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-show="scope.row.status !== 2">
              <el-button type="primary" :disabled="scope.row.status === 1" @click="setTodoDone(scope.row.id)">完成</el-button>
              <el-button type="success" :disabled="scope.row.status === 1" @click="handleUpdate(scope.row)" >编辑</el-button>
              <el-button type="danger"  @click="setTodoDeleted(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="`${this.mode === 'add' ? '新增' : '编辑'}Todo`" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="名称">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/index";
import moment from "moment";

export default {
  name: "Todo",
  data() {
    return {
      userInfo: null,
      todoList: [],
      currentTodoList: [],
      dialogFormVisible: false,
      mode: "add",
      form: {
        id: undefined,
        title: "",
        content: "",
        status: 0,
        user_id: undefined
      },
      statusList: [
        {
          label: "全部",
          value: -1
        },
        {
          label: "待办",
          value: 0
        },
        {
          label: "完成",
          value: 1
        },
        {
          label: "已删除",
          value: 2
        }
      ],
      currentStatus: -1,
      batchDeleteLList: []
    };
  },
  computed: {
    getStatus () {
      return function (num) {
        switch(num) {
          case 0:
            return "待办";
          case 1:
            return "已完成";
          case 2:
            return "已删除";

        }
      }
    },
  },
  filters: {
    datetimeFilter(datetime) {
      return moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  watch: {
    mode (newVal) {
      console.log("newVal", newVal);
      this.mode = newVal;
    },

    currentStatus (newVal) {
      this.currentTodoList = this.todoList.filter(v => v.status === newVal);
      if (newVal === -1) {
        this.currentTodoList = this.todoList;
      }
    }
  },
  created() {
    this.checkIsLogin();
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    console.log("userInfo", this.userInfo);
    this.getTodoList();
  },
  methods: {
    getTodoList() {
      request.get("/todo/list/" + this.userInfo.id).then((res) => {
        console.log(res);
        this.todoList = res.data.data;
        this.currentTodoList = this.todoList;
      }).catch(err => {
        console.log(err);
        this.$message.error("获取todo列表失败");
      });
    },

    handleSelectionChange(val) {
      console.log(val);
      let ids = [];
      val.map((item) => {
        ids.push(item.id);
      })
      this.batchDeleteLList = ids;
    },

    handleOpenAddBtn() {
      this.resetForm();
        this.mode = 'add';
        this.dialogFormVisible = true;
    },

    handleDialogConfirm () {
      // this.$message.info()
      console.log(this.form);
      if(this.mode === 'add') {
        this.addTodo();
      }else {
        // console.log("----> this.form", this.form);
        this.updateTodo();
      }
    },

    addTodo() {
      this.form.user_id = this.userInfo.id;
      request.post('/todo', this.form).then(res => {
        if(res.data.code === 1) {
          this.$message.success("添加成功");
          this.getTodoList();
          this.dialogFormVisible = false;
        }else {
          this.$message.err("添加失败");
        }
      }).catch(err => {
        this.$message.error("添加失败");
        console.error(err);
      });
    },

    handleUpdate(data) {
      this.mode = 'update';
      this.dialogFormVisible = true;
      console.log('data', data);
      this.form.id = data.id;
      this.form.title = data.title;
      this.form.content = data.content;
      this.form.status = data.status;
      console.log(this.form);
    },

    resetForm() {
      this.form.id = undefined;
      this.form.title = "";
      this.form.content = "";
      this.form.status = 0;
    },

    setTodoDone(id) {
      let data = {
        id,
        status: 1
      }
      request.put('/todo', data).then(res => {
        if(res.data.code === 1) {
          this.$message.success("已设为完成");
          this.getTodoList();
        }else {
          this.$message.error("设置失败");
        }
      }).catch(err => {
        this.$message.error("设置失败");
        console.error(err);
      });
    },

    updateTodo() {
      request.put('/todo', this.form).then(res => {
        if(res.data.code === 1) {
          this.$message.success("保存成功");
          this.getTodoList();
          this.dialogFormVisible = false;
          this.resetForm();
        }else {
          this.$message.err("保存失败");
        }
      }).catch(err => {
        this.$message.error("保存失败");
        console.error(err);
      });
    },

    setTodoDeleted(id) {
      let data = {
        id,
        status: 2
      }
      request.put('/todo', data).then(res => {
        if(res.data.code === 1) {
          this.$message.success("已删除");
          this.getTodoList();
          this.dialogFormVisible = false;
        }else {
          this.$message.error("删除失败");
        }
      }).catch(err => {
        this.$message.error("删除失败");
        console.error(err);
      });
    },

    handleFilterStatus(val) {
      console.log("status", val);
      // this.currentTodoList(val);
    },

    handleBatchDelete () {
      console.log('批量删除：', this.batchDeleteLList);
    },

    logout() {
      sessionStorage.removeItem("userInfo");
      this.$router.push("/login");
    }
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.page {
  padding: 20px;
  .title-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    .logo {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }

    .title {
      display: flex;
      align-items: center;
    }
  }



  .operation-bar {
    display: flex;
    justify-content: space-between;
  }
}

</style>
