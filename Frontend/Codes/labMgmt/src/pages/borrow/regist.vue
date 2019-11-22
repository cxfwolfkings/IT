<template>
  <div id="formContainer" class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>借用与归还</el-breadcrumb-item>
      <el-breadcrumb-item>借出登记</el-breadcrumb-item>
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
          <el-form-item label="借用人" prop="BorrowerAccountNo">
            <el-select
              v-model="form.BorrowerAccountNo"
              placeholder="请选择"
              filterable
              @change="brUserChange"
            >
              <el-option
                v-for="item in info.filterUsers"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="借用目的" prop="BorrowReason">
            <el-select v-model="form.BorrowReason" placeholder="请选择" filterable>
              <el-option
                v-for="item in info.filterBorrowReasons"
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
          <el-form-item label="部件编号" prop="AssetId">
            <el-select
              v-model="form.AssetId"
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
      <el-row v-show="info.isNeedAddress">
        <!-- <el-col :span="12">
          <el-form-item label="借用日期" prop="BorrowDate">
            <el-date-picker v-model="form.BorrowDate" type="datetime" readonly placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
        </el-col>-->
        <el-col :span="12">
          <el-form-item label="是否需要试验报告">
            <el-switch v-model="form.IsNeedLabReport"></el-switch>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item v-show="info.isModelShow"
                        label="部件型号："
                        prop="AssetModelId">
            {{info.ModelDesc}}
            {{info.ModelNo}}
            <el-tooltip class="item"
                        effect="dark"
                        :content="info.ModelDesc"
                        placement="right">
              <el-link :underline="false"><i class="el-icon-info el-icon--right"></i></el-link>
            </el-tooltip>
            <el-cascader v-model="form.AssetModelId"
                         :options="info.filterModels"
                         :show-all-levels="false"
                         clearable
                         @change="modelChange"></el-cascader>
          </el-form-item>
        </el-col>-->
      </el-row>
      <el-row>
        <el-col :span="12" v-show="info.isNeedAddress">
          <el-form-item label="借用地点" prop="BorrowPlaceId">
            <!-- <el-radio v-model="form.BorrowType" label="0" @change="btChange">场内</el-radio>
            <el-radio v-model="form.BorrowType" label="1" @change="btChange">场外</el-radio>-->
            <el-select v-model="form.BorrowPlaceId" placeholder="请选择" filterable @change="btChange">
              <el-option
                v-for="item in info.filterBorrowPlaces"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-show="info.isPlanReturn">
          <el-form-item label="计划归还日期" prop="PlanReturnDate">
            <el-date-picker
              v-if="info.isRead"
              v-model="form.PlanReturnDate"
              type="datetime"
              placeholder="选择日期时间"
              class="datePicker"
            ></el-date-picker>
            <el-date-picker
              v-if="!info.isRead && info.pickerShow"
              v-model="form.PlanReturnDate"
              type="datetime"
              :editable="false"
              :picker-options="info.planReturnDateOptions"
              placeholder="选择日期时间"
              @change="dateChange"
            ></el-date-picker>
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
              <el-form
                :model="info.partBasicData"
                label-position="left"
                size="small"
                inline
                class="demo-table-expand"
              >
                <el-form-item v-if="form.AssetType==2" label="平台名称：" style="margin-bottom:9px">
                  <span>{{ info.partBasicData.ComponentName }}</span>
                </el-form-item>
                <el-form-item v-else label="部件类型：" style="margin-bottom:9px">
                  <span>{{ info.partBasicData.UsedTypeDesc }}</span>
                </el-form-item>
                <el-form-item label="所属实验室：" style="margin-bottom:9px">
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
import AuthorityService from "../../apis/AuthorityService";
import AssetService from "../../apis/AssetService";
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import SysSettingsService from "../../apis/SysSettingsService";
import {
  assetType,
  repairStatus,
  borrowReasons,
  usedTypes
} from "../../config/const";
import { trimForm, dateFormat, scanCode } from "../../utils/helper";

// const depts = window.config.depts
let nowDesc = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
let beginDateDesc = dateFormat(new Date(), "yyyy-MM-dd") + " 00:00:00";
// let endDateDesc = dateFormat(new Date(), "yyyy-MM-dd") + " 23:59:59";

