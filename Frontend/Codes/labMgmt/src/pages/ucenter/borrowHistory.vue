<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>借用记录</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="borrow" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdchaxun"></i> 借用记录
        </span>
        <el-row>
          <el-form :model="form" :inline="true" size="small" label-width="100px">
            <!-- <el-form-item label="借用人工号">
              <el-input v-model="form.BorrowerAccountNo"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="借用日期">
              <el-input v-model="form.BorrowDate"></el-input>
            </el-form-item>-->
            <el-form-item label="借用日期">
              <el-date-picker
                v-model="info.BorrowDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="部件类型">
              <el-select
                v-model="form.AssetType"
                placeholder="请选择"
                @change="filterChange"
                clearable
              >
                <el-option
                  v-for="item in info.filterAssetTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部件编号">
              <el-input v-model="form.AssetNo" clearable></el-input>
            </el-form-item>

            <el-form-item label="计划归还日期">
              <el-date-picker
                v-model="info.PlanReturnDateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="是否归还">
              <el-select v-model="info.IsReturned" placeholder="请选择" clearable>
                <el-option key="1" label="是" value="1"></el-option>
                <el-option key="2" label="否" value="2"></el-option>
                <el-option key="3" label="无限期" value="3"></el-option>
                <el-option key="4" label="无需归还" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="success"
                style="margin-left:100px"
                @click="search"
                icon="el-icon-search"
                plain
                round
              ></el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                plain
                type="primary"
                style="margin-left:50px"
                icon="el-icon-thirdicon-35"
                @click="handleAdd"
              >续借申请</el-button>
            </el-form-item>

            <!-- <el-form-item style="float: right">
              <el-button type="primary" @click="handAdd" icon="el-icon-plus">借出登记</el-button>
            </el-form-item>-->
          </el-form>
        </el-row>
        <el-table
          v-loading="loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
          :data="info.singleData"
          ref="singleTable"
          border
          style="width: 100%; margin-top:10px"
          highlight-current-row
          @current-change="handleSelectionChange"
        >
          <el-table-column type="index" :index="indexMethod" width="50" label="序号" />
          <el-table-column
            width="140"
            prop="BorrowedRecordNo"
            label="借用编号"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <el-link type="primary" @click="handleViewDetail(scope.$index, scope.row, true)">
               
                {{scope.row.BorrowedRecordNo}}
              </el-link>
            </template>
          </el-table-column>
          <!-- <el-table-column type="selection" width="35"></el-table-column> -->
          <el-table-column
            prop="IsReturned"
            :formatter="formatter"
            label="是否归还"
            align="center"
            width="80"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="BorrowerAccountNo" label="借用人工号" width="165" :show-overflow-tooltip="true" ></el-table-column> -->
          <el-table-column
            prop="BorrowDateDesc"
            label="借用时间"
            min-width="156"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="PlanReturnDateDesc"
            label="计划归还时间"
            min-width="156"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="BorrowPlaceName" label="使用地点" width="120" :show-overflow-tooltip="true" ></el-table-column> -->
          <!-- <el-table-column prop="BorrowType" label="借用类型" width="80" :formatter="typeformatter"></el-table-column> -->

          <el-table-column label="借用部件" width="230" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <el-tooltip
                v-if="scope.row.AssetType==1"
                effect="dark"
                :content="scope.row.AssetModelDesc"
                placement="top"
              >
                <i class="el-icon-info"></i>
              </el-tooltip>
              <el-tooltip v-else effect="dark" content="点此查看平台组成" placement="top">
                <a href="javascript:;" @click="getPartDetail(scope.row.Id)">
                  <i class="el-icon-document"></i>
                </a>
              </el-tooltip>
              <span style="margin-right: 10px">{{ scope.row.AssetDesc }}</span>
            </template>
          </el-table-column>

          <!-- <el-table-column prop="AssetTypeName" label="借用部件类别" width="110"></el-table-column>
          <el-table-column prop="AssetNo" label="部件编号" width="140"></el-table-column>
          <el-table-column prop="AssetModelDesc" label="部件型号" width="140"></el-table-column>-->
          <!-- <el-table-column prop="BorrowReasonName" label="借用目的" width="100" :show-overflow-tooltip="true" ></el-table-column>
          <el-table-column prop="LaboratoryName" label="所在实验室" width="150" :show-overflow-tooltip="true" ></el-table-column>-->
          <!-- <el-table-column prop="ShelfName" label="所在货架"></el-table-column> -->

          <el-table-column
            prop="IsNeedLabReportDesc"
            label="是否需要试验报告"
            width="134"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            label="是否报修过"
            :formatter="formatterRepaire"
            width="95"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="StatusName" label="状态"></el-table-column> -->
          <el-table-column
            label="操作"
            fixed="right"
            width="210"
            header-align="center"
            align="left"
          >
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
              <el-button
                style="margin-bottom:5px"
                v-if="scope.row.LabReportContent==null || scope.row.LabReportContent==''"
                size="mini"
                @click="handleReport(scope.$index, scope.row)"
                type="primary"
                plain
              >使用报告</el-button>
              <!-- <el-tag v-else type="success">已填写</el-tag> -->
              <el-button
                style="margin-bottom:5px"
                size="small"
                type="info"
                plain
                v-else
                @click="handleReport(scope.$index, scope.row)"
              >查看报告</el-button>
              <el-button
                size="small"
                type="primary"
                plain
                v-show="(!scope.row.IsReturned&&!scope.row.RepaireId&&scope.row.PlanReturnDateDesc)"
                @click="handleRepaire(scope.$index, scope.row)"
              >报 修</el-button>
              <el-button
                v-show="canViewRepaire(scope.row)"
                size="small"
                type="info"
                plain
                @click="ViewRepaire(scope.$index, scope.row)"
              >查看报修单</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top:20px"
          :current-page="listQuery.PageIndex"
          :page-size="listQuery.PageSize"
          :total="info.total"
          :background="true"
          :small="true"
          layout="total, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
      <el-tab-pane name="order" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon-29"></i> 预约借用
        </span>
      </el-tab-pane>
      <el-tab-pane name="renew" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon_renwujincheng"></i> 续借记录
        </span>
      </el-tab-pane>
      <el-tab-pane name="credit" style="padding-top:20px" :lazy="true">
        <span slot="label">
          <i class="el-icon-thirdicon_shiyongwendang"></i> 失信记录
        </span>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="续借申请单" :visible="info.dialogFormVisible" :show-close="false" width="500px">
      <el-form
        ref="myModel1"
        :model="formRenew"
        :rules="rules"
        style="width:400px"
        label-width="100px"
      >
        <el-form-item label="借用编号" prop="BorrowedRecordNo">
          <el-input :readonly="true" v-model="formRenew.BorrowedRecordNo"></el-input>
        </el-form-item>
        <el-form-item label="部件编号" prop="AssetNo">
          <el-input :readonly="true" v-model="formRenew.AssetNo"></el-input>
        </el-form-item>
        <el-form-item label="部件型号" prop="Model" v-show="formRenew.Model!=null">
          <el-input :readonly="true" v-model="formRenew.Model"></el-input>
        </el-form-item>
        <el-form-item label="续借开始日期" prop="RenewStartDate">
          <el-input :disabled="true" v-model="formRenew.RenewStartDate" type="datetime"></el-input>
        </el-form-item>
        <el-form-item label="续借天数" prop="RenewDays">
          <el-input-number
            v-model="formRenew.RenewDays"
            controls-position="right"
            :min="1"
            :max="info.MaxDays"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmmitRenew" :disabled="info.isButtonDisabled">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="info.title"
      :visible.sync="info.dialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form ref="myModel" :model="dia" :rules="rules" label-width="100px" label-position="top">
        <!-- <el-form-item prop="ReportContent">
          <quill-editor v-model="dia.ReportContent" ref="richAnalysis" :options="options"></quill-editor>
        </el-form-item>-->
        <el-form-item prop="ReportContent" label="报告标题" label-width="100">
          <el-input v-model="dia.ReportContent"></el-input>
        </el-form-item>
        <el-upload
          v-if="this.dia.editMode==1"
          ref="upload"
          style="margin-top:20px"
          class="upload-demo"
          :action="config.backUrl+'/UserCenter/UploadReportFiles'"
          :headers="myheads"
          :data="uploaddata"
          :on-success="handleUploadSuccess"
          :on-error="handleUploadError"
          :beforeUpload="handleBeforeUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          accept=".doc, .docx"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="dia.fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传报告文件</el-button>
          <div slot="tip" class="el-upload__tip"></div>
        </el-upload>
        <ul v-else>
          <li v-for="item in info.fileList" :key="item">
            {{item.FileName}}
            <a
              class="el-icon-download"
              download
              :href="config.backUrl+'/UserCenter/DownloadFile?fileName='+ item.FilePath"
            ></a>
            <!-- <a class="el-icon-download" download href="javascript:void(0);" @click="download(item.slice(8))"></a> -->
            <!-- <el-link class="el-icon-download" download @click="download(item)"></el-link> -->
          </li>
        </ul>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="info.dialogVisible = false">取 消</el-button>
        <el-button
          v-show="(this.dia.editMode==1)"
          size="small"
          type="primary"
          :loading="dia.loading"
          :disabled="info.isReportButtonDisabled"
          @click="handleSubmmitReport"
        >提 交</el-button>
      </div>
    </el-dialog>
    <RepairDialog
      :dialog-visible="info.diaCmpVisible"
      :repair-issue="info.repairRd"
      :is-read="info.isRead"
      :assetid="info.assetId"
      @visible="changeVisible"
      @refresh="reload"
    />
    <el-dialog title="平台组成" :visible.sync="info.cmpVisible" width="600px">
      <el-button type="text" size="small" @click="expandTb(true)">
        全部展开
        <i class="el-icon-plus el-icon--right"></i>
      </el-button>
      <el-button type="text" size="small" @click="expandTb(false)">
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
        <el-table-column type="expand">
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
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import AssetService from "../../apis/AssetService";
import BorrowAndReturnService from "../../apis/BorrowAndReturnService";
import ucenerService from "../../apis/UserCenterService";
import sysSettingService from "../../apis/SysSettingsService";
import {
  assetCategoryTypes,
  depts,
  assetStatus,
  componentStatus,
  assetType,
  repairStatus,
  borrowReasons,
  BorrowSettingType,
  renewAuditStatus
} from "../../config/const";
import { mapState } from "vuex";
// import Quill from "quill";
import UserCenterService from "../../apis/UserCenterService";
import RepairDialog from "@/components/ucenter/repaireDialog";
import { fail } from "assert";

