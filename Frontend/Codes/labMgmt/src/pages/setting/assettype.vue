<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>资产类别</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <div class="lab-title" style="margin-bottom:14px">资产类别设置</div>
    <el-tabs type="card" v-model="activeTab" @tab-click="tabChange" style>
      <el-tab-pane label="资产大类" name="main" style="padding-top:20px">
        <mainType
          :info="main"
          @search="searchMain"
          @changeCurPage="changeCurPage"
          @changePageSize="changePageSize"
          @getMainTableData="getMainTableData"
          @addMainCategory="addMainCategory"
          @delAssetCategory="delAssetCategory"
          @updMainCategory="updMainCategory"
          @updateBrandOptions="updateBrandOptions"
          @updateSubOptions="updateSubOptions"
          @updateModelOptions="updateModelOptions"
          @checkHasModel="checkHasModel"
        ></mainType>
      </el-tab-pane>
      <el-tab-pane label="小分类设置" name="sub" style="padding-top:20px">
        <subType
          :info="sub"
          @search="searchSub"
          @changeCurPage="changeSubCurPage"
          @changePageSize="changeSubPageSize"
          @getSubTableData="getSubTableData"
          @addSubCategory="addSubCategory"
          @delAssetCategory="delAssetCategory"
          @SubPageInit="SubPageInit"
          @updSubCategory="updSubCategory"
          @checkHasModel="checkHasModel"
        />
      </el-tab-pane>
      <el-tab-pane label="型号类别设置" name="model" style="padding-top:20px">
        <modelType
          :info="model"
          @search="searchModel"
          @changeCurPage="changeModelCurPage"
          @changePageSize="changeModelPageSize"
          @getModelTableData="getModelTableData"
          @addModelCategory="addModelCategory"
          @delAssetCategory="delAssetCategory"
          @modelPageInit="ModelPageInit"
          @updModelCategory="updModelCategory"
          @checkHasModel="checkHasModel"
        />
      </el-tab-pane>
      <el-tab-pane label="品牌设置" name="brand" style="padding-top:20px">
        <brandType
          :info="brand"
          @search="searchBrand"
          @changeCurPage="changeBrandCurPage"
          @changePageSize="changeBrandPageSize"
          @getBrandTableData="getBrandTableData"
          @addBrandCategory="addBrandCategory"
          @delAssetCategory="delAssetCategory"
          @brandPageInit="brandPageInit"
          @updBrandCategory="updBrandCategory"
          @checkHasModel="checkHasModel"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import api from "../../apis/asset";
