<template>
  <div id="formContainer" class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借用与归还</el-breadcrumb-item>
      <el-breadcrumb-item>归还登记</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-form
      ref="myModel"
      :model="form"
      :rules="rules"
      :disabled="info.isRead"
      size="small"
      label-width="150px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="部件类型" prop="AssetType">
            <el-radio-group v-model="form.AssetType" @change="assetTypeChange">
              <el-radio
                v-for="item in info.filterAssetTypes"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <!-- <el-form-item v-show="info.isNumberShow" label="部件编号" prop="AssetId"> -->
          <el-form-item label="部件编号" prop="BorrowId">
            <el-select
              v-model="form.BorrowId"
              placeholder="请选择"
              filterable
              clearable
              default-first-option
              @change="numChange"
            >
              <el-option-group
                v-for="group in info.filterAssetIds"
                :key="group.label"
                :label="group.label"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- <el-form-item v-show="info.isModelShow"
                        label="部件型号"
                        prop="AssetModelId">
            {{info.ModelNo}}<el-tooltip class="item"
                        effect="dark"
                        :content="info.ModelDesc"
                        placement="right">
              <el-link :underline="false"><i class="el-icon-info el-icon--right"></i></el-link>
          </el-tooltip>-->
          <!-- <el-cascader v-model="form.AssetModelId"
                         :options="info.filterModels"
                         :show-all-levels="false"
                         clearable
          @change="modelChange"></el-cascader>-->
          <!-- </el-form-item> -->
        </el-col>
        <el-col :span="12"></el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="有无问题">
            <el-checkbox
              v-model="form.IsHaveIssue"
              :disabled="info.ExistsIssue"
              @change="issueChange"
            ></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="info.IsIssueShow">
        <el-col :span="24">
          <el-form-item label="问题描述" prop="IssueContent">
            <el-input v-model="form.IssueContent" :maxlength="500" :rows="4" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="info.isInfoShow">
        <el-col :span="20" :offset="2">
          <el-collapse v-model="info.activeNames">
            <el-collapse-item name="2">
              <template slot="title">
                <el-link type="primary">借用信息</el-link>
                <el-tooltip effect="dark" content="点击打开" placement="top">
                  <i class="header-icon el-icon-info" style="margin-left:6px; margin-right: 6px"></i>
                </el-tooltip>
              </template>
              <!-- label-position="left" -->
              <el-form :model="info.borrowData" size="small" inline class="demo-table-expand">
                <el-form-item label="借用人：">
                  <span>{{ info.borrowData.BorrowerAccountNo }}</span>
                </el-form-item>
                <el-form-item label="借用日期：">
                  <span>{{ info.borrowData.BorrowDate }}</span>
                </el-form-item>
                <el-form-item label="借用目的：">
                  <span>{{ info.borrowData.BorrowReason }}</span>
                </el-form-item>
                <el-form-item label="计划归还日期：">
                  <span>{{ info.borrowData.PlanReturnDate }}</span>
                </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item name="1">
              <template slot="title">
                <el-link type="primary">部件信息</el-link>
                <el-tooltip effect="dark" content="点击打开" placement="top">
                  <i class="header-icon el-icon-info" style="margin-left:6px; margin-right: 6px"></i>
                </el-tooltip>
              </template>
              <el-form :model="info.partBasicData" size="small" inline class="demo-table-expand">
                <el-form-item
                  v-if="form.AssetType==2"
                  label="平台名称："
                  size="small"
                  inline
                  style="margin-bottom:9px"
                >
                  <span>{{ info.partBasicData.ComponentName }}</span>
                </el-form-item>
                <el-form-item v-else label="部件类型：" size="small" inline style="margin-bottom:9px">
                  <span>{{ info.partBasicData.UsedTypeDesc }}</span>
                </el-form-item>
                <el-form-item label="所属实验室：">
                  <span>{{ info.partBasicData.LabNameDesc }}</span>
                </el-form-item>
              </el-form>
              <el-link
                v-if="form.AssetType=='2'"
                type="primary"
                icon="el-icon-plus"
                style="margin-right: 9px"
                href="javascript:this.expandTb(true)"
              >全部展开</el-link>
              <el-link
                v-if="form.AssetType=='2'"
                type="warning"
                icon="el-icon-minus"
                href="javascript:this.expandTb(false)"
              >全部收缩</el-link>
              <!-- <el-button
                v-if="form.AssetType=='2'"
                type="primary"
                size="small"
                @click="expandTb(true)"
              >
                全部展开
                <i class="el-icon-plus el-icon--right"></i>
              </el-button>
              <el-button
                v-if="form.AssetType=='2'"
                type="success"
                size="small"
                @click="expandTb(false)"
              >
                全部收缩
                <i class="el-icon-minus el-icon--right"></i>
              </el-button>-->
              <el-table
                :data="info.partDetailData"
                border
                stripe
                :show-header="true"
                row-key="ModelNo"
                default-expand-all
                :expand-row-keys="info.expandRowKeys"
                style="width: 100%; margin-top: 15px"
              >
                <el-table-column v-if="form.AssetType=='2'" type="expand">
                  <template slot-scope="props">
                    <p style="margin-top:-10px;margin-bottom:10px;color:limegreen">该型号下被选中的部件的实验室编号：</p>
                    <el-tag
                      v-for="tag in props.row.tags"
                      :key="tag.label"
                      :disable-transitions="false"
                    >{{tag.label}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="CategoryNameModel" label="型号类别"></el-table-column>
                <el-table-column prop="ModelNo" label="型号"></el-table-column>
                <el-table-column prop="CategoryNameLevel1" label="资产大类"></el-table-column>
                <el-table-column prop="CategoryNameLevel2" label="小分类"></el-table-column>
                <el-table-column prop="CategoryNameBrand" label="品牌"></el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <el-row v-if="!info.isRead">
        <el-col :span="24">
          <el-form-item style="float: right; margin-right: 45px">
            <el-button type="primary" @click="handleSubmit" :disabled="info.isButtonDisabled">提交</el-button>
            <el-button type="info" @click="handleCancel" :disabled="info.isButtonDisabled">取消</el-button>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import {
  assetType,
  usedTypes,
  /* repairStatus, */ borrowReasons
} from "../../config/const";
import { trimForm, scanCode } from "../../utils/helper";

// const depts = window.config.depts

export default {
  name: "returnRegist",
  data() {
    return {
      info: {
        activeNames: ["1", "2"],
        filterAssetTypes: assetType,
        filterAssetIds: [],
        // filterModels: [],
        // filterRepairStatus: repairStatus,
        // filterBorrowReasons: borrowReasons,
        isButtonDisabled: false,
        isInfoShow: false,
        IsIssueShow: false,
        // isNumberShow: false,
        // isModelShow: false,
        selectedNode: null,
        // ModelNo: '',
        // ModelDesc: '',
        partBasicData: {},
        partDetailData: [],
        borrowData: {},
        expandRowKeys: [],
        ExistsIssue: false,
        isRead: false
      },
      form: {
        Id: 0,
        AssetType: null,
        // AssetModelId: null,
        // AssetModelNo: '',
        BorrowId: null,
        IsHaveIssue: false,
        IssueContent: ""
      },
      rules: {
        BorrowId: [
          {
            required: true,
            message: "请选择部件编号",
            trigger: ["blur", "change"]
          }
        ],
        IssueContent: [
          {
            required: true,
            message: "请输入问题描述",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.params.id) {
      this.form.Id = this.$route.params.id;
    } else {
      this.form.Id = 0;
    }
    if (this.$route.params.type) {
      this.info.isRead = true;
    } else {
      this.info.isRead = false;
    }

    // 监听浏览器输入事件
    scanCode(this, "return");
  },
  mounted() {
    window.expandTb = this.expandTb;
    if (this.form.Id) {
      // BorrowAndReturnService.getReturnIssues({
      //   Id: this.form.Id
      // }).then(res => {
      //   const record = res.Data[0];
      //   Object.assign(this.form, record);
      //   this.getParts();
      // });
      this.form.BorrowId = this.form.Id;
      BorrowAndReturnService.getBorrowedPart({
        Id: this.form.Id
      }).then(res => {
        this.form.AssetType = res.PartType + "";
        this.getParts(this.form.AssetType, true);

        this.info.partDetailData = res.Details;
        this.info.partBasicData = {
          LabNameDesc: res.LabNameDesc,
          UsedTypeDesc: res.UsedType
            ? usedTypes.find(_ => _.value == res.UsedType).label
            : "",
          ComponentName: res.ComponentName
        };
        this.info.borrowData = {
          BorrowerAccountNo: res.BorrowerAccountNo,
          BorrowDate: res.BorrowDate,
          BorrowReason: borrowReasons.find(
            _ => _.value === res.BorrowReason + ""
          ).label,
          PlanReturnDate: res.PlanReturnDate
        };
        this.form.IssueContent = res.IssueContent;
        if (res.IssueContent) {
          this.form.IsHaveIssue = true;
          this.info.ExistsIssue = true;
          this.info.IsIssueShow = true;
        } else {
          this.form.IsHaveIssue = false;
          this.info.ExistsIssue = false;
          this.info.IsIssueShow = false;
        }
        this.info.isInfoShow = true;
      });
    } else {
      this.getParts();
    }
    const _this = this;
    // setInterval(function() {
    //   const divContainer = document.getElementById("formContainer");
    //   if (_this.$refs && _this.$refs.myModel && _this.$refs.myModel.$el) {
    //     divContainer.setAttribute(
    //       "style",
    //       "min-height:" + (_this.$refs.myModel.$el.clientHeight + 150) + "px"
    //     );
    //   }
    // }, 400);
  },
  methods: {
    // getAssetModels () {
    //   BorrowAndReturnService.getBorrowedPartModels().then(res => {
    //     this.info.filterModels = res.map(_ => {
    //       _.label = depts.find(d => d.value === _.value).label
    //       return _
    //     })
    //   })
    // },
    getParts(assetTypeId, isNotReturned) {
      const inParams = {
        IsNotReturned: !isNotReturned
      };
      if (assetTypeId) {
        inParams.BorrowedPartType = assetTypeId;
      }
      // if (assetModelNo) {
      //   inParams.BorrowedPartModelNo = assetModelNo
      // }
      BorrowAndReturnService.getBorrowedParts(inParams).then(res => {
        this.info.filterAssetIds = [];
        const assets = res.filter(_ => _.PartType === 1);
        const components = res.filter(_ => _.PartType === 2);
        if (assets.length) {
          this.info.filterAssetIds.push({
            label: "单个部件",
            options: assets.map(_ => {
              return {
                value: _.BorrowId,
                label: _.PartNo
              };
            })
          });
        }
        if (components.length) {
          this.info.filterAssetIds.push({
            label: "组合平台",
            options: components.map(_ => {
              return {
                value: _.BorrowId,
                label: _.PartNo
              };
            })
          });
        }
      });
    },
    issueChange(e) {
      if (e) {
        this.info.IsIssueShow = true;
        this.rules.IssueContent = [
          {
            required: true,
            message: "请填写问题描述",
            trigger: ["blur", "change"]
          }
        ];
      } else {
        this.info.IsIssueShow = false;
        delete this.rules.IssueContent;
      }
    },
    assetTypeChange(e) {
      this.info.isInfoShow = false;
      this.info.IsIssueShow = false;
      this.form.IssueContent = "";
      this.form.IsHaveIssue = false;
      delete this.rules.IssueContent;
      if (e) {
        // this.form.AssetModelId = null
        this.form.BorrowId = null;
        this.info.isInfoShow = false;
        this.info.filterAssetIds = [];
        // if (e === '1') { // 单个部件
        // this.info.isModelShow = true
        // this.getAssetModels()
        // }
        // if (e === '2') { // 组合部件
        // this.info.isNumberShow = true
        // this.info.isModelShow = false
        this.getParts(e);
        // }
      } else {
        // this.info.isModelShow = false
        // this.info.isNumberShow = false
        this.getParts();
      }
    },
    // modelChange (e) {
    //   this.form.AssetId = null
    //   if (e) {
    //     this.info.isNumberShow = true
    //     this.getAssets('1', e[e.length - 1])
    //     this.info.selectedNode = this.getSelectNode(
    //       JSON.parse(JSON.stringify(e)),
    //       JSON.parse(JSON.stringify(this.info.filterModels))
    //     )
    //   } else {
    //     this.info.isNumberShow = false
    //   }
    // },
    numChange(e) {
      // this.info.isModelShow = false
      if (!e) {
        this.form.AssetType = "";
        this.info.isInfoShow = false;
        this.form.IssueContent = "";
        this.form.IsHaveIssue = false;
        this.info.IsIssueShow = false;
        this.getParts();
      } else {
        this.info.isInfoShow = true;
        BorrowAndReturnService.getBorrowedPart({
          Id: e
        }).then(res => {
          this.form.AssetType = res.PartType + "";
          this.info.partDetailData = res.Details;
          this.info.partBasicData = {
            LabNameDesc: res.LabNameDesc,
            UsedTypeDesc: res.UsedType
              ? usedTypes.find(_ => _.value == res.UsedType).label
              : "",
            ComponentName: res.ComponentName
          };
          this.info.borrowData = {
            BorrowerAccountNo: res.BorrowerAccountNo,
            BorrowDate: res.BorrowDate,
            BorrowReason: borrowReasons.find(
              _ => _.value === res.BorrowReason + ""
            ).label,
            PlanReturnDate: res.PlanReturnDate
          };
          this.form.IssueContent = res.IssueContent;
          if (res.IssueContent) {
            this.form.IsHaveIssue = true;
            this.info.ExistsIssue = true;
            this.info.IsIssueShow = true;
            this.rules.IssueContent = [
              {
                required: true,
                message: "请填写问题描述",
                trigger: ["blur", "change"]
              }
            ];
          } else {
            this.form.IsHaveIssue = false;
            this.info.ExistsIssue = false;
            this.info.IsIssueShow = false;
            delete this.rules.IssueContent;
          }
        });
      }
    },
    expandTb(isExpand) {
      if (isExpand) {
        this.info.expandRowKeys = this.info.partDetailData.map(_ => _.ModelNo);
      } else {
        this.info.expandRowKeys = [];
      }
    },
    handleSubmit() {
      const that = this;
      this.info.isButtonDisabled = true;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          trimForm(this.form);
          if (this.form.Id) {
            BorrowAndReturnService.updReturnIssue(this.form)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "归还记录更新成功",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push({ name: "return_search" });
                  }
                });
              })
              .catch(err => {
                this.info.isButtonDisabled = false;
              });
          } else {
            BorrowAndReturnService.addReturnIssue(this.form)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "归还操作成功",
                  duration: 1000,
                  onClose: function() {
                    // that.$router.push({ name: "return_search" });
                    that.reload({
                      data: that.$route.params,
                      name: "return_regist"
                    });
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
    handleCancel() {
      this.reload({
        name: "return_regist"
      });
    },
    getSelectNode(e, src) {
      const selectedValue = e[0];
      const selectedNode = src.find(_ => _.value === selectedValue);
      src = selectedNode.children;
      if (src && src.length) {
        e.splice(0, 1);
        return this.getSelectNode(e, src);
      } else {
        return selectedNode;
      }
    },
    reload(inParams) {
      this.$router.replace({
        name: "empty",
        params: inParams
      });
    },
    handCancel() {
      this.$router.push({
        name: "return_search",
        params: this.$route.params.form
      });
    }
  }
};
</script>
<style scoped>
.el-input,
.el-select,
.el-cascader {
  width: 240px;
}
.el-textarea {
  width: 95%;
}
.el-tag {
  margin-right: 10px;
}
</style>
