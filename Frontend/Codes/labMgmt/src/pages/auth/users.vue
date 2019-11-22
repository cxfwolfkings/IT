<template>
  <div class="fullWidth">
    <div v-if="!isCopy">
      <div class="title">
        <span class="lab-title">用户列表</span>
        <el-input
          v-model="searchCondition"
          placeholder="请输入工号或姓名"
          prefix-icon="el-icon-search"
          size="small"
          style="margin-left:100px;margin-right:10px"
          :clearable="true"
        />
        <el-button type="primary" size="mini" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="primary" size="mini" icon="el-icon-plus" @click="add">添加</el-button>
        <el-button type="success" size="mini" @click="upload" icon="el-icon-document-copy">复制</el-button>
        <el-button type="success" size="mini" @click="download" icon="el-icon-download">模板下载</el-button>
      </div>
      <el-table
        :data="tableData"
        ref="singleTable"
        style="width: 100%; margin-top: 15px;"
        stripe
        border
        v-loading="loading"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="index" label="序号" width="50" :index="indexMethod" />
        <el-table-column prop="AccountNo" label="工号"></el-table-column>
        <el-table-column prop="AccountName" label="姓名"></el-table-column>
        <el-table-column prop="DeptName" label="部门"></el-table-column>
        <el-table-column prop="PhoneNumber" label="电话"></el-table-column>
        <el-table-column prop="MailAddress" label="邮箱"></el-table-column>
        <el-table-column prop="StatusName" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope" v-if="scope.row.Status==1">
            <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
            <!-- <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button> -->
            <el-button @click="handleLeave(scope.row)" type="text" size="small">离职</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="listQuery.PageIndex"
        :page-sizes="[10,20,30,50]"
        :page-size="listQuery.PageSize"
        :total="total"
        :background="true"
        :small="true"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <el-dialog :title="title" :visible="dialogVisible" :show-close="false" width="500px">
        <el-form ref="myModel" :model="userForm" :rules="rules" size="small" label-width="100px">
          <el-form-item label="工号" prop="AccountNo">
            <el-input v-model="userForm.AccountNo" autocomplete="off" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="AccountName">
            <el-input v-model="userForm.AccountName" autocomplete="off" :maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="DepartmentNo">
            <el-select v-model="userForm.DepartmentNo" collapse-tags clearable placeholder="请选择">
              <el-option
                v-for="item in depts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" prop="MailAddress">
            <el-input v-model="userForm.MailAddress" autocomplete="off" :maxlength="200"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-else>
      <div class="title">
        <span class="lab-title">用户复制</span>
        <span style="margin-left:100px; color:red">
          <i class="el-icon-star-on"></i>请使用Ctrl+V粘贴数据
        </span>
      </div>
      <el-table
        :data="copyData"
        style="width: 100%; margin-top: 15px;"
        border
        v-loading="loading2"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="AccountNo" label="工号"></el-table-column>
        <el-table-column prop="AccountName" label="姓名"></el-table-column>
        <el-table-column prop="DeptName" label="部门"></el-table-column>
        <el-table-column prop="MailAddress" label="邮箱"></el-table-column>
      </el-table>
      <el-row style="margin-top:15px">
        <el-col>
          <el-button
            type="default"
            size="mini"
            @click="isCopy = false"
            icon="el-icon-back"
            style="float: right; margin-right: 15px"
          >返回</el-button>
          <el-button
            type="primary"
            size="mini"
            style="float: right; margin-right: 9px"
            icon="el-icon-document-checked"
            @click="Import"
            @row-contextmenu="showContextmenu"
          >提交</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import UserDialog from "@/components/userDialog/create";
import { trimForm, showMessage } from "../../utils/helper";

const depts = window.config.depts.sort((t1, t2) => {
  return t1.value - t2.value;
});

