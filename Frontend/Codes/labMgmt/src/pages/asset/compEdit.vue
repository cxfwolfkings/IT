<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{info.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-form
      ref="myModel"
      :model="info.form"
      :rules="info.rules"
      :disabled="info.isRead"
      size="small"
      label-width="96px"
    >
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="12" v-if="info.form.Id>0">
              <el-form-item label="编号" prop="ComponentNo">
                <el-input
                  v-model="info.form.ComponentNo"
                  autocomplete="off"
                  :maxlength="50"
                  :readonly="true"
                  placeholder="自动生成"
                  @change="numChange"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" prop="ComponentName">
                <el-input v-model="info.form.ComponentName" :maxlength="50" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="ComponentDesc">
                <el-input
                  v-model="info.form.ComponentDesc"
                  :maxlength="500"
                  :rows="4"
                  type="textarea"
                ></el-input>
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
          <!-- <el-form-item label="所在实验室"
                        prop="LabId">
            <el-select v-model="info.form.LabId"
                       placeholder="请选择"
                       @change="labChange">
              <el-option v-for="item in info.labs"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="所在实验室" prop="LabId">
            <el-cascader
              v-model="info.form.LabId"
              :options="info.labs"
              :show-all-levels="false"
              clearable
              @change="labChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="利用率" v-if="info.form.Id>0">
            <el-input v-model="info.form.UsedRate" autocomplete="off" :readonly="true"></el-input>
          </el-form-item>
          <!-- <el-form-item v-show="info.isShelfShow"
                        label="所在货架"
                        prop="ShelfId">
            <el-select v-model="info.form.ShelfId"
                       placeholder="请选择">
              <el-option v-for="item in info.shelfs"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
        </el-col>
        <el-col :span="8">
          <!-- <el-form-item v-if="false" label="状态" prop="Status">
            <el-select v-model="info.form.Status" placeholder="请选择">
              <el-option
                v-for="item in info.assetStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属部门">
            <el-select
              v-model="info.form.DeptId"
              placeholder="请选择"
              @change="deptChange"
              :disabled="info.isDeptSelectDisabled"
            >
              <el-option
                v-for="item in info.depts"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-tooltip
              v-if="info.isDeptChange"
              effect="dark"
              content="注意：重选部门会删除全部已选单件！"
              placement="top"
            >
              <el-button type="danger" icon="el-icon-delete" circle @click="delDept"></el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="!info.isRead">
          <el-form-item
            v-show="info.isLevel1Show && (info.srcStatus==1 || info.srcStatus===null)"
            label="资产大类"
          >
            <el-select
              v-model="info.form.CategoryIdLevel1"
              placeholder="请选择"
              clearable
              @change="level1Change"
            >
              <el-option
                v-for="item in info.level1s"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8">
          <el-form-item v-show="info.isBrandShow"
                        label="品牌">
            <el-select v-model="info.form.CategoryIdBrand"
                       placeholder="请选择"
                       @change="filterChange">
              <el-option v-for="item in info.filterBrands"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>-->
        <el-col :span="8">
          <el-form-item v-show="info.isLevel2Show" label="小分类">
            <el-select
              v-model="info.form.CategoryIdLevel2"
              placeholder="请选择"
              clearable
              @change="filterChange"
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
      <el-row>
        <el-col :span="8">
          <el-form-item v-show="info.isNameShow" label="型号类别" prop="CategoryIdName">
            <el-select
              v-model="info.form.CategoryIdName"
              placeholder="请选择"
              clearable
              @change="nameChange"
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
        <el-col :span="8">
          <el-form-item v-show="info.isModelShow" label="型号" prop="ModelId">
            <el-select
              v-model="info.form.ModelId"
              placeholder="请选择"
              clearable
              @change="modelChange"
              filterable
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
        <el-col :span="8">
          <el-form-item v-show="info.isAssetShow" label="序列号">
            <el-select
              v-model="info.form.AssetIds"
              placeholder="请选择"
              clearable
              multiple
              filterable
              collapse-tags
            >
              <el-option
                v-for="item in info.assets"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button type="success" icon="el-icon-plus" circle @click="addAsset"></el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="24">
          <el-table
            :data="info.form.tableData"
            default-expand-all
            border
            style="width: 100%; margin-bottom: 15px;"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <p style="margin-top:-10px;margin-bottom:10px;color:limegreen">该型号下被选中的部件的实验室编号：</p>
                <el-tag
                  v-for="tag in props.row.tags"
                  :key="tag.label"
                  :closable="(info.srcStatus===null || info.srcStatus==1) && !info.isRead"
                  :disable-transitions="false"
                  @close="handleClose(tag.value, props.row.ModelId)"
                >{{tag.label}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="型号类别" prop="CategoryNameModel"></el-table-column>
            <el-table-column label="型号" prop="ModelNo"></el-table-column>
            <el-table-column label="资产大类" prop="CategoryNameLevel1"></el-table-column>
            <el-table-column label="小分类" prop="CategoryNameLevel2"></el-table-column>
            <!-- <el-table-column label="品牌"
            prop="CategoryNameBrand"></el-table-column>-->
          </el-table>
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
import AssetService from "../../apis/AssetService";
import SysSettingsService from "../../apis/SysSettingsService";
import { assetCategoryTypes, assetStatus } from "../../config/const";
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
const depts = window.config.depts.sort((t1, t2) => {
  return t1.value - t2.value;
});

export default {
  name: "assetCompose",
  data() {
    return {
      info: {
        title: "部件组合",
        code: code,
        filterBrands: [],
        filterCategoris2: [],
        filterNames: [],
        assetModels: [],
        assets: [],
        labs: [],
        shelfs: [],
        depts: [],
        level1s: [],
        assetStatus: assetStatus,
        isLevel1Show: false,
        // isBrandShow: false,
        isLevel2Show: false,
        isNameShow: false,
        isModelShow: false,
        isShelfShow: false,
        isAssetShow: false,
        isButtonDisabled: false,
        isDeptSelectDisabled: false,
        isBarVisible: true,
        isRead: false,
        srcComponentNo: "",
        srcStatus: null,
        isDeptChange: true,
        form: {
          Id: 0,
          ComponentNo: "",
          ComponentName: "",
          ComponentDesc: "",
          DeptId: null,
          CategoryIdLevel1: null,
          // CategoryIdBrand: null,
          CategoryIdLevel2: null,
          CategoryIdName: null,
          ModelId: null,
          LabId: null,
          ShelfId: null,
          AssetIds: [],
          Status: "1",
          tableData: [],
          UsedRate: ""
        },
        rules: {
          // ComponentNo: [
          //   {
          //     required: true,
          //     message: "请输入编号",
          //     trigger: ["blur", "change"]
          //   }
          // ],
          ComponentName: [
            {
              required: true,
              message: "请输入名称",
              trigger: ["blur", "change"]
            }
          ],
          // ComponentDesc: [
          //   { required: true, message: '请输入描述', trigger: ['blur', 'change'] }
          // ],
          LabId: [
            {
              required: true,
              message: "请选择实验室",
              trigger: ["blur", "change"]
            }
          ],
          ShelfId: [
            {
              required: true,
              message: "请选择货架",
              trigger: ["blur", "change"]
            }
          ]
        }
      }
    };
  },
  created() {
    if (this.$route.params.id) {
      this.info.form.Id = this.$route.params.id;
      this.info.isDeptChange = false;
    } else {
      this.info.form.Id = 0;
      this.info.isDeptChange = true;
    }
    if (this.$route.params.type) {
      this.info.isRead = true;
    } else {
      this.info.isRead = false;
    }
    // 部门权限限制
    AssetService.getAssetCategory({
      AssetCategoryType: assetCategoryTypes.LevelOne
    }).then(res => {
      this.info.depts = depts.filter(
        _ => res.filter(r => r.value === _.value).length > 0
      );
    });
  },
  mounted() {
    if (this.info.form.Id) {
      AssetService.getComponents({
        Id: this.info.form.Id
      }).then(res => {
        const component = res.Data[0];
        this.info.srcComponentNo = component.ComponentNo;
        this.info.form.ComponentNo = component.ComponentNo;
        this.info.form.ComponentName = component.ComponentName;
        this.info.form.ComponentDesc = component.ComponentDesc;
        this.info.form.UsedRate = component.UsedRate;
        this.info.form.LabId = [
          component.LabId + "",
          component.SiteId + "",
          component.ShelfId + ""
        ];
        SysSettingsService.getLabCascade({
          LabModel: this.info.form.LabId.join(",")
        }).then(res => {
          this.info.labs = res;
        });

        // this.getShelves()
        this.info.form.ShelfId = component.ShelfId + "";
        this.info.form.Status = component.Status + "";
        this.info.srcStatus = component.Status;

        this.info.isShelfShow = true;

        this.createCode(component.ComponentNo);

        this.info.isBarVisible = true;
        this.info.form.DeptId = component.DeptId + "";
        this.deptChange(this.info.form.DeptId);
        this.info.form.tableData = component.ComponentDetails;
      });
    } else {
      SysSettingsService.getLabCascade({
        LabModel: ""
      }).then(res => {
        this.info.labs = res;
      });
    }
  },
  methods: {
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
    getModels() {
      AssetService.getAssetModels({
        // CategoryIdLevel2: this.info.form.CategoryIdLevel2,
        // CategoryIdBrand: this.info.form.CategoryIdBrand
        ModelName: this.info.form.CategoryIdName
      }).then(res => {
        if (res.Data) {
          this.info.assetModels = res.Data.map(_ => {
            return {
              value: _.Id + "",
              label: _.ModelNo
            };
          });
        }
      });
    },
    getAssets() {
      AssetService.getAssets({
        ModelId: this.info.form.ModelId,
        IsAddStatus: true,
        Status: 1,
        IsAddFavorited: true,
        IsFavorited: false,
        LabId: this.info.form.LabId[0]
      }).then(res => {
        this.info.assets = res.Data.map(_ => {
          return {
            value: _.Id,
            label: _.InternalNo,
            labId: _.LabId
          };
        });
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
    delDept() {
      this.info.form.DeptId = null;
      this.info.isDeptSelectDisabled = false;
      this.info.isLevel1Show = false;
      // this.info.isBrandShow = false
      this.info.isLevel2Show = false;
      this.info.isModelShow = false;
      this.info.isAssetShow = false;
      this.info.isNameShow = false;
      this.info.form.CategoryIdLevel1 = null;
      this.info.level1s = [];
      // this.info.form.CategoryIdBrand = null
      this.info.filterBrands = [];
      this.info.form.CategoryIdLevel2 = null;
      this.info.filterCategoris2 = [];
      this.info.form.ModelId = null;
      this.info.form.CategoryIdName = null;
      this.info.assetModels = [];
      this.info.form.AssetIds = [];
      this.info.assets = [];
      this.info.form.tableData = [];
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
    numChange(e) {
      if (this.info.form.Id && this.info.srcComponentNo) {
        if (e !== this.info.srcComponentNo) {
          this.$message({
            message: "警告：编号改变，生成码也将改变！",
            type: "warning"
          });
        }
        this.info.srcComponentNo = "";
      }
      this.createCode(e);
    },
    deptChange(e) {
      if (e) {
        this.info.isDeptSelectDisabled = true;
        this.info.isLevel1Show = true;
      } else {
        this.info.isLevel1Show = false;
      }
      AssetService.getAssetCategory({
        AssetCategoryType: assetCategoryTypes.LevelOne
      }).then(res => {
        this.info.level1s = res.find(_ => _.value === e).children;
      });
    },
    level1Change(e) {
      if (!this.info.form.LabId || this.info.form.LabId.length == 0) {
        this.$message({
          message: "请先选择实验室！",
          type: "warning"
        });
        this.info.form.CategoryIdLevel1 = null;
        return;
      }
      this.info.isNameShow = false;
      this.info.isModelShow = false;
      this.info.isAssetShow = false;
      // this.info.form.CategoryIdBrand = null
      this.info.form.CategoryIdLevel2 = null;
      if (e) {
        // this.info.isBrandShow = true
        this.info.isLevel2Show = true;
        this.getCategory(assetCategoryTypes.LevelTwo, e);
      } else {
        // this.info.isBrandShow = false
        this.info.isLevel2Show = false;
      }
    },
    filterChange(e) {
      this.info.isAssetShow = false;
      this.info.isModelShow = false;
      this.info.form.CategoryIdName = null;
      if (e && e.length) {
        this.getCategory(assetCategoryTypes.ModelName, e);
        this.info.isNameShow = true;
      } else {
        this.info.isNameShow = false;
      }
    },
    nameChange(e) {
      this.info.isAssetShow = false;
      this.info.form.ModelId = null;
      if (
        /* this.info.form.CategoryIdBrand && */ this.info.form.CategoryIdLevel2
      ) {
        this.getModels();
        this.info.isModelShow = true;
      } else {
        this.info.isModelShow = false;
      }
    },
    modelChange(e) {
      this.info.form.AssetIds = [];
      if (e) {
        this.getAssets();
        if (
          this.info.form.tableData &&
          this.info.form.tableData.filter(_ => _.ModelId == e).length > 0
        ) {
          const tags = this.info.form.tableData.find(_ => _.ModelId == e).tags;
          this.info.form.AssetIds.push(...tags.map(_ => parseInt(_.value)));
        }
        this.info.isAssetShow = true;
      } else {
        this.info.isAssetShow = false;
      }
    },
    labChange(e) {
      if (e && e.length) {
        const labId = e[0];
        // 删除其它实验室的部件
        const rows = this.info.form.tableData;
        if (rows && rows.length > 0) {
          // 删除逻辑
          for (let i = 0; i < rows.length; i++) {
            let tags = rows[i].tags;
            tags = tags.filter(t => t.labId == labId);
            if (tags && tags.length === 0) {
              rows.splice(i, 1);
            }
          }
        }
        this.modelChange(this.info.form.ModelId);
      }
    },
    addAsset() {
      // console.log(this.info.form.AssetIds)
      if (this.info.form.AssetIds.length == 0) {
        return;
      }
      const rows = this.info.form.tableData;
      if (rows.filter(_ => _.ModelId == this.info.form.ModelId).length > 0) {
        const tags = rows.find(_ => _.ModelId == this.info.form.ModelId).tags;
        const toAddIds = this.info.form.AssetIds.filter(
          _ => !tags.map(t => t.value + "").includes(_ + "")
        ).map(_ => {
          return {
            value: _,
            label: this.info.assets.find(a => a.value == _).label
          };
        });
        tags.push(...toAddIds);
      } else {
        rows.push({
          CategoryIdLevel1: this.info.form.CategoryIdLevel1,
          CategoryNameLevel1: this.info.level1s.find(
            _ => _.value == this.info.form.CategoryIdLevel1
          ).label,
          CategoryIdLevel2: this.info.form.CategoryIdLevel2,
          CategoryNameLevel2: this.info.filterCategoris2.find(
            _ => _.value == this.info.form.CategoryIdLevel2
          ).label,
          CategoryIdName: this.info.form.CategoryIdName,
          CategoryNameModel: this.info.filterNames.find(
            _ => _.value == this.info.form.CategoryIdName
          ).label,
          ModelId: this.info.form.ModelId,
          ModelNo: this.info.assetModels.find(
            _ => _.value == this.info.form.ModelId
          ).label,
          // CategoryIdBrand: this.info.form.CategoryIdBrand,
          // CategoryNameBrand: this.info.filterBrands.find(_ => _.value === this.info.form.CategoryIdBrand).label,
          tags: this.info.form.AssetIds.map(_ => {
            return {
              label: this.info.assets.find(a => a.value == _).label,
              value: _
            };
          })
        });
      }
    },
    handleClose(assetId, modelId) {
      const rows = this.info.form.tableData;
      const tags = rows.find(_ => _.ModelId === modelId).tags;
      tags.splice(tags.findIndex(_ => _.value === assetId), 1);
      if (tags && tags.length === 0) {
        rows.splice(rows.findIndex(_ => _.ModelId === modelId), 1);
      }
    },
    handSubmit() {
      const that = this;
      this.info.isButtonDisabled = true;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          const assetIds = [];
          if (this.info.form.tableData.length === 0) {
            this.$message({ type: "warning", message: "请选择单个部件！" });
            this.info.isButtonDisabled = false;
            return;
          }
          this.info.form.tableData.forEach(row => {
            assetIds.push(...row.tags.map(_ => _.value));
          });
          const inParams = {
            Id: this.info.form.Id,
            ComponentNo: this.info.form.ComponentNo,
            ComponentName: this.info.form.ComponentName,
            ComponentDesc: this.info.form.ComponentDesc,
            ShelfId: this.info.form.LabId[2],
            AssetIds: assetIds,
            Status: this.info.form.Status,
            DeptId: this.info.form.DeptId
          };
          trimForm(inParams);
          if (this.info.form.Id) {
            AssetService.updComponent(inParams)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "更新成功",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push({
                      name: "asset_compose",
                      params: that.$route.params.form
                    });
                  }
                });
              })
              .catch(err => {
                // this.info.isButtonDisabled = false;
                this.reload({
                  data: this.$route.params,
                  name: "asset_compEdit"
                });
              });
          } else {
            AssetService.addComponent(inParams)
              .then(res => {
                // this.openFullScreen('创建成功，正在生成编码...', () => {
                //   this.reload({ data: { id: res }, name: 'asset_compose' })
                // })
                this.$message({
                  type: "success",
                  message: "添加成功",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push({ name: "asset_compose" });
                  }
                });
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
          name: "asset_compose",
          params: this.$route.params.form
        });
      }
    },
    handPrint() {
      // 注意事项，需使用ref获取dom节点，若直接通过id或class获取，则webpack打包部署后打印内容为空。
      const _this = this;
      this.$print(document.getElementById("code"), {
        isCanvas: true,
        number: _this.info.form.ComponentNo
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
  width: 240px;
}

.el-tag {
  margin-right: 10px;
}

.qrcode {
  width: 150px !important;
  height: 150px !important;
}
</style>
