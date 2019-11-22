<template>
  <div>
    <el-row>
      <el-cascader
        v-model="info.filter"
        style="width:400px"
        expand-trigger="hover"
        :options="info.filterOptions"
        :props="{ checkStrictly: true }"
        clearable
        @change="filterChange"
      ></el-cascader>
      <el-button plain @click="search" icon="el-icon-search">搜 索</el-button>
      <el-button type="primary" @click="handleAdd" style="margin-left:50px">新增</el-button>
    </el-row>
    <el-table :data="info.data" ref="singleTable" border style="width: 100%; margin-top:30px">
      <el-table-column label="序号" type="index" :index="indexMethod" width="80" />
      <!-- <el-table-column prop="CategoryNo" label="品牌编号" sortable width="180"></el-table-column> -->
      <el-table-column prop="CategoryName" label="品牌名称" sortable width="180"></el-table-column>
      <el-table-column prop="ParentName" label="资产大类" sortable width="180"></el-table-column>
      <el-table-column prop="DeptName" :formatter="formatter" label="所属部门" sortable></el-table-column>
      <el-table-column label="操作">
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
      :total="info.pageInfo.totalItemCount"
      :page-size="info.pageInfo.pageSize"
      :current-page="info.pageInfo.curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>

    <el-dialog :title="title" :visible="info.dialogFormVisible" :show-close="false"  width="500px">
      <el-form
        ref="myModel1"
        :model="info.form"
        :rules="rules"
        style="width:400px"
        label-width="100px"
      >
        <el-form-item label="所属分类" prop="filter">
          <el-cascader
            :disabled="info.cateDisabled"
            style="width:300px"
            size="medium"
            expand-trigger="hover"
            :options="filterOpts"
            v-model="info.form.filter"
            prop="filter"
            clearable
          ></el-cascader>
        </el-form-item>
        <!-- <el-form-item label="品牌编号">
          <el-input v-model="info.form.no" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>-->
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="info.form.name" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { assetCategoryTypes } from "../../config/const";
const depts = window.config.depts.sort((t1, t2) => {
  return t1.value - t2.value;
});
export default {
  props: {
    info: {}
  },
  data() {
    return {
      filterOpts:[],
      title: "新增/修改资产品牌",
      rowid: null, //每条记录的主键
      editMode: null, //新增或编辑
      rules: {
        //no:[{required:true,message:"请输入品牌编号",trigger: ['blur', 'change']}],
        name: [
          {
            required: true,
            message: "请输入品牌名称",
            trigger: ["blur", "change"]
          },{ max: 30, message: '长度不能超过30个字符', trigger: ['blur', 'change'] }
        ],
        filter: [
          {
            type: "array",
            required: true,
            message: "请选择所属大类",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  mounted() {
    this.$emit("brandPageInit");
  },
  methods: {
    search() {
      this.$emit("search");
    },
    indexMethod(index) {
      return index + (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize + 1;
    },
    formatter(row, column) {
      return depts.find(_ => _.value == row.DeptId).label;
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs["myModel1"].resetFields();
      });
    },
    handleSizeChange(val) {
      this.$emit("changePageSize", val);
      //this.info.pageSize = val
      this.$emit("getBrandTableData");
    },
    handleCurrentChange(val) {
      //this.info.curPage = val;
      this.$emit("changeCurPage", val);
      this.$emit("getBrandTableData");
    },
    handleSubmmit() {
      this.$refs["myModel1"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.$emit("addBrandCategory");
          } else if (this.editMode == 1) {
            this.$emit("updBrandCategory", this.rowid);
          }
          //this.info.dialogFormVisible = false;
        }
      });
    },
    handleAdd() {
      this.info.cateDisabled = false
      this.title = "新增品牌";
      this.info.dialogFormVisible = true;
      this.editMode = 0;
      this.rowid = null;
      // this.resetForm();
      //this.info.form.no = ''
      this.info.form.name = "";
      this.info.form.filter = null;
      this.$nextTick(()=>{
        this.$refs['myModel1'].clearValidate();
      })
      this.filterOpts = this.info.filterOptions;
      // this.info.filterOptions = this.info.filterOptions.map(_=>{
      //   _.disabled = false
      //   return _
      // })
    },
    handleEdit(i, row) {
      this.$nextTick(()=>{
        this.$refs['myModel1'].clearValidate();
      })
      this.title = "编辑品牌";
      this.editMode = 1;
      this.rowid = row.Id;
      //this.info.form.no = row.CategoryNo
      this.info.form.name = row.CategoryName;
      this.info.form.filter = [row.DeptId.toString(), row.ParentId.toString()];
      //this.info.form.dept = row.DeptId.toString()
      this.info.dialogFormVisible = true;
      this.filterOpts = this.info.filterOptions.filter(_=>_.value==row.DeptId);
      this.$emit('checkHasModel',row.Id,assetCategoryTypes.Brand)
      // this.info.filterOptions = this.info.filterOptions.map(_=>{
      //   if(row.DeptId!=_.value)_.disabled = true
      //   else _.disabled = false
      //   return _
      // })
    },
    handleDelete(i, row) {
      this.rowid = row.Id;
      this.$confirm("是否要删除该品牌?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit("delAssetCategory", this.rowid, assetCategoryTypes.Brand);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    filterChange(e) {
      console.log("brand filter changed", e);
    }
  }
};
</script>

