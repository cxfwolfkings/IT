<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>货架管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <div class="lab-title" style="magin-bottom:20px">
      货架列表
      <el-button type="primary" size="mini" style="margin-left:100px" @click="handleAdd">新增</el-button>
    </div>
    <el-tabs v-model="activeName" @tab-click="tabChange" class="mt20" ref="tab">
      <el-tab-pane
        v-for="(item,index) in labs"
        :key="item.Id"
        :label="item.LaboratoryName"
        :name="String(item.Id)"
      ></el-tab-pane>
      <!-- <el-tab-pane label="先导1号实验室" name="1"></el-tab-pane>
      <el-tab-pane label="先导2号实验室" name="2"></el-tab-pane>-->
    </el-tabs>

    <el-table :data="tableData" ref="singleTable" stripe style="width: 66%; margin-top:20px;margin-bottom:30px">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="ShelfNo" label="货架编号" width="180" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="ShelfName" label="货架名称" sortable width="200" :show-overflow-tooltip="true"></el-table-column>
      <!-- <el-table-column prop="CollectionAddress" label="馆藏地址" align="center" width="250" :show-overflow-tooltip="true"></el-table-column>  -->
      <!-- <el-table-column prop="CollectionName" label="馆藏地址" sortable width="180"> -->
      <el-table-column label="馆藏地址" align="center" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>地址: {{ scope.row.CollectionAddress }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.CollectionName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="count" label="当前库存量" align="left"></el-table-column> -->
    </el-table>
    <el-dialog :title="title" :visible="dialogFormVisible" :show-close="false" width="500px">
      <el-form ref="myModel" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="馆藏地" prop="sites">
          <el-cascader :disabled="disabled"
            v-model="form.sites"
            expand-trigger="hover"
            :options="sitesOptions"
            style="width:300px"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="货架编号" prop="no">
          <el-input v-model="form.no" autocomplete="off" style="width:300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="货架名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width:300px" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import api from "../../apis/asset";
import sysSettingService from "../../apis/SysSettingsService";

export default {
  data() {
    return {
      disabled:false,
      title: "",
      form: {
        editMode: null,
        id: null,
        no: "",
        name: "",
        address: "",
        sites: []
        // desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入货架名称",
            trigger: ["blur", "change"]
          }
        ],
        no: [
          {
            required: true,
            message: "请输入货架编号",
            trigger: ["blur", "change"]
          }
        ],
        sites: [
          {
            type: "array",
            required: true,
            message: "请选择馆藏地",
            trigger: ["blur", "change"]
          }
        ]
      },
      labs: [
        {
          Id: null,
          LaboratoryName: ""
        }
      ],
      activeName: "1",
      tableData: [],
      dialogFormVisible: false,
      addressOptions: [],
      sitesOptions: []
    };
  },
  mounted() {
    this.getLabs();
    //this.getShelfData();
    this.addressOptions = api.getLabAddress();
    this.getFilterOptions();
  },
  methods: {
    getLabs() {
      sysSettingService.getLaboratories().then(res => {
        this.labs = res;
        if (res && res.length) {
          this.activeName = res[0].Id + "";
          this.getShelfData()
        }
        
      });
    },
    getShelfData() {
      sysSettingService.getShelfData({ LabId: this.activeName }).then(res => {
        this.tableData = res;
      });
    },
    addShelf() {
      let params = {
        ShelfName: this.form.name,
        ShelfNo: this.form.no,
        LabId: this.form.sites[0],
        SiteId: this.form.sites[1]
      };
      sysSettingService.addShelf(params).then(res => {
        this.dialogFormVisible = false
        this.$message({ type: "success", message: "操作成功！" });
        this.getShelfData();
      })
    },
    updShelf() {
      let params = {
        Id: this.form.id,
        ShelfName: this.form.name,
        ShelfNo: this.form.no,
        LabId: this.form.sites[0],
        SiteId: this.form.sites[1]
      };
      sysSettingService.updShelf(params).then(res => {
        this.dialogFormVisible = false
        this.$message({ type: "success", message: "操作成功！" });
        this.getShelfData();
      });
    },
    handleSubmit() {
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.addShelf();
          } else if (this.editMode == 1) {
            this.updShelf();
          }
          //this.dialogFormVisible = false;
        }
      });
    },
    getFilterOptions() {
      sysSettingService.getLabs().then(res => {
        this.sitesOptions = res.map(_ => {
          return {
            label: _.LaboratoryName,
            value: String(_.Id),
            children: _.childSites.map(item => {
              return {
                label: item.SiteName,
                value: String(item.Id)
              };
            })
          };
        });
      });
    },
    handleAdd() {
      this.title = "新增货架";
      this.editMode = 0;
      this.dialogFormVisible = true;
      this.disabled = false
      this.form.id = null;
      this.form.no = "";
      this.form.name = "";
      this.form.sites = null;
      this.$nextTick(()=>{
        this.$refs["myModel"].clearValidate();
      })
    },
    handleEdit(i, row) {
      this.title = "编辑货架信息";
      this.editMode = 1;
      this.disabled = true;
      this.form.id = row.Id;
      this.form.no = row.ShelfNo;
      this.form.name = row.ShelfName;
      this.form.sites = [String(row.LabId), String(row.CollectionId)];
      this.dialogFormVisible = true;
      this.$nextTick(()=>{
        this.$refs["myModel"].clearValidate();
      })
    },
    handleDelete(i,row){
      this.$confirm("是否要删除该货架?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          sysSettingService.delShelf({ ShelfId: row.Id }).then(res => {
            this.$message({ type: "success", message: "操作成功！" });
            this.getShelfData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {},
    tabChange(e) {
      this.getShelfData();
    }
  }
};
</script>
<style>
.el-tabs__nav-wrap:after {
  background-color: white;
}
</style>

