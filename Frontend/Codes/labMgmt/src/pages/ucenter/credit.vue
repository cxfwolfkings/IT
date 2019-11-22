<template>
  <div class="fullWidth">
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="borrow" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdchaxun"></i> 借用记录
        </span>
      </el-tab-pane>
      <el-tab-pane name="order" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon-29"></i> 预约借用
        </span>
      </el-tab-pane>
      <el-tab-pane name="renew" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon_renwujincheng"></i> 续借记录
        </span>
      </el-tab-pane>
      <el-tab-pane name="credit" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon_shiyongwendang"></i> 失信记录
        </span>
        <!-- <el-form :inline="true" size="small">
          <el-form-item label="地点名称">
            <el-input v-model="filter.name"></el-input>
          </el-form-item>
          <el-button
            size="small"
            round
            type="success"
            plain
            icon="el-icon-search"
            @click="search"
            style="margin-left:100px"
          >搜索</el-button>
        </el-form>-->

        <el-table
          :data="tableData"
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column label="借用编号" prop="BorrowNo" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-link type="primary" icon="el-icon-link" @click="link(scope.row.Id)">{{ scope.row.BorrowNo }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="借用日期" prop="BorrowDate" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            label="逾期归还(天)"
            :formatter="formatter1"
            align="center"
            prop="ReturnDelayDays"
          ></el-table-column>
          <el-table-column
            label="逾期提交报告(天)"
            :formatter="formatter2"
            align="center"
            prop="ReportDelayDays"
          ></el-table-column>
          <template slot="empty">
            <el-alert
              center
              show-icon
              title="按时归还，报告不延期，信用良好，无失信记录！"
              type="success"
              :closable="false"
            ></el-alert>
          </template>
          <!-- <span slot="empty">按时归还，报告不延期，恭喜！暂无失信记录</span> -->
          <!-- <el-table-column label="" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
          </el-table-column>-->
        </el-table>
        <el-pagination
          v-show="isPageShow"
          style="margin-top:20px"
          background
          layout="total,prev, pager, next"
          :small="true"
          :total="info.pageInfo.totalItemCount"
          :page-size="info.pageInfo.pageSize"
          :current-page="info.pageInfo.curPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ucenterService from "../../apis/UserCenterService";
import SysSettingsService from "../../apis/SysSettingsService";
export default {
  name: "order",
  data() {
    return {
      isPageShow: true,
      loading: false,
      tableData: [],
      editMode: 0,
      filter: {
        name: ""
      },
      form: {
        id: null,
        name: "",
        no: "",
        address: ""
      },
      info: {
        activeTab: "credit",
        PlaceName: "",
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        },
        title: "",
        dialogVisible: false
      },
      rules: {
        //no:[{required:true,message:"请输入品牌编号",trigger: ['blur', 'change']}],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    tabClick(t) {
      if (t.name == "order") {
        this.$router.push({ name: "ucenter_order" });
      } else if (t.name == "renew") {
        this.$router.push({ name: "ucenter_renew" });
      } else if (t.name == "borrow") {
        this.$router.push({ name: "ucenter_borrowHistory" });
      }
    },
    getTableData() {
      this.loading = true;
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      ucenterService
        .getCreditList(params)
        .then(res => {
          this.loading = false;
          this.tableData = res.Data;
          this.info.pageInfo.totalItemCount = res.Total;
          debugger;
          if (res.Total == 0) {
            this.isPageShow = false;
          }
        })
        .catch(res => {
          this.loading = false;
        });
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
    indexMethod(index) {
      return (
        index +
        (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize +
        1
      );
    },
    formatter1(row, column) {
      if (Number(row.ReturnDelayDays) <= 0) {
        return "未逾期";
      } else {
        return Number(row.ReturnDelayDays);
      }
    },
    formatter2(row, column) {
      if (Number(row.ReportDelayDays) <= 0) {
        return "未逾期";
      } else {
        return Number(row.ReportDelayDays);
      }
    },
    link(borrowId) {
      this.$router.push({
        name: "ucenter_borrowHistory",
        params: { id: borrowId }
      });
    }
  }
};
</script>