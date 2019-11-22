<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>公共机账号</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <div class="title">
      <span class="lab-title">公共机账号列表</span>
      <el-button type="primary" size="mini" style="margin-left:100px" @click="add">+ 添加</el-button>
    </div>
    <el-table
      :data="all"
      ref="singleTable"
      style="width: 100%; margin-top: 15px;"
      stripe
      border
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column prop="AccountNo" label="账号"></el-table-column>
      <el-table-column prop="AccountName" label="显示名称"></el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="100"> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <UserDialog
      :dialog-visible="userDialogVisible"
      :account="account"
      @visible="changeUserVisible"
      @refresh="getPublicAccounts"
    />
  </div>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import UserDialog from "@/components/userDialog/create";

export default {
  name: "publicAccounts",
  components: { UserDialog },
  data() {
    return {
      all: [],
      loading: false,
      account: null,
      userDialogVisible: false
    };
  },
  mounted() {
    this.getPublicAccounts();
  },
  methods: {
    add() {
      this.account = null;
      this.userDialogVisible = true;
    },
    handleUpdate(row) {
      this.account = row;
      this.userDialogVisible = true;
    },
    handleDelete(row) {
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // this.$message({ type: 'success', message: '删除成功!' });
          AuthorityService.delPublicAccounts({
            accountId: row.Id
          }).then(res => {
            this.getPublicAccounts();
          });
        })
        .catch(() => {
          // this.$message({ type: 'info', message: '已取消删除' })
        });
      // console.log(row)
    },
    changeUserVisible(visible) {
      this.userDialogVisible = visible;
    },
    getPublicAccounts() {
      this.loading = true;
      AuthorityService.getPublicAccounts().then(res => {
        this.all = res;
        this.loading = false;
      });
    }
  }
};
</script>
<style>
.el-tabs__nav-wrap:after {
  background-color: white;
}
</style>
