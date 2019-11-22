<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>信用管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick" style="margin-bottom:30px">
      <el-tab-pane name="order" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdgongdanqueren"></i> 预约管理
        </span>
      </el-tab-pane>
      <el-tab-pane name="renew" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdtianshenpi"></i> 续借管理
        </span>
      </el-tab-pane>

      <el-tab-pane name="credit" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdquanxianshenpi"></i> 信用管理
        </span>

        <el-tabs tab-position="top" type="border-card" @tab-click="creditTabClick" style="height: 635px;">
          <el-tab-pane label="延期次数查询">
            <span slot="label">
              <i class="el-icon-search"></i> 延期次数查询
            </span>
            <el-row>
              <el-form :inline="true" size="small">
                <el-form-item>
                  <el-input v-model="info.AccountNo" placeholder="请输入工号或姓名" clearable></el-input>
                  <!-- <el-select
                    size="small"
                    v-model="info.AccountNo"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    placeholder="请输入工号或姓名"
                    :remote-method="remoteMethod"
                    :loading="loading"
                  >
                    <el-option
                      v-for="item in info.userOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select> -->
                </el-form-item>

                <el-button
                  size="small"
                  round
                  type="success"
                  plain
                  icon="el-icon-search"
                  @click="search"
                  style="margin-left:30px"
                ></el-button>
                <el-button
                  size="small"
                  type="primary"
                  plain
                  icon="el-icon-thirdicon-6"
                  @click="exportExcel"
                  style="margin-left:30px"
                >导出EXCEL</el-button>
              </el-form>
            </el-row>
            <el-col :span="20">
              <el-table
                v-loading="info.loading"
                element-loading-text="加载中..."
                element-loading-spinner="el-icon-loading"
                :data="info.tableData"
                ref="singleTable"
                border
                style="width: 95%; margin-top:0px"
              >
                <el-table-column label="序号" type="index" :index="indexMethod" width="60" />
                <el-table-column prop="EmployeeNo" label="员工" align="center"></el-table-column>
                <!-- <el-table-column prop="EmployeeName" label="姓名"></el-table-column> -->
                <el-table-column prop="DelayCount" label="延期次数" align="center"></el-table-column>
                <el-table-column prop="ReportDelayCount" label="报告延期次数" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      v-if="!scope.row.IsBlack"
                      size="mini"
                      @click="handleBlock(scope.$index, scope.row)"
                    >加入黑名单</el-button>
                    <el-tag size="small" type="info" v-else>已加入黑名单</el-tag>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="margin-top:20px;"
                background
                layout="total,prev, pager, next"
                :small="true"
                :total="info.pageInfo.totalItemCount"
                :page-size="info.pageInfo.pageSize"
                :current-page="info.pageInfo.curPage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              ></el-pagination>
            </el-col>
          </el-tab-pane>
          <el-tab-pane label="黑名单管理">
            <span slot="label">
              <i class="el-icon-thirdzuoduiqi"></i> 黑名单管理
            </span>

            <el-row>
              <el-form :inline="true" size="small">
                <el-form-item>
                  <el-input v-model="tabBlackInfo.AccountNo" placeholder="请输入工号或姓名" clearable></el-input>
                  <!-- <el-select
                    size="small"
                    v-model="tabBlackInfo.AccountNo"
                    filterable
                    remote
                    clearable
                    reserve-keyword
                    placeholder="请输入工号或姓名"
                    :remote-method="remoteMethod1"
                    :loading="loading"
                  >
                    <el-option
                      v-for="item in tabBlackInfo.userOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select> -->
                </el-form-item>

                <el-button
                  size="small"
                  round
                  type="success"
                  plain
                  icon="el-icon-search"
                  @click="searchBlack"
                  style="margin-left:30px"
                ></el-button>
              </el-form>
            </el-row>
            <el-col :span="20">
              <el-table
                :data="tabBlackInfo.tableData"
                ref="singleTable1"
                border
                style="width: 95%; margin-top:0px"
              >
                <el-table-column label="序号" type="index" width="60" :index="indexMethod2" />
                <el-table-column prop="EmployeeNo" label="工号"></el-table-column>
                <el-table-column prop="EmployeeName" label="姓名"></el-table-column>
                <el-table-column prop="Reason" label="拉黑原因" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button
                      v-if="!scope.row.IsBlack"
                      size="mini"
                      @click="handleRemove(scope.$index, scope.row)"
                    >移出黑名单</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                style="margin-top:20px"
                background
                layout="total,prev, pager, next"
                :small="true"
                :total="tabBlackInfo.pageInfo.totalItemCount"
                :page-size="tabBlackInfo.pageInfo.pageSize"
                :current-page="tabBlackInfo.pageInfo.curPage"
                @size-change="handleSizeChange1"
                @current-change="handleCurrentChange1"
              ></el-pagination>
            </el-col>
          </el-tab-pane>
        </el-tabs>
        <div style="min-height:100"></div>
        <!-- <div class="el-divider el-divider--vertical el-col el-col-1"></div>
        <el-col :span="7"></el-col>-->
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import workService from "../../apis/WorkStationService";
import { mapState } from "vuex";
const depts = window.config.depts;

