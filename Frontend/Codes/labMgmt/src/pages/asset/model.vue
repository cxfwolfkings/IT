<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>部件型号</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-form :model="info.form" :inline="true" size="small" label-width="100px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="资产大类">
            <!-- <el-cascader v-model="info.form.CategoryIdLevel1"
                         :options="info.filterCategoris1"
                         :show-all-levels="false"
                         clearable
            @change="filterChange"></el-cascader>-->
            <el-input
              v-model="info.form.CategoryNameLevel1"
              prefix-icon="el-icon-search"
              placeholder="请输入..."
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="小分类">
            <!-- <el-select v-model="info.form.CategoryIdLevel2"
                       placeholder="请选择">
              <el-option v-for="item in info.filterCategoris2"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>-->
            <el-input
              v-model="info.form.CategoryNameLevel2"
              prefix-icon="el-icon-search"
              placeholder="请输入..."
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="品牌">
            <!-- <el-select v-model="info.form.CategoryIdBrand"
                       placeholder="请选择">
              <el-option v-for="item in info.filterBrands"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>-->
            <el-input
              v-model="info.form.CategoryNameBrand"
              prefix-icon="el-icon-search"
              placeholder="请输入..."
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <!-- <el-form-item label="关键字">
            <el-input prefix-icon="el-icon-search"
                      v-model="info.form.Keyword"
                      placeholder="型号/名称/大类/小类/品牌"></el-input>
          </el-form-item>-->
          <el-form-item label="型号类别">
            <el-input
              prefix-icon="el-icon-search"
              v-model="info.form.CategoryName"
              placeholder="请输入..."
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="型号">
            <el-input
              prefix-icon="el-icon-search"
              v-model="info.form.ModelNo"
              placeholder="请输入..."
              autocomplete="off"
              :clearable="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-form-item style="float: right">
          <el-button plain @click="search">搜 索</el-button>
          <el-button type="primary" @click="handAdd">+ 新增</el-button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-table
      :data="info.data"
      ref="singleTable"
      border
      stripe
      style="width: 100%;"
      v-loading="info.loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column type="index" label="序号" width="60" :index="indexMethod" />
      <el-table-column prop="ModelNo" label="型号" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="AssetCategoryModelName" label="型号类别" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="AssetCategoryLevel1Name" label="资产大类" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="AssetCategoryLevel2Name" label="小分类" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="AssetCategoryBrandName" label="品牌" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="IsNeededReportDesc" label="填写使用报告"></el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    <ModelDialog
      :dialog-visible="info.dialogVisible"
      :asset-model="info.assetModel"
      @visible="changeVisible"
      @refresh="reload"
    />
  </div>
</template>

<script>
import AssetService from "../../apis/AssetService";
// import { assetCategoryTypes } from '../../config/const'
import { trimForm } from "../../utils/helper";
import ModelDialog from "@/components/modelDialog/create";

// const depts = window.config.depts

export default {
  name: "assetModel",
  components: { ModelDialog },
  data() {
    return {
      info: {
        loading: false,
        data: [],
        total: 0,
        // filterCategoris1: [],
        // filterBrands: [],
        // filterCategoris2: [],
        form: {
          // CategoryIdLevel1: null,
          // CategoryIdBrand: null,
          // CategoryIdLevel2: null,
          CategoryNameLevel1: null,
          CategoryNameBrand: null,
          CategoryNameLevel2: null,
          CategoryName: "",
          ModelNo: ""
          // Keyword: ''
        },
        assetModel: null,
        dialogVisible: false
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      }
    };
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
    handAdd() {
      this.info.assetModel = null;
      this.info.dialogVisible = true;
    },
    handleEdit(i, row) {
      this.info.assetModel = row;
      this.info.dialogVisible = true;
    },
    handleDelete(i, row) {
      const _this = this;
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          AssetService.delAssetModel({
            id: row.Id
          }).then(() => {
            if (_this.info.data.length === 1) {
              // 如果当前页只有一条数据
              _this.listQuery.PageIndex--;
              _this.listQuery.PageIndex =
                _this.listQuery.PageIndex > 0 ? _this.listQuery.PageIndex : 1;
            }
            _this.getTableDate();
          });
        })
        .catch(() => {});
    },
    // filterChange (e) {
    //   // console.log('subcategory filter changed', e)
    //   this.info.form.CategoryIdBrand = null
    //   this.info.form.CategoryIdLevel2 = null
    //   if (e && e.length) {
    //     this.info.form.CategoryIdLevel1 = e[1]
    //     AssetService.getAssetCategory({
    //       AssetCategoryType: assetCategoryTypes.LevelTwo,
    //       CategoryIdLevel1: e[1]
    //     }).then(res => {
    //       this.info.filterCategoris2 = res
    //     })
    //     AssetService.getAssetCategory({
    //       AssetCategoryType: assetCategoryTypes.Brand,
    //       CategoryIdLevel1: e[1]
    //     }).then(res => {
    //       this.info.filterBrands = res
    //     })
    //   }
    // },
    getTableDate() {
      this.info.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      AssetService.getAssetModels(params).then(res => {
        this.info.total = res.Total;
        this.info.data = res.Data.map(_ => {
          _.IsNeededReportDesc = _.IsNeededReport ? "需要" : "不需要";
          return _;
        });
        this.info.loading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.PageSize = val;
      this.getTableDate();
    },
    handleCurrentChange(val) {
      this.listQuery.PageIndex = val;
      this.getTableDate();
    },
    changeVisible(visible) {
      this.info.dialogVisible = visible;
    },
    reload() {
      this.getTableDate(false);
    },
    search(ev) {
      if (ev) {
        this.listQuery.PageIndex = 1;
      }
      Object.assign(this.listQuery, this.info.form);
      trimForm(this.listQuery);
      this.getTableDate();
    }
  }
};
</script>
