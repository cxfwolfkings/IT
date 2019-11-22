<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的工作台</el-breadcrumb-item>
      <el-breadcrumb-item>预约管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="order" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdgongdanqueren"></i> 预约管理
        </span>

        <el-row>
          <!-- <el-input placeholder="请输入名称" style="width:500px" class="input-with-select">
            <el-select clearable slot="prepend" placeholder="请选择" style="width:120px">
              <el-option></el-option>
            </el-select> 
          </el-input>-->
          <el-form :inline="true" size="small">
            <el-row>
            <el-form-item  label="申请人">
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
            <el-form-item label="申请日期">
              <el-date-picker
                v-model="info.ApplicationDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="部件型号">
              <el-input v-model="info.Model"></el-input>
            </el-form-item>
            <el-form-item label="平台名称">
              <el-input v-model="info.CmpName"></el-input>
            </el-form-item>
            
            <el-button
              size="small"
              round
              type="success"
              plain
              icon="el-icon-search"
              @click="search"
              style="margin-left:100px"
            ></el-button>
            </el-row>
            <!-- <el-button plain type="primary" icon="el-icon-thirdicon-31" @click="handleAdd" style="margin-left:50px">发起预约</el-button> -->
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
          <el-table-column prop="ApplicantInfo" label="申请人" width="145"></el-table-column>
          <el-table-column prop="ApplicationDateStr" width="155" label="申请日期" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="UsePlace" label="使用地点"  :show-overflow-tooltip="true"  width="120"></el-table-column>
          <el-table-column prop="LabName" width="150" label="所在实验室" :show-overflow-tooltip="true"></el-table-column>
          <!-- <el-table-column
            prop="BorrowSettingType"
            :formatter="typeformatter"
            label="借用类型"
            width="80"
          ></el-table-column> -->
          <el-table-column label="预约部件"  :show-overflow-tooltip="true" width="240">
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
          <!-- <el-table-column prop="AssetTypeName" label="资产类型"></el-table-column>-->
          <el-table-column prop="AssetModelNo" label="部件型号"  :show-overflow-tooltip="true"  width="80"></el-table-column>

          <el-table-column prop="PlanBorrowDate" label="预计借用日期" :show-overflow-tooltip="true"  width="106"></el-table-column>
          <el-table-column prop="PlanReturnDate" label="归还日期" :show-overflow-tooltip="true"  width="98"></el-table-column>
          <el-table-column prop="BorrowDays" align="center" label="借用天数"></el-table-column>
          <el-table-column prop="IsProxyStr" label="是否代理借用" width="120" align="center"></el-table-column>
          <el-table-column prop="ProxyUserInfo" label="代借人信息" width="120" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="预约状态" :formatter="formatter"></el-table-column>
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
      <el-tab-pane name="renew" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdtianshenpi"></i> 续借管理
        </span>
      </el-tab-pane>
      <el-tab-pane name="credit" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdquanxianshenpi"></i> 信用管理
        </span>
      </el-tab-pane>
    </el-tabs>
    <orderDetailDia ref="orderform" @refresh="getTableData" />
  </div>
</template>
<script>
import AuthorityService from '../../apis/AuthorityService'
import AssetService from "../../apis/AssetService";
import ucenterService from "../../apis/UserCenterService";
import { assetType, repairStatus, BorrowSettingType,orderAuditStatus } from "../../config/const";
import { mapState } from "vuex";
import orderDetailDia from "../../components/ucenter/ucenter-orderdetail";

const depts = window.config.depts;

export default {
  name: "order",
  props: {},
  data() {
    return {
      tableloading:false,
      loading:false,
      info: {
        activeTab: "order",
        tableData: [],
        AccountNo:'',
        ApplicationDate: [],
        userOptions:[],
        filterUsers:[],
        Model: "",
        CmpName: "",
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
    AuthorityService.getUsers({
      IsEngineerOnly: true
    }).then(res => {
      this.info.filterUsers = res.Data.map(_ => {
        return {
          value: _.AccountNo,
          label: '[' + _.AccountNo + ']'+_.AccountName 
        }
      })
    })
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
      if (t.name == "credit") {
        this.$router.push({ name: "work_credit" });
      } else if (t.name == "renew") {
        this.$router.push({ name: "work_renew" });
      }
    },
    indexMethod(index) {
      return (
        index +
        (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize +1);
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
    getTableData() {
      this.tableloading = true
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      if (this.info.ApplicationDate && this.info.ApplicationDate.length) {
        params.DateStart = this.info.ApplicationDate[0];
        params.DateEnd = this.info.ApplicationDate[1];
      }
      // params.DateStart = this.info.ApplicationDate[0];
      // params.DateEnd = this.info.ApplicationDate[1];
      params.AssetModelNo = this.info.Model;
      params.CmpName = this.info.CmpName;
      params.ApplicantNo = this.info.AccountNo
      ucenterService.getAssetOoderRecords(params).then(res => {
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
        this.tableloading = false
      }).catch(res=>{
        this.tableloading = false
      });
    },
    handleAdd() {
      this.open();
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
    remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.info.userOptions = this.info.filterUsers.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.info.userOptions = [];
        }
      }
  }
};
</script>

