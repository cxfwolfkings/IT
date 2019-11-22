<template>
  <el-dialog :title="info.title" :visible="dialogVisible" :show-close="false" width="900px">
    <el-form
      ref="myModel"
      :model="form"
      :rules="rules"
      :disabled="isRead"
      size="small"
      label-width="150px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="返修编号" prop="ReportNo" v-show="form.editMode==1">
            <el-input v-model="form.ReportNo" autocomplete="off" :maxlength="50"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报修人" prop="ReportBy" v-show="form.editMode==1">
            <el-input v-model="form.ReportBy" :readonly="true">
              <!-- <template slot="append">{{form.accountName}}</template> -->
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="部件类型" prop="AssetType">
            <el-radio-group v-model="form.AssetType" @change="filterChange">
              <el-radio
                :disabled="true"
                v-for="item in info.filterAssetTypes"
                :key="item.value"
                :label="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="部件编号" prop="AssetId">
            <el-input v-model="form.AssetNo"></el-input>
            <!-- <el-select v-model="form.AssetId"
                       placeholder="请选择"
                       filterable
                       clearable
                       @change="numChange"> 
              <el-option-group v-for="group in info.filterAssetIds"
                               :key="group.label"
                               :label="group.label">
                <el-option v-for="item in group.options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-option-group>
            </el-select>-->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-show="info.isInfoShow">
        <el-col :span="20" :offset="2">
          <el-collapse style="margin-bottom:15px">
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
                    <el-tag
                      v-for="tag in props.row.tags"
                      :key="tag.label"
                      :disable-transitions="false"
                    >{{tag.label}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="CategoryNameLevel1" label="资产大类"></el-table-column>
                <el-table-column prop="CategoryNameLevel2" label="小分类"></el-table-column>
                <el-table-column prop="CategoryNameModel" label="型号类别"></el-table-column>
                <el-table-column prop="ModelNo" label="型号"></el-table-column>
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
            <el-switch v-model="form.IsEffectUse"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="问题描述" prop="IssueContent">
            <el-input type="textarea" :rows="4" :maxlength="500" v-model="form.IssueContent"></el-input>
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

      <el-row v-if="!info.isAdd">
        <el-col :span="12">
          <el-form-item label="是否已确认">
            <el-switch v-model="form.IsConfirmed"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建日期" prop="ConfirmDate">
            <el-date-picker v-model="form.ConfirmDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!info.isAdd">
        <el-col :span="12">
          <el-form-item label="责任人" prop="ResponsiblePerson">
            <el-input v-model="form.ResponsiblePerson" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="维修状态" prop="RepairStatus">
            <el-select v-model="form.RepairStatus" placeholder="请选择">
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
      <!-- <el-row>
        <el-col>
          <el-form-item label="维修完成日期" prop="CompleteDate">
            <el-date-picker v-model="form.CompleteDate" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>-->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleSelf = false">取 消</el-button>
      <el-button type="primary" v-show="form.editMode==0" :disabled="info.isButtonDisabled" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import AssetService from "../../apis/AssetService";
import ucService from "../../apis/UserCenterService";
import { assetType, repairStatus } from "../../config/const";
import { setTimeout } from "timers";
import { trimForm, dateFormat } from "../../utils/helper";

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
    },
    assetid: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      info: {
        isButtonDisabled:false,
        title: "编辑",
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
        isAdd: true
      },
      form: {
        editMode: 0,
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
        //   {
        //     required: true,
        //     message: "请输入返修编号",
        //     trigger: ["blur", "change"]
        //   }
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
        this.form = {};
        Object.assign(this.form, this.repairIssue);
        //this.form.Id = this.form.Id || 0;
        debugger;
        if (this.form.editMode == 0) {
          this.form.Id = 0
          
          this.info.title = "报修";
          this.info.isAdd = true;
          this.info.isInfoShow = true;
          this.getParts();
          this.getLinkedPart(this.form.AssetId);
        } else {
          this.info.title = "查看";
          this.info.isAdd = false;
          this.form.AssetType += "";
          this.getParts(this.form.AssetType, this.form.AssetId);
          this.getLinkedPart(this.form.AssetId);
          this.info.isInfoShow = true;
          this.form.ConfirmDate = this.form.ConfirmDateDesc;
          this.form.RepairStatus = this.form.RepairStatus + "";
          this.form.CompleteDate = this.form.CompleteDateDesc;
          this.form.AccountName = this.repairIssue.ReportBy
        }
        // if (this.form.Id) {
        //   this.info.title = '查看'
        //   this.info.isAdd = false
        //   this.form.AssetType += ''
        //   this.getParts(this.form.AssetType, this.form.AssetId)
        //   this.getLinkedPart(this.form.AssetId)
        //   this.info.isInfoShow = true
        //   this.form.ConfirmDate = this.form.ConfirmDateDesc
        //   this.form.RepairStatus = this.form.RepairStatus + ''
        //   this.form.CompleteDate = this.form.CompleteDateDesc
        // } else {
        //   this.info.title = '编辑'
        //   this.info.isAdd = true
        //   this.info.isInfoShow = false
        //   this.getParts()
        // }
        setTimeout(() => {
          base.$refs["myModel"] && base.$refs["myModel"].clearValidate();
        }, 0);
      }
    }
  },
  mounted() {
    
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
            label: "单个设备",
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
      if (type === "1") {
        this.getAssets(id);
      } else if (type === "2") {
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
      });
    },
    filterChange(e) {
      this.form.AssetId = null;
      this.info.isInfoShow = false;
      this.getParts(e);
    },
    numChange(e) {
      // this.info.isModelShow = false
      if (e) {
        if (e > 0) {
          this.form.AssetType = "1";
        } else {
          this.form.AssetType = "2";
        }
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
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          this.form.ReportBy = this.accountName + "(" + this.accountNo + ")";
          this.form.AssetId = Math.abs(this.form.AssetId);
          trimForm(this.form);
          if (this.form.editMode == 0) {
            this.form.RepairStatus = 0; // 待维修
            this.form.IsConfirmed = true;
            this.form.ConfirmDate = dateFormat(
              new Date(),
              "yyyy-MM-dd hh:mm:ss"
            );
            this.info.isButtonDisabled = true
            ucService.addRepairIssue(this.form).then(() => {
              this.info.isButtonDisabled = false
              this.visibleSelf = false;
              
              this.$emit("refresh");
              this.$message({
                type: "success",
                message: "操作成功！"
              });
            }).catch(res=>{
              this.info.isButtonDisabled = false
            });
          } else {
            AssetService.updRepairIssue(this.form).then(() => {
              this.info.isButtonDisabled = false
              this.visibleSelf = false;
              this.$emit("refresh");
              this.$message({
                type: "success",
                message: "操作成功！"
              });
            }).catch(res=>{
              this.info.isButtonDisabled = false
            });
          }
        }
      });
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
