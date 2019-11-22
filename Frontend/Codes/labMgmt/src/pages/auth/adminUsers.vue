<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <div class="title">
      <span class="lab-title">管理员列表</span>
      <el-button type="primary" size="mini" style="margin-left:30px" @click="add">+ 添加</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="tabChange" :stretch="false" class="mt20">
      <el-tab-pane v-for="lab in labs" :key="lab.Id" :name="lab.Id + ''">
        <span :title="lab.LaboratoryName" slot="label">{{lab.LaboratoryName}}</span>
      </el-tab-pane>
    </el-tabs>
    <el-table
      :data="all"
      ref="singleTable"
      style="width: 100%;"
      stripe
      border
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="AccountNo" label="工号"></el-table-column>
      <el-table-column prop="AccountName" label="姓名"></el-table-column>
      <el-table-column prop="DeptName" label="部门"></el-table-column>
      <el-table-column prop="AuthorityDeptsDesc" label="可见部门"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserDialog
      :dialog-visible="userDialogVisible"
      :laboratoryId="activeName-0"
      @visible="changeUserVisible"
      @output-users="selectUsers"
    />
    <el-dialog title="编辑" :visible="editVisible" :show-close="false" width="400px">
      <el-form :model="editForm" size="small" label-width="100px">
        <el-form-item label="工号：">
          <label>{{ editForm.AccountNo }}</label>
        </el-form-item>
        <el-form-item label="姓名：">
          <label>{{ editForm.AccountName }}</label>
        </el-form-item>
        <el-form-item label="部门：">
          <label>{{ editForm.DeptName }}</label>
        </el-form-item>
        <el-form-item label="可见部门：">
          <el-select
            v-model="editForm.AuthorityDepts"
            multiple
            collapse-tags
            clearable
            placeholder="请选择"
            @change="deptChange(editForm)"
          >
            <el-option
              v-for="item in depts"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import UserDialog from "@/components/userDialog";
// import { setContent } from "../../utils/helper";

const depts = window.config.depts;

export default {
  name: "adminUsers",
  components: { UserDialog },
  data() {
    return {
      loading: false,
      labs: [],
      activeName: "",
      all: [],
      userDialogVisible: false,
      editVisible: false,
      depts: depts,
      editForm: {
        Id: null,
        AccountNo: "",
        AccountName: "",
        DepartmentNo: "",
        DeptName: "",
        AuthorityDepts: []
      }
    };
  },
  mounted() {
    AuthorityService.getLabs().then(res => {
      this.labs = res;
      if (res && res.length) {
        this.activeName = res[0].Id + "";
      }
      this.getAdmins();
    });
  },
  methods: {
    add() {
      if (this.labs && this.labs.length) {
        this.userDialogVisible = true;
      } else {
        this.$message({
          type: "warning",
          message: "请先创建实验室！"
        });
      }
    },
    tabChange() {
      this.getAdmins();
    },
    handleEdit(row) {
      Object.assign(this.editForm, row);
      this.editForm.AuthorityDepts = row.AuthorityDepts.split(",");
      this.editVisible = true;
    },
    handleDelete(row) {
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({ type: 'success', message: '删除成功!' });
          AuthorityService.delLabAdmins({
            LaboratoryId: this.activeName,
            AdminAccountId: row.Id
          }).then(res => {
            this.getAdmins();
          });
        })
        .catch(() => {
          // this.$message({ type: 'info', message: '已取消删除' });
        });
      // console.log(row)
    },
    changeUserVisible(visible) {
      this.userDialogVisible = visible;
    },
    selectUsers(rows) {
      // console.log(rows)
      AuthorityService.addLabAdmins({
        LaboratoryId: this.activeName,
        AdminAccounts: rows.map(_ => {
          if (!_.AuthorityDepts || !_.AuthorityDepts.length) {
            _.AuthorityDepts = [_.DepartmentNo];
          }
          const authorityDepts = _.AuthorityDepts.join(",");
          return {
            AccountId: _.Id,
            AuthorityDepts: authorityDepts
          };
        })
      }).then(() => {
        this.getAdmins();
      });
    },
    getAdmins() {
      this.loading = true;
      AuthorityService.getLabAdmins({
        labId: this.activeName
      }).then(res => {
        res.forEach(_ => {
          _.DeptName = depts.find(d => d.value === _.DepartmentNo).label;
          _.AuthorityDeptsDesc = _.AuthorityDepts.split(",")
            .map(deptId => depts.find(dept => dept.value === deptId).label)
            .join(",");
        });
        this.all = res;
        this.loading = false;
        // setTimeout(setContent, 0);
      });
    },
    handleSubmit() {
      this.editForm.LaboratoryId = this.activeName;
      this.editForm.AdminAccountId = this.editForm.Id;
      this.editForm.AdminAccounts = [
        {
          AuthorityDepts: this.editForm.AuthorityDepts.join(",")
        }
      ];
      AuthorityService.updLabAdmins(this.editForm).then(res => {
        this.editVisible = false;
        this.getAdmins();
      });
    },
    deptChange(row) {
      if (!row.AuthorityDepts.includes(row.DepartmentNo)) {
        row.AuthorityDepts.push(row.DepartmentNo);
      }
    }
  }
};
</script>
<style>
.el-tabs__nav-wrap:after {
  background-color: white;
}
</style>