export default {
  name: "users",
  data() {
    return {
      loading: false,
      loading2: false,
      tableData: [],
      copyData: [],
      account: null,
      dialogVisible: false,
      total: 0,
      title: "",
      depts: depts,
      isAdd: true,
      isCopy: false,
      copyContent: "",
      searchCondition: "",
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      },
      form: {
        IsNotPublicAndAdmin: true,
        IsShowLeave: true,
        Keywords: ""
      },
      userForm: {
        AccountNo: "",
        AccountName: "",
        DepartmentNo: "",
        MailAddress: ""
      },
      rules: {
        AccountNo: [
          { required: true, message: "请输入账号", trigger: ["blur", "change"] }
        ],
        AccountName: [
          { required: true, message: "请输入名称", trigger: ["blur", "change"] }
        ],
        DepartmentNo: [
          { required: true, message: "请选择部门", trigger: ["blur", "change"] }
        ],
        MailAddress: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["blur", "change"]
          },
          // {
          //   type: "email",
          //   message: "请输入正确的邮箱地址",
          //   trigger: ["blur", "change"]
          // }
          { validator: this.validateEmail, trigger: ["blur", "change"] }
        ]
      }
    };
  },
  mounted() {
    const base = this;
    this.search(true);
    // 覆盖浏览器粘贴事件
    document.addEventListener("paste", function(e) {
      var clipboardData = e.clipboardData;
      if (!(clipboardData && clipboardData.items)) {
        // 是否有粘贴内容
        return;
      }
      base.copyContent = e.clipboardData.getData("text/plain");
      base.paste();
    });
  },
  methods: {
    indexMethod(index) {
      return (
        index + (this.listQuery.PageIndex - 1) * this.listQuery.PageSize + 1
      );
    },
    validateEmail(rule, value, callback) {
      const pattern = new RegExp(
        /^[A-Za-z0-9\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      );
      const result = value.match(pattern);
      if (result) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱地址"));
      }
    },
    add() {
      this.isAdd = true;
      this.title = "添加";
      this.userForm = {};
      this.changeUserVisible(true);
    },
    handleUpdate(row) {
      this.isAdd = false;
      this.title = "编辑";
      this.userForm = JSON.parse(JSON.stringify(row));
      this.changeUserVisible(true);
    },
    handleDelete(row) {
      const _this = this;
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({ type: 'success', message: '删除成功!' });
          AuthorityService.delUser({
            accountId: row.Id,
            type: 0
          }).then(res => {
            if (_this.tableData.length === 1) {
              // 如果当前页只有一条数据
              _this.listQuery.PageIndex--;
              _this.listQuery.PageIndex =
                _this.listQuery.PageIndex > 0 ? _this.listQuery.PageIndex : 1;
            }
            this.getUsers();
          });
        })
        .catch(() => {
          // this.$message({ type: 'info', message: '已取消删除' })
        });
      // console.log(row)
    },
    handleLeave(row) {
      this.$confirm("是否确认该用户离职？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          AuthorityService.delUser({
            accountId: row.Id,
            type: -1
          }).then(res => {
            this.getUsers();
          });
        })
        .catch(() => {});
    },
    changeUserVisible(visible) {
      const base = this;
      setTimeout(() => {
        base.$refs["myModel"] && base.$refs["myModel"].clearValidate();
      }, 0);
      this.dialogVisible = visible;
    },
    getUsers() {
      this.loading = true;
      AuthorityService.getUsers(this.listQuery).then(res => {
        this.total = res.Total;
        this.tableData = res.Data.map(_ => {
          _.DeptName = depts.find(d => d.value === _.DepartmentNo).label;
          _.StatusName =
            _.Status == 1 ? "在职" : _.Status == 0 ? "删除" : "离职";
          return _;
        });
        this.loading = false;
      });
    },
    search(ev) {
      if (ev) {
        this.listQuery.PageIndex = 1;
      }
      this.form.Keywords = this.searchCondition;
      Object.assign(this.listQuery, this.form);
      trimForm(this.listQuery);
      this.getUsers();
    },
    upload() {
      this.copyData = [];
      this.isCopy = true;
    },
    download() {
      AuthorityService.downloadTmp();
    },
    handleSubmit() {
      const that = this;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          trimForm(this.userForm);
          if (this.isAdd) {
            AuthorityService.addUser(this.userForm).then(() => {
              this.dialogVisible = false;
              that.getUsers();
              this.$message({
                type: "success",
                message: "添加成功",
                duration: 1000
              });
            });
          } else {
            AuthorityService.updUser({
              Id: this.userForm.Id,
              AccountNo: this.userForm.AccountNo,
              AccountName: this.userForm.AccountName,
              DepartmentNo: this.userForm.DepartmentNo,
              MailAddress: this.userForm.MailAddress
            }).then(() => {
              this.dialogVisible = false;
              that.getUsers();
              this.$message({
                type: "success",
                message: "更新成功",
                duration: 1000
              });
            });
          }
        }
      });
    },
    Import() {
      const base = this;
      this.openFullScreen("正在处理中...", loading => {
        if (base.copyData && base.copyData.length) {
          const users = [];
          const accounts = [];
          for (let i = 0; i < base.copyData.length; i++) {
            const user = JSON.parse(JSON.stringify(base.copyData[i]));
            if (user.AccountNo.length > 20) {
              loading.close();
              showMessage(
                base,
                "warning",
                "工号字符数不能超过20！（出错行：" + (i + 1) + "）"
              );
              return;
            }
            if (accounts.find(_ => _ == user.AccountNo)) {
              loading.close();
              showMessage(
                base,
                "warning",
                "工号 " + user.AccountNo + " 重复！（出错行：" + (i + 1) + "）"
              );
              return;
            }
            if (user.AccountName.length > 50) {
              loading.close();
              showMessage(
                base,
                "warning",
                "姓名字符数不能超过50！（出错行：" + (i + 1) + "）"
              );
              return;
            }
            if (!depts.find(_ => _.label == user.DeptName)) {
              loading.close();
              showMessage(
                base,
                "warning",
                "部门只能输入电气研发，机械部门（出错行：" + (i + 1) + "）"
              );
              return;
            }
            if (
              user.MailAddress.length > 200 ||
              !/^[A-Za-z0-9\u4e00-\u9fa5][A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
                user.MailAddress
              )
            ) {
              loading.close();
              showMessage(
                base,
                "warning",
                "邮箱格式不对！（出错行：" + (i + 1) + "）"
              );
              return;
            }
            accounts.push(user.AccountNo);
            user.DepartmentNo = depts.find(_ => _.label == user.DeptName).value;
            delete user.DeptName;
            users.push(user);
          }
          AuthorityService.importUsers({
            users: users
          }).then(res => {
            loading.close();
            base.isCopy = false;
            base.search(true);
          });
        } else {
          loading.close();
          showMessage(base, "warning", "没有数据！");
        }
      });
    },
    showContextmenu() {},
    handleSizeChange(val) {
      this.listQuery.PageSize = val;
      this.getUsers();
    },
    handleCurrentChange(val) {
      this.listQuery.PageIndex = val;
      this.getUsers();
    },
    openFullScreen(msg, callback) {
      const loading = this.$loading({
        lock: true,
        text: msg || "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      callback(loading);
    },
    paste() {
      if (this.isCopy) {
        const lineReg = new RegExp(/\n/, "igm");
        const whiteReg = new RegExp(/\s+/, "igm");
        const userTxts = this.copyContent.split(lineReg);
        const users = [];
        if (
          userTxts &&
          userTxts.length &&
          Object.prototype.toString.call(userTxts) === "[object Array]"
        ) {
          for (let i = 0; i < userTxts.length; i++) {
            let userTxt = userTxts[i];
            if (userTxt) {
              userTxt = userTxt.trim();
              let user = userTxt.split(whiteReg);
              if (user.length >= 4) {
                if (user[0] == "工号") {
                  continue;
                }
                if (user[0] && user[1] && user[2] && user[3]) {
                  users.push({
                    AccountNo: user[0],
                    AccountName: user[1],
                    DeptName: user[2],
                    MailAddress: user[3]
                  });
                } else {
                  showMessage(
                    this,
                    "warning",
                    "工号，姓名，部门，邮箱是必填项，请填写完整再复制！"
                  );
                  return;
                }
              } else {
                showMessage(
                  this,
                  "warning",
                  "数据结构错误，请从模板复制数据！"
                );
                return;
              }
            }
          }
          this.copyData = users;
        }
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 24px;
}
.el-input,
.el-select,
.el-cascader {
  width: 300px;
}
</style>
<style>
.el-tabs__nav-wrap:after {
  background-color: white;
}
</style>
