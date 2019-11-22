<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>续借记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
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
              round
              type="success"
              plain
              icon="el-icon-search"
              @click="search"
              style="margin-left:30px"
              size="small"
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
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          :data="info.tableData"
          ref="singleTable"
          border
          style="width: 100%; margin-top:10px"
        >
          <el-table-column type="index" :index="indexMethod" label="序号" width="50" />
          <!-- <el-table-column
            prop="RenewAuditStatusStr"
            label="审核状态"
            align="center"
            sortable
            :filters="[{ text: '待审核', value: '0' }, { text: '已同意', value: '1' }, { text: '已拒绝', value: '2' }, { text: '已取消', value: '3' }]"
            :filter-method="filterStatus"
            filter-placement="bottom-end"
          >-->
          <el-table-column prop="RenewAuditStatusStr" label="审核状态" align="center">
            <template slot-scope="scope">
              <el-popover v-if="scope.row.RenewAduitComment!=null" trigger="hover" placement="top">
                <p>原因: {{ scope.row.RenewAduitComment }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag
                    :type="handleStyle(scope.row.RenewAuditStatus)"
                    close-transition
                  >{{scope.row.RenewAuditStatusStr}}</el-tag>
                </div>
              </el-popover>
              <el-tag
                v-else
                :type="handleStyle(scope.row.RenewAuditStatus)"
                close-transition
              >{{scope.row.RenewAuditStatusStr}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="ApplicantInfo" label="申请人" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="ApplicationDateStr"
            label="申请日期"
            width="155"
            sortable
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="BorrowId" label="关联借用记录" align="center" width="150">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>部件编号: {{ scope.row.AssetNo }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag type="info" size="medium">
                    <el-link @click="link(scope.row.BorrowId)">{{ scope.row.BorrowedRecordNo }}</el-link>
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="AssetModelNo" label="部件型号" sortable :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="AssetTypeName" label="资产类型" sortable :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="RenewDays" label="续借天数" width="80" align="center"></el-table-column>
          <!-- <el-table-column
            prop="PlanReturnDate"
            label="原计划到期日"
            sortable
            :show-overflow-tooltip="true"
          ></el-table-column>-->
          <el-table-column
            prop="StrRenewStartDate"
            label="续借开始日"
            width="155"
            sortable
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="StrRenewEndDate"
            label="续借归还日"
            width="155"
            sortable
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- <el-table-column label="操作"  align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>-->
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
          <i class="el-icon-thirdicon_shiyongwendang"></i> 失信记录
        </span>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="续借申请单" :visible.sync="info.dialogFormVisible" width="500px">
      <el-form ref="myModel" :model="form" :rules="rules" style="width:400px" label-width="100px">
        <el-form-item label="借用编号" prop="BorrowId">
          <el-select v-model="form.BorrowId" placeholder="请选择" @change="selectChange">
            <el-option
              v-for="item in info.BorrowOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="续借开始日期" prop="RenewStartDate">
          <el-date-picker :disabled="true" v-model="form.RenewStartDate" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="续借天数" prop="RenewDays">
          <el-input-number
            v-model="form.RenewDays"
            @change="handleDaysChange"
            controls-position="right"
            :min="1"
            :max="info.MaxDays"
          ></el-input-number>
          <!-- <el-input v-model="form.RenewDays" autocomplete="off" style="width:300px"></el-input> -->
        </el-form-item>

        <!-- <el-form-item label="续借结束日期" prop="RenewEndDate">
          <el-date-picker v-model="form.RenewEndDate" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmmit" :disabled="info.isButtonDisabled">确 定</el-button>
        <!-- <el-button type="primary" @click="info.dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
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
import { debuglog } from "util";
import { fips } from "crypto";
const depts = window.config.depts;

export default {
  name: "order",
  props: {},
  data() {
    return {
      loading: false,
      info: {
        isButtonDisabled:false,
        activeTab: "renew",
        auditOpts: renewAuditStatusOptions,
        auditStatus: null,
        tableData: [],
        ApplicationDate: [],
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
        RenewDays: null,
        RenewStartDate: null,
        RenewEndDate: null,
        RenewAuditStatus: 0,
        ApplicantNo: ""
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
    this.getOwnBorrowOptions();
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
      if (t.name == "borrow") {
        this.$router.push({ name: "ucenter_borrowHistory" });
      } else if (t.name == "order") {
        this.$router.push({ name: "ucenter_order" });
      } else if (t.name == "credit") {
        this.$router.push({ name: "ucenter_credit" });
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
      // if (this.info.MaxDays < this.form.RenewDays) {
      //   this.$message({
      //     type: "error",
      //     message: "续借时间超过借用周期!"
      //   });
      //   return;
      // }
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          let params = {};
          this.form.RenewAuditStatus = renewAuditStatus.待审核;
          Object.assign(params, this.form);
          this.info.isButtonDisabled = true
          ucenterService.addRenew(params).then(res => {
            this.$message({
              type: "success",
              message: "操作成功！"
            });

            this.info.isButtonDisabled = false
            this.info.dialogFormVisible = false;
            this.getTableData();
          }).catch(res=>{
            this.info.isButtonDisabled = false
          });
        }
      });
    },
    getTableData() {
      this.loading = true;
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      if (this.info.ApplicationDate && this.info.ApplicationDate.length) {
        params.DateStart = this.info.ApplicationDate[0];
        params.DateEnd = this.info.ApplicationDate[1];
      }
      if (this.info.auditStatus != null && this.info.auditStatus != "") {
        params.AuditStatus = Number(this.info.auditStatus);
      }
      params.ApplicantNo = this.auser.AccountNo;
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
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
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
      this.$nextTick(() => {
        this.$refs["myModel"].resetFields();
      });

      //this.form.RenewEndDate = null
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
