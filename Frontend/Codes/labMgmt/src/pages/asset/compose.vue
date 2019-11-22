<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>部件管理</el-breadcrumb-item>
      <el-breadcrumb-item>部件组合</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-tabs v-model="info.activeTab" type="card" @tab-click="tabClick">
      <el-tab-pane name="single" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-tools"></i> 单个部件
        </span>
      </el-tab-pane>
      <el-tab-pane name="component" :lazy="true">
        <span slot="label">
          <i class="el-icon-s-grid"></i> 组合平台
        </span>
        <el-form :model="info.form" size="small" label-width="100px" :inline="true">
          <el-form-item label="编号">
            <el-input
              autocomplete="off"
              placeholder="请输入..."
              prefix-icon="el-icon-search"
              :clearable="true"
              v-model="info.form.ComponentNo"
            ></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input
              autocomplete="off"
              placeholder="请输入..."
              prefix-icon="el-icon-search"
              :clearable="true"
              v-model="info.form.ComponentName"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="关键字">
            <el-input prefix-icon="el-icon-search"
                      v-model="info.form.Keywords"
                      placeholder="大类/小类/型号/名称/品牌/编号"></el-input>
          </el-form-item>-->
          <el-form-item style="float: right">
            <el-button type="success" plain @click="search" icon="el-icon-search">搜 索</el-button>
            <el-button type="primary" @click="handAdd" icon="el-icon-s-operation">部件组合</el-button>
          </el-form-item>
        </el-form>
        <el-table
          :data="info.componentData"
          ref="componentTable"
          border
          stripe
          style="width: 100%"
          v-loading="info.loading"
          element-loading-text="加载中..."
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column type="index" label="序号" width="60" :index="indexMethod" />
          <el-table-column label="编号" min-width="160" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <!-- <el-tooltip effect="dark"
                          :content="scope.row.ComponentNo"
              placement="top-start">-->
              <a href="javascript:;" @click="handleEdit(scope.$index, scope.row, true)">
                <i class="el-icon-info"></i>
                {{scope.row.ComponentNo}}
              </a>
              <!-- </el-tooltip> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="ComponentName"
            label="名称"
            min-width="200"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="LabNameDesc"
            label="所在实验室"
            min-width="300"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column prop="ShelfName"
          label="所在货架"></el-table-column>-->
          <el-table-column prop="UsedRate" min-width="70" label="利用率" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="StatusName"
            min-width="150"
            label="状态"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column label="操作" min-width="160">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                :disabled="scope.row.Status!=1 && scope.row.Status!=0"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="scope.row.Status!=1"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :current-page="listQuery.PageIndex"
          :page-sizes="[10,20,30,50]"
          :page-size="listQuery.PageSize"
          :total="info.total"
          :background="true"
          :small="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import AssetService from "../../apis/AssetService";
import { componentStatus } from "../../config/const";
import { trimForm } from "../../utils/helper";

export default {
  name: "assetRegist",
  data() {
    return {
      info: {
        loading: false,
        componentData: [],
        total: 0,
        activeTab: "component",
        form: {
          ComponentNo: "",
          ComponentName: ""
          // Keywords: ''
        }
      },
      listQuery: {
        PageIndex: 1,
        PageSize: 10
      }
    };
  },
  created() {
    // if (this.$route.params.activeTab) {
    //   this.info.activeTab = this.$route.params.activeTab
    // }
    if (this.$route.params.PageIndex) {
      this.info.form = {
        ...this.$route.params
      };
      this.listQuery.PageIndex =
        this.info.form.PageIndex > 0 ? this.info.form.PageIndex : 1;
      delete this.info.form.PageIndex;
    }
  },
  mounted() {
    this.search();
  },
  methods: {
    indexMethod(index) {
      return (
        index + (this.listQuery.PageIndex - 1) * this.listQuery.PageSize + 1
      );
    },
    tabClick(t) {
      if (t.name === "single") {
        this.$router.push({ name: "asset_regist" });
      }
    },
    handAdd() {
      this.$router.push({ name: "asset_compEdit" });
    },
    handleEdit(i, row, isRead) {
      const formParams = {
        ...this.info.form,
        PageIndex: this.listQuery.PageIndex
      };
      if (isRead) {
        this.$router.push({
          name: "asset_compEdit",
          params: { id: row.Id, type: "read", form: formParams }
        });
      } else {
        this.$router.push({
          name: "asset_compEdit",
          params: { id: row.Id, form: formParams }
        });
      }
    },
    handleDelete(i, row) {
      const _this = this;
      this.$confirm("是否确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          AssetService.delComponent({
            id: row.Id
          }).then(() => {
            if (_this.info.componentData.length === 1) {
              // 如果当前页只有一条数据
              _this.listQuery.PageIndex--;
              _this.listQuery.PageIndex =
                _this.listQuery.PageIndex > 0 ? _this.listQuery.PageIndex : 1;
            }
            this.getTableData();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // })
        });
    },
    getTableData() {
      this.info.loading = true;
      var params = {};
      Object.assign(params, this.listQuery);
      params.IsNotShowDisabled = true;
      AssetService.getComponents(params).then(res => {
        this.info.total = res.Total;
        this.info.componentData = res.Data.map(_ => {
          _.LabNameDesc = _.LabName + "/" + _.SiteName + "/" + _.ShelfName;
          _.StatusName = componentStatus.find(
            s => s.value === _.Status + ""
          ).label;
          return _;
        });
        this.info.loading = false;
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
    search(ev) {
      if (ev) {
        this.listQuery.PageIndex = 1;
      }
      Object.assign(this.listQuery, this.info.form);
      trimForm(this.listQuery);
      this.getTableData();
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
