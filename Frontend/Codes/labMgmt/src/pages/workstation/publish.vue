<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>信息发布</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <el-form :inline="true" @submit.native.prevent>
      <el-form-item label="标题">
        <el-input v-model="info.title" size="small" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          round
          type="success"
          plain
          icon="el-icon-search"
          @click="search"
          style="margin-left:30px"
        ></el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          size="small"
          type="primary"
          plain
          icon="el-icon-thirdtianxie"
          @click="addHandle"
          style="margin-left:30px"
        >发布信息</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="info.tableData"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column label="标题" prop="Title" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        label="内容"
        prop="Content"
        :formatter="formatter"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="维护人" prop="UpdateUserInfo" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="维护时间" prop="UpdateTime" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="发布时间" prop="PublishTime" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="状态" prop="PublishStatus" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-tag
            :type="handleStyle(scope.row.PublishStatus)"
            close-transition
          >{{scope.row.PublishStatusStr}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.PublishStatus==0"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="success"
            plain
            size="mini"
            @click="handleSend(scope.$index, scope.row)"
          >发送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      layout="total,prev, pager, next"
      :small="true"
      :total="info.pageInfo.totalItemCount"
      :page-size="info.pageInfo.pageSize"
      :current-page="info.pageInfo.curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-dialog title="新增/编辑消息" :visible.sync="info.dialogFormVisible" :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="Title">
          <el-col :span="11">
            <el-input v-model="form.Title"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="内容" prop="Content">
          <el-col :span="22">
            <el-input v-model="form.Content" type="textarea" placeholder="请输入内容" :rows="5"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item></el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="info.dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="handleSave(0)">保 存</el-button>
        <el-button size="small" type="success" @click="handleSave(1)">保存并发送</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import WorkStationService from "../../apis/WorkStationService";
import { publishStatusArray, publishStatus } from "../../config/const";
export default {
  name: "publish",
  data() {
    return {
      loading: false,
      info: {
        title: "",
        tableData: [],
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        },
        dialogFormVisible: false
      },
      form: {
        Id: null,
        Title: "",
        MessageType: null,
        Content: "",
        PublishStatus: 0
      },
      rules: {
        Title: [
          {
            required: true,
            message: "请选输入标题",
            trigger: ["blur", "change"]
          }
        ],
        Content: [
          {
            required: true,
            message: "请输入内容",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  computed: {
    ...mapState({
      auser(state) {
        // console.log("home state", state.user.user)
        return state.user.user;
      }
    })
  },
  methods: {
    getTableData() {
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      params.Title = this.info.title;
      this.loading = true
      WorkStationService.getMessageList(params).then(res => {
        this.loading = false
        this.info.tableData = res.Data.map(_ => {
          _.PublishStatusStr = publishStatusArray.find(
            s => s.value == _.PublishStatus
          ).label;
          return _;
        });
        this.info.pageInfo.totalItemCount = res.Total;
      }).catch(res=>{
        this.loading = false
      });
    },
    formatter(row, column) {
      return row.Content.length > 30
        ? row.Content.slice(0, 20) + "......"
        : row.Content;
      //return
    },
    search() {
      this.info.pageInfo.curPage = 1;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.info.pageInfo.PageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.info.pageInfo.curPage = val;
      this.getTableData();
    },
    handleStyle(e) {
      if (e == publishStatus.草稿) {
        return "primary";
      } else if (e == publishStatus.已发布) {
        return "success";
      }
    },
    addHandle() {
      this.info.dialogFormVisible = true;
      if (this.$refs["form"] !== undefined) {
        this.$refs["form"].resetFields();
      }
      this.form.Content = "";
      this.form.Title = "";
      this.form.Id = 0;
    },
    handleEdit(index, row) {
      this.info.dialogFormVisible = true;
      this.form.Content = row.Content;
      this.form.Id = row.Id;
      this.form.Title = row.Title;
    },
    handleSend(index, row) {
      this.$confirm("是否发送该条信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {};
          params.Id = row.Id;
          params.PublishStatus = publishStatus.已发布;
          params.PublishUserNo = this.auser.AccountNo;
          WorkStationService.SendMail(params).then(res => {
            this.$message({
              type: "success",
              message: "发送成功！"
            });
            this.getTableData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleSave(sendFlag) {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = {};
          Object.assign(params, this.form);
          params.UpdaterUserNo = this.auser.AccountNo;
          params.PublishStatus = publishStatus.草稿;
          if (sendFlag == 1) {
            params.PublishStatus = publishStatus.已发布;
            params.PublishUserNo = this.auser.AccountNo;
          }
          if (this.form.Id == 0) {
            WorkStationService.addMessage(params).then(res => {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.info.dialogFormVisible = false;
              this.getTableData();
            });
          } else {
            WorkStationService.updMessage(params).then(res => {
              this.$message({
                type: "success",
                message: "操作成功！"
              });
              this.info.dialogFormVisible = false;
              this.getTableData();
            });
          }
        }
      });
    }
  }
};
</script>