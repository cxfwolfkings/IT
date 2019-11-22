<template>
  <el-dialog :visible="dialogVisible" title="预约借用申请单" width="60%">
    <el-form ref="myModel" :model="form" :rules="rules" label-width="150px">
      <el-row>
        <el-col :span="12">
          
          <el-form-item label="申请人工号" prop="ApplicantNo">
            <el-input :readonly="true" v-model="form.ApplicantNo" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="预约借用日期" prop="PlanBorrowDate">
            <el-date-picker
              v-model="form.PlanBorrowDate"
              :picker-options="pickerOptions0"
              type="datetime"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="借用类型" prop="BorrowSettingType">
            <el-radio @change="radioChange" border v-model="form.BorrowSettingType" :label="BSType.场内" >场内</el-radio>
            <el-radio border @change="radioChange" v-model="form.BorrowSettingType" :label="BSType.场外" >场外</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借用天数" prop="BorrowDays" v-show="form.BorrowSettingType!=null">
          <el-input-number
            v-model="form.BorrowDays"
            controls-position="right"
            :min="1"
            :max="MaxDays"
          ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="借用部件类别" prop="AssetType">
            <el-select v-model="form.AssetType" placeholder="请选择" @change="assetTypeChange">
              <el-option
                v-for="item in info.filterAssetTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item v-show="info.isModelShow" label="部件型号" prop="AssetModelId">
            <el-cascader
              v-model="form.AssetModelId"
              :options="info.filterModels"
              :show-all-levels="false"
              expand-trigger="hover"
              clearable
              @change="modelChange"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <!-- <el-form-item v-show="info.isNumberShow" label="部件编号" prop="AssetId"> -->
          <el-form-item label="部件编号" prop="AssetId">
            <el-select v-model="form.AssetId" @change="selectChange" placeholder="请选择" filterable>
              <el-option
                v-for="item in info.filterAssetIds"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所在实验室" prop="lab">
            <el-input v-model="form.lab" :readonly="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="是否代借">
            <el-switch v-model="form.IsProxy" @change="switchChange"></el-switch>
          </el-form-item>
        </el-col>
        <el-col>
          <!-- <el-form-item v-show="info.isProxyShow" label="代理人工号" prop="ProxyUserNo">
            <el-input v-model="form.ProxyUserNo" autocomplete="off"></el-input>
          </el-form-item>-->
          <el-form-item v-show="info.isProxyShow" label="代理人工号" prop="ProxyUserNo">
            <el-select
              size="small"
              v-model="form.ProxyUserNo"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入工号或姓名"
              :remote-method="remoteMethod"
              :loading="loading"
            >
              <el-option
                v-for="item in info.userOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item style="float: right; margin-right: 45px">
            <el-button type="info" @click="handleCancel" :disabled="info.isButtonDisabled">取消</el-button>
            <el-button type="primary" @click="handleSubmit" :disabled="info.isButtonDisabled">提交</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import AssetService from "../../apis/AssetService";
import ucenterService from "../../apis/UserCenterService";
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import AuthorityService from "../../apis/AuthorityService";
import sysSettingService from "../../apis/SysSettingsService";
import {
  assetType,
  repairStatus,
  orderAuditStatus,
  assetStatus,
  BorrowSettingType
} from "../../config/const";
import { mapState } from "vuex";
const depts = window.config.depts;

