<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>报告检索</el-breadcrumb-item>
    </el-breadcrumb> 
    <el-divider class="divider"></el-divider>-->
    <el-form size="small" :inline="true" style="margin-top:20px">
      <el-form-item label="标题">
        <el-input v-model="info.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="型号">
        <el-input v-model="info.model" clearable></el-input>
      </el-form-item>
      <el-form-item label="平台名称">
        <el-input v-model="info.AssetComInfo" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          round
          type="primary"
          icon="el-icon-search"
          @click="search"
          style="margin-left:30px"
        >检索</el-button>
      </el-form-item>
      <!-- <el-button @click="showpdf">浏览</el-button> -->
    </el-form>
    <el-table
      :data="info.tableData"
      v-loading="loading"
      element-loading-text="加载中..."
      element-loading-spinner="el-icon-loading"
      stripe
      style="width: 100%; margin-top:20px"
    >
      <el-table-column label="标题" prop="Title" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="型号" prop="ModelDesc" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="平台名称" prop="AssetComInfo" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="借用目的" prop="BorrowReason" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="下载" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <a href="#"
            v-for="(item,index) in scope.row.fileNameList"
            :key="index"
            @click="handleDownload(item.FilePath,item.FileName)"
          ><i class="el-icon-download el-icon--left"></i>{{item.FileName}}</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:10px"
      background
      layout="total,prev, pager, next"
      :small="true"
      :total="info.pageInfo.totalItemCount"
      :page-size="info.pageInfo.pageSize"
      :current-page="info.pageInfo.curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog :visible.sync="info.pdfVisible" width="50%" :close-on-click-modal="false">
      <!-- <iframe
        src="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"
        width="100%"
        height="500"
      >-->
      <iframe
        :src="this.info.pdfurl"
        width="100%"
        height="500"
        @loaded="docLoaded"
        @page-loaded="pageLoaded"
      >This browser does not support PDFs.</iframe>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="info.pdfVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import WorkStationService from "../../apis/WorkStationService";
import uService from "../../apis/UserCenterService";
import { borrowReasons } from "../../config/const";
import { fail } from "assert";
import pdf from "../../../static/pdf/build/pdf";

export default {
  name: "publish",
  data() {
    return {
      loading: false,
      info: {
        title: "",
        model: "",
        AssetComInfo: "",
        tableData: [],
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        },
        pdfVisible: false,
        pdfurl: ""
      },
      form: {
        Id: null,
        Title: "",
        MessageType: null,
        Content: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  computed: {
    ...mapState({
      auser(state) {
        return state.user.user;
      }
    })
  },
  methods: {
    getTableData() {
      this.loading = true;
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      params.Title = this.info.title;
      params.AssetComInfo = this.info.AssetComInfo;
      params.ModelDesc = this.info.model;
      uService
        .getReportList(params)
        .then(res => {
          this.loading = false;
          this.info.tableData = res.Data.map(_ => {
            //文件名
            // let fileList = _.FilePath.split(";");
            // let filenameList = fileList.map(_ => {
            //   let array = _.split("\\");
            //   return array[array.length - 1];
            // });
            // _.fileNameList = filenameList;
            if (_.FilePath) {
              let array = _.FilePath.split("\\");
              let filename = _.FileName;
              _.fileNameList = [
                {
                  FileName: filename || array[array.length - 1],
                  FilePath: array[array.length - 1]
                }
              ];
            }

            _.BorrowReason = borrowReasons.find(
              s => s.value == _.Category
            ).label;
            return _;
          });
          this.info.pageInfo.totalItemCount = res.Total;
        })
        .catch(res => {
          this.loading = false;
        });
    },
    search() {
      this.info.pageInfo.curPage = 1;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.info.pageInfo.PageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.info.pageInfo.curPage = val;
      this.getTableData();
    },
    docLoaded() {
      console.log("doc loaded");
    },
    pageLoaded() {
      console.log("page loaded");
    },
    handleDownload(filePath,fileName) {
      uService
        .getFile({ fileName: filePath, DownloadName:fileName})
        .then(res => {});
    },
    handleView(index, fileName) {
      this.info.pdfVisible = true;
      let url =
        window.config.backUrl + "/UserCenter/PreviewFile?fileName=" + fileName;
      this.info.pdfurl =
        "../../../static/pdf/web/viewer.html?file=" + encodeURIComponent(url);
    },
    showpdf() {
      // 后台返回流的形式，也是我本人项目的使用
      let url =
        window.config.backUrl +
        "/UserCenter/DownloadFile?fileName=加班时间.pdf";
      // 当然上面的是可以的，但是此access_token 是有时效性的，只是放在这边当作个例子，至于最后我为什么加了个测试.pdf 是可以在浏览器标签叶上显示
      window.open(
        "../../../static/pdf/web/viewer.html?file=" + encodeURIComponent(url)
      );
    }
  }
};
</script>