export default {
  name: "credit",
  props: {},
  data() {
    return {
      loading: false,
      info: {
        loading: false,
        activeTab: "credit",
        tableData: [],
        AccountNo: "",
        filterUsers: [],
        userOptions: [],
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        }
      },
      tabBlackInfo: {
        tableData: [],
        AccountNo: "",
        filterUsers: [],
        userOptions: [],
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        }
      }
    };
  },
  components: {},
  computed: {
    ...mapState({
      auser(state) {
        // console.log("home state", state.user.user)
        return state.user.user;
      }
    })
  },
  watch: {},
  created() {},
  mounted() {
    // AuthorityService.getUsers({
    //   IsEngineerOnly: true
    // }).then(res => {
    //   this.info.filterUsers = res.Data.map(_ => {
    //     return {
    //       value: _.AccountNo,
    //       label: "[" + _.AccountNo + "]" + _.AccountName
    //     };
    //   });
    // });
    this.getTableData();
    this.getBlackListData();
  },
  methods: {
    tabClick(t) {
      if (t.name == "renew") {
        this.$router.push({ name: "work_renew" });
      } else if (t.name == "order") {
        this.$router.push({ name: "work_order" });
      }
    },
    creditTabClick(t){
      if(t.index==0){
        this.search()
      }else if(t.index==1){
        this.searchBlack()
      }
    },
    search() {
      this.info.pageInfo.curPage = 1;
      this.getTableData();
    },
    exportExcel() {
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      params.EmployeeNo = this.info.AccountNo;
      workService.exportDelayRecords(params).then(res => {});
    },
    indexMethod(index) {
      return (
        index +
        (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize +
        1
      );
    },
    indexMethod2(index) {
      return (
        index +
        (this.tabBlackInfo.pageInfo.curPage - 1) *
          this.tabBlackInfo.pageInfo.pageSize +
        1
      );
    },
    searchBlack() {
      this.tabBlackInfo.pageInfo.curPage = 1;
      this.getBlackListData();
    },
    handleRemove(index, row) {
      this.$confirm("是否将此人移出黑名单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal:false,
        type: "warning"
      })
        .then(() => {
          workService.removeFromBlack({ UserNo: row.EmployeeNo }).then(res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getTableData();
            this.getBlackListData();
          });
        })
    },
    handleBlock(index, row) {
      this.$prompt("请输入拉黑原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal:false,
        //inputPattern: /^$/,
        inputErrorMessage: "请输入拒绝原因"
      }).then(({ value }) => {
        let params = {};
        params.Reason = value;
        params.EmployeeNo = row.EmployeeNo;
        workService.addBlackList(params).then(res => {
          this.$message({
            type: "success",
            message: "拉黑成功！"
          });
          this.getTableData();
          this.getBlackListData();
        });
      });
    },
    handleSizeChange(val) {
      this.info.pageInfo.PageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.info.pageInfo.curPage = val;
      this.getTableData();
    },
    handleSizeChange1(val) {
      this.tabBlackInfo.pageInfo.PageSize = val;
      this.getBlackListData();
    },
    handleCurrentChange1(val) {
      this.tabBlackInfo.pageInfo.curPage = val;
      this.getBlackListData();
    },
    getTableData() {
      let params = {};
      this.info.loading = true;
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      params.EmployeeNo = this.info.AccountNo;
      workService.getUserDelayRecords(params).then(res => {
        this.info.loading = false;
        this.info.tableData = res.Data;
        this.info.pageInfo.totalItemCount = res.Total;
      }).catch(res=>{
        this.info.loading = false;
      });
    },
    getBlackListData() {
      let params = {};
      params.PageIndex = this.tabBlackInfo.pageInfo.curPage;
      params.PageSize = this.tabBlackInfo.pageInfo.pageSize;
      params.EmployeeNo = this.tabBlackInfo.AccountNo;
      workService.getBlackList(params).then(res => {
        this.tabBlackInfo.tableData = res.Data;
        this.tabBlackInfo.pageInfo.totalItemCount = res.Total;
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.info.userOptions = this.info.filterUsers.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.info.userOptions = [];
      }
    },
    remoteMethod1(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.tabBlackInfo.userOptions = this.info.filterUsers.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.tabBlackInfo.userOptions = [];
      }
    }
  }
};
</script>
