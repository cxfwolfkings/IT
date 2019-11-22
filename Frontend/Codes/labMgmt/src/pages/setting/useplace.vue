<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>使用地点</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->
    <div class="lab-title">使用地点</div>
    <el-form :inline="true" size="small" @submit.native.prevent style="margin-top:20px">
      <el-form-item label="地点名称">
        <el-input v-model="filter.name" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          round
          type="success"
          plain
          icon="el-icon-search"
          @click="search"
          style="margin-left:100px"
        >搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd" style="margin-left:50px">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="margin-top:20px">
      <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="地点名称" prop="PlaceName" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="地址" prop="Address" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="排序" prop="OrderNo" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top:20px"
      background
      layout="total,prev, pager, next"
      :small="true"
      :total="info.pageInfo.totalItemCount"
      :page-size="info.pageInfo.pageSize"
      :current-page="info.pageInfo.curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-dialog :title="info.title" :visible="info.dialogVisible" :show-close="false" width="500px">
      <el-form ref="myModal" :model="form" :rules="rules" label-width="80px" style="width:420px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="orderno">
          <el-input v-model.number="form.orderno"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SysSettingsService from "../../apis/SysSettingsService";
export default {
  name: "order",
  data() {
    return {
      tableData: [],
      editMode: 0,
      filter: {
        name: ""
      },
      form: {
        id: null,
        name: "",
        //no: "",
        address: "",
        orderno: ""
      },
      info: {
        PlaceName: "",
        pageInfo: {
          pageSize: 10,
          curPage: 1,
          totalItemCount: 50
        },
        title: "",
        dialogVisible: false
      },
      rules: {
        //no:[{required:true,message:"请输入品牌编号",trigger: ['blur', 'change']}],
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: ["blur", "change"]
          }
        ],
        orderno: [
          {
            type: "number",
            min: 0,
            message: "请输入数字",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let params = {};
      params.PageIndex = this.info.pageInfo.curPage;
      params.PageSize = this.info.pageInfo.pageSize;
      params.PlaceName = this.filter.name;
      SysSettingsService.getUseplace(params).then(res => {
        debugger
        this.tableData = res.Data;
        this.info.pageInfo.totalItemCount = res.Total;
      });
    },
    indexMethod(index) {
      return (
        index +
        (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize +
        1
      );
    },
    search() {
      this.info.pageInfo.curPage = 1;
      this.getTableData();
    },
    handleAdd() {
      this.editMode = 0;
      this.info.title = "新增";
      this.info.dialogVisible = true;
      // this.form.no = "";
      this.form.name = "";
      this.form.address = "";
      this.form.orderno = null;
      this.$nextTick(() => {
        this.$refs["myModal"].clearValidate();
      });
    },
    handleEdit(i, row) {
      this.editMode = 1;
      this.info.title = "编辑";
      this.info.dialogVisible = true;
      this.form.id = row.Id;
      this.form.name = row.PlaceName;
      // this.form.no = row.PlaceNo;
      this.form.address = row.Address;
      this.form.orderno = Number(row.OrderNo);
    },
    handleDelete(i, row) {
      let params = {
        id: row.Id
      };
      this.$confirm("此操作将删除该地点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        SysSettingsService.delPlace({ id: row.Id }).then(res => {
          this.$message({ type: "success", message: "删除成功！" });
          if (this.tableData.length === 1) {
              // 如果当前页只有一条数据
              this.info.pageInfo.curPage--;
              this.info.pageInfo.curPage =
                this.info.pageInfo.curPage > 0 ? this.info.pageInfo.curPage : 1;
            }
          this.getTableData();
        });
      });
    },
    handleSizeChange(val) {
      this.info.pageInfo.PageSize = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.info.pageInfo.curPage = val;
      this.getTableData();
    },
    handleSubmmit() {
      this.$refs["myModal"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.addPlace();
          } else if (this.editMode == 1) {
            this.updPlace();
          }
        }
      });
    },
    addPlace() {
      let params = {
        //PlaceNo: this.form.no,
        PlaceName: this.form.name,
        OrderNo: this.form.orderno,
        Address: this.form.address
      };
      SysSettingsService.addPlace(params)
        .then(res => {
          this.$message({ type: "success", message: "操作成功！" });
          this.info.dialogVisible = false;
          this.getTableData();
        })
        .catch(res => {
          this.info.dialogVisible = true;
        });
    },
    updPlace() {
      let params = {
        Id: this.form.id,
        //PlaceNo: this.form.no,
        PlaceName: this.form.name,
        OrderNo: this.form.orderno,
        Address: this.form.address
      };
      SysSettingsService.updPlace(params)
        .then(res => {
          this.$message({ type: "success", message: "操作成功！" });
          this.info.dialogVisible = false;
          this.getTableData();
        })
        .catch(res => {
          this.info.dialogVisible = true;
        });
    }
  }
};
</script>