<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>馆藏管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="favorited" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-tools"></i> 馆藏部件
        </span>
      </el-tab-pane>
      <el-tab-pane name="unFavorited" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-tools"></i> 其它部件
        </span>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <el-form :model="info.form" :inline="true" label-width="100px" size="small">
        <!-- <el-form-item label="实验室编号">
          <el-input v-model="info.form.InternalNo"></el-input>
        </el-form-item>
        <el-form-item label="行政编号">
          <el-input v-model="info.form.AdminNo"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号">
          <el-input v-model="info.form.SerialNo"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="关键字">
          <el-input prefix-icon="el-icon-search"
                    v-model="info.form.Keywords"
                    placeholder="大类/小类/型号/名称/品牌/编号"></el-input>
        </el-form-item>-->
        <el-form-item label="资产大类">
          <el-input
            v-model="info.form.CategoryNameLevel1"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="小分类">
          <el-input
            v-model="info.form.CategoryNameLevel2"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="型号类别">
          <el-input
            v-model="info.form.CategoryName"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="型号">
          <el-input
            v-model="info.form.ModelNo"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="品牌">
          <el-input
            v-model="info.form.CategoryNameBrand"
            prefix-icon="el-icon-search"
            placeholder="请输入..."
            autocomplete="off"
            :clearable="true"
          ></el-input>
        </el-form-item>-->
        <el-form-item label="状态" v-show="info.activeTab=='unFavorited'">
          <el-select v-model="info.form.Status" placeholder="请选择..." clearable>
            <el-option
              v-for="item in info.statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号">
          <el-input
            prefix-icon="el-icon-search"
            v-model="info.form.Keywords"
            placeholder="实验室/SN编号"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item style="float: right">
          <el-button type="success" plain @click="search" icon="el-icon-search">搜 索</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!-- <el-row>
          <el-switch
            style="display: block"
            v-model="info.form.IsFavorited"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="馆藏部件"
            inactive-text="其它部件"
            @change="search">
          </el-switch>
    </el-row>-->
    <el-table
      :data="info.singleData"
      ref="singleTable"
      border
      stripe
      style="width: 100%;"
      v-loading="info.loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column type="index" label="序号" fixed width="60" :index="indexMethod" />
      <el-table-column
        prop="InternalNo"
        fixed
        min-width="150"
        label="实验室编号"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column prop="AdminNo" min-width="150" label="行政编号" :show-overflow-tooltip="true"></el-table-column> -->
      <el-table-column prop="SerialNo" min-width="150" label="SN号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ModelNoDesc" label="型号" min-width="280" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="LabNameDesc"
        label="所在实验室"
        min-width="300"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column prop="ShelfName"
      label="所在货架"></el-table-column>-->
      <!-- <el-table-column prop="IsFavoritedDesc"
      label="是否馆藏"> </el-table-column>-->
      <el-table-column prop="StatusName" min-width="160" label="状态" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" fixed="right" min-width="120">
        <template slot-scope="scope">
          <el-button
            v-if="!info.form.IsFavorited"
            size="mini"
            type="primary"
            :title="scope.row.FavTooltipMsg"
            :disabled="scope.row.IsFavButtonDisabled"
            @click="handleAdd(scope.$index, scope.row)"
          >加入馆藏</el-button>
          <el-button
            v-if="info.form.IsFavorited"
            size="mini"
            type="danger"
            @click="handDelete(scope.$index, scope.row)"
          >取消馆藏</el-button>
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
  </div>
</template>

<script>
import AssetService from "../../apis/AssetService";
import { assetStatus } from "../../config/const";
import { trimForm } from "../../utils/helper";

