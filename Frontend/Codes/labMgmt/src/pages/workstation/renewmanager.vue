<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>续借管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="order" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdgongdanqueren"></i> 预约管理
        </span>
      </el-tab-pane>
      <el-tab-pane name="renew" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdtianshenpi"></i> 续借管理
        </span>
        <el-row>
          <el-form :inline="true" size="small">
            <el-form-item label="申请日期">
              <el-date-picker
                v-model="info.ApplicationDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="申请人">
              <el-select
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
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态">
              <el-select v-model="info.auditStatus" placeholder="请选择" clearable>
                <el-option
                  v-for="item in info.auditOpts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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
            <!-- <el-button
              plain
              type="primary"
              icon="el-icon-thirdicon-35"
              @click="handleAdd"
              style="margin-left:50px"
            >续借申请</el-button>-->
          </el-form>
        </el-row>
        <el-table
          v-loading="tableloading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          :data="info.tableData"
          ref="singleTable"
          border
          style="width: 100%; margin-top:10px"
        >
          <el-table-column label="序号" type="index" :index="indexMethod" width="50" />
          <el-table-column prop="ApplicantInfo" label="申请人" width="150"></el-table-column>
          <el-table-column
            prop="ApplicationDateStr"
            label="申请时间"
            width="160"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="BorrowId" label="关联借用记录" align="center" width="140">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>资产号: {{ scope.row.AssetNo }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-link
                    type="primary"
                    size="medium"
                    @click="handleViewDetail(scope.$index, scope.row, true)"
                  >{{ scope.row.BorrowedRecordNo }}</el-link>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="AssetModelNo" :show-overflow-tooltip="true" label="部件型号"></el-table-column>
          <el-table-column prop="AssetTypeName" label="资产类型" :show-overflow-tooltip="true" width="80"></el-table-column>
          <el-table-column
            prop="RenewDays"
            width="80"
            label="续借天数"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="PlanReturnDate" label="原计划到期日" :show-overflow-tooltip="true"></el-table-column> -->
          <el-table-column prop="RenewStartDate" label="续借开始日" width="100" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="RenewEndDate" label="续借归还日" width="100" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column
            prop="RenewAuditStatusStr"
            label="审核状态"
            align="center"
            :filters="[{ text: '待审核', value: '0' }, { text: '已同意', value: '1' }, { text: '已拒绝', value: '2' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
          >-->
          <el-table-column prop="RenewAuditStatusStr" label="审核状态" width="80" align="center">
            <template slot-scope="scope">
              <el-tag
                :type="handleStyle(scope.row.RenewAuditStatus)"
                close-transition
              >{{scope.row.RenewAuditStatusStr}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
              <el-button
                type="primary"
                v-show="scope.row.RenewAuditStatus == 0"
                size="mini"
                @click="handleAgree(scope.$index, scope.row)"
              >同意</el-button>
              <el-button
                type="danger"
                v-show="scope.row.RenewAuditStatus == 0"
                size="mini"
                @click="handleReject(scope.$index, scope.row)"
              >拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
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

      <el-tab-pane name="credit" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdquanxianshenpi"></i> 信用管理
        </span>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="续借申请单" :visible.sync="info.dialogFormVisible" width="47%">
      <el-form :inline="true" ref="myModel" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="申请人" prop="Applicant">
          <el-input v-model="form.Applicant" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" prop="ApplicationDate">
          <el-input v-model="form.ApplicationDate" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="关联借用记录" prop="BorrowedRecordNo">
          <el-input v-model="form.BorrowedRecordNo" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="资产号" prop="AssetNo">
          <el-input v-model="form.AssetNo" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="资产类型" prop="AssetTypeName">
          <el-input v-model="form.AssetTypeName" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="部件型号" prop="Model">
          <el-input v-model="form.Model" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="续借开始日期" prop="RenewStartDate">
          <el-input :readonly="true" v-model="form.RenewStartDate" type="datetime"></el-input>
        </el-form-item>
        <el-form-item label="续借结束日期" prop="RenewEndDate">
          <el-input :readonly="true" v-model="form.RenewEndDate" type="datetime"></el-input>
        </el-form-item>
        <!-- <el-form-item label="原计划到期日" prop="PlanReturnDate">
          <el-input :readonly="true" v-model="form.PlanReturnDate" type="datetime"></el-input>
        </el-form-item>-->
        <el-form-item label="续借天数" prop="RenewDays">
          <!-- <el-input-number
           :disabled="true"
            v-model="form.RenewDays"
            @change="handleDaysChange"
            controls-position="right"
            :min="1"
            :max="info.MaxDays"
          ></el-input-number>-->
          <el-input v-model="form.RenewDays" :readonly="true"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="RenewAuditStatusStr">
          <el-input :readonly="true" v-model="form.RenewAuditStatusStr"></el-input>
        </el-form-item>
        <el-form-item
          label="审核人"
          prop="RenewAuditUser"
          v-show="form.RenewAuditStatus==1||form.RenewAuditStatus==2"
        >
          <el-input :readonly="true" v-model="form.RenewAuditUser"></el-input>
        </el-form-item>
        <el-form-item
          label="审核时间"
          prop="RenewAduitDate"
          v-show="form.RenewAuditStatus==1||form.RenewAuditStatus==2"
        >
          <el-input :readonly="true" v-model="form.RenewAduitDate" type="datetime"></el-input>
        </el-form-item>
        <el-form-item label="拒绝原因" prop="RenewAduitComment" v-show="form.RenewAuditStatus==2">
          <el-input style="width:160%" type="textarea" :readonly="true" v-model="form.RenewAduitComment"></el-input>
        </el-form-item>
        <!-- <el-form-item label="续借结束日期" prop="RenewEndDate">
          <el-date-picker v-model="form.RenewEndDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="info.dialogFormVisible = false">关 闭</el-button>
        <!-- <el-button type="primary" @click="handleSubmmit">确 定</el-button> -->
        <!-- <el-button type="primary" @click="info.dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import workService from "../../apis/WorkStationService";
import AssetService from "../../apis/AssetService";
import ucenterService from "../../apis/UserCenterService";
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import sysSettingService from "../../apis/SysSettingsService";
import {
  assetType,
  renewAuditStatus,
  renewAuditStatusOptions
} from "../../config/const";
import { mapState } from "vuex";
const depts = window.config.depts;

export default {
  name: "renew",
  props: {},
  data() {
    return {
      tableloading: false,
      loading: false,
      info: {
        auditOpts: renewAuditStatusOptions,
        auditStatus: null,
        activeTab: "renew",
        tableData: [],
        ApplicationDate: [],
        AccountNo: "",
        filterUsers: [],
        userOptions: [],
        BorrowOptions: [],
        MaxDays: 10,
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        },
        dialogFormVisible: false
      },
      form: {
        BorrowId: null,
        Applicant: "",
        ApplicationDate: null,
        BorrowedRecordNo: "",
        AssetTypeName: "",
        RenewDays: null,
        RenewStartDate: null,
        RenewEndDate: null,
        RenewAuditStatus: "",
        RenewAuditStatusStr: "",
        RenewAduitComment: "",
        RenewAduitDate: "",
        RenewAuditUser: "",
        ApplicantNo: "",
        PlanReturnDate: ""
      },
      rules: {
        BorrowId: [
          {
            required: true,
            message: "请选择关联借用记录",
            trigger: ["blur", "change"]
          }
        ],
        RenewDays: [
          {
            required: true,
            message: "请输入续借天数",
            trigger: ["blur", "change"]
          }
        ]
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
    AuthorityService.getUsers({
      IsEngineerOnly: true
    }).then(res => {
      this.info.filterUsers = res.Data.map(_ => {
        return {
          value: _.AccountNo,
          label: "[" + _.AccountNo + "]" + _.AccountName
        };
      });
    });
    //this.getOwnBorrowOptions();
    this.form.ApplicantNo = this.auser.AccountNo;
    this.getTableData();
    sysSettingService.getBorrowSetting().then(res => {
      this.info.MaxDays = res.RenewalCycle;
    });
    //this.getTableData();
  },
  methods: {
    switchChange(e) {
      if (e) {
        this.info.isProxyShow = true;
      } else {
        this.info.isProxyShow = false;
      }
    },
    tabClick(t) {
      if (t.name == "credit") {
        this.$router.push({ name: "work_credit" });
      } else if (t.name == "order") {
        this.$router.push({ name: "work_order" });
      }
    },
    indexMethod(index) {
      return (
        index +
        (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize +
        1
      );
    },
    selectChange(e) {
      this.form.RenewStartDate = this.info.BorrowOptions.find(
        _ => _.value == e
      ).remark;
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
    handleDaysChange(e) {
      // if(this.form.RenewEndDate!=null)
      // {
      //   debugger
      //   let borrowdate=new Date(this.info.BorrowOptions.find(_=>_.value == this.form.BorrowId).remark)
      //   this.form.RenewEndDate = borrowdate
      // }
    },
    handleStyle(e) {
      if (e == renewAuditStatus.待审核) {
        return "primary";
      } else if (e == renewAuditStatus.已同意) {
        return "success";
      } else if (e == renewAuditStatus.已拒绝) {
        return "danger";
      }
    },
    filterStatus(value, row) {
      return row.RenewAuditStatus == value;
    },
    handleSubmmit() {
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          let params = {};
          this.form.AuditStatus = renewAuditStatus.待审核;
          Object.assign(params, this.form);
          ucenterService.addRenew(params).then(res => {
            this.$message({
              type: "success",
              message: "操作成功！"
            });
            this.info.dialogFormVisible = false;
            this.getTableData();
          });
        }
      });
    },
    getTableData() {
      let params = {};
      this.tableloading = true;
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      if (this.info.ApplicationDate && this.info.ApplicationDate.length) {
        params.DateStart = this.info.ApplicationDate[0];
        params.DateEnd = this.info.ApplicationDate[1];
      }

      if (this.info.auditStatus != null && this.info.auditStatus != "") {
        params.AuditStatus = Number(this.info.auditStatus);
      }
      // params.DateStart = this.info.ApplicationDate[0];
      // params.DateEnd = this.info.ApplicationDate[1];
      params.ApplicantNo = this.info.AccountNo;
      ucenterService
        .getAssetRenewRecords(params)
        .then(res => {
          this.info.tableData = res.Data.map(_ => {
            _.RenewAuditStatusStr = renewAuditStatusOptions.find(
              s => s.value == _.RenewAuditStatus
            ).label;
            _.AssetTypeName = assetType.find(
              s => s.value === _.AssetType + ""
            ).label;
            return _;
          });
          this.info.pageInfo.totalItemCount = res.Total;
          this.tableloading = false;
        })
        .catch(res => {
          this.tableloading = false;
        });
    },
    getOwnBorrowOptions() {
      let params = {};
      params.BorrowerAccountNo = this.auser.AccountNo;
      params.IsReturned = false;
      ucenterService.getBorrowedOptions(params).then(res => {
        this.info.BorrowOptions = res.Data;
        // this.info.BorrowOptions = res.map(_ => {
        //   _.label = _.id;
        //   _.value = _.id;
        //   return _;
        // });
      });
    },
    handleAdd() {
      this.info.dialogFormVisible = true;
      this.$refs["myModel"].resetFields();
      //this.form.RenewEndDate = null
    },
    handleDetail(index, row) {
      debugger;
      this.info.dialogFormVisible = true;
      //this.form.BorrowId = this.row.Id;
      this.form.Applicant = row.ApplicantInfo;
      this.form.ApplicationDate = row.ApplicationDateStr;
      this.form.BorrowedRecordNo = row.BorrowedRecordNo;
      this.form.RenewStartDate = row.StrRenewStartDate;
      this.form.RenewEndDate = row.StrRenewEndDate;
      this.form.AssetNo = row.AssetNo;
      this.form.RenewDays = row.RenewDays;
      this.form.AssetTypeName = row.AssetTypeName;
      this.form.RenewAuditStatus = row.RenewAuditStatus;
      this.form.RenewAuditStatusStr = row.RenewAuditStatusStr;
      this.form.RenewAduitComment = row.RenewAduitComment;
      this.form.RenewAduitDate = row.RenewAduitDateStr;
      this.form.RenewAuditUser = row.RenewAuditUser;
      // Object.assign(this.form,row)
      this.form.Model = row.AssetModelDesc || row.AssetModelNo;
    },
    handleViewDetail(i, row) {
      debugger;
      const inParameters = { id: row.BorrowId, renewManager: true };
      inParameters.type = "read";
      this.$router.push({
        name: "borrow_regist",
        params: inParameters
      });
    },
    handleAgree(index, row) {
      this.$confirm("是否同意该续借申请?", "提示", {
        confirmButtonText: "确定",
        closeOnClickModal:false,
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          debugger;
          let params = {};
          params.Id = row.Id;
          params.BorrowId = row.BorrowId;
          params.RenewAuditStatus = renewAuditStatus.已同意;
          params.AuditAccountNo = this.auser.AccountNo;
          params.IsAuditPass = true;
          workService.updateRenew(params).then(res => {
            this.$message({
              type: "success",
              message: "操作成功！"
            });
            this.getTableData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消审核"
          });
        });
    },
    handleReject(index, row) {
      this.$prompt("请输入拒绝原因", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        closeOnClickModal:false,
        //inputPattern: /^$/,
        inputErrorMessage: "请输入拒绝原因"
      })
        .then(({ value }) => {
          let params = {};
          params.Comment = value;
          params.Id = row.Id;
          params.RenewAuditStatus = renewAuditStatus.已拒绝;
          params.AuditAccountNo = this.auser.AccountNo;
          workService.updateRenew(params).then(res => {
            this.$message({
              type: "success",
              message: "操作成功！"
            });
            this.getTableData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消输入"
          });
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
    }
  }
};
</script>