import mainType from "../../components/setting/assettype-main";
import brandType from "../../components/setting/assettype-brand";
import subType from "../../components/setting/assettype-sub";
import modelType from "../../components/setting/assettype-model";
import { assetCategoryTypes } from "../../config/const";
import AssetService from "../../apis/AssetService";
import { debuglog } from "util";
const depts = window.config.depts.sort((t1, t2) => {
  return t1.value - t2.value;
});
export default {
  data() {
    var main = {
      //data: api.getAssetCategoryMain(),
      data: [],
      // filter: {
      //     dept: depts
      // },
      filter: {
        name: "",
        dept: null
      },
      dept: depts,
      form: {
        name: "",
        no: "",
        dept: null
      },
      dialogFormVisible: false,
      cateDisabled:false,
      pageInfo: {
        pageSize: 10,
        curPage: 1,
        totalItemCount: 50
      }
    };
    var brand = {
      data: [],
      dept: depts,
      filter: [], //检索的筛选条件
      filterOptions: [], //用来给下拉选择赋值
      //data: api.getBrands(),
      //filterOptions: api.getDeptMainCategories(),
      form: {
        no: "",
        name: "",
        filter: [],
        dept: null,
        parentid: null
      },
      cateDisabled:false,
      dialogFormVisible: false,
      pageInfo: {
        pageSize: 10,
        curPage: 1,
        totalItemCount: 50
      }
    };
    var sub = {
      data: [],
      dept: depts,
      filter: [], //检索的筛选条件
      filterOptions: [], //用来给下拉选择赋值
      form: {
        no: "",
        name: "",
        filter: [],
        dept: null,
        parentid: null,
        pretext: ""
      },
      cateDisabled:false,
      dialogFormVisible: false,
      pageInfo: {
        pageSize: 10,
        curPage: 1,
        totalItemCount: 50
      }
    };
    var model = {
      data: [],
      dept: depts,
      filter: [], //检索的筛选条件
      filterOptions: [], //用来给下拉选择赋值
      form: {
        no: "",
        name: "",
        filter: [],
        dept: null,
        parentid: null,
        pretext: ""
      },
      cateDisabled:false,
      dialogFormVisible: false,
      pageInfo: {
        pageSize: 10,
        curPage: 1,
        totalItemCount: 50
      }
    };
    return {
      main: main,
      activeTab: "main",
      brand: brand,
      sub: sub,
      model: model
    };
  },
  components: {
    mainType,
    brandType,
    subType,
    modelType
  },
  methods: {
    tabChange(tab, event) {},
    searchMain() {
      this.main.pageInfo.curPage = 1;
      this.getMainTableData();
    },
    searchBrand() {
      this.brand.pageInfo.curPage = 1;
      this.getBrandTableData();
    },
    searchSub() {
      this.sub.pageInfo.curPage = 1;
      this.getSubTableData();
    },
    searchModel() {
      this.model.pageInfo.curPage = 1;
      this.getModelTableData();
    },
    changeCurPage(curPage) {
      this.main.pageInfo.curPage = curPage;
    },
    changePageSize(pageSize) {
      this.main.pageInfo.pageSize = pageSize;
    },
    changeBrandCurPage(curPage) {
      this.brand.pageInfo.curPage = curPage;
    },
    changeBrandPageSize(pageSize) {
      this.brand.pageInfo.pageSize = pageSize;
    },
    changeSubCurPage(curPage) {
      this.sub.pageInfo.curPage = curPage;
    },
    changeSubPageSize(pageSize) {
      this.sub.pageInfo.pageSize = pageSize;
    },
    changeModelCurPage(curPage) {
      this.model.pageInfo.curPage = curPage;
    },
    changeModelPageSize(pageSize) {
      this.model.pageInfo.pageSize = pageSize;
    },
    getMainTableData() {
      let params = {};
      params.AssetCategoryType = assetCategoryTypes.LevelOne;
      params.PageIndex = this.main.pageInfo.curPage;
      params.PageSize = this.main.pageInfo.pageSize;
      params.CategoryName = this.main.filter.name;
      params.Dept = this.main.filter.dept == "" ? null : this.main.filter.dept;
      AssetService.GetAssetCategoryRecords(params).then(res => {
        this.main.data = res.Data;
        this.main.pageInfo.totalItemCount = res.Total;
      });
    },
    getBrandTableData() {
      let params = {};
      params.AssetCategoryType = assetCategoryTypes.Brand;
      params.PageIndex = this.brand.pageInfo.curPage;
      params.PageSize = this.brand.pageInfo.pageSize;
      params.Dept = this.brand.filter[0];
      params.ParentCategoryId = this.brand.filter[1];
      AssetService.GetAssetCategoryRecords(params).then(res => {
        this.brand.data = res.Data;
        this.brand.pageInfo.totalItemCount = res.Total;
      });
    },
    getSubTableData() {
      let params = {};
      params.AssetCategoryType = assetCategoryTypes.LevelTwo;
      params.PageIndex = this.sub.pageInfo.curPage;
      params.PageSize = this.sub.pageInfo.pageSize;
      params.Dept = this.sub.filter[0];
      params.ParentCategoryId = this.sub.filter[1];
      AssetService.GetAssetCategoryRecords(params).then(res => {
        this.sub.data = res.Data;
        this.sub.pageInfo.totalItemCount = res.Total;
      });
    },
    getModelTableData() {
      let params = {};
      params.AssetCategoryType = assetCategoryTypes.ModelName;
      params.PageIndex = this.model.pageInfo.curPage;
      params.PageSize = this.model.pageInfo.pageSize;
      params.Dept = this.model.filter[0];
      params.GrandParentCategoryId = this.model.filter[1];
      params.ParentCategoryId = this.model.filter[2];
      params.isFindGrand = true;
      AssetService.GetAssetCategoryRecords(params).then(res => {
        this.model.data = res.Data;
        this.model.pageInfo.totalItemCount = res.Total;
      });
    },
    addMainCategory() {
      let params = {
        CategoryNo: this.main.form.no,
        CategoryName: this.main.form.name,
        DeptId: this.main.form.dept,
        CategoryType: assetCategoryTypes.LevelOne
      };
      AssetService.AddAssetCategory(params).then(res => {
        //console.log(res)
        this.$message({ type: "success", message: "操作成功！" });
        this.getMainTableData();
        this.updateBrandOptions();
        this.updateSubOptions();
        this.updateModelOptions();
        this.main.dialogFormVisible = false;
      });
    },
    addBrandCategory() {
      let params = {
        //CategoryNo: this.brand.form.no,
        CategoryName: this.brand.form.name,
        CategoryType: assetCategoryTypes.Brand,
        DeptId: this.brand.form.filter[0],
        ParentId: this.brand.form.filter[1]
      };
      AssetService.AddAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getBrandTableData();
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
        this.brand.dialogFormVisible = false;
      });
    },
    addSubCategory() {
      let params = {
        CategoryNo: this.sub.form.pretext + this.sub.form.no,
        CategoryName: this.sub.form.name,
        CategoryType: assetCategoryTypes.LevelTwo,
        DeptId: this.sub.form.filter[0],
        ParentId: this.sub.form.filter[1]
      };
      AssetService.AddAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getSubTableData();
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
        this.sub.dialogFormVisible = false;
      });
    },
    addModelCategory() {
      let params = {
        //CategoryNo: this.model.form.pretext + this.model.form.no,
        CategoryName: this.model.form.name,
        CategoryType: assetCategoryTypes.ModelName,
        DeptId: this.model.form.filter[0],
        GrandParentCategoryId: this.model.form.filter[1],
        ParentId: this.model.form.filter[2]
      };
      AssetService.AddAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getModelTableData();
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
        this.model.dialogFormVisible = false;
      });
    },
    checkHasModel(id,type){
      let params = {
        Id:id,
        CategoryType:type
      }
      
      AssetService.CheckHasModel(params).then(res=>{
          this.main.cateDisabled = res
          this.sub.cateDisabled = res
          this.model.cateDisabled = res
          this.brand.cateDisabled = res
      })
    },
    updMainCategory(id) {
      let params = {
        Id: id,
        CategoryNo: this.main.form.no,
        CategoryName: this.main.form.name,
        DeptId: this.main.form.dept,
        CategoryType: assetCategoryTypes.LevelOne
      };
      AssetService.UpdAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getMainTableData();
        this.updateBrandOptions();
        this.updateSubOptions();
        this.updateModelOptions();
        this.main.dialogFormVisible = false;
      });
    },
    updBrandCategory(id) {
      let params = {
        Id: id,
        //CategoryNo: this.brand.form.no,
        CategoryName: this.brand.form.name,
        CategoryType: assetCategoryTypes.Brand,
        DeptId: this.brand.form.filter[0],
        ParentId: this.brand.form.filter[1]
      };
      AssetService.UpdAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getBrandTableData();
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
        this.brand.dialogFormVisible = false;
      });
    },
    updSubCategory(id) {
      let params = {
        Id: id,
        CategoryNo: this.sub.form.no,
        CategoryName: this.sub.form.name,
        CategoryType: assetCategoryTypes.LevelTwo,
        DeptId: this.sub.form.filter[0],
        ParentId: this.sub.form.filter[1]
      };
      AssetService.UpdAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getSubTableData();
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
        this.sub.dialogFormVisible = false;
      });
    },
    updModelCategory(id) {
      let params = {
        Id: id,
        //CategoryNo: this.model.form.no,
        CategoryName: this.model.form.name,
        CategoryType: assetCategoryTypes.ModelName,
        DeptId: this.model.form.filter[0],
        GrandParentCategoryId: this.model.form.filter[1],
        ParentId: this.model.form.filter[2]
      };
      AssetService.UpdAssetCategory(params).then(res => {
        this.$message({ type: "success", message: "操作成功！" });
        this.getModelTableData();
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
        this.model.dialogFormVisible = false;
      });
    },
    delAssetCategory(id, categoryType) {
      AssetService.DelAssetCategoryLogic({ Id: id }).then(res => {
        this.$message({ type: "success", message: "删除成功！" });
        if (categoryType == assetCategoryTypes.Brand) {
          if (this.brand.data.length === 1) {
            // 如果当前页只有一条数据
            this.brand.pageInfo.curPage--;
            this.brand.pageInfo.curPage =
              this.brand.pageInfo.curPage > 0 ? this.brand.pageInfo.curPage : 1;
          }
          this.getBrandTableData();
        } else if (categoryType == assetCategoryTypes.LevelOne) {
          if (this.main.data.length === 1) {
            // 如果当前页只有一条数据
            this.main.pageInfo.curPage--;
            this.main.pageInfo.curPage =
              this.main.pageInfo.curPage > 0 ? this.main.pageInfo.curPage : 1;
          }
          this.getMainTableData();
          this.getBrandTableData();
          this.getSubTableData();
          this.getModelTableData();
        } else if (categoryType == assetCategoryTypes.LevelTwo) {
          if (this.sub.data.length === 1) {
            // 如果当前页只有一条数据
            this.sub.pageInfo.curPage--;
            this.sub.pageInfo.curPage =
              this.sub.pageInfo.curPage > 0 ? this.sub.pageInfo.curPage : 1;
          }
          this.getSubTableData();
          this.getModelTableData();
        } else if (categoryType == assetCategoryTypes.ModelName) {
          if (this.model.data.length === 1) {
            // 如果当前页只有一条数据
            this.model.pageInfo.curPage--;
            this.model.pageInfo.curPage =
              this.model.pageInfo.curPage > 0 ? this.model.pageInfo.curPage : 1;
          }
          this.getModelTableData();
        }
        this.updateSubOptions();
        this.updateBrandOptions();
        this.updateModelOptions();
      });
    },

    brandPageInit() {
      this.getBrandTableData();
      this.updateBrandOptions();
    },
    updateBrandOptions() {
      AssetService.getAssetCategory({
        AssetCategoryType: assetCategoryTypes.LevelOne
      }).then(res => {
        this.brand.filterOptions = res.map(_ => {
          _.label = depts.find(d => d.value === _.value).label;
          return _;
        });
      });
    },
    SubPageInit() {
      this.getSubTableData();
      this.updateSubOptions();
    },
    updateSubOptions() {
      AssetService.getAssetCategory({
        AssetCategoryType: assetCategoryTypes.LevelOne
      }).then(res => {
        this.sub.filterOptions = res.map(_ => {
          _.label = depts.find(d => d.value === _.value).label;
          return _;
        });
      });
    },
    ModelPageInit() {
      this.getModelTableData();
      this.updateModelOptions();
    },
    updateModelOptions() {
      AssetService.getLevelTwoCascade().then(res => {
        this.model.filterOptions = res.map(_ => {
          _.label = depts.find(d => d.value === _.value).label;
          return _;
        });
      });
    }
  },
  mounted() {
    this.getMainTableData();
  }
};
</script>