export default {
  name: "assetCollect",
  data() {
    return {
      info: {
        loading: false,
        activeTab: "favorited",
        srcTab: "favorited",
        singleData: [],
        total: 0,
        filterModels: [],
        filterShelfs: [],
        statusList: [
          ...assetStatus
            .filter(s => s.value != -1 && s.value != 4)
            .map(s => {
              return {
                value: parseInt(s.value) + 10,
                label: s.label
              };
            })
        ],
        form: {
          // InternalNo: '',
          // AdminNo: '',
          // SerialNo: '',
          // ModelId: null,
          // ShelfId: null,
          IsFavorited: true,
          IsAddFavorited: true,
          IsGetFavorited: true,
          CategoryNameLevel1: null,
          CategoryNameBrand: null,
          CategoryNameLevel2: null,
          CategoryName: "",
          ModelNo: "",
          Status: null,
          Keywords: ""
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
    tabClick(t) {
      if (this.info.srcTab != t.name) {
        // 切换了tab
        this.info.form.CategoryNameLevel1 = "";
        this.info.form.CategoryNameLevel2 = "";
        this.info.form.CategoryName = "";
        this.info.form.ModelNo = "";
        this.info.form.Status = null;
        this.info.form.Keywords = "";
        this.info.form.IsFavorited = t.name == "favorited";
        this.search(true);
        this.info.srcTab = t.name;
      }
    },
    handleAdd(i, row) {
      const _this = this;
      this.$confirm("是否确认加入馆藏？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.IsFavorited = true;
          row.IsAddFavorited = true;
          AssetService.updAsset(row).then(() => {
            if (_this.info.singleData.length === 1) {
              // 如果当前页只有一条数据
              _this.listQuery.PageIndex--;
              _this.listQuery.PageIndex =
                _this.listQuery.PageIndex > 0 ? _this.listQuery.PageIndex : 1;
            }
            _this.getTableData();
            _this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
        })
        .catch(() => {});
    },
    handDelete(i, row) {
      const _this = this;
      this.$confirm("是否确认取消馆藏？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          row.IsFavorited = false;
          AssetService.updAsset(row).then(() => {
            if (_this.info.singleData.length === 1) {
              // 如果当前页只有一条数据
              _this.listQuery.PageIndex--;
              _this.listQuery.PageIndex =
                _this.listQuery.PageIndex > 0 ? _this.listQuery.PageIndex : 1;
            }
            _this.getTableData();
            _this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    },
    filterChange(e) {
      // console.log("subcategory filter changed", e)
      // this.info.form.CategoryIdBrand = null
      // this.info.form.CategoryIdLevel2 = null
      // if (e && e.length) {
      //   this.info.form.CategoryIdLevel1 = e[1]
      //   AssetService.getAssetCategory({
      //     AssetCategoryType: assetCategoryTypes.LevelTwo,
      //     CategoryIdLevel1: e[1]
      //   }).then(res => {
      //     this.info.filterCategoris2 = res
      //   })
      //   AssetService.getAssetCategory({
      //     AssetCategoryType: assetCategoryTypes.Brand,
      //     CategoryIdLevel1: e[1]
      //   }).then(res => {
      //     this.info.filterBrands = res
      //   })
      // }
    },
    getTableData() {
      this.info.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      // 如果没有选择状态，设置为-100，便于后端筛选
      params.Status = params.Status ? params.Status : -100;
      params.IsAddStatus = true;
      params.IsNotShowDisabled = true;
      AssetService.getAssets(params).then(res => {
        this.info.total = res.Total;
        this.info.singleData = res.Data.map(_ => {
          _.ModelNoDesc =
            _.StrCategoryIdLevel1 +
            "/" +
            _.StrCategoryIdLevel2 +
            "/" +
            _.strCategoryModel +
            "/" +
            _.ModelNo;
          _.LabNameDesc = _.LabName + "/" + _.SiteName + "/" + _.ShelfName;
          // _.IsFavoritedDesc = _.IsFavorited ? '是' : '否'
          _.StatusName = assetStatus.find(s => s.value === _.Status + "").label;
          if (_.StatusName == "可借" && _.IsFavorited) {
            _.StatusName = "已馆藏";
          }
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
