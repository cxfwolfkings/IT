<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>返修</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-row>
      <el-form :model="info.form" :inline="true" label-width="100px" size="small">
        <el-form-item label="返修编号">
          <el-input
            v-model="info.form.ReportNo"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="报修人">
          <el-input
            v-model="info.form.ReportBy"
            prefix-icon="el-icon-search"
            placeholder="请输入工号或姓名"
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="单件/平台">
          <el-select v-model="info.form.AssetType"
                     placeholder="请选择"
                     @change="filterChange"
                     clearable>
            <el-option v-for="item in info.filterAssetTypes"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item v-if="info.isNumberShow" label="部件编号">
          <el-input
            v-model="info.form.AssetNo"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="维修完成日期">
          <el-date-picker
            v-model="info.form.CompleteDateRange"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="success" plain @click="search" icon="el-icon-search">搜 索</el-button>
          <el-button type="primary" @click="handleAdd" icon="el-icon-plus">返修登记</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="info.tableData"
      ref="myTable"
      border
      stripe
      style="width: 100%;"
      v-loading="info.loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column type="index" label="序号" fixed width="60" :index="indexMethod" />
      <el-table-column label="返修编号" fixed min-width="150" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!-- <el-tooltip effect="dark" content="点此查看详情" placement="top"> -->
          <a href="javascript:;" @click="handleEdit(scope.$index, scope.row)">
            <i class="el-icon-info"></i>
            {{scope.row.ReportNo}}
          </a>
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column prop="ReportBy" label="报修人" min-width="130" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="AssetNo"
                       label="部件编号"></el-table-column>
      <el-table-column prop="AssetTypeName"
                       label="部件类型"
      width="100"></el-table-column>-->
      <el-table-column label="返修部件" prop="AssetDesc" min-width="240" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="SubmittedBy"
                       label="问题提出人"
      width="100"></el-table-column>-->
      <!-- <el-table-column prop="IssueContent"
                       label="问题描述"
      width="300"></el-table-column>-->
      <!-- <el-table-column prop="IsEffectUseDesc"
                       label="是否影响使用"
                       width="120"></el-table-column>
      <el-table-column prop="IsConfirmedDesc"
                       label="是否已确认"
      width="100"> </el-table-column>-->
      <!-- <el-table-column
        prop="ConfirmDateDesc"
        label="确认日期"
        min-width="180"
        :show-overflow-tooltip="true"
      ></el-table-column>-->
      <el-table-column
        prop="ResponsiblePerson"
        label="责任人"
        min-width="150"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="RepairStatusName"
        label="维修状态"
        min-width="100"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="CompleteDateDesc"
        label="维修完成日期"
        min-width="180"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="180">
        <template slot-scope="scope">
          <!-- <el-button size="mini"
                     type="primary"
          @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
          <el-button
            :disabled="scope.row.RepairStatus>=2"
            size="mini"
            type="success"
            @click="handleConfirm(scope.$index, scope.row)"
          >修复</el-button>
          <el-button
            :disabled="scope.row.RepairStatus>=2"
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
          >报废</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="listQuery.PageIndex"
      :page-sizes="[10,20,30,50]"
      :page-size="listQuery.PageSize"
      :total="info.total"
      :background="true"
      :small="true"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <RepairDialog
      :dialog-visible="info.dialogVisible"
      :repair-issue="info.repairRd"
      :is-read="info.isRead"
      @visible="changeVisible"
      @refresh="reload"
    />
    <el-dialog title="报废" :visible.sync="info.discardVisible" width="30%">
      <el-form
        ref="disableForm"
        :model="info.disableForm"
        :rules="info.disableRules"
        label-width="80px"
      >
        <el-form-item label="注意：" style="color: red">报废后，{{info.disabledMsg}}</el-form-item>
        <el-form-item label="报废说明" prop="DiscardDesc">
          <el-input
            type="textarea"
            :maxlength="500"
            :rows="4"
            v-model="info.disableForm.DiscardDesc"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="info.discardVisible = false">取 消</el-button>
        <el-button type="primary" @click="handDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AssetService from "../../apis/AssetService";
import { assetType, repairStatus } from "../../config/const";
import RepairDialog from "@/components/repairDialog/create";
import { trimForm, trim } from "../../utils/helper";

