<template>
  <div>
    <el-row>
      <el-cascader
        v-model ="info.filter"
        expand-trigger="hover"
        :options="info.filterOptions"
        :props="{ checkStrictly: true }"
        clearable
        style="width:400px"
        @change="filterChange"
      ></el-cascader>
      <el-button plain @click="search" icon="el-icon-search" >搜 索</el-button>
      <el-button type="primary" @click="handleAdd" style="margin-left:50px">新增</el-button>
    </el-row>
    <el-table :data="info.data" ref="singleTable" border style="width: 100%; margin-top:30px">
      <el-table-column label="序号" type="index" :index="indexMethod" width="80" />
      <!-- <el-table-column prop="CategoryNo" label="名称编号" sortable width="180"></el-table-column> -->
      <el-table-column prop="CategoryName" label="名称" sortable width="180"></el-table-column>
      <el-table-column prop="ParentName" label="小分类" sortable width="180"></el-table-column>
      <el-table-column prop="DeptName" label="所属部门" :formatter="formatter" sortable></el-table-column>
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

    <el-dialog :title="title" :visible="info.dialogFormVisible" :show-close="false" width="600px">
      <el-form ref="myModel3" :model="info.form" :rules="rules" style="width:500px" label-width="100px">
        <el-form-item label="所属小分类" prop="filter">
          <el-cascader :disabled="info.cateDisabled" style="width:400px" ref="myCascader" @change="modelChange" expand-trigger="hover" :options="filterOpts" v-model="info.form.filter" clearable></el-cascader>
        </el-form-item>
        <!-- <el-form-item label="子类编号" prop="no">
          <el-input v-model="info.form.no" autocomplete="off" style="width:300px">
            <template v-if="editMode==0" slot="prepend">{{info.form.pretext}}</template>
          </el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="name">
          <el-input v-model="info.form.name" autocomplete="off" style="width:400px"></el-input>
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
      title:"",
      rowid: null, //每条记录的主键
      editMode: null, //新增或编辑
      rules:{
        //no:[{required:true,message:"请输入小类编号",trigger: ['blur', 'change']}],
        name:[{required:true,message:"请输入名称",trigger: ['blur', 'change']},
        ,{ max: 30, message: '长度不能超过30个字符', trigger: ['blur', 'change'] }],
        filter:[{type:'array',required:true,message:"请选择所属小类",trigger: ['blur', 'change']}]
      }
    };
  },
  mounted() {
    this.$emit("modelPageInit");
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
        this.$refs["myModel3"].resetFields();
      });
    },
    handleSizeChange(val) {
      this.$emit("changePageSize", val);
      //this.info.pageSize = val
      this.$emit("getModelTableData");
    },
    handleCurrentChange(val) {
      //this.info.curPage = val;
      this.$emit("changeCurPage", val);
      this.$emit("getModelTableData");
    },
    handleSubmmit() {
      this.$refs["myModel3"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.$emit("addModelCategory");
          } else if (this.editMode == 1) {
            this.$emit("updModelCategory", this.rowid);
          }
          //this.info.dialogFormVisible = false;
        }
      });
    },
    handleAdd() {
      this.info.cateDisabled = false
      this.title = "新增型号类别"
      this.editMode = 0;
      this.info.dialogFormVisible = true;
      //this.resetForm();
      this.rowid = null;
      //this.info.form.no = "";
      this.info.form.name = "";
      this.info.form.filter = null;
      this.$nextTick(() => {
        this.$refs["myModel3"].clearValidate();
      });
      this.filterOpts = this.info.filterOptions;
      // this.info.filterOptions = this.info.filterOptions.map(_=>{
      //   _.disabled = false
      //   return _
      // })
    },
    handleEdit(i, row) {
      this.$nextTick(()=>{
        this.$refs['myModel3'].clearValidate();
      })
      this.title = "编辑型号类别"
      this.editMode = 1;
      this.rowid = row.Id;
      //this.info.form.no = row.CategoryNo;
      this.info.form.name = row.CategoryName;
      this.info.form.filter = [String(row.DeptId), String(row.GrandParentId),String(row.ParentId)];
      //this.info.form.dept = row.DeptId.toString()
      this.info.dialogFormVisible = true;
      this.filterOpts = this.info.filterOptions.filter(_=>_.value==row.DeptId);
      this.$emit('checkHasModel',row.Id,assetCategoryTypes.ModelName)
      // this.info.filterOptions = this.info.filterOptions.map(_=>{
      //   if(row.DeptId!=_.value)_.disabled = true
      //   else _.disabled = false
      //   return _
      // })
    },
    handleDelete(i, row) {
      this.rowid = row.Id;
      this.$confirm("是否要删除该名称?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit(
            "delAssetCategory",
            this.rowid,
            assetCategoryTypes.ModelName
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    modelChange(e) {
      let curLabel = this.$refs['myCascader'].getCheckedNodes()[0].pathLabels[1]
      this.info.form.pretext = curLabel.split('|')[0].trim()
    },
    filterChange(e) {}
  }
};
</script>

