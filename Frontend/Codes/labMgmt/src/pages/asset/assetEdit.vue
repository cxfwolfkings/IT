<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right"
                   style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{info.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-form
      ref="myModel"
      :model="info.form"
      :rules="info.rules"
      size="small"
      label-width="96px"
      :disabled="info.isRead"
    >
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="12">
              <el-form-item label="资产大类" prop="CategoryIdLevel1">
                <el-cascader
                  v-model="info.form.CategoryIdLevel1"
                  :options="info.filterCategoris1"
                  :show-all-levels="false"
                  :disabled="info.srcStatus && info.srcStatus!=1"
                  clearable
                  @change="filterChange"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-show="info.isLevel2Show" label="小分类" prop="CategoryIdLevel2">
                <el-select
                  v-model="info.form.CategoryIdLevel2"
                  :disabled="info.srcStatus && info.srcStatus!=1"
                  placeholder="请选择"
                  clearable
                  @change="filterChange2"
                >
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
          <el-row v-show="info.isNameShow || info.isModelShow">
            <el-col :span="12">
              <el-form-item v-show="info.isNameShow" label="型号类别" prop="CategoryIdName">
                <el-select
                  v-model="info.form.CategoryIdName"
                  :disabled="info.srcStatus && info.srcStatus!=1"
                  placeholder="请选择"
                  clearable
                  @change="filterChange3"
                >
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
              <el-form-item v-show="info.isModelShow" label="型号" prop="ModelId">
                <el-select
                  v-model="info.form.ModelId"
                  :disabled="info.srcStatus && info.srcStatus!=1"
                  placeholder="请选择"
                  clearable
                  @change="filterChange4"
                >
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
                <el-input v-model="info.form.CategoryIdBrand" :readonly="true"></el-input>
                <!-- <el-select v-model="info.form.CategoryIdBrand"
                           :disabled="info.srcStatus && info.srcStatus!=1"
                           clearable
                           placeholder="请选择">
                  <el-option v-for="item in info.filterBrands"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row v-show="info.isBarVisible">
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
              :disabled="info.srcStatus && info.srcStatus!=1 && info.srcStatus!=0 && info.srcStatus<10"
              @change="labChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="部件类型" prop="UsedType">
            <el-radio-group
              v-model="info.form.UsedType"
              :disabled="info.srcStatus && info.srcStatus!=1"
            >
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
            <el-input v-model="info.form.InternalNo" autocomplete="off" :readonly="true"></el-input>
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
        <!-- <el-col :span="8">
          <el-form-item v-if="false" label="状态" prop="Status">
            <el-select v-model="info.form.Status" placeholder="请选择">
              <el-option
                v-for="item in info.assetStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item label="是否馆藏">
            <!-- <el-checkbox v-model="info.form.IsFavorited" v-show="info.isFavoritedShow" :disabled="info.isFavoritedDisabled"></el-checkbox> -->
            <el-checkbox
              v-model="info.form.IsFavorited"
              :disabled="info.isFavoritedDisabled || (info.srcStatus!==null && info.srcStatus!=1 && info.srcStatus<10)"
            ></el-checkbox>
            <span v-show="info.isFavoritedDisabled" style="color:red; margin-left:15px;">该型号部件已有馆藏！</span>
            <!-- <el-button
              type="success"
              icon="el-icon-check"
              circle
              v-show="!info.isFavoritedShow && info.form.IsFavorited"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-close"
              circle
              v-show="!info.isFavoritedShow && !info.form.IsFavorited"
            ></el-button>-->
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="利用率" v-if="info.form.Id>0">
            <el-input v-model="info.form.UsedRate" autocomplete="off" :readonly="true"></el-input>
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
      <el-row v-if="!info.isRead">
        <el-col :span="24">
          <el-form-item style="float: right; margin-right: 45px">
            <el-button type="primary" @click="handSubmit" :disabled="info.isButtonDisabled">提交</el-button>
            <el-button type="info" @click="handCancel" :disabled="info.isButtonDisabled">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-if="info.isRead">
      <el-col>
        <el-button
          type="info"
          style="float: right; margin-right: 45px"
          size="small"
          @click="handCancel"
        >返回</el-button>
        <el-button
          type="success"
          style="float: right; margin-right: 9px"
          size="small"
          @click="handPrint"
        >打印二维码</el-button>
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
        // filterBrands: [],
        filterCategoris2: [],
        filterNames: [],
        assetModels: [],
        labs: [],
        userTypes: usedTypes,
        assetStatus: assetStatus,
        isLevel2Show: false,
        isNameShow: false,
        isModelShow: false,
        isButtonDisabled: false,
        isBarVisible: false,
        isFavoritedShow: true,
        isFavoritedDisabled: false,
        srcModelId: null,
        srcStatus: null,
        isRead: false,
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
          UsedRate: ""
        },
        rules: {
          ModelId: [
            {
              required: true,
              message: "请选择型号",
              trigger: ["blur", "change"]
            }
          ],
          UsedType: [
            {
              required: true,
              message: "请选择使用类型",
              trigger: ["blur", "change"]
            }
          ],
          LabId: [
            {
              required: true,
              message: "请选择实验室货架",
              trigger: ["blur", "change"]
            }
          ],
          // Appendix: [
          //   { required: true, message: '请输入行政编号', trigger: ['blur', 'change'] }
          // ],
          SerialNo: [
            {
              required: true,
              message: "请输入SN编号",
              trigger: ["blur", "change"]
            }
          ],
          CategoryIdLevel1: [
            {
              required: true,
              message: "请选择资产大类",
              trigger: ["blur", "change"]
            }
          ],
          // CategoryIdBrand: [
          //   { required: true, message: '请输入品牌', trigger: ['blur', 'change'] }
          // ],
          CategoryIdLevel2: [
            {
              required: true,
              message: "请选择小分类",
              trigger: ["blur", "change"]
            }
          ],
          CategoryIdName: [
            {
              required: true,
              message: "请输入名称",
              trigger: ["blur", "change"]
            }
          ]
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
    if (this.$route.params.id) {
      this.info.form.Id = this.$route.params.id;
    } else {
      this.info.form.Id = 0;
    }
    if (this.$route.params.type) {
      this.info.isRead = true;
    } else {
      this.info.isRead = false;
    }
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

        this.info.srcModelId = asset.ModelId;
        this.info.form.InternalNo = asset.InternalNo;

        this.createCode(asset.InternalNo);

        this.info.form.AdminNo = asset.AdminNo;
        this.info.form.SerialNo = asset.SerialNo;
        this.info.form.Status = asset.Status + "";
        this.info.srcStatus = asset.IsFavorited ? 10 : 0 + asset.Status + "";
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

        if (!this.info.isRead && !asset.IsFavorited) {
          AssetService.getFavoritedFlag({
            modelId: asset.ModelId,
            labId: asset.LabId,
            assetId: asset.Id
          }).then(res => {
            if (!res) {
              this.info.form.IsFavorited = false;
              this.info.isFavoritedDisabled = true;
            } else {
              this.info.isFavoritedDisabled = false;
            }
          });
        }

        this.info.form.Appendix = asset.Appendix;
        this.info.form.UsedType = asset.UsedType + "";
        this.info.form.UsedRate = asset.UsedRate;
        this.info.isLevel2Show = true;
        this.info.isModelShow = true;
        this.info.isNameShow = true;
        this.info.isBarVisible = true;
        this.info.isFavoritedShow = false;
      });
    } else {
      AssetService.getAssetCategory({
        AssetCategoryType: assetCategoryTypes.LevelOne
      }).then(res => {
        this.info.filterCategoris1 = res.map(_ => {
          _.label = depts.find(d => d.value === _.value).label;
          return _;
        });
      });
      SysSettingsService.getLabCascade({
        LabModel: ""
      }).then(res => {
        this.info.labs = res;
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
        // case assetCategoryTypes.Brand:
        //   AssetService.getAssetCategory({
        //     AssetCategoryType: categoryType,
        //     CategoryIdLevel1: parentId
        //   }).then(res => {
        //     this.info.filterBrands = res
        //   })
        //   break
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
    getModels(callback) {
      AssetService.getAssetModels({
        ModelName: this.info.form.CategoryIdName
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
    // getShelves () {
    //   SysSettingsService.getShelves({
    //     LabId: this.info.form.LabId
    //   }).then(res => {
    //     this.info.shelfs = res.map(_ => {
    //       return {
    //         label: _.ShelfName,
    //         value: _.Id + ''
    //       }
    //     })
    //   })
    // },
    filterChange(e) {
      // console.log("subcategory filter changed", e)
      this.info.isNameShow = false;
      this.info.isModelShow = false;
      this.info.isBarVisible = false;
      this.info.form.CategoryIdBrand = null;
      this.info.form.CategoryIdLevel2 = null;
      this.info.form.CategoryIdName = null;
      this.info.form.ModelId = null;
      if (e && e.length) {
        // this.info.form.CategoryIdLevel1 = e[1]
        this.getCategory(assetCategoryTypes.LevelTwo, e[1]);
        this.getCategory(assetCategoryTypes.Brand, e[1]);
        this.info.isLevel2Show = true;
      } else {
        this.info.isLevel2Show = false;
      }
    },
    filterChange2(e) {
      this.info.isModelShow = false;
      this.info.isBarVisible = false;
      this.info.form.ModelId = null;
      this.info.form.CategoryIdName = null;
      if (e && e.length) {
        this.getCategory(assetCategoryTypes.ModelName, e);
        this.info.isNameShow = true;
      } else {
        this.info.isNameShow = false;
      }
    },
    filterChange3(e) {
      this.info.form.ModelId = null;
      this.info.isBarVisible = false;
      if (e && e.length) {
        this.getModels();
        this.info.isModelShow = true;
      } else {
        this.info.isModelShow = false;
      }
    },
    filterChange4(e) {
      if (this.info.srcModelId && this.info.srcModelId + "" !== e + "") {
        this.$message({ message: "警告：图形码将改变！", type: "warning" });
        this.info.srcModelId = null;
      }
      // console.log(this.loginer)
      // const deptPrefix = depts.find(_ => _.value === this.loginer.DepartmentNo).prefix
      const deptPrefix = depts.find(
        _ => _.value === this.info.form.CategoryIdLevel1[0]
      ).prefix;
      if (e) {
        this.info.form.CategoryIdBrand = this.info.assetModels.find(
          _ => _.value === e
        ).remark;
        // let categoryNoLevel1 = ''
        // this.info.filterCategoris1.forEach(_ => {
        //   if (_.children && _.children.length && _.children.filter(c => c.value == this.info.form.CategoryIdLevel1).length > 0) {
        //     categoryNoLevel1 = _.children.find(c => c.value == this.info.form.CategoryIdLevel1).remark
        //     return false
        //   }
        // })
        if (this.info.form.Id) {
          // 更新
          const serialNo = this.info.form.InternalNo.substring(
            this.info.form.InternalNo.length - 9
          );
          // this.info.form.InternalNo = categoryNoLevel1
          //   + '-' + this.info.filterBrands.find(_ => _.value == this.info.form.CategoryIdBrand).remark
          //   + '-' + this.info.filterCategoris2.find(_ => _.value == this.info.form.CategoryIdLevel2).remark
          //   + '-' + this.info.assetModels.find(_ => _.value == e).remark + '-' + serialNo
          this.info.form.InternalNo =
            deptPrefix +
            this.info.filterCategoris2.find(
              _ => _.value === this.info.form.CategoryIdLevel2
            ).remark +
            serialNo;
          this.createCode(this.info.form.InternalNo);
        } else {
          // 新增
          AssetService.getNewSerialNo({
            modelId: e
          }).then(res => {
            // this.info.form.InternalNo = categoryNoLevel1
            //   + '-' + this.info.filterBrands.find(_ => _.value == this.info.form.CategoryIdBrand).remark
            //   + '-' + this.info.filterCategoris2.find(_ => _.value == this.info.form.CategoryIdLevel2).remark
            //   + '-' + this.info.assetModels.find(_ => _.value == e).remark + '-' + res
            const now = new Date();
            const dateStr =
              now.getFullYear() + ("0" + (now.getMonth() + 1)).slice(-2);
            this.info.form.InternalNo =
              deptPrefix +
              this.info.filterCategoris2.find(
                _ => _.value === this.info.form.CategoryIdLevel2
              ).remark +
              dateStr +
              res;
            this.createCode(this.info.form.InternalNo);
            this.info.isBarVisible = true;
          });
          if (this.info.form.LabId && this.info.form.LabId.length) {
            AssetService.getFavoritedFlag({
              modelId: e,
              labId: this.info.form.LabId[0],
              assetId: this.info.form.Id
            }).then(res => {
              if (!res) {
                this.info.form.IsFavorited = false;
                this.info.isFavoritedDisabled = true;
              } else {
                this.info.isFavoritedDisabled = false;
              }
            });
          } else {
            this.info.isFavoritedDisabled = false;
          }
        }
      } else {
        this.info.isBarVisible = false;
        this.info.form.CategoryIdBrand = null;
      }
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
    labChange(e) {
      if (e) {
        if (this.info.form.ModelId) {
          AssetService.getFavoritedFlag({
            modelId: this.info.form.ModelId,
            labId: e[0],
            assetId: this.info.form.Id
          }).then(res => {
            if (!res) {
              this.info.form.IsFavorited = false;
              this.info.isFavoritedDisabled = true;
            } else {
              this.info.isFavoritedDisabled = false;
            }
          });
        }
      } else {
        this.info.isFavoritedDisabled = false;
      }
    },
    handSubmit() {
      const that = this;
      this.info.isButtonDisabled = true;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          this.info.form.ShelfId = this.info.form.LabId[2];
          trimForm(this.info.form);
          if (this.info.form.Id) {
            AssetService.updAsset(this.info.form)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "更新成功",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push({
                      name: "asset_regist",
                      params: that.$route.params.form
                    });
                  }
                });
              })
              .catch(err => {
                // this.info.isButtonDisabled = false;
                this.reload({ data: this.$route.params, name: "asset_edit" });
              });
          } else {
            AssetService.addAsset(this.info.form)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "添加成功",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push({ name: "asset_regist" });
                  }
                });
                // this.openFullScreen('创建成功，正在生成图形码...', () => {
                //   this.reload({ data: { id: res }, name: 'asset_edit' })
                // })
              })
              .catch(err => {
                this.info.isButtonDisabled = false;
              });
          }
        } else {
          this.info.isButtonDisabled = false;
        }
      });
    },
    reload(inParams) {
      // replace another route (with different component or a dead route) at first
      // 先进入一个空路由
      this.$router.replace({
        name: "empty",
        params: inParams
      });
    },
    openFullScreen(msg, callback) {
      const loading = this.$loading({
        lock: true,
        text: msg || "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        callback();
      }, 2000);
    },
    handCancel() {
      if (this.$route.params.src == "home") {
        this.$router.push({
          name: "home"
        });
      } else {
        this.$router.push({
          name: "asset_regist",
          params: this.$route.params.form
        });
      }
    },
    handPrint() {
      // 注意事项，需使用ref获取dom节点，若直接通过id或class获取，则webpack打包部署后打印内容为空。
      const _this = this;
      this.$print(document.getElementById("code"), {
        isCanvas: true,
        number: _this.info.form.InternalNo
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