export default {
  name: "assetCollect",
  components: { RepairDialog },
  data() {
    return {
      info: {
        loading: false,
        tableData: [],
        total: 0,
        dialogVisible: false,
        discardVisible: false,
        repairRd: null,
        filterAssetTypes: assetType,
        isNumberShow: true,
        isRead: false,
        selectRow: null,
        disabledMsg: "",
        form: {
          ReportNo: "",
          AssetNo: "",
          ReportBy: "",
          CompleteDateRange: [],
          AssetType: null
        },
        disableForm: {
          DiscardDesc: ""
        },
        disableRules: {
          DiscardDesc: [
            {
              required: true,
              message: "请填写报废说明",
              trigger: ["blur", "change"]
            }
          ]
        }
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      }
    };
  },
  created() {},
  mounted() {
    this.search();
  },
  methods: {
    indexMethod(index) {
      return (
        index + (this.listQuery.PageIndex - 1) * this.listQuery.PageSize + 1
      );
    },
    handleAdd() {
      this.info.isRead = false;
      this.info.repairRd = null;
      this.info.dialogVisible = true;
    },
    handleEdit(i, row) {
      this.info.isRead = true;
      this.info.repairRd = row;
      this.info.dialogVisible = true;
    },
    handleConfirm(i, row) {
      let msg = "";
      let state = "可借";
      if (row.AssetType == 1) {
        msg = "部件";
      }
      if (row.AssetType == 2) {
        msg = "平台";
      }
      if (row.IsPartFav) {
        state = "馆藏";
      }
      this.$confirm("修复后，该" + msg + "将恢复" + state + "状态", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // status: 2 已修好
          row.RepairStatus = 2;
          AssetService.updRepairIssue(row)
            .then(() => {
              this.getTableData();
              this.$message({
                type: "success",
                message: "修复成功！"
              });
            })
            .catch(err => {
              this.getTableData();
            });
        })
        .catch(err => {});
    },
    handleDelete(row) {
      const base = this;
      if (row.AssetType == 1) {
        this.info.disabledMsg = "部件将不可用！";
      }
      if (row.AssetType == 2) {
        this.info.disabledMsg = "平台的所有部件均恢复为可借状态！";
      }
      setTimeout(() => {
        base.$refs["disableForm"] && base.$refs["disableForm"].clearValidate();
      }, 0);
      this.selectRow = row;
      this.info.disableForm.DiscardDesc = "";
      this.info.discardVisible = true;
    },
    handDelete() {
      this.$refs["disableForm"].validate(valid => {
        if (valid) {
          if (this.selectRow) {
            //  3: 无法修复
            this.selectRow.RepairStatus = 3;
            this.selectRow.DiscardDesc = trim(
              this.info.disableForm.DiscardDesc
            );
            AssetService.updRepairIssue(this.selectRow)
              .then(() => {
                this.selectRow = null;
                this.info.discardVisible = false;
                this.$message({ type: "success", message: "操作成功！" });
                this.getTableData();
              })
              .catch(err => {
                this.getTableData();
              });
          }
        }
      });
    },
    getTableData() {
      this.info.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      if (params.CompleteDateRange && params.CompleteDateRange.length) {
        params.CompleteDateRange = params.CompleteDateRange.join(",");
      } else {
        params.CompleteDateRange = "";
      }
      AssetService.getRepairIssues(params).then(res => {
        this.info.total = res.Total;
        this.info.tableData = res.Data.map(_ => {
          _.AssetDesc =
            assetType.find(s => s.value === _.AssetType + "").label +
            "：" +
            _.AssetNo;
          _.IsEffectUseDesc = _.IsEffectUse ? "是" : "否";
          _.IsConfirmedDesc = _.IsConfirmed ? "是" : "否";
          // _.AssetTypeName = assetType.find(s => s.value === _.AssetType + '').label
          _.RepairStatusName = repairStatus.find(
            s => s.value === _.RepairStatus + ""
          ).label;
          return _;
        });
        this.info.loading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.PageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.listQuery.PageIndex = val;
      this.getTableData();
    },
    search(ev) {
      if (ev) {
        this.listQuery.PageIndex = 1;
      }
      Object.assign(this.listQuery, this.info.form);
      trimForm(this.listQuery);
      this.getTableData();
    },
    changeVisible(visible) {
      this.info.dialogVisible = visible;
    },
    reload() {
      this.getTableData(true);
    },
    filterChange(e) {
      if (e) {
        this.info.isNumberShow = true;
      } else {
        this.info.isNumberShow = false;
        this.info.form.AssetType = null;
        this.info.form.AssetNo = "";
      }
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 240px;
}
.el-select {
  width: 240px;
}
.el-cascader {
  width: 240px;
}
</style>
