<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件检索</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <div>
      <el-radio-group
        v-model="searchMethod"
        @change="changeSearchType"
        fill="#E4E7ED"
        text-color="#333"
      >
        <el-radio-button label="关键词搜索"></el-radio-button>
        <el-radio-button label="多条件组合查询"></el-radio-button>
      </el-radio-group>
    </div>
    <el-row :gutter="20" style="margin-top:20px" v-if="searchMethod == '关键词搜索'">
      <div class="searchRow">
        <el-col :span="18">
          <el-input
            placeholder="请输入部件关键词"
            prefix-icon="el-icon-search"
            v-model="keywords"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round style="width:100%" @click="search">搜 索</el-button>
        </el-col>
      </div>
      <div class="searchRow hot">
        <span class="muted">热门关键词：</span>
        <el-link @click="searchHot(hot1)" type="warning">{{hot1}}</el-link>
        <el-link @click="searchHot(hot2)" type="primary">{{hot2}}</el-link>
        <el-link @click="searchHot(hot3)" type="danger">{{hot3}}</el-link>
        <!-- <el-link type="warning">倍福</el-link>
             <el-link type="primary">欧姆龙</el-link>
        <el-link type="danger">PLC</el-link>-->
      </div>
    </el-row>
    <el-row v-else :gutter="20" class="mt30" style="margin-top:20px;padding-left:10px">
      <span>组合条件 &nbsp;</span>
      <el-cascader
        v-model="filters"
        
        :options="filterCategoris1"
        :show-all-levels="true"
        :props="{ checkStrictly: true }"
        placeholder="组合类别"
        style="width:400px"
        clearable
      ></el-cascader>
      <!-- <el-select v-model="filter.level2" clearable placeholder="小分类">
        <el-option
          v-for="item in filterCategoris2"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <el-select v-model="filter.brand" placeholder="品牌" clearable>
        <el-option
          v-for="item in filterBrands"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-button type="primary" style="margin-left:50px" @click="search">查 询</el-button>
    </el-row>

    <el-table
      :data="assetData"
      ref="singleTable"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      stripe
      style="width: 100%; margin-top:20px"
    >
      <el-table-column label="序号" type="index" width="50" :index="indexMethod" />
      <!-- <el-table-column prop="InternalNo" label="实验室内部编号" sortable width="180"></el-table-column> -->
      <el-table-column
        prop="Dept"
        :formatter="formatterDept"
        label="部门"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column prop="LabName" label="实验室" sortable></el-table-column> -->
      <el-table-column prop="ModelNo" label="型号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="类别&品牌" :formatter="formatter" align="center">
        <template slot-scope="scope">
          <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
            <font>{{ formatter(scope.row) }}</font>
          </el-tooltip>-->
          <el-popover trigger="hover" placement="top-start">
            <p>
              <b>资产大类</b>
              : {{ scope.row.StrCategoryIdLevel1 }}
            </p>
            <p>
              <b>资产小类</b>
              : {{ scope.row.StrCategoryIdLevel2 }}
            </p>
            <p>
              <b>品牌</b>
              : {{ scope.row.StrCategoryIdBrand }}
            </p>
            <font slot="reference">{{ formatter(scope.row) }}</font>
          </el-popover>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="StrCategoryIdLevel1" label="资产大类" sortable width="180"></el-table-column>
      <el-table-column prop="StrCategoryIdBrand" label="品牌" sortable width="180"></el-table-column>
      <el-table-column prop="StrCategoryIdLevel2" label="资产小类" sortable width="180"></el-table-column>-->

      <!-- <el-table-column prop="StrStatus" label="部件状态" sortable width="180"></el-table-column> -->
      <el-table-column prop="StockNum" label="可借出数量" align="center">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.StockNum>0"
            @click.native.prevent="ShowStockList(scope.$index, scope.row)"
            type="primary"
            size="small"
          >{{scope.row.StockNum}}</el-link>
          <label v-else>{{scope.row.StockNum}}</label>
        </template>
      </el-table-column>
      <el-table-column prop="BorrowedNum" label="被借出数量" align="center">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.BorrowedNum>0"
            @click.native.prevent="ShowBorrowList(scope.$index, scope.row)"
            type="primary"
            size="small"
          >{{scope.row.BorrowedNum}}</el-link>
          <label v-else>{{scope.row.BorrowedNum}}</label>
        </template>
      </el-table-column>
      <el-table-column prop="RepairNum" label="维修中数量" align="center"></el-table-column>
      <el-table-column prop="CmpNum" label="被组合占用数量" align="center">
        <template slot-scope="scope">
          <el-link
            v-if="scope.row.CmpNum>0"
            @click.native.prevent="ShowCmpList(scope.$index, scope.row)"
            type="primary"
            size="small"
          >{{scope.row.CmpNum}}</el-link>
          <label v-else>{{scope.row.CmpNum}}</label>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top:20px"
      background
      :small="true"
      layout="prev, pager, next"
      :total="totalItemCount"
      :page-size="pageSize"
      :current-page="curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog :title="diatitle" :visible.sync="diaVisible">
      <el-card>
      <el-table
        :data="borrowlist"
        v-loading="borrowloading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        stripe
      >
        <el-table-column prop="LaboratoryName" label="实验室"></el-table-column>
        <el-table-column prop="BorrowerAccountNo" label="借用人"></el-table-column>
        <el-table-column prop="BorrowDateDesc" label="借出时间"></el-table-column>
        <el-table-column prop="PlanReturnDateDesc" label="预计归还时间"></el-table-column>
      </el-table>
      </el-card>
      <el-pagination
        :hide-on-single-page="true"
        style="margin-top:10px;min-height:15px"
        :small="true"
        layout="prev, pager, next"
        :total="borrowPageInfo.totalItemCount"
        :page-size="borrowPageInfo.pageSize"
        :current-page="borrowPageInfo.curPage"
        @current-change="handleBorrowCurrentChange"
      ></el-pagination>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="diaVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="diatitle" :visible.sync="diaCmpVisible">
      <el-card>
      <el-table
        :data="cmplist"
        v-loading="cmploading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        stripe
      >
        <el-table-column prop="ComponentNo" label="平台编号" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ComponentName" label="平台名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Count" label="所占该型号部件数"></el-table-column>
        <el-table-column prop="LabName" label="所在实验室" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="ComponentDesc" label="平台详细" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
      </el-card>
      <el-pagination
        :hide-on-single-page = "true"
        style="margin-top:10px;min-height:15px"
        :small="true"
        layout="prev, pager, next"
        :total="cmpPageInfo.totalItemCount"
        :page-size="cmpPageInfo.pageSize"
        :current-page="cmpPageInfo.curPage"
        @current-change="handleCmpCurrentChange"
      ></el-pagination>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="diaCmpVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="diatitle" :visible.sync="diaStockVisible">
      <el-card>
      <el-table
        :data="stockList"
        v-loading="stockloading"
        element-loading-text="加载中"
        element-loading-spinner="el-icon-loading"
        stripe
      >
        <el-table-column prop="InternalNo" label="实验室编号"></el-table-column>
        <el-table-column prop="LabName" label="所在实验室"></el-table-column>
      </el-table>
      </el-card>
      <el-pagination
       :hide-on-single-page = "true"
        style="margin-top:10px;min-height:15px"
        :small="true"
        layout="prev, pager, next"
        :total="stockPageInfo.totalItemCount"
        :page-size="stockPageInfo.pageSize"
        :current-page="stockPageInfo.curPage"
        @current-change="handleStockCurrentChange"
      ></el-pagination>
      
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="diaStockVisible = false" >关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { assetCategoryTypes, depts, assetStatus } from "../config/const";
import ast from "../apis/asset";
import AssetService from "../apis/AssetService";
import { debug } from "util";
import BorrowAndReturnService from "../apis/BorrowAndReturnService";
import { parse } from "path";

