<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>预约借用</el-breadcrumb-item>
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

        <el-row>
          <!-- <el-input placeholder="请输入名称" style="width:500px" class="input-with-select">
            <el-select clearable slot="prepend" placeholder="请选择" style="width:120px">
              <el-option></el-option>
            </el-select> 
          </el-input>-->
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

            <el-button
              round
              type="success"
              plain
              icon="el-icon-search"
              @click="search"
              style="margin-left:30px"
              size="small"
            ></el-button>
            <el-button
              plain
              type="primary"
              icon="el-icon-thirdicon-31"
              @click="handleAdd"
              style="margin-left:50px"
              size="small"
            >发起预约</el-button>
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
          <el-table-column label="序号" type="index" :index="indexMethod" width="50" />
          <el-table-column
            prop="ApplicantInfo"
            label="申请人"
            width="145"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="ApplicationDateStr"
            label="申请日期"
            sortable
            width="155"
            :show-overflow-tooltip="true"
          ></el-table-column>

          <!-- <el-table-column
            prop="BorrowSettingType"
            :formatter="typeformatter"
            label="借用类型"
            width="80"
          ></el-table-column>-->
          <el-table-column prop="LabName" width="150" label="所在实验室" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="预约部件" width="240" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.AssetType==1"
                effect="dark"
                :content="scope.row.AssetModelDesc"
                placement="top"
              >
                <i class="el-icon-info"></i>
              </el-tooltip>
              <span style="margin-right: 10px">{{ scope.row.AssetDesc }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="AssetTypeName" label="资产类型" sortable></el-table-column> -->
          <el-table-column prop="AssetModelNo" label="部件型号" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="UsePlace"
            label="使用地点"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="PlanBorrowDate"
            label="预计借用日期"
            width="138"
            sortable
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="PlanReturnDate"
            label="借用结束日期"
            width="138"
            sortable
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="BorrowDays"
            label="借用天数"
            align="center"
            width="80"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="IsProxyStr"
            label="是否代理借用"
            align="center"
            width="110"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="ProxyUserInfo"
            label="代借人信息"
            width="120"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="预约状态" :formatter="formatter"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="105">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.AuditStatus==0"
                size="mini"
                @click="handleCancel(scope.$index, scope.row)"
              >取消预约</el-button>
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
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

      <el-tab-pane name="renew" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon_renwujincheng"></i> 续借记录
        </span>
      </el-tab-pane>
      <el-tab-pane name="credit" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon_shiyongwendang"></i> 失信记录
        </span>
      </el-tab-pane>
    </el-tabs>
    <orderDetailDia ref="orderform" @refresh="getTableData" />
  </div>
</template>
<script>
import AssetService from "../../apis/AssetService";
import ucenterService from "../../apis/UserCenterService";
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import {
  assetType,
  repairStatus,
  orderAuditStatus,
  orderAuditStatusOptions,
  BorrowSettingType
} from "../../config/const";
import { mapState } from "vuex";
import orderDetailDia from "../../components/ucenter/ucenter-orderdetail";

const depts = window.config.depts;

export default {
  name: "order",
  props: {},
  data() {
    return {
      loading: false,
      info: {
        activeTab: "order",
        tableData: [],
        ApplicationDate: [],
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        }
      }
    };
  },
  components: {
    orderDetailDia
  },
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
    this.getTableData();
  },
  methods: {
    open() {
      this.$refs.orderform.$emit("open");
    },
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
      } else if (t.name == "renew") {
        this.$router.push({ name: "ucenter_renew" });
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
    search() {
      this.info.pageInfo.curPage = 1;
      this.getTableData();
    },
    typeformatter(row, col) {
      switch (row.BorrowSettingType) {
        case BorrowSettingType.场内:
          return "场内";
          break;
        case BorrowSettingType.场外:
          return "场外";
          break;
        default:
          break;
      }
    },
    formatter(row, column) {
      switch (row.AuditStatus) {
        case orderAuditStatus.未完成:
          return "未完成";
          break;
        case orderAuditStatus.已完成:
          return "已完成";
          break;
        case orderAuditStatus.已取消:
          return "已取消";
          break;
        default:
          break;
      }
    },
    handleSizeChange(val) {
      this.info.pageInfo.PageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.info.pageInfo.curPage = val;
      this.getTableData();
    },
    handleCancel(index, row) {
      this.$confirm("是否要取消预约?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        ucenterService.cancelOrder({ OrderId: row.Id }).then(res => {
          this.$message({ type: "success", message: "取消成功！" });
          this.getTableData();
        });
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
      params.ApplicantNo = this.auser.AccountNo;
      ucenterService
        .getAssetOoderRecords(params)
        .then(res => {
          this.info.tableData = res.Data.map(_ => {
            _.IsProxyStr = _.IsProxy ? "是" : "否";
            _.AssetTypeName = assetType.find(
              s => s.value === _.AssetType + ""
            ).label;
            _.AssetDesc =
              assetType.find(s => s.value === _.AssetType + "").label +
              "：" +
              _.AssetNo;
            return _;
          });
          this.info.pageInfo.totalItemCount = res.Total;
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },
    handleAdd() {
      ucenterService.checkIsBack().then(res=>{
        debugger
        if(res){
          this.$message({
          type: "warning",
          message: "你已被加入黑名单,不能预约!"
        });
        }else{
          this.open();
        }
      })
      // if (this.auser.IsBlack) {
      //   this.$message({
      //     type: "warning",
      //     message: "你已被加入黑名单,不能预约!"
      //   });
      // } else {
      //   this.open();
      // }
    }
  }
};
</script>

