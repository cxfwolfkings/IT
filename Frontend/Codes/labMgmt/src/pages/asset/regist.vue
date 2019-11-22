<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>入库管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="single" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-tools"></i> 单个部件
        </span>
        <el-row>
          <el-form :model="info.form" :inline="true" size="small" label-width="100px">
            <!-- <el-form-item label="实验室编号">
              <el-input v-model="info.form.InternalNo"></el-input>
            </el-form-item>
            <el-form-item label="行政编号">
              <el-input v-model="info.form.AdminNo"></el-input>
            </el-form-item>
            <el-form-item label="出厂编号">
              <el-input v-model="info.form.SerialNo"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="部件型号">
              <el-cascader v-model="info.form.AssetModelId"
                           :options="info.filterModels"
                           :show-all-levels="false"
                           clearable></el-cascader>
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
            <el-form-item label="状态">
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
              <el-button type="primary" @click="handAdd" icon="el-icon-plus">登记入库</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <el-table
          :data="info.singleData"
          ref="singleTable"
          border
          stripe
          v-loading="info.loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          style="width: 100%"
        >
          <el-table-column type="index" label="序号" width="49" fixed :index="indexMethod" />
          <!-- <el-table-column
            prop="InternalNo"
            label="实验室内部编号"
            min-width="150"
            fixed
            :show-overflow-tooltip="true"
          ></el-table-column>-->
          <el-table-column label="实验室编号" min-width="180" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <el-tooltip effect="dark"
                          :content="scope.row.ComponentNo"
              placement="top-start">-->
              <a href="javascript:;" @click="handleEdit(scope.$index, scope.row, true)">
                <i class="el-icon-info"></i>
                {{scope.row.InternalNo}}
              </a>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="AdminNo"
            min-width="150"
            label="行政编号"
            :show-overflow-tooltip="true"
          ></el-table-column>-->
          <el-table-column
            prop="SerialNo"
            min-width="120"
            label="SN号"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="ModelNoDesc"
            label="型号"
            min-width="280"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="LabNameDesc"
            label="所在实验室"
            min-width="300"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="ShelfName"
          label="所在货架"></el-table-column>-->
          <!-- <el-table-column prop="IsFavoritedDesc"
          label="是否馆藏"></el-table-column>-->
          <el-table-column prop="UsedRate" min-width="70" label="利用率" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="StatusName"
            min-width="100"
            label="状态"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="操作" min-width="150" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :disabled="scope.row.Status==-1"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.IsFavorited || scope.row.Status != '1'"
                @click="confirmDelete(scope.$index, scope.row)"
              >删除</el-button>
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
      <el-tab-pane name="component" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-grid"></i> 组合平台
        </span>
      </el-tab-pane>
    </el-tabs>
    <!-- <el-dialog title="提示" :visible.sync="info.dialogVisible" width="30%">
      <el-form
        ref="disableForm"
        :model="info.disableForm"
        :rules="info.disableRules"
        label-width="80px"
      >
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
        <el-button @click="info.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handDelete">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
import AssetService from "../../apis/AssetService";
import { assetStatus } from "../../config/const";
import { trimForm } from "../../utils/helper";

const depts = window.config.depts;

export default {
  name: "assetRegist",
  data() {
    return {
      info: {
        loading: false,
        singleData: [],
        total: 0,
        filterModels: [],
        filterShelfs: [],
        activeTab: "single",
        statusList: [
          ...assetStatus
            .filter(s => s.value != -1 && s.value != 4)
            .map(s => {
              return {
                value: parseInt(s.value) + 10,
                label: s.label
              };
            }),
          {
            value: 100,
            label: "已馆藏"
          }
        ],
        form: {
          // InternalNo: '',
          // AdminNo: '',
          // SerialNo: '',
          // AssetModelId: null,
          // ModelId: null,
          CategoryNameLevel1: null,
          CategoryNameBrand: null,
          CategoryNameLevel2: null,
          CategoryName: "",
          ModelNo: "",
          Status: "",
          Keywords: ""
        }
        // disableForm: {
        //   DiscardDesc: ""
        // },
        // disableRules: {
        //   DiscardDesc: [
        //     {
        //       required: true,
        //       message: "请填写报废说明",
        //       trigger: ["blur", "change"]
        //     }
        //   ]
        // },
        // asset: null,
        // dialogVisible: false
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      }
    };
  },
  created() {
    // if (this.$route.params.activeTab) {
    //   this.info.activeTab = this.$route.params.activeTab
    // }
    if (this.$route.params.PageIndex) {
      this.info.form = {
        ...this.$route.params
      };
      this.listQuery.PageIndex =
        this.info.form.PageIndex > 0 ? this.info.form.PageIndex : 1;
      // 将 form 中的 PageIndex 删除，不然会影响 getTableData 中的参数取值
      delete this.info.form.PageIndex;
    }
  },
  mounted() {
    this.search();
    AssetService.getModelCascade().then(res => {
      this.info.filterModels = res.map(_ => {
        _.label = depts.find(d => d.value === _.value).label;
        return _;
      });
    });
  },
  methods: {
    indexMethod(index) {
      return (
        index + (this.listQuery.PageIndex - 1) * this.listQuery.PageSize + 1
      );
    },
    tabClick(t) {
      if (t.name === "component") {
        this.$router.push({ name: "asset_compose" });
      }
    },
    handAdd() {
      this.$router.push({ name: "asset_edit" });
    },
    handleEdit(i, row, isRead) {
      const formParams = {
        ...this.info.form,
        PageIndex: this.listQuery.PageIndex
      };
      const inParameters = { id: row.Id, form: formParams };
      if (isRead) {
        inParameters.type = "read";
      }
      this.$router.push({
        name: "asset_edit",
        params: inParameters
      });
    },
    getTableData() {
      this.info.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      // if (params.AssetModelId && params.AssetModelId.length) {
      //   params.ModelId = params.AssetModelId[params.AssetModelId.length - 1]
      // }
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
    },
    confirmDelete(i, row) {
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          AssetService.delAsset({
            id: row.Id
          }).then(() => {
            this.getTableData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
      // const base = this;
      // setTimeout(() => {
      //   base.$refs["disableForm"] && base.$refs["disableForm"].clearValidate();
      // }, 0);
      // this.info.asset = row;
      // this.info.disableForm.DiscardDesc = "";
      // this.info.dialogVisible = true;
    }
    // handDelete() {
    //   const _this = this;
    //   this.$refs["disableForm"].validate(valid => {
    //     if (valid) {
    //       AssetService.delAsset({
    //         id: this.info.asset.Id,
    //         DiscardDesc: trim(this.info.disableForm.DiscardDesc)
    //       }).then(() => {
    //         this.info.dialogVisible = false;
    //         this.$message({ type: "success", message: "操作成功！" });
    //         if (_this.info.singleData.length === 1) {
    //           // 如果当前页只有一条数据
    //           _this.listQuery.PageIndex--;
    //           _this.listQuery.PageIndex =
    //             _this.listQuery.PageIndex > 0 ? _this.listQuery.PageIndex : 1;
    //         }
    //         this.getTableData();
    //       });
    //     }
    //   });
    // }
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
