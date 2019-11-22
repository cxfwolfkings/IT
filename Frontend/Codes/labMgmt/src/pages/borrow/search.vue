<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借用归还</el-breadcrumb-item>
      <el-breadcrumb-item>查询</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="borrow" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-tools"></i> 借用查询
        </span>
        <el-row>
          <el-form :model="form" :inline="true" label-width="100px" size="small">
            <el-form-item label="借用人">
              <el-input v-model="form.BorrowerAccountNo" :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="借用日期">
              <el-date-picker
                v-model="form.BorrowDateRange"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="部件类型">
              <el-select
                v-model="form.AssetType"
                placeholder="请选择"
                @change="filterChange"
                clearable
              >
                <el-option
                  v-for="item in info.filterAssetTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="info.isNumberShow" label="部件编号">
              <el-input v-model="form.AssetNo" :clearable="true"></el-input>
            </el-form-item>
            <el-form-item label="计划归还日期">
              <el-date-picker
                v-model="form.PlanReturnDateRange"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['00:00:00', '23:59:59']"
              ></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="型号">
              <el-cascader v-model="info.form.ModelId" :options="info.filterModels" :show-all-levels="false" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="所在货架">
              <el-cascader v-model="info.form.ShelfId" :options="info.filterShelfs" :show-all-levels="false" clearable></el-cascader>
            </el-form-item>-->
            <!-- <el-form-item label="资产大类">
            <el-cascader v-model="info.form.CategoryIdLevel1" :options="info.filterCategoris1" :show-all-levels="false" clearable @change="filterChange"></el-cascader>
            </el-form-item>
            <el-form-item label="品牌">
            <el-select v-model="info.form.CategoryIdBrand" placeholder="请选择">
                <el-option
                v-for="item in info.filterBrands"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>
            <el-form-item label="小分类">
            <el-select v-model="info.form.CategoryIdLevel2" placeholder="请选择">
                <el-option
                v-for="item in info.filterCategoris2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            </el-form-item>-->
            <el-form-item style="float: right">
              <el-button type="success" plain @click="search" icon="el-icon-search">搜 索</el-button>
              <!-- <el-button type="primary"
                         @click="handAdd"
              icon="el-icon-plus">借出登记</el-button>-->
            </el-form-item>
          </el-form>
        </el-row>
        <el-table
          :data="info.singleData"
          ref="singleTable"
          border
          stripe
          header-cell-class-name="th-cell"
          v-loading="info.loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          style="width:100%"
        >
          <el-table-column type="index" label="序号" width="60" :index="indexMethod" />
          <el-table-column label="编号" min-width="150" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <el-tooltip effect="dark"
                          :content="scope.row.ComponentNo"
              placement="top-start">-->
              <a href="javascript:;" @click="handleEdit(scope.$index, scope.row, true)">
                <i class="el-icon-info"></i>
                {{scope.row.BorrowedRecordNo}}
              </a>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="BorrowerAccountNo"
            label="借用人"
            min-width="150"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="BorrowDateDesc"
            label="借用日期"
            min-width="180"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="借用部件" min-width="240" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <el-tooltip
                v-if="scope.row.AssetType==1"
                effect="dark"
                :content="scope.row.AssetModelDesc"
                placement="top"
              >
                <i class="el-icon-info"></i>
              </el-tooltip>
              <el-tooltip v-else effect="dark" content="点此查看平台组成" placement="top">-->
              <!-- <a
                v-if="scope.row.AssetType==2"
                href="javascript:;"
                @click="getPartDetail(scope.row.Id)"
              >
                <i class="el-icon-document"></i>
              </a>-->
              <!-- </el-tooltip> -->
              <span style="margin-right: 10px">{{ scope.row.AssetDesc }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="BorrowReasonName"
            label="借用目的"
            min-width="120"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="LaboratoryName"
            label="所在实验室"
            min-width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>-->
          <!-- <el-table-column prop="ShelfName" label="所在货架"></el-table-column> -->
          <!-- <el-table-column
            prop="IsNeedLabReportDesc"
            label="试验报告"
            min-width="80"
            :show-overflow-tooltip="true"
          ></el-table-column>-->
          <el-table-column
            prop="PlanReturnDateDesc"
            label="计划归还日期"
            min-width="180"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="IsReturnedDesc"
            label="是否归还"
            width="80"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="StatusName" label="状态"></el-table-column> -->
          <el-table-column label="操作" fixed="right" min-width="120">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleReport(scope.$index, scope.row)">查看报告</el-button>
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
      </el-tab-pane>
      <el-tab-pane name="return" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-grid"></i> 归还查询
        </span>
      </el-tab-pane>
      <el-tab-pane name="late" :lazy="true">
        <span slot="label">
          <i class="el-icon-folder-add"></i> 逾期未还查询
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="平台组成" :visible.sync="info.dialogVisible" width="600px">
      <el-button type="primary" size="small" @click="expandTb(true)">
        全部展开
        <i class="el-icon-plus el-icon--right"></i>
      </el-button>
      <el-button type="success" size="small" @click="expandTb(false)">
        全部收缩
        <i class="el-icon-minus el-icon--right"></i>
      </el-button>
      <el-table
        :data="info.partDetailData"
        border
        stripe
        :show-header="true"
        row-key="ModelNo"
        :expand-row-keys="info.expandRowKeys"
        style="width: 100%; margin-top: 15px"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-tag
              v-for="tag in props.row.tags"
              :key="tag.label"
              :disable-transitions="false"
            >{{tag.label}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CategoryNameLevel1" label="资产大类"></el-table-column>
        <el-table-column prop="CategoryNameLevel2" label="小分类"></el-table-column>
        <el-table-column prop="CategoryNameModel" label="型号类别"></el-table-column>
        <el-table-column prop="ModelNo" label="型号"></el-table-column>
        <el-table-column prop="CategoryNameBrand" label="品牌"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
    <el-dialog
      title="查看报告"
      :visible.sync="info.reportVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form ref="reportForm" :model="reportForm" label-width="100px" label-position="top">
        <el-form-item label="报告标题">
          <el-input v-model="reportForm.ReportTitle" readonly></el-input>
        </el-form-item>
        <ul>
          <li v-for="item in reportForm.fileList" :key="item">
            {{item}}
            <a
              class="el-icon-download"
              download
              :href="info.rootUrl + '/UserCenter/DownloadFile?fileName='+ item"
            ></a>
          </li>
        </ul>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="info.reportVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import { assetType, borrowReasons } from "../../config/const";
import { trimForm } from "../../utils/helper";

const rootUrl = window.config.backUrl;

export default {
  name: "borrowSearch",
  data() {
    return {
      info: {
        loading: false,
        singleData: [],
        componentData: [],
        total: 0,
        filterAssetTypes: assetType,
        // filterModels: [],
        // filterShelfs: [],
        isNumberShow: true,
        activeTab: "borrow",
        dialogVisible: false,
        reportVisible: false,
        partDetailData: [],
        expandRowKeys: [],
        rootUrl: rootUrl
      },
      form: {
        BorrowerAccountNo: "",
        AssetType: null,
        AssetNo: "",
        // AdminNo: '',
        // SerialNo: '',
        // ModelId: null,
        // ShelfId: null,
        BorrowDateRange: "",
        PlanReturnDateRange: ""
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      },
      reportForm: {
        ReportTitle: "",
        fileList: []
      }
    };
  },
  created() {
    if (this.$route.params.activeTab) {
      this.info.activeTab = this.$route.params.activeTab;
    }
    if (this.$route.params.PageIndex) {
      this.form = {
        ...this.$route.params
      };
      this.listQuery.PageIndex =
        this.form.PageIndex > 0 ? this.form.PageIndex : 1;
      // 将 form 中的 PageIndex 删除，不然会影响 getTableData 中的参数取值
      delete this.form.PageIndex;
    }
  },
  mounted() {
    this.search();
    // AssetService.getAssetCategory({
    //   AssetCategoryType: assetCategoryTypes.LevelOne
    // }).then(res => {
    //   this.info.filterCategoris1 = res.map(_ => {
    //     _.label = depts.find(d => d.value === _.value).label
    //     return _
    //   })
    // })
  },
  methods: {
    indexMethod(index) {
      return (
        index + (this.listQuery.PageIndex - 1) * this.listQuery.PageSize + 1
      );
    },
    tabClick(t) {
      if (t.name === "return") {
        this.$router.push({ name: "return_search" });
      } else if (t.name === "late") {
        this.$router.push({ name: "late_search" });
      }
    },
    handAdd() {
      this.$router.push({ name: "borrow_regist" });
    },
    handleEdit(i, row) {
      const formParams = {
        ...this.form,
        PageIndex: this.listQuery.PageIndex
      };
      const inParameters = { id: row.Id, form: formParams };
      inParameters.type = "read";
      this.$router.push({
        name: "borrow_regist",
        params: inParameters
      });
    },
    filterChange(e) {
      // if (e) {
      //   this.info.isNumberShow = true
      // } else {
      //   this.info.isNumberShow = false
      //   this.info.form.AssetType = null
      //   this.info.form.AssetNo = ''
      // }
    },
    getTableData() {
      this.info.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      params.AssetType = params.AssetType || 0;
      if (params.BorrowDateRange && params.BorrowDateRange.length) {
        params.BorrowDateRange = params.BorrowDateRange.join(",");
      } else {
        params.BorrowDateRange = "";
      }
      if (params.PlanReturnDateRange && params.PlanReturnDateRange.length) {
        params.PlanReturnDateRange = params.PlanReturnDateRange.join(",");
      } else {
        params.PlanReturnDateRange = "";
      }
      BorrowAndReturnService.getBorrowedRecords(params).then(res => {
        this.info.total = res.Total;
        this.info.singleData = res.Data.map(_ => {
          _.IsNeedLabReportDesc = _.IsNeedLabReport ? "需要" : "不需要";
          _.IsReturnedDesc = _.IsReturned
            ? "是"
            : !_.PlanReturnDateDesc && _.AssetType == 1
            ? "无需归还"
            : !_.PlanReturnDateDesc && _.AssetType == 2
            ? "无限期"
            : "否";
          _.AssetDesc =
            assetType.find(s => s.value === _.AssetType + "").label +
            "：" +
            _.AssetNo;
          // _.AssetTypeName = assetType.find(s => s.value === _.AssetType + '').label
          _.BorrowReasonName = borrowReasons.find(
            s => s.value === _.BorrowReason + ""
          ).label;
          return _;
        });
        this.info.loading = false;
      });
    },
    getPartDetail(brRecordId) {
      BorrowAndReturnService.getBorrowedPart({
        Id: brRecordId
      }).then(res => {
        this.info.partDetailData = res.Details;
        this.info.dialogVisible = true;
      });
    },
    expandTb(isExpand) {
      if (isExpand) {
        this.info.expandRowKeys = this.info.partDetailData.map(_ => _.ModelNo);
      } else {
        this.info.expandRowKeys = [];
      }
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
      Object.assign(this.listQuery, this.form);
      trimForm(this.listQuery);
      this.getTableData();
    },
    handleReport(index, row) {
      if (row.LabReportContent) {
        this.info.title =
          "使用报告 <[型号/组合平台编号]:" +
          (row.AssetModelDesc || row.AssetNo) +
          "; [使用目的]:" +
          row.BorrowReasonName +
          ">";
        // 查看
        this.info.reportVisible = true;
        this.reportForm.ReportTitle = row.LabReportContent;
        if (row.LabReportFile) {
          this.reportForm.fileList = row.LabReportFile.split(";").map(_ => {
            const array = _.split("\\");
            return array[array.length - 1];
          });
        } else {
          this.reportForm.fileList = [];
        }
      } else {
        this.$message({
          type: "warning",
          message: "没有报告!"
        });
      }
    }
  }
};
</script>
<style scoped>
.el-tag {
  margin-right: 10px;
}
</style>
