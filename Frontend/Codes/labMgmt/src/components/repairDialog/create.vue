<template>
  <el-dialog title="返修登记" :visible="dialogVisible" :show-close="false" width="900px">
    <el-form ref="myModel" :model="form" :rules="rules" size="small" label-width="150px">
      <el-row>
        <el-col v-if="!info.isAdd" :span="12">
          <el-form-item label="返修编号" prop="ReportNo">
            <el-input v-model="form.ReportNo" autocomplete="off" :disabled="isRead" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报修人" prop="ReportBy">
            <el-input v-if="repairIssue==null" v-model="accountNo" :readonly="true">
              <template slot="append">{{accountName}}</template>
            </el-input>
            <el-input v-else v-model="info.accountNo" :readonly="true">
              <template slot="append">{{info.accountName}}</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="部件类型" prop="AssetType">
            <el-radio-group v-model="form.AssetType" :disabled="isRead" @change="filterChange">
              <el-radio
                v-for="item in info.filterAssetTypes"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部件编号" prop="AssetId">
            <el-select
              v-model="form.AssetId"
              placeholder="请选择"
              filterable
              clearable
              default-first-option
              :disabled="isRead"
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
      <el-row v-show="info.isInfoShow">
        <el-col :span="20" :offset="2">
          <el-collapse style="margin-bottom:15px" v-model="info.activeNames">
            <el-collapse-item name="1">
              <template slot="title">
                <el-link type="primary">部件信息</el-link>
                <el-tooltip effect="dark" content="点击打开" placement="top">
                  <i class="header-icon el-icon-info" style="margin-left:6px; margin-right: 6px"></i>
                </el-tooltip>
              </template>
              <el-form :model="info.partBasicData" size="small" inline class="demo-table-expand">
                <el-form-item label="所属实验室：">
                  <span>{{ info.partBasicData.LabNameDesc }}</span>
                </el-form-item>
              </el-form>
              <el-button
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
              </el-button>
              <el-table
                :data="info.partDetailData"
                border
                stripe
                :show-header="true"
                row-key="ModelNo"
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
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item v-show="info.isModelShow"
                        label="部件型号：">
            {{info.ModelDesc}}
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item label="是否影响使用">
            <el-switch v-model="form.IsEffectUse" :disabled="isRead"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="问题描述" prop="IssueContent">
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="500"
              :disabled="isRead"
              v-model="form.IssueContent"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="12">
          <el-form-item label="问题提出人-员工号"
                        prop="SubmittedBy">
            <el-input v-model="form.SubmittedBy"
                      autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->

      <!-- <el-row v-if="!info.isAdd">
        <el-col :span="12">
          <el-form-item label="是否已确认">
            <el-switch v-model="form.IsConfirmed" :disabled="isRead"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认日期" prop="ConfirmDate">
            <el-date-picker
              v-model="form.ConfirmDate"
              type="datetime"
              placeholder="选择日期时间"
              :disabled="isRead"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row v-if="!info.isAdd">
        <el-col :span="12">
          <el-form-item label="责任人" prop="ResponsiblePerson">
            <el-input v-model="form.ResponsiblePerson" autocomplete="off" :disabled="isRead"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维修状态" prop="RepairStatus">
            <el-select v-model="form.RepairStatus" placeholder="请选择" :disabled="isRead">
              <el-option
                v-for="item in info.filterRepairStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="this.form.CompleteDate">
        <el-col>
          <el-form-item label="维修完成日期">
            <el-date-picker
              v-model="form.CompleteDate"
              type="datetime"
              placeholder="选择日期时间"
              :disabled="isRead"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="this.info.DiscardDesc && this.form.RepairStatus==3">
        <el-col :span="24">
          <el-form-item label="报废说明">
            <el-input
              type="textarea"
              :rows="4"
              :maxlength="500"
              :disabled="isRead"
              v-model="info.DiscardDesc"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleSelf = false">{{info.buttonText}}</el-button>
      <el-button v-if="info.isAdd" type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import AssetService from "../../apis/AssetService";
