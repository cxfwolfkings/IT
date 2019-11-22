<template>
  <div class="fullWidth">
    <el-form ref="myModel" :model="info.form" size="small" label-width="96px" :disabled="true">
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="12">
              <el-form-item label="资产大类" prop="CategoryIdLevel1">
                <el-cascader
                  v-model="info.form.CategoryIdLevel1"
                  :options="info.filterCategoris1"
                  :show-all-levels="false"
                  clearable
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小分类" prop="CategoryIdLevel2">
                <el-select v-model="info.form.CategoryIdLevel2" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in info.filterCategoris2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="型号类别" prop="CategoryIdName">
                <el-select v-model="info.form.CategoryIdName" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in info.filterNames"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="型号" prop="ModelId">
                <el-select v-model="info.form.ModelId" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in info.assetModels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="品牌" prop="CategoryIdBrand">
                <el-input v-model="info.form.CategoryIdBrand"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="24" style="padding-left: 45px">
              <svg id="code" v-if="info.code=='bar'" />
              <canvas id="code" class="qrcode" v-if="info.code=='qr'"></canvas>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所在实验室" prop="LabId">
            <el-cascader
              v-model="info.form.LabId"
              :options="info.labs"
              :show-all-levels="false"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部件类型" prop="UsedType">
            <el-radio-group v-model="info.form.UsedType">
              <el-radio
                v-for="item in info.userTypes"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="实验室编号" prop="InternalNo">
            <el-input v-model="info.form.InternalNo" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="SN编号" prop="SerialNo">
            <el-input v-model="info.form.SerialNo" :maxlength="50" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政编号" prop="AdminNo">
            <el-input v-model="info.form.AdminNo" :maxlength="50" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否馆藏">
            <el-checkbox v-model="info.form.IsFavorited"></el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="利用率" v-if="info.form.Id>0">
            <el-input v-model="info.form.UsedRate" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="附件清单" prop="Appendix">
            <el-input v-model="info.form.Appendix" :maxlength="500" :rows="4" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="报废时间">
            <el-input v-model="info.form.DiscardDate" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="报废说明">
            <el-input v-model="info.form.DiscardDesc" :maxlength="500" :rows="4" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row style="min-height: 40px">
      <el-col>
        <el-button
          type="info"
          style="float: right; margin-right: 45px"
          size="small"
          @click="handCancel"
        >返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AssetService from "../../apis/AssetService";
import SysSettingsService from "../../apis/SysSettingsService";
import { assetCategoryTypes, assetStatus, usedTypes } from "../../config/const";
import { trimForm } from "../../utils/helper";

let jsCode = null;
const code = window.config.code;
if (code === "bar") {
  // 条形码
  jsCode = require("jsbarcode");
} else if (code === "qr") {
  // 二维码
  jsCode = require("qrcode");
}
const depts = window.config.depts;

export default {
  name: "assetRegist",
  data() {
    return {
      info: {
        title: "部件登记",
        code: code,
        filterCategoris1: [],
        filterCategoris2: [],
        filterNames: [],
        assetModels: [],
        labs: [],
        userTypes: usedTypes,
        assetStatus: assetStatus,
        form: {
          Id: 0,
          CategoryIdLevel1: null,
          CategoryIdBrand: null,
          CategoryIdLevel2: null,
          CategoryIdName: null,
          ModelId: null,
          InternalNo: "",
          AdminNo: "",
          SerialNo: "",
          LabId: null,
          ShelfId: null,
          Status: "1",
          IsFavorited: false,
          UsedType: "1",
          Appendix: "",
          UsedRate: "",
          DiscardDate: "",
          DiscardDesc: ""
        }
      }
    };
  },
  computed: {
    ...mapState({
      loginer(state) {
        return state.user.user;
      }
    })
  },
  created() {
    this.info.form.Id = this.$route.params.id;
  },
  mounted() {
    const _this = this;
    if (this.info.form.Id) {
      AssetService.getAssets({
        Id: this.info.form.Id
      }).then(res => {
        const asset = res.Data[0];
        this.info.form.CategoryIdLevel1 = [
          asset.DeptId + "",
          asset.CategoryIdLevel1 + ""
        ];
        // this.getCategory(assetCategoryTypes.Brand, asset.CategoryIdLevel1)
        this.info.form.CategoryIdLevel2 = asset.CategoryIdLevel2 + "";
        // this.info.form.CategoryIdBrand = asset.CategoryIdBrand + ''
        this.info.form.CategoryIdName = asset.ModelName + "";
        this.info.form.ModelId = asset.ModelId + "";
        this.info.form.LabId = [
          asset.LabId + "",
          asset.SiteId + "",
          asset.ShelfId + ""
        ];
        SysSettingsService.getLabCascade({
          LabModel: this.info.form.LabId.join(",")
        }).then(res => {
          this.info.labs = res;
        });

        this.info.form.InternalNo = asset.InternalNo;

        this.createCode(asset.InternalNo);

        this.info.form.AdminNo = asset.AdminNo;
        this.info.form.SerialNo = asset.SerialNo;
        this.info.form.Status = asset.Status + "";
        this.info.form.IsFavorited = asset.IsFavorited;

        AssetService.getAssetCategory({
          Id: asset.CategoryIdLevel1
        }).then(res => {
          this.info.filterCategoris1 = res.map(_ => {
            _.label = depts.find(d => d.value === _.value).label;
            return _;
          });
        });

        this.getCategoryById(
          assetCategoryTypes.LevelTwo,
          asset.CategoryIdLevel2
        );

        this.getCategoryById(assetCategoryTypes.ModelName, asset.ModelName);

        this.getModelById(asset.ModelId, () => {
          const model = this.info.assetModels.find(
            _ => _.value == this.info.form.ModelId
          );
          if (model) {
            this.info.form.CategoryIdBrand = model.remark;
          }
        });

        this.info.form.Appendix = asset.Appendix;
        this.info.form.UsedType = asset.UsedType + "";
        this.info.form.UsedRate = asset.UsedRate;
        this.info.form.DiscardDate = asset.DiscardDate;
        this.info.form.DiscardDesc = asset.DiscardDesc;
      });
    }
  },
  methods: {
    getCategoryById(categoryType, categoryId) {
      AssetService.getAssetCategory({
        Id: categoryId,
        AssetCategoryType: categoryType
      }).then(res => {
        switch (categoryType) {
          case assetCategoryTypes.LevelTwo:
            this.info.filterCategoris2 = res;
            break;
          case assetCategoryTypes.ModelName:
            this.info.filterNames = res;
            break;
        }
      });
    },
    getModelById(modelId, callback) {
      AssetService.getAssetModels({
        Id: modelId
      }).then(res => {
        if (res.Data) {
          this.info.assetModels = res.Data.map(_ => {
            return {
              value: _.Id + "",
              label: _.ModelNo,
              remark: _.AssetCategoryBrandName
            };
          });
          if (typeof callback === "function") {
            callback();
          }
        }
      });
    },
    createCode(internalNo) {
      if (code === "bar") {
        jsCode("#code", internalNo);
      } else if (code === "qr") {
        jsCode.toCanvas(document.getElementById("code"), internalNo, function(
          error
        ) {
          if (error) console.error(error);
        });
      }
    },
    handCancel() {
      this.$router.push({
        name: "asset_discard",
        params: this.$route.params.form
      });
    }
  }
};
</script>
<style scoped>
.el-form-item > label {
  width: 24%;
}
.el-input,
.el-select,
.el-cascader {
  width: 270px;
}

.qrcode {
  width: 150px !important;
  height: 150px !important;
}
</style>
