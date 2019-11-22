<template>
  <el-dialog :title="info.title" :visible="dialogVisible" :show-close="false" width="500px">
    <!-- 填写步骤：
    <br>
    <br>
    <el-steps finish-status="success">
      <el-step title="资产大类"></el-step>
      <el-step title="小分类"></el-step>
      <el-step title="型号类别"></el-step>
      <el-step title="型号"></el-step>
      <el-step title="品牌"></el-step>
    </el-steps>
    <br>-->
    <el-form ref="myModel" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="资产大类" prop="CategoryIdLevel1">
        <el-cascader
          v-model="form.CategoryIdLevel1"
          :options="info.filterCategoris1"
          :show-all-levels="false"
          clearable
          placeholder="请选择..."
          id="cas-level1"
          @change="filterChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="小分类" prop="CategoryIdLevel2">
        <el-select
          v-model="form.CategoryIdLevel2"
          placeholder="请选择..."
          @focus="catLv2Focus"
          @change="catLv2Change"
        >
          <el-option
            v-for="item in info.filterCategoris2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="型号类别" prop="ModelName">
        <el-select v-model="form.ModelName" @focus="catNameFocus" placeholder="请选择...">
          <el-option
            v-for="item in info.filterNames"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="型号" prop="ModelNo">
        <el-input v-model="form.ModelNo" placeholder="请输入..." :maxlength="50" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="CategoryIdBrand">
        <el-select v-model="form.CategoryIdBrand" @focus="catLv2Focus" placeholder="请选择...">
          <el-option
            v-for="item in info.filterBrands"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="填写使用报告">
        <el-switch v-model="form.IsNeededReport"></el-switch>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleSelf = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import AssetService from "../../apis/AssetService";
import { assetCategoryTypes } from "../../config/const";
import { setTimeout } from "timers";
import { trimForm, arrSort } from "../../utils/helper";

const depts = window.config.depts;