export default {
  data() {
    return {
      borrowloading: false,
      cmploading: false,
      stockloading: false,
      loading: false,
      hot1: "汽车",
      hot2: "CPU",
      hot3: "地球人",
      diatitle: "",
      diaCmpVisible: false,
      diaVisible: false,
      diaStockVisible: false,
      borrowlist: [],
      cmplist: [],
      stockList: [],
      keywords: "",
      assetData: [],
      pageSize: 10,
      curPage: 1,
      totalItemCount: 50,
      searchMethod: "关键词搜索",
      isKeywords: true,
      filterCategoris1: [],
      filterCategoris2: [],
      filterBrands: [],
      category1: [{ label: "卷绕机", value: 1 }, { label: "PLC", value: 2 }],
      category2: [{ label: "小类1", value: 3 }, { label: "小类2", value: 4 }],
      brands: [{ label: "欧姆龙", value: 5 }, { label: "倍福", value: 6 }],
      filters: [],
      filter: {
        level1: null,
        level2: null,
        brand: null,
        modeltype: null,
        model: null
      },
      cmpPageInfo: {
        modelNo: "",
        curPage: 1,
        pageSize: 10,
        totalItemCount: 50
      },
      borrowPageInfo: {
        modelNo: "",
        curPage: 1,
        pageSize: 10,
        totalItemCount: 50
      },
      stockPageInfo: {
        modelNo: "",
        curPage: 1,
        pageSize: 10,
        totalItemCount: 50
      }
    };
  },
  methods: {
    search: async function() {
      this.curPage = 1;
      this.getTableData();
      // this.assetData = await ast.searchByKeywords(this.keywords)
    },
    indexMethod(index) {
      return index + (this.curPage - 1) * this.pageSize + 1;
    },
    searchHot(hot) {
      this.keywords = hot;
      this.curPage = 1;
      this.getTableData();
    },
    getTableData() {
      let params = {};
      params.DepartmentNo = this.auser.DepartmentNo;
      params.PageIndex = this.curPage;
      params.PageSize = this.pageSize;
      params.IsGroupByModelNo = true;
      this.loading = true;
      if (this.isKeywords) {
        params.Keywords = this.keywords;
        ast
          .searchByKeywords1(params)
          .then(res => {
            this.loading = false;
            this.assetData = res.Data;
            this.totalItemCount = res.Total;
          })
          .catch(res => {
            this.loading = false;
          });
      } else {
        Object.assign(params, this.filter);
        if (this.filters && this.filters.length) {
          params.dept = this.filters[0];
          params.level1 = this.filters[1];
          params.level2 = this.filters[2];
          params.modeltype = this.filters[3];
          params.model = this.filters[4];
        }
        ast
          .searchByKeywords1(params)
          .then(res => {
            this.assetData = res.Data;
            this.totalItemCount = res.Total;
            this.loading = false;
          })
          .catch(res => {
            this.loading = false;
          });
      }
    },
    getBorrowTableData() {
      let params = {};
      params.IsReturned = false;
      params.AssetModelNo = this.borrowPageInfo.modelNo;
      params.PageIndex = this.borrowPageInfo.curPage;
      params.PageSize = this.borrowPageInfo.pageSize;
      this.borrowloading = true;
      BorrowAndReturnService.getBorrowedRecords(params)
        .then(res => {
          this.borrowlist = res.Data;
          this.borrowPageInfo.totalItemCount = res.Total;
          this.borrowloading = false;
        })
        .catch(res => {
          this.borrowloading = false;
        });
    },
    getStockTableDate() {
      let params = {};
      params.ModelNo = this.stockPageInfo.modelNo;
      params.PageIndex = this.stockPageInfo.curPage;
      params.PageSize = this.stockPageInfo.pageSize;

      params.Status = assetStatus.find(_ => (_.label = "可借")).value;
      params.IsAddStatus = true;
      params.IsAddFavorited=true;
      params.IsFavorited = false;
      //params.IsReturned = false;
      //params.ModelNo = row.ModelNo;
      this.stockloading = true;
      AssetService.getAssets(params)
        .then(res => {
          this.stockList = res.Data;
          this.stockPageInfo.totalItemCount = res.Total;
          this.stockloading = false;
        })
        .catch(res => {
          this.stockloading = false;
        });
    },
    getCmpTableData() {
      let params = {};
      params.AssetModelNo = this.cmpPageInfo.modelNo;
      params.PageIndex = this.cmpPageInfo.curPage;
      params.PageSize = this.cmpPageInfo.pageSize;
      this.cmploading = true;
      AssetService.getComponentsByModel(params)
        .then(res => {
          this.cmplist = res.Data;
          this.cmpPageInfo.totalItemCount = res.Total;
          this.cmploading = false;
        })
        .catch(res => {
          this.cmploading = false;
        });
    },
    changeSearchType(val) {
      if (val == "关键词搜索") this.isKeywords = true;
      else this.isKeywords = false;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getTableData();
    },
    handleBorrowCurrentChange(val) {
      this.borrowPageInfo.curPage = val;
      this.getBorrowTableData();
    },
    handleCmpCurrentChange(val) {
      this.cmpPageInfo.curPage = val;
      this.getCmpTableData();
    },
    handleStockCurrentChange(val) {
      this.stockPageInfo.curPage = val;
      this.getCmpTableData();
    },
    formatter(row, column) {
      return (
        row.StrCategoryIdLevel1 +
        " / " +
        row.StrCategoryIdLevel2 +
        " & " +
        row.StrCategoryIdBrand
      );
    },
    formatterDept(row, column) {
      return depts.find(_ => _.value == row.Dept).label;
    },
    ShowBorrowList(index, row) {
      this.diaVisible = true;
      this.diatitle = "[型号：" + row.ModelNo + "] 借用详细";
      this.borrowPageInfo.modelNo = row.ModelNo;
      this.getBorrowTableData();
      // let params = {};
      // params.IsReturned = false;
      // params.AssetModelNo = row.ModelNo;
      // this.borrowloading = true;
      // BorrowAndReturnService.getBorrowedRecords(params)
      //   .then(res => {
      //     this.borrowlist = res.Data;
      //     this.borrowloading = false;
      //   })
      //   .catch(res => {
      //     this.borrowloading = false;
      //   });
    },
    ShowStockList(index, row) {
      this.diaStockVisible = true;
      this.diatitle = "[型号：" + row.ModelNo + "] 部件详细";
      this.stockPageInfo.modelNo = row.ModelNo;
      this.getStockTableDate();
    },
    ShowCmpList(index, row) {
      this.diaCmpVisible = true;
      this.diatitle = "[型号：" + row.ModelNo + "] 平台详细";
      this.cmpPageInfo.modelNo = row.ModelNo;
      this.getCmpTableData();
      // let params = {};
      // params.AssetModelNo = row.ModelNo;
      // this.cmploading = true;
      // AssetService.getComponentsByModel(params)
      //   .then(res => {
      //     this.cmplist = res.Data;
      //     this.cmploading = false;
      //   })
      //   .catch(res => {
      //     this.cmploading = false;
      //   });
    },
    getHotWords() {
      AssetService.getHotWords().then(res => {
        this.hot1 = res[0] || "";
        this.hot2 = res[1] || "";
        this.hot3 = res[2] || "";
      });
    }
    // filterChange(e) {
    //   this.filter.level2 = null;
    //   this.filter.brand = null;
    //   if (e && e.length) {
    //     this.filter.level1 = e[1];
    //     AssetService.getAssetCategory({
    //       AssetCategoryType: assetCategoryTypes.LevelTwo,
    //       CategoryIdLevel1: e[1]
    //     }).then(res => {
    //       this.filterCategoris2 = res;
    //     });
    //   }
    // }
  },
  computed: {
    ...mapState({
      auser(state) {
        return state.user;
      }
    })
  },
  created: function() {
    debugger
  },
  mounted() {
    this.getHotWords();
    this.getTableData();
    AssetService.getModelCascadeByAuth({
      AssetCategoryType: assetCategoryTypes.LevelOne
    }).then(res => {
      this.filterCategoris1 = res.map(_ => {
        _.label = depts.find(d => d.value === _.value).label;
        return _;
      });
    });
    AssetService.getAssetCategory({
      AssetCategoryType: assetCategoryTypes.Brand
      //CategoryIdLevel1: e[1]
    }).then(res => {
      this.filterBrands = res;
    });
    //this.search()
  }
};
</script>

<style>
.searchRow {
  width: 60%;
  overflow: hidden;
}
.hot {
  padding-left: 12px;
  line-height: 20px;
  margin-top: 10px;
}
.el-radio-button__inner {
  width: 200px;
}
.mt20 {
  margin-top: 20px;
}
.mt30 {
  margin-top: 30px;
}
</style>