export default {
  name: "borrowHistory",
  components: { RepairDialog },
  data() {
    let validate = (rule, value, callback) => {
      //后台方法
      UserCenterService.checkReportTitle({title:value}).then(res => {
        debugger
        if (res) {
          callback('标题已存在')
        } else{
          callback()
        }
      })
    }
    return {
      loading: false,
      config: null,
      uploaddata: {},
      info: {
        isReportButtonDisabled:false,
        isButtonDisabled:false,
        title: "使用报告",
        BorrowDate: [],
        PlanReturnDateRange:'',

        singleData: [],
        componentData: [],
        total: 0,
        total2: 0,
        filterAssetTypes: assetType,
        //filterCategoris1: [],
        //filterBrands: [],
        //filterCategoris2: [],
        filterModels: [],
        filterShelfs: [],
        isNumberShow: true,
        activeTab: "borrow",
        dialogVisible: false,

        cmpVisible: false,
        partDetailData: [],
        expandRowKeys: [],

        isRead: false,
        repairRd: null,
        diaCmpVisible: false,
        assetId: null,

        multipleSelection: [],
        currentRow: null,
        MaxDays: 10,
        IsReturned: null,
        dialogFormVisible: false,
        fileList: []
      },
      form: {
        //CategoryIdLevel1: null,
        //CategoryIdBrand: null,
        //CategoryIdLevel2: null
        AssetType: null,
        AssetNo: ""
        // AdminNo: "",
        // SerialNo: "",
        //ModelId: null,
        //ShelfId: null
      },
      formRenew: {
        BorrowId: null,
        BorrowedRecordNo: "",
        RenewDays: null,
        RenewStartDate: null,
        RenewEndDate: null,
        RenewAuditStatus: 0,
        ApplicantNo: "",
        ApplicantId: null,
        AssetNo: "",
        Model: "",
        PlaceId:null
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      },
      dia: {
        loading: false,
        editMode: null,
        fileList: [],
        ReportContent: "",
        ModelDesc: "",
        BorrowId: null
      },
      rules: {
        ReportContent: [
          {
            required: true,
            message: "请输入报告内容",
            trigger: ["blur", "change"]
          },
          {validator:validate, trigger: 'blur'}
        ]
      },
      options: {
        modules: {
          toolbar: [
            [
              "bold",
              "italic",
              "underline",
              "strike",
              "image",
              "link",
              "blockquote",
              "code-block",
              { header: 1 },
              { header: 2 },
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
              { color: [] },
              { size: ["small", false, "large", "huge"] },
              "clean"
            ]
          ]
        },
        placeholder: "请输入内容"
      }
    };
  },
  created() {
    if (this.$route.params.activeTab) {
      this.info.activeTab = this.$route.params.activeTab;
    }
  },
  computed: {
    ...mapState({
      myheads(state) {
        return {
          Authorization: "Bearer " + sessionStorage.token,
          "x-requested-with": "FileUpload"
        };
      },
      auser(state) {
        // console.log("home state", state.user.user)
        return state.user.user;
      }
    })
  },
  mounted() {
    this.config = window.config;
    // sysSettingService.getBorrowSetting().then(res => {
    //   this.info.MaxDays = res.RenewalCycle;
    // });
    this.formRenew.ApplicantNo = this.auser.AccountNo;
    this.formRenew.ApplicantId = this.auser.Id;
    if (this.$route.params.id) {
      var params = {};
      params.Id = this.$route.params.id
      Object.assign(params, this.listQuery);
      BorrowAndReturnService.getBorrowedRecords(params).then(res => {
        this.info.total = res.Total;
        this.info.singleData = res.Data.map(_ => {
          _.IsNeedLabReportDesc = _.IsNeedLabReport ? "是" : "否";
          _.AssetTypeName = assetType.find(
            s => s.value === _.AssetType + ""
          ).label;
          _.BorrowReasonName = borrowReasons.find(
            s => s.value === _.BorrowReason + ""
          ).label;
          _.AssetDesc =
            assetType.find(s => s.value === _.AssetType + "").label +
            "：" +
            _.AssetNo;
          return _;
        });
      });
    } else {
      this.getTableData();
    }

    // this.$refs.richAnalysis.quill.enable(false);
    // setTimeout(() => {
    //   this.$refs.richAnalysis.quill.enable(true);
    //   this.$refs.richAnalysis.quill.blur();
    // }, 200);
    // AssetService.getAssetCategory({
    //   AssetCategoryType: assetCategoryTypes.LevelOne
    // }).then(res => {
    //   this.info.filterCategoris1 = res.map(_ => {
    //     _.label = depts.find(d => d.value === _.value).label
    //     return _
    //   })
    // })
  },
  methods: {
    tabClick(t) {
      if (t.name == "order") {
        this.$router.push({ name: "ucenter_order" });
      } else if (t.name == "renew") {
        this.$router.push({ name: "ucenter_renew" });
      } else if (t.name == "credit") {
        this.$router.push({ name: "ucenter_credit" });
      }
    },
    indexMethod(index) {
      return (
        index + (this.listQuery.PageIndex - 1) * this.listQuery.PageSize + 1
      );
    },
    typeformatter(row, col) {
      switch (row.BorrowType) {
        case BorrowSettingType.场内:
          return "场内";
          break;
        case BorrowSettingType.场外:
          return "场外";
          break;
        default:
          break;
      }
    },
    handAdd() {
      this.$router.push({ name: "borrow_regist" });
    },
    handleEdit(i, row) {
      this.$router.push({ name: "borrow_regist", params: { id: row.Id } });
    },
    changeVisible(visible) {
      this.info.diaCmpVisible = visible;
    },
    ViewRepaire(index, row) {
      AssetService.getRepairIssues({ Id: row.RepaireId }).then(res => {
        this.info.repairRd = res.Data[0];
        this.info.repairRd.editMode = 1;
        this.info.isRead = true;
        this.info.diaCmpVisible = true;
      });
      let params = {};
      //查看
      // params.editMode = 1;
      // params.BorrowId = row.Id;
      // params.AssetId = row.AssetId;
      // params.AssetNo = row.AssetNo;
      // params.AssetType = String(row.AssetType);
      // this.info.isRead = true;
      // this.info.repairRd = params;
      // this.info.diaCmpVisible = true;
      // this.info.assetId = row.AssetId;
    },
    handleRepaire(index, row) {
      let params = {};
      //编辑
      params.editMode = 0;
      params.BorrowId = row.Id;
      //params.Id = row.Id
      params.AssetId = row.AssetId;
      params.AssetNo = row.AssetNo;
      params.AssetType = String(row.AssetType);
      this.info.isRead = false;
      this.info.repairRd = params;
      this.info.diaCmpVisible = true;
      this.info.assetId = row.AssetId;
    },
    handleReport(index, row) {
      this.info.title =
        "使用报告 ([型号/组合平台编号]:" +
        (row.AssetModelDesc || row.AssetNo) +
        "; [使用目的]:" +
        row.BorrowReasonName +
        ")";
      if (row.LabReportContent == null || row.LabReportContent == "") {
        //新增
        this.dia.editMode = 1;
        this.info.dialogVisible = true;
        if (this.$refs["myModel"] !== undefined) {
          this.$refs["myModel"].resetFields();
        }
        if (this.$refs["upload"] !== undefined) {
          this.$refs["upload"].clearFiles();
        }
        this.dia.ModelDesc = row.AssetModelDesc || "";
        this.dia.BorrowId = row.Id;
        //this.uploaddata.BorrowId = row.Id;
        this.dia.ReportContent = "";
        this.info.fileList = [];
      } else {
        //查看报告
        debugger
        this.dia.editMode = 0;
        this.info.dialogVisible = true;
        this.dia.ReportContent = row.LabReportContent;
        let array = row.LabReportFile.split("\\")
        let temp = array[array.length - 1]
        let fileDisplayName = row.ReportFileName||temp
        //let filePath = row.LabReportFile
        this.info.fileList = [{FileName:fileDisplayName,FilePath:temp}]
        // let fileList = row.LabReportFile.split(";");
        // let filenameList = fileList.map(_ => {
        //   let array = _.split("\\");
        //   return array[array.length - 1];
        // });
        // let resultArray = fileDisplayNameList?fileDisplayNameList.split(';'):filenameList
        
        
        //this.info.fileList = row.LabReportFile.split(";");
      }
    },
    formatter(row, column) {
      return row.IsReturned
            ? "是"
            : !row.PlanReturnDateDesc && row.AssetType == 1
            ? "无需归还"
            : !row.PlanReturnDateDesc && row.AssetType == 2
            ? "无限期"
            : "否";
      // return row.IsReturned
      //       ? "是"
      //       : !row.PlanReturnDateDesc
      //       ? "无需归还"
      //       : "否";
      // return row.IsReturned ? "是" : "否";
    },
    formatterRepaire(row, column) {
      let flag = false;
      if(!row.IsReportedAdvance&&row.RepaireId!=null&&row.IsReturned==false){
        flag = true
      }
      if(row.IsReportedAdvance){
        flag = true
      }
      //return row.RepaireId == null ? "否" : "是";
      return flag? "是" : "否";
    },
    canViewRepaire(row){
      let flag = false;
      if(!row.IsReportedAdvance&&row.RepaireId!=null&&row.IsReturned==false){
        flag = true
      }
      if(row.IsReportedAdvance){
        flag = true
      }
      return flag;
    },
    handleSubmmit() {
      if (this.$refs["upload"].uploadFiles.length <= 0) {
        this.$message({
          type: "warning",
          message: "请上传报告文件！"
        });
        return;
      }
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          let params = {};
          params.ReportContent = this.dia.ReportContent;
          params.BorrowId = this.dia.BorrowId;
          params.AccountNo = this.auser.AccountNo;
          params.ModelDesc = this.dia.ModelDesc;
          this.dia.loading = true;
          ucenerService.addReport(params).then(res => {
            this.dia.loading = false;
            this.$message({
              type: "success",
              message: "操作成功！"
            });
            this.info.dialogVisible = false;
            this.getTableData();
          });
        }
      });
    },
    handleSubmmitReport() {
      if (this.$refs["upload"].uploadFiles.length <= 0) {
        this.$message({
          type: "warning",
          message: "请上传报告文件！"
        });
        return;
      }
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          let params = {};
          params.ReportContent = this.dia.ReportContent;
          params.BorrowId = this.dia.BorrowId;
          params.AccountNo = this.auser.AccountNo;
          params.ModelDesc = this.dia.ModelDesc;
          this.dia.loading = true;
          this.info.isReportButtonDisabled = true;
          this.$refs["upload"].submit();
        }
      });
    },
    handleBeforeUpload() {
      let params = {};
      params.ReportContent = this.dia.ReportContent;
      params.BorrowId = this.dia.BorrowId;
      params.AccountNo = this.auser.AccountNo;
      params.ModelDesc = this.dia.ModelDesc;
      this.uploaddata = params;
      let promise = new Promise(resolve => {
        this.$nextTick(function() {
          resolve(true);
        });
      });
      return promise;
    },
    handleUploadSuccess(res, file, fileList) {
      this.info.isReportButtonDisabled = false
      this.dia.loading = false;
      this.$message({
        type: "success",
        message: "操作成功！"
      });
      this.info.dialogVisible = false;
      this.getTableData();
    },
    handleUploadError(res, file, fileList) {
      console.log("上传报告失败")
      this.info.isReportButtonDisabled = false
      this.dia.loading = false;
      let result = JSON.parse(res.message) || "上传失败!请刷新后重试!";
      this.$message({
        type: "error",
        message: result.Msg
      });
    },
    filterChange(e) {
      if (e) {
        this.info.isNumberShow = true;
      } else {
        this.info.isNumberShow = false;
        this.info.form.AssetType = null;
        this.info.form.AssetNo = "";
      }
    },

    getTableData() {
      this.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      // if (isClearCondition) {
        
      // } else {
      //   Object.assign(params, this.listQuery, this.form);
      // }
      params.AssetType = this.form.AssetType || 0;
      params.AssetNo = this.form.AssetNo||''
      if (this.info.BorrowDate && this.info.BorrowDate.length) {
        params.DateStart = this.info.BorrowDate[0];
        params.DateEnd = this.info.BorrowDate[1];
      }
      if (this.info.PlanReturnDateRange && this.info.PlanReturnDateRange.length) {
        params.PlanReturnDateRange = this.info.PlanReturnDateRange.join(",");
      } else {
        params.PlanReturnDateRange = "";
      }
      params.BorrowerAccountNo = this.auser.AccountName+"（"+this.auser.AccountNo+"）";
      //params.IsReturned = this.info.IsReturned;
      if(this.info.IsReturned){
        params.ReturnStatus = this.info.IsReturned
      }else{
        params.ReturnStatus = 0
      }
      
      BorrowAndReturnService.getBorrowedRecords(params).then(res => {
        this.loading = false;
        this.info.total = res.Total;
        this.info.singleData = res.Data.map(_ => {
          _.IsNeedLabReportDesc = _.IsNeedLabReport ? "是" : "否";
          _.AssetTypeName = assetType.find(
            s => s.value === _.AssetType + ""
          ).label;
          _.BorrowReasonName = borrowReasons.find(
            s => s.value === _.BorrowReason + ""
          ).label;
          _.AssetDesc =
            assetType.find(s => s.value === _.AssetType + "").label +
            "：" +
            _.AssetNo;
          return _;
        });
      }).catch(res=>{
        this.loading = false;
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
    search() {
      this.listQuery.PageIndex = 1;
      this.getTableData();
    },
    reload() {
      this.getTableData();
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        '上传失败，不能上传多个附件'
        // `当前限制选择 1 个文件，本次选择了 ${
        //   files.length
        // } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSelectionChange(val) {
      this.info.currentRow = val;
      //this.info.multipleSelection = val;
    },
    setMaxRenewDays(placeid) {
      sysSettingService
        .getBorrowSettingByPlace({ PlaceId: placeid })
        .then(res => {
          debugger
          this.info.MaxDays = res.RenewalCycle || 0;
        });
    },
    handleViewDetail(i, row) {
      const formParams = {
        ...this.form,
        PageIndex: this.listQuery.PageIndex
      };
      const inParameters = { id: row.Id, form: formParams,borrowHistory:true };
      inParameters.type = "read";
      this.$router.push({
        name: "borrow_regist",
        params: inParameters
      });
      // let routeData = this.$router.resolve({
      //   name: "searchGoods",
      //   params: inParameters
      // });
      // window.open(routeData.href, "_blank");
    },
    handleAdd() {
      if (
        this.info.currentRow != null &&
        !this.info.currentRow.IsReturned
        // this.info.multipleSelection != null &&
        // this.info.multipleSelection.length == 1
      ) {
        this.setMaxRenewDays(this.info.currentRow.BorrowPlaceId);
        UserCenterService.getLatestReturnDate({
          BorrowId: this.info.currentRow.Id
        }).then(res => {
          if (res.CanRnew) {
            this.info.dialogFormVisible = true;
            if (this.$refs["myModel1"] !== undefined) {
              this.$refs["myModel1"].resetFields();
            }
            debugger
            console.log(this.info.currentRow)
            this.formRenew.BorrowId = this.info.currentRow.Id;
            this.formRenew.BorrowedRecordNo = this.info.currentRow.BorrowedRecordNo;
            this.formRenew.PlaceId = this.info.currentRow.BorrowPlaceId;
            this.formRenew.RenewStartDate = res.StrLatestReturnDate;
            this.formRenew.AssetNo = this.info.currentRow.AssetNo;
            this.formRenew.Model =
              this.info.currentRow.AssetModelDesc ||
              this.info.currentRow.AssetModelNo;
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        });
      } else {
        this.$message({
          type: "warning",
          message: "请选择一条未归还的记录进行续借申请"
        });
      }

      //this.form.RenewEndDate = null
    },
    handleSubmmitRenew() {
      this.$refs["myModel1"].validate(valid => {
        if (valid) {
          let params = {};
          this.formRenew.RenewAuditStatus = renewAuditStatus.待审核;
          Object.assign(params, this.formRenew);
          this.info.isButtonDisabled = true
          UserCenterService.addRenew(params).then(res => {
            this.$message({
              type: "success",
              message: "操作成功！"
            });
            this.info.dialogFormVisible = false
            this.info.isButtonDisabled = false
            this.getTableData();
          }).catch(res=>{
            this.info.isButtonDisabled = false
          });
        }
      });
    },
    download(item) {
      UserCenterService.DownloadFilePost({ fileName: item }).then(res => {});
    },
    getPartDetail(brRecordId) {
      BorrowAndReturnService.getBorrowedPart({
        Id: brRecordId
      }).then(res => {
        this.info.partDetailData = res.Details;
        this.info.cmpVisible = true;
      });
    },
    expandTb(isExpand) {
      if (isExpand) {
        this.info.expandRowKeys = this.info.partDetailData.map(_ => _.ModelNo);
      } else {
        this.info.expandRowKeys = [];
      }
    }
  }
};
</script>
<style>
.edit_container {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.ql-editor {
  height: 400px;
}
</style>