export default {
  name: "order",
  data() {
    return {
      InMaxDays:null,
      OutMaxDays:null,
      MaxDays:0,
      BSType:BorrowSettingType,
      dialogVisible: false,
      loading:false,
      pickerOptions0: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let two = 14 * 24 * 3600 * 1000;
          let twoWeeks = curDate + two;
          // 在科学计数法中，为了使公式简便，可以用带“E”的格式表示。例如1.03乘10的8次方，可简写为“1.03e8”的形式
          // 一天是24*60*60*1000 = 86400000 = 8.64e7
          return (
            time.getTime() < Date.now() - 8.64e7 || time.getTime() > twoWeeks
          );
        }
      },
      info: {
        isProxyShow: false,
        filterAssetTypes: assetType,
        filterAssetIds: [],
        filterModels: [],
        //filterRepairStatus: repairStatus,
        //filterBorrowReasons: borrowReasons,
        isButtonDisabled: false,
        isNumberShow: false,
        isModelShow: false,
        selectedNode: null,
        userOptions: [],
        filterUsers: []
      },

      form: {
        Id: 0,
        ProxyUserNo: "",
        ApplicantNo: "",
        PlanBorrowDate: null,
        AssetType: null,
        AssetModelId: null,
        AssetModelNo: "",
        AssetId: null,
        IsProxy: false,
        AuditStatus: 0,

        BorrowSettingType:null,
        BorrowDays:"",
        PlanReturnDate:null,
        lab:null
      },
      rules: {
        // ApplicantNo: [
        //   {
        //     required: true,
        //     message: "请输入申请人工号",
        //     trigger: ["blur", "change"]
        //   }
        // ],
        BorrowDays: [
          {
            required: true,
            message: "请输入天数",
            trigger: ["blur", "change"]
          }
        ],
        BorrowSettingType: [
          {
            required: true,
            message: "请选择类型",
            trigger: ["blur", "change"]
          }
        ],
        PlanBorrowDate: [
          {
            required: true,
            message: "请输入预约借用日期",
            trigger: ["blur", "change"]
          }
        ],
        AssetType: [
          {
            required: true,
            message: "请选择借用部件类别",
            trigger: ["blur", "change"]
          }
        ],
        AssetId: [
          {
            required: true,
            message: "请选择部件编号",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    'form.BorrowSettingType':function(value){
      console.log(value,"value")
      
      if(value==BorrowSettingType.场外){
        this.MaxDays = this.OutMaxDays
        this.form.BorrowDays = 0
      }else if(value==BorrowSettingType.场内){
        this.MaxDays = this.InMaxDays
        this.form.BorrowDays = 0
      }
    }
  },
  created() {
    this.$on("open", function() {
      this.dialogVisible = true;
      if(this.$refs["myModel"]!==undefined)
      {this.$refs["myModel"].resetFields();}
    });
    if (this.$route.params.id) {
      this.form.Id = this.$route.params.id;
    } else {
      this.form.Id = 0;
    }
  },
  computed: {
    ...mapState({
      auser(state) {
        // console.log("home state", state.user.user)
        return state.user.user;
      }
    })
  },
  mounted() {
    if (this.form.Id) {
      BorrowAndReturnService.getBorrowedRecords({
        Id: this.form.Id
      }).then(res => {
        const record = res.Data[0];
        Object.assign(this.form, record);
        this.form.AssetType += "";
        this.form.PlanBorrowDate = record.PlanBorrowDateDesc;
        if (this.form.AssetType == 1) {
          this.info.isModelShow = true;
          AssetService.getModelCascade().then(res => {
            this.info.filterModels = res.map(_ => {
              _.label = depts.find(d => d.value === _.value).label;
              return _;
            });
            const e = record.CascadeModel;
            this.form.AssetModelId = e;
            this.info.isNumberShow = true;
            this.getAssets("1", e[e.length - 1]);
            this.info.selectedNode = this.getSelectNode(
              JSON.parse(JSON.stringify(e)),
              JSON.parse(JSON.stringify(this.info.filterModels))
            );
          });
        }
      });
    }
    this.form.ApplicantNo = this.auser.AccountNo;
    sysSettingService.getBorrowSetting().then(res => {
      this.OutMaxDays = res.BorrowCycle;
    });
    sysSettingService.getBorrowSettingIn().then(res => {
      this.InMaxDays = res.BorrowCycle;
    });
    AuthorityService.getUsers({
      IsEngineerOnly: true
    }).then(res => {
      this.info.filterUsers = res.Data.map(_ => {
        return {
          value: _.AccountNo,
          label: "[" + _.AccountNo + "]" + _.AccountName
        };
      });
    });
  },
  methods: {
    switchChange(e) {
      if (e) {
        this.info.isProxyShow = true;
      } else {
        this.info.isProxyShow = false;
      }
    },
    getAssetModels() {
      AssetService.getModelCascade().then(res => {
        this.info.filterModels = res.map(_ => {
          _.label = depts.find(d => d.value === _.value).label;
          return _;
        });
      });
    },
    getAssets(assetTypeId, assetModelId) {
      if (assetTypeId == "1") {
        const inParams = {
          IsAddStatus: true,
          Status: 1,
          IsAddFavorited: true,
          IsFavorited: false
        };
        if (assetModelId) {
          inParams.ModelId = assetModelId;
        }
        AssetService.getAssets(inParams).then(res => {
          this.info.filterAssetIds = res.Data.map(_ => {
            return {
              value: _.Id,
              label: _.InternalNo,
              labName:_.LabName
            };
          });
        });
      } else if (assetTypeId == "2") {
        AssetService.getComponents().then(res => {
          this.info.filterAssetIds = res.Data.map(_ => {
            return {
              value: _.Id,
              label: _.ComponentNo,
              labName:_.LabName
            };
          });
        });
      } else {
        this.info.filterAssetIds = [];
      }
    },
    radioChange(e){
      
      if(e==BorrowSettingType.场内){

      }else if(e==BorrowSettingType.场外){

      }
    },
    selectChange(e){
      let options = this.info.filterAssetIds
      this.form.lab = options.find(_=>_.value==e).labName
      console.log(e,"select")
      console.log(options,"opt")
    },
    assetTypeChange(e) {
      if (e) {
        this.form.AssetModelId = null;
        this.form.AssetId = null;
        this.info.filterAssetIds = [];
        if (e == "1") {
          // 单个部件
          this.info.isModelShow = true;
          this.getAssetModels();
        }
        if (e == "2") {
          // 组合部件
          this.info.isNumberShow = true;
          this.info.isModelShow = false;
          this.getAssets(e);
        }
      } else {
        this.info.isModelShow = false;
        this.info.isNumberShow = false;
      }
    },
    modelChange(e) {
      this.form.AssetId = null;
      debugger
      if (e&&e.length) {
        this.info.isNumberShow = true;
        this.getAssets("1", e[e.length - 1]);
        this.info.selectedNode = this.getSelectNode(
          JSON.parse(JSON.stringify(e)),
          JSON.parse(JSON.stringify(this.info.filterModels))
        );
      } else {
        this.info.isNumberShow = false;
      }
    },
    handleSubmit() {
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          if (this.info.selectedNode != null) {
            this.form.AssetModelNo = this.info.selectedNode.label;
          }
          this.form.AuditStatus = orderAuditStatus.待审核;
          let params = [];
          Object.assign(params, this.form);
          ucenterService.addOrder(this.form).then(res => {
            this.$message({
              type: "success",
              message: "操作成功！",
              onClose: m => {
                //this.$router.push({ name: "borrow_search" });
              }
            });
            this.dialogVisible = false;
            this.$emit("refresh");
          });
        }
      });
    },
    handleCancel() {
      this.dialogVisible = false;
      //this.$router.push({ name: "borrow_search" });
    },
    getSelectNode(e, src) {
      const selectedValue = e[0];
      const selectedNode = src.find(_ => _.value == selectedValue);
      src = selectedNode.children;
      if (src && src.length) {
        e.splice(0, 1);
        return this.getSelectNode(e, src);
      } else {
        return selectedNode;
      }
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.info.userOptions = this.info.filterUsers.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.info.userOptions = [];
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 24px;
}
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