import { assetType, repairStatus } from "../../config/const";
import { setTimeout } from "timers";
import { trimForm, dateFormat, scanCode } from "../../utils/helper";

export default {
  name: "repairDialogCreate",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    repairIssue: {
      type: Object,
      default: null
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      info: {
        title: "编辑",
        buttonText: "取 消",
        activeNames: ["1"],
        filterAssetTypes: assetType,
        filterAssets: [],
        filterAssetIds: [],
        filterRepairStatus: repairStatus,
        // ModelDesc: '',
        // isModelShow: false,
        isInfoShow: false,
        partBasicData: {},
        partDetailData: [],
        expandRowKeys: [],
        isAdd: true,
        DiscardDesc: "",
        accountName: "",
        accountNo: ""
      },
      form: {
        Id: 0,
        ReportNo: "",
        ReportBy: "",
        AssetType: null,
        AssetId: null,
        IssueContent: "",
        SubmittedBy: "",
        IsEffectUse: false,
        IsConfirmed: false,
        ConfirmDate: null,
        ResponsiblePerson: "",
        RepairStatus: 0,
        CompleteDate: null
      },
      rules: {
        // ReportNo: [
        //   { required: true, message: '请输入返修编号', trigger: ['blur', 'change'] }
        // ],
        // ReportBy: [
        //   { required: true, message: '请输入报修人工号', trigger: ['blur', 'change'] }
        // ],
        AssetType: [
          {
            required: true,
            message: "请选择设备类型",
            trigger: ["blur", "change"]
          }
        ],
        AssetId: [
          {
            required: true,
            message: "请选择设备编号",
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
  computed: {
    ...mapState({
      accountNo(state) {
        // console.log('home state', state.user.user)
        return state.user.user.AccountNo;
      },
      accountName(state) {
        return state.user.user.AccountName;
      }
    }),
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
        const base = this;
        this.form.Id = 0;
        this.form.ReportNo = "";
        this.form.ReportBy = "";
        this.form.AssetType = null;
        this.form.AssetId = null;
        this.form.IssueContent = "";
        this.form.SubmittedBy = "";
        this.form.IsEffectUse = false;
        this.form.IsConfirmed = false;
        this.form.ConfirmDate = null;
        this.form.ResponsiblePerson = "";
        this.form.RepairStatus = 0;
        this.form.CompleteDate = null;
        if (this.repairIssue) {
          Object.assign(this.form, this.repairIssue);
        }
        if (this.form.Id) {
          this.info.accountName = this.repairIssue.ReportBy.substring(
            0,
            this.repairIssue.ReportBy.indexOf("(")
          );
          this.info.accountNo = this.repairIssue.ReportBy.substring(
            this.repairIssue.ReportBy.indexOf("(") + 1,
            this.repairIssue.ReportBy.indexOf(")")
          );
          this.info.title = "查看";
          this.info.isAdd = false;
          this.info.buttonText = "关 闭";
          this.form.AssetType += "";
          if (this.form.AssetType == 2) {
            this.form.AssetId = 0 - this.form.AssetId;
          }
          this.getParts(this.form.AssetType, this.form.AssetId);
          this.getLinkedPart(this.form.AssetId);
          this.info.isInfoShow = true;
          this.form.ConfirmDate = this.form.ConfirmDateDesc;
          this.form.RepairStatus = this.form.RepairStatus + "";
          this.form.CompleteDate = this.form.CompleteDateDesc;
        } else {
          this.info.title = "编辑";
          this.info.isAdd = true;
          this.info.buttonText = "取 消";
          this.info.isInfoShow = false;
          this.form.CompleteDate = null;
          this.info.DiscardDesc = "";
          this.getParts();
        }
        setTimeout(() => {
          base.$refs["myModel"] && base.$refs["myModel"].clearValidate();
        }, 0);
      }
    }
  },
  mounted() {
    // 监听浏览器输入事件
    scanCode(this, "repair");
  },
  methods: {
    getAssets(id) {
      AssetService.getAssets({
        IsAddRepair: true,
        ExceptAssetId: id
      }).then(res => {
        this.info.filterAssets = res.Data;
        if (res.Data && res.Data.length) {
          this.info.filterAssetIds.push({
            label: "单个部件",
            options: res.Data.map(_ => {
              return {
                value: _.Id,
                label: _.InternalNo
              };
            })
          });
        }
      });
    },
    getComponents(id) {
      AssetService.getComponents({
        IsAddRepair: true,
        ExceptCompId: id ? Math.abs(id) : 0
      }).then(res => {
        if (res.Data && res.Data.length) {
          this.info.filterAssetIds.push({
            label: "组合平台",
            options: res.Data.map(_ => {
              return {
                value: 0 - _.Id,
                label: _.ComponentNo
              };
            })
          });
        }
      });
    },
    getParts(type, id) {
      this.info.filterAssetIds = [];
      if (type == "1") {
        this.getAssets(id);
      } else if (type == "2") {
        this.getComponents(id);
      } else {
        this.getAssets();
        this.getComponents();
      }
    },
    getLinkedPart(id) {
      AssetService.getLinkedPart({
        type: this.form.AssetType,
        id: Math.abs(id)
      }).then(res => {
        this.info.partDetailData = res.Details;
        this.info.partBasicData = {
          LabNameDesc:
            res.LaboratoryName + "/" + res.SiteName + "/" + res.ShelfName
        };
        this.info.DiscardDesc = res.DiscardDesc;
      });
    },
    filterChange(e) {
      // 为什么出现 e != this.form.AssetType 的情况
      // console.log(e + "=" + this.form.AssetType);
      this.form.AssetId = null;
      this.info.isInfoShow = false;
      this.getParts(this.form.AssetType);
    },
    numChange(e) {
      const that = this;
      // this.info.isModelShow = false
      if (e) {
        if (e > 0) {
          this.form.AssetType = "1";
        } else {
          this.form.AssetType = "2";
        }
        // setTimeout(function() {
        //   that.$refs["myModel"].validateField(
        //     ["AssetType", "AssetId"],
        //     valid => {
        //       // console.log(valid);
        //     }
        //   );
        // }, 0);
        this.getLinkedPart(e);
        this.info.isInfoShow = true;
        // } else if (e > 0) {
        //   const asset = this.info.filterAssets.find(_ => _.Id === e)
        //   this.info.ModelDesc = asset.StrCategoryIdLevel1 + ' / ' + asset.StrCategoryIdLevel2 + ' / ' +
        //     asset.strCategoryModel + ' / ' + asset.ModelNo
        // this.info.isModelShow = true
      } else {
        this.form.AssetType = "";
        this.info.isInfoShow = false;
        this.getParts();
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
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          const inParams = JSON.parse(JSON.stringify(this.form));
          inParams.ReportBy = this.accountName + "(" + this.accountNo + ")";
          inParams.AssetId = Math.abs(inParams.AssetId);
          trimForm(inParams);
          if (this.repairIssue) {
            AssetService.updRepairIssue(inParams).then(() => {
              this.visibleSelf = false;
              this.$message({
                type: "success",
                message: "返修记录更新成功",
                duration: 1000,
                onClose: function() {
                  that.$emit("refresh");
                }
              });
            });
          } else {
            inParams.RepairStatus = 0; // 待维修
            inParams.IsConfirmed = true;
            inParams.ConfirmDate = dateFormat(
              new Date(),
              "yyyy-MM-dd hh:mm:ss"
            );
            AssetService.addRepairIssue(inParams).then(() => {
              this.visibleSelf = false;
              this.$message({
                type: "success",
                message: "返修操作成功",
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
  }
};
</script>
<style scoped>
.el-input,
.el-select,
.el-cascader {
  width: 240px;
}
</style>