export default {
  name: "borrowRegist",
  data() {
    return {
      info: {
        activeNames: ["1"],
        filterAssetTypes: assetType,
        filterUsers: [],
        filterAssets: [],
        filterAssetIds: [],
        // filterModels: [],
        filterRepairStatus: repairStatus,
        filterBorrowReasons: borrowReasons,
        isButtonDisabled: false,
        // isNumberShow: false,
        // isModelShow: false,
        isInfoShow: false,
        selectedNode: null,
        ModelNo: "",
        ModelDesc: "",
        // planReturnDateOptionsIn: {},
        planReturnDateOptions: {},
        filterBorrowPlaces: [],
        partBasicData: {},
        partDetailData: [],
        expandRowKeys: [],
        // isInCourt: true,
        isPlanReturn: true,
        isNeedAddress: true,
        PartDeptId: null,
        pickerShow: true,
        isRead: false,
        isSelectDate: true
      },
      form: {
        Id: 0,
        BorrowerAccountNo: "",
        BorrowDate: nowDesc,
        AssetType: null,
        brUserDeptId: null,
        // AssetModelId: null,
        // AssetModelNo: '',
        AssetId: null,
        BorrowReason: null,
        BorrowPlaceId: null,
        IsNeedLabReport: false,
        PlanReturnDate: null
      },
      rules: {
        BorrowerAccountNo: [
          {
            required: true,
            message: "请输入借用人工号",
            trigger: ["blur", "change"]
          }
        ],
        // BorrowDate: [
        //   {
        //     required: true,
        //     message: "请输入借用日期",
        //     trigger: ["blur", "change"]
        //   }
        // ],
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
        ],
        BorrowReason: [
          {
            required: true,
            message: "请选择借用目的",
            trigger: ["blur", "change"]
          }
        ],
        BorrowPlaceId: [
          {
            required: true,
            message: "请选择借用地点",
            trigger: ["blur", "change"]
          }
        ],
        PlanReturnDate: [
          {
            required: true,
            message: "请输入计划归还日期",
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
    // if(this.$route.params.borrowHistory){

    // }
    nowDesc = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
    beginDateDesc = dateFormat(new Date(), "yyyy-MM-dd") + " 00:00:00";
    // endDateDesc = dateFormat(new Date(), "yyyy-MM-dd") + " 23:59:59";
    // this.getAssetModels()

    // 监听浏览器输入事件
    scanCode(this, "borrow");
  },
  mounted() {
    window.expandTb = this.expandTb;
    AuthorityService.getUsers({
      IsEngineerOnly: true,
      FilterByDept: true,
      FilterByWhite: true
    }).then(res => {
      this.info.filterUsers = res.Data.map(_ => {
        return {
          value: _.AccountName + "（" + _.AccountNo + "）",
          label: _.AccountName + "（" + _.AccountNo + "）",
          remark: _.DepartmentNo
        };
      });
    });
    SysSettingsService.getUseplace().then(res => {
      this.info.filterBorrowPlaces = res.Data.map(_ => {
        return {
          value: _.Id,
          label: _.PlaceName
        };
      });
    });
    if (this.form.Id) {
      BorrowAndReturnService.getBorrowedPart({
        Id: this.form.Id
      }).then(res => {
        Object.assign(this.form, res);
        if (window.ActiveXObject || "ActiveXObject" in window) {
          // IE浏览器
          document.querySelector(".datePicker input").value =
            res.PlanReturnDate;
        }
        this.form.AssetType = res.PartType + "";
        this.form.BorrowReason += "";
        if (res.PartId) {
          if (this.form.AssetType === "1") {
            this.form.AssetId = res.PartId;
            // const asset = res.Details[0]
            // this.info.ModelDesc = asset.CategoryNameLevel1 + ' / ' + asset.CategoryNameLevel2 + ' / ' +
            //   asset.CategoryNameModel + ' / ' + asset.ModelNo
            // this.info.isModelShow = true
          } else {
            this.form.AssetId = 0 - res.PartId;
          }
          this.getLinkedPart(this.form.AssetId, res.PlanReturnDate);
          this.info.isInfoShow = true;
        }
        this.getParts(this.form.AssetType, res.DeptId);
        // AssetService.getModelCascade().then(res => {
        //   this.info.filterModels = res.map(_ => {
        //     _.label = depts.find(d => d.value === _.value).label
        //     return _
        //   })
        //   const e = record.CascadeModel
        //   // this.form.AssetModelId = e
        //   // this.info.isNumberShow = true
        //   this.getParts('1', e[e.length - 1])
        //   this.info.selectedNode = this.getSelectNode(
        //     JSON.parse(JSON.stringify(e)),
        //     JSON.parse(JSON.stringify(this.info.filterModels)))
        // })
        // } else if (this.form.AssetType === 2) {
        // }
      });
    } else {
      this.getParts(this.form.AssetType);
    }
    const _this = this;
    // setInterval(function() {
    //   const divContainer = document.getElementById("formContainer");
    //   if (_this.$refs && _this.$refs.myModel && _this.$refs.myModel.$el) {
    //     divContainer.setAttribute(
    //       "style",
    //       "min-height:" + (_this.$refs.myModel.$el.clientHeight + 90) + "px"
    //     );
    //   }
    // }, 400);
  },
  methods: {
    // getAssetModels () {
    //   AssetService.getModelCascade().then(res => {
    //     this.info.filterModels = res.map(_ => {
    //       _.label = depts.find(d => d.value === _.value).label
    //       return _
    //     })
    //   })
    // },
    dateChange() {
      if (!this.form.BorrowPlaceId) {
        this.form.PlanReturnDate = null;
        this.$message({
          message: "请先选择借用地点！",
          type: "warning"
        });
        return;
      }
      if (!this.info.isSelectDate) {
        this.form.PlanReturnDate = null;
        this.$message({
          message: "当前地点借用周期为0！",
          type: "warning"
        });
        return;
      }
      if (this.form.PlanReturnDate) {
        const planReturnDate = dateFormat(
          this.form.PlanReturnDate,
          "yyyy-MM-dd hh:mm:ss"
        );
        const now = dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss");
        if (planReturnDate <= now) {
          this.form.PlanReturnDate = null;
          this.$message({
            message: "计划归还时间应大于借用时间！",
            type: "warning"
          });
        }
      }
    },
    getAssets(deptId) {
      let inParams = {
        IsAddStatus: true,
        Status: 1,
        IsAddFavorited: true,
        IsFavorited: false,
        ExceptAssetId: this.form.AssetId ? this.form.AssetId : 0,
        AccountNo: this.form.BorrowerAccountNo,
        BorrowAccountDeptId: deptId
      };
      if (this.info.isRead) {
        // 查看
        inParams = { Id: this.form.AssetId };
      }
      AssetService.getAssets(inParams).then(res => {
        this.info.filterAssets = res.Data;
        if (res.Data.length) {
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
    brUserChange(e) {
      const deptId = this.info.filterUsers.find(_ => _.value === e).remark;
      this.form.brUserDeptId = deptId;
      if (deptId != this.info.PartDeptId) {
        // 借用人和借用部件的部门不匹配
        this.form.AssetType = null;
        this.form.AssetId = null;
        this.info.PartDeptId = null;
        this.info.isInfoShow = false;
        this.form.BorrowPlaceId = null;
        this.form.PlanReturnDate = null;
        this.getParts(this.form.AssetType, deptId);
      }
    },
    btChange(val, srcDate) {
      // this.info.isInCourt = val !== "1";
      if (!this.form.BorrowerAccountNo) {
        this.form.BorrowPlaceId = null;
        this.$message({
          message: "请先选择借用人！",
          type: "warning"
        });
        return;
      }
      if (!this.form.AssetId) {
        this.form.BorrowPlaceId = null;
        this.$message({
          message: "请先选择借用部件！",
          type: "warning"
        });
        return;
      }
      this.info.pickerShow = false;
      if (srcDate) {
        this.form.PlanReturnDate = srcDate.substring(0, 10) + " 23:59:59";
      }
      BorrowAndReturnService.getPlanReturnDate({
        PlaceId: this.form.BorrowPlaceId,
        AssetId: this.form.AssetId,
        AssetType: this.form.AssetType,
        Account: this.form.BorrowerAccountNo
      }).then(res => {
        this.info.isSelectDate = true;
        if (res == "Forever") {
          // 平台无限期调用
          delete this.rules.PlanReturnDate;
          this.info.isPlanReturn = false;
          this.info.isNeedAddress = true;
        } else {
          this.rules.PlanReturnDate = [
            {
              required: true,
              message: "请输入计划归还日期",
              trigger: ["blur", "change"]
            }
          ];
          this.info.isPlanReturn = true;
          this.info.pickerShow = true; // 通过 "v-if" 来重新加载组件
          this.info.planReturnDateOptions.disabledDate = time => {
            // 计算截止时间
            // const now = new Date(endDateDesc);
            // now.setDate(now.getDate() + res.BorrowCycle);
            if (beginDateDesc.substr(0, 10) == res.substr(0, 10)) {
              this.info.isSelectDate = false;
              return true;
            } else {
              const endTime = new Date(res);
              return (
                time.getTime() < new Date(beginDateDesc).getTime() ||
                time.getTime() > endTime.getTime()
              );
            }
          };
        }
      });
    },
    expandTb(isExpand) {
      if (isExpand) {
        this.info.expandRowKeys = this.info.partDetailData.map(_ => _.ModelNo);
      } else {
        this.info.expandRowKeys = [];
      }
    },
    getComponents(deptId) {
      let inParams = {
        IsAddStatus: true,
        Status: 1,
        BorrowCompId: Math.abs(this.form.AssetId),
        BorrowAccountDeptId: deptId,
        AccountNo: this.form.BorrowerAccountNo
      };
      if (this.info.isRead) {
        // 查看
        inParams = { Id: this.form.AssetId };
      }
      AssetService.getComponents(inParams).then(res => {
        if (res.Data.length) {
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
    getParts(assetTypeId, deptId) {
      this.info.filterAssetIds = [];
      if (assetTypeId === "1") {
        this.getAssets(deptId);
      } else if (assetTypeId === "2") {
        this.getComponents(deptId);
      } else {
        this.getAssets(deptId);
        this.getComponents(deptId);
      }
    },
    getLinkedPart(id, planReturnDate) {
      AssetService.getLinkedPart({
        type: this.form.AssetType,
        id: Math.abs(id)
      }).then(res => {
        this.info.partDetailData = res.Details;
        this.info.partBasicData = {
          LabNameDesc:
            res.LaboratoryName + "/" + res.SiteName + "/" + res.ShelfName,
          UsedTypeDesc: res.UsedType
            ? usedTypes.find(_ => _.value == res.UsedType).label
            : "",
          ComponentName: res.ComponentName
        };
        // 如果是“样品”和“限料领用”，不需要归还
        if (res.UsedType > 1) {
          delete this.rules.PlanReturnDate;
          delete this.rules.BorrowPlaceId;
          this.info.isPlanReturn = false;
          this.info.isNeedAddress = false;
        } else {
          if (planReturnDate && planReturnDate < "1990-01-01") {
            // 无期限
            delete this.rules.PlanReturnDate;
            this.info.isPlanReturn = false;
          } else {
            // this.rules.PlanReturnDate = [
            //   {
            //     required: true,
            //     message: "请输入计划归还日期",
            //     trigger: ["blur", "change"]
            //   }
            // ];
            // this.info.isPlanReturn = true;
          }
          this.rules.BorrowPlaceId = [
            {
              required: true,
              message: "请选择借用地点",
              trigger: ["blur", "change"]
            }
          ];
          this.info.isNeedAddress = true;
          if (this.form.AssetType == 1) {
            // 如果是单个部件，先显示出来
            this.info.isPlanReturn = true;
          }
        }
        this.info.PartDeptId = res.DeptId;
      });
    },
    assetTypeChange(e) {
      if (e) {
        // this.form.AssetModelId = null
        this.form.AssetId = null;
        this.info.isInfoShow = false;
        this.info.filterAssetIds = [];
        // if (e === '1') { // 单个部件
        // this.info.isModelShow = true
        // }
        // if (e === '2') { // 组合部件
        // this.info.isNumberShow = true
        // this.info.isModelShow = false
        // }
        // } else {
        // this.info.isModelShow = false
        // this.info.isNumberShow = false
      }
      this.getParts(e, this.form.brUserDeptId);
    },
    // modelChange (e) {
    //   this.form.AssetId = null
    //   if (e) {
    //     // this.info.isNumberShow = true
    //     this.getParts('1', e[e.length - 1])
    //     this.info.selectedNode = this.getSelectNode(
    //       JSON.parse(JSON.stringify(e)),
    //       JSON.parse(JSON.stringify(this.info.filterModels))
    //     )
    //   } else {
    //     // this.info.isNumberShow = false
    //   }
    // },
    handleSubmit() {
      const that = this;
      this.info.isButtonDisabled = true;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          const inParams = JSON.parse(JSON.stringify(this.form));
          // this.form.AssetModelNo = this.info.selectedNode.label
          trimForm(inParams);
          inParams.AssetId = Math.abs(inParams.AssetId);
          inParams.PlanReturnDate = inParams.PlanReturnDate
            ? inParams.PlanReturnDate
            : "1900-01-01";
          inParams.BorrowPlaceId = inParams.BorrowPlaceId
            ? inParams.BorrowPlaceId
            : -1;
          inParams.IsNeedLabReport = this.info.isNeedAddress
            ? inParams.IsNeedLabReport
            : false;
          if (inParams.Id) {
            BorrowAndReturnService.updBorrowedRecord(inParams)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "借用记录更新成功",
                  duration: 1000,
                  onClose: function() {
                    that.$router.push({ name: "borrow_search" });
                  }
                });
              })
              .catch(err => {
                this.info.isButtonDisabled = false;
              });
          } else {
            BorrowAndReturnService.addBorrowedRecord(inParams)
              .then(res => {
                this.$message({
                  type: "success",
                  message: "借用操作成功",
                  duration: 1000,
                  onClose: function() {
                    // that.$router.push({ name: "borrow_search" });
                    that.reload({
                      data: that.$route.params,
                      name: "borrow_regist"
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
    numChange(e) {
      // this.info.isModelShow = false
      if (!this.form.BorrowerAccountNo) {
        this.form.AssetId = null;
        this.$message({
          message: "请先选择借用人！",
          type: "warning"
        });
        return;
      }
      this.form.BorrowPlaceId = null;
      this.form.PlanReturnDate = null;
      if (e) {
        if (e < 0) {
          this.form.AssetType = "2";
        } else {
          this.form.AssetType = "1";
          // this.info.isModelShow = true
          // const asset = this.info.filterAssets.find(_ => _.Id === e)
          // this.info.ModelNo = asset.ModelNo
          // this.info.ModelDesc = asset.StrCategoryIdLevel1 + ' / ' + asset.StrCategoryIdLevel2 + ' / ' +
          //   asset.strCategoryModel + ' / ' + asset.ModelNo
        }
        this.getLinkedPart(e);
        this.info.isInfoShow = true;
        BorrowAndReturnService.getOrderByUser({
          UserNo: this.form.BorrowerAccountNo,
          AssetType: this.form.AssetType,
          AssetId: Math.abs(e)
        }).then(res => {
          if (res) {
            // 如果存在预约单
            // 自动填充使用地点
            this.form.BorrowPlaceId = res.PlaceId;
            this.btChange(res.PlaceId, res.PlanReturnDateDesc);
          }
        });
      } else {
        this.form.AssetType = "";
        this.info.isInfoShow = false;
        this.getParts(this.form.AssetType, this.form.brUserDeptId);
      }
    },
    handleCancel() {
      this.reload({
        name: "borrow_regist"
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
      if (this.$route.params.late) {
        this.$router.push({
          name: "late_search",
          params: this.$route.params.form
        });
      } else if (this.$route.params.borrowHistory) {
        this.$router.back(-1);
      } else if (this.$route.params.renewManager) {
        this.$router.back(-1);
      } else {
        this.$router.push({
          name: "borrow_search",
          params: this.$route.params.form
        });
      }
    }
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
  width: 240px;
}
</style>