export default {
  name: "modelDialogCreate",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    assetModel: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      info: {
        title: "新增",
        filterCategoris1: [],
        filterBrands: [],
        filterCategoris2: [],
        filterNames: []
      },
      form: {
        ModelNo: "",
        ModelName: null,
        CategoryIdLevel1: null,
        CategoryIdBrand: null,
        CategoryIdLevel2: null,
        IsNeededReport: null
      },
      rules: {
        ModelNo: [
          { required: true, message: "请输入型号", trigger: ["blur", "change"] }
        ],
        ModelName: [
          { required: true, message: "请选择名称", trigger: ["blur", "change"] }
        ],
        CategoryIdLevel1: [
          {
            required: true,
            message: "请选择资产大类",
            trigger: ["blur", "change"]
          }
        ],
        CategoryIdBrand: [
          { required: true, message: "请选择品牌", trigger: ["blur", "change"] } // ,
          // { validator: this.isvalidateLv1, trigger: ['blur', 'change'] }
        ],
        CategoryIdLevel2: [
          {
            required: true,
            message: "请选择小分类",
            trigger: ["blur", "change"]
          } // ,
          // { validator: this.isvalidateLv1, trigger: ['blur', 'change'] }
        ]
      }
    };
  },
  computed: {
    visibleSelf: {
      get: function() {
        return this.dialogVisible;
      },
      set: function(newValue) {
        this.$emit("visible", newValue);
      }
    }
  },
  watch: {
    dialogVisible: function(newVal, oldVal) {
      if (newVal) {
        AssetService.getAssetCategory({
          AssetCategoryType: assetCategoryTypes.LevelOne
        }).then(res => {
          const arr = res
            .map(_ => {
              _.label = depts.find(d => d.value === _.value).label;
              return _;
            })
            .sort(arrSort);
          if (this.assetModel) {
            this.info.filterCategoris1 = arr.filter(
              _ => _.value == this.assetModel.DeptId
            );
          } else {
            this.info.filterCategoris1 = arr;
          }
        });
        const base = this;
        this.info.title = this.assetModel ? "编辑" : "新增";
        this.form.Id = (this.assetModel && this.assetModel.Id) || 0;
        this.form.ModelNo = this.assetModel && this.assetModel.ModelNo;
        this.form.ModelName = this.assetModel && this.assetModel.ModelName + "";
        this.form.IsNeededReport =
          this.assetModel && this.assetModel.IsNeededReport;
        this.form.CategoryIdLevel1 = this.assetModel && [
          this.assetModel.DeptId + "",
          this.assetModel.CategoryIdLevel1 + ""
        ];
        this.form.CategoryIdLevel2 =
          this.assetModel && this.assetModel.CategoryIdLevel2 + "";
        this.form.CategoryIdBrand =
          this.assetModel && this.assetModel.CategoryIdBrand + "";
        if (this.assetModel) {
          // 编辑
          this.getCategory(
            assetCategoryTypes.LevelTwo,
            this.assetModel.CategoryIdLevel1
          );
          this.getCategory(
            assetCategoryTypes.Brand,
            this.assetModel.CategoryIdLevel1
          );
          if (this.form.CategoryIdLevel2) {
            this.getCategory(
              assetCategoryTypes.ModelName,
              this.form.CategoryIdLevel2
            );
          } else {
            this.info.filterNames = [];
          }
        } else {
          this.form.CategoryIdLevel2 = null;
          this.form.CategoryIdBrand = null;
          this.form.ModelName = null;
          this.info.filterCategoris2 = [];
          this.info.filterBrands = [];
          this.info.filterNames = [];
        }
        setTimeout(() => {
          base.$refs["myModel"] && base.$refs["myModel"].clearValidate();
        }, 0);
      }
    }
  },
  mounted() {},
  methods: {
    // isvalidateLv1 (rule, value, callback) {
    //   if (!this.form.CategoryIdLevel1) {
    //     callback(new Error('请先选择资产大类'))
    //   } else {
    //     callback()
    //   }
    // },
    getCategory(categoryType, parentId) {
      switch (categoryType) {
        case assetCategoryTypes.LevelTwo:
          AssetService.getAssetCategory({
            AssetCategoryType: categoryType,
            CategoryIdLevel1: parentId
          }).then(res => {
            this.info.filterCategoris2 = res;
          });
          break;
        case assetCategoryTypes.Brand:
          AssetService.getAssetCategory({
            AssetCategoryType: categoryType,
            CategoryIdLevel1: parentId
          }).then(res => {
            this.info.filterBrands = res;
          });
          break;
        case assetCategoryTypes.ModelName:
          AssetService.getAssetCategory({
            AssetCategoryType: categoryType,
            CategoryIdLevel2: parentId
          }).then(res => {
            this.info.filterNames = res;
          });
          break;
      }
    },
    filterChange(e) {
      // console.log("subcategory filter changed", e)
      this.form.CategoryIdBrand = null;
      this.form.CategoryIdLevel2 = null;
      this.form.ModelName = null;
      this.info.filterBrands = [];
      this.info.filterCategoris2 = [];
      this.info.filterNames = [];
      if (e && e.length) {
        // this.form.CategoryIdLevel1 = e[1];
        this.getCategory(assetCategoryTypes.LevelTwo, e[1]);
        this.getCategory(assetCategoryTypes.Brand, e[1]);
      }
    },
    catLv2Change(e) {
      this.form.ModelName = null;
      this.info.filterNames = [];
      this.getCategory(assetCategoryTypes.ModelName, e);
    },
    // catLv1Focus (e) {
    //   const lv1Node = document.querySelector('#cas-level1')
    //   const errorDiv = lv1Node.parentNode.querySelector('.el-form-item__error')
    //   if (errorDiv) {
    //     errorDiv.remove()
    //   }
    //   lv1Node.querySelector('input').style.borderColor = '#DCDFE6'
    // },
    catLv2Focus(e) {
      // if (!this.form.CategoryIdLevel1) {
      //   const lv1Node = document.querySelector('#cas-level1')
      //   if (!lv1Node.parentNode.querySelector('.el-form-item__error')) {
      //     const errorDiv = document.createElement('div')
      //     errorDiv.innerHTML = '请先选择资产大类'
      //     errorDiv.className = 'el-form-item__error'
      //     lv1Node.parentNode.appendChild(errorDiv)
      //     lv1Node.querySelector('input').style.borderColor = '#F56C6C'
      //     setTimeout(this.catLv1Focus, 1000)
      //   }
      // }
      if (!this.form.CategoryIdLevel1) {
        this.$message({
          type: "info",
          message: "请先选择资产大类",
          duration: 2000
        });
      }
    },
    catNameFocus() {
      if (!this.form.CategoryIdLevel2) {
        this.$message({
          type: "info",
          message: "请先选择小分类",
          duration: 2000
        });
      }
    },
    handleSubmit() {
      // this.clearHandValidation()
      const that = this;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          const inParams = {};
          Object.assign(inParams, this.form);
          inParams.CategoryIdLevel1 = this.form.CategoryIdLevel1[1];
          trimForm(inParams);
          if (this.assetModel) {
            AssetService.updAssetModel(inParams).then(() => {
              this.visibleSelf = false;
              this.$message({
                type: "success",
                message: "更新成功",
                duration: 1000,
                onClose: function() {
                  that.$emit("refresh");
                }
              });
            });
          } else {
            inParams.IsNeededReport = inParams.IsNeededReport || false;
            AssetService.addAssetModel(inParams).then(() => {
              this.visibleSelf = false;
              this.$message({
                type: "success",
                message: "添加成功",
                duration: 1000,
                onClose: function() {
                  that.$emit("refresh");
                }
              });
            });
          }
        }
      });
    }
    // clearHandValidation () { // 取消全部手动验证效果
    //   this.catLv1Focus()
    // }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 24px;
}
.el-input,
.el-select,
.el-cascader {
  width: 300px;
}
</style>
