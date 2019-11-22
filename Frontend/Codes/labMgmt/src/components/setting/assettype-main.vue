<template>
  <div>
    <el-row>
      <el-input
        v-model="info.filter.name"
        placeholder="请输入名称"
        style="width:500px"
        class="input-with-select"
      >
        <el-select
          clearable
          v-model="info.filter.dept"
          slot="prepend"
          placeholder="请选择部门"
          style="width:120px"
        >
          <el-option
            v-for="item in info.dept"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
          <!-- <el-option label="电气研发" value="1"></el-option>
          <el-option label="机械部门" value="2"></el-option>-->
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="primary" @click="handleAdd" style="margin-left:50px">新增</el-button>
      <!-- <el-button type="primary" @click="info.dialogFormVisible = true" style="margin-left:50px">+ 新增</el-button> -->
    </el-row>
    <el-table :data="info.data" ref="singleTable" border style="width: 100%; margin-top:30px">
      <el-table-column label="序号" type="index" :index="indexMethod" width="80px" />
      <el-table-column prop="CategoryNo" label="分类编号" sortable width="280"></el-table-column>
      <el-table-column prop="CategoryName" label="分类名称" sortable width="280"></el-table-column>
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

    <el-dialog :title="title" :visible="info.dialogFormVisible" :show-close="false" width="500px">
      <el-form
        ref="myModel"
        :model="info.form"
        :rules="rules"
        style="width:400px"
        label-width="100px"
      >
        <el-form-item label="所属部门" prop="dept">
          <el-select
            v-model="info.form.dept"
            :disabled="deptDisabled"
            placeholder="请选择部门"
            style="width:300px"
          >
            <el-option
              v-for="item in info.dept"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别编号" prop="no">
          <el-input
            v-model="info.form.no"
            autocomplete="off"
            :disabled="info.cateDisabled"
            style="width:300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="类别名称" prop="name">
          <el-input v-model="info.form.name" autocomplete="off" style="width:300px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmmit">确 定</el-button>
        <!-- <el-button type="primary" @click="info.dialogFormVisible = false">确 定</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { debuglog } from "util";
import { assetCategoryTypes, assetType } from "../../config/const";
const depts = window.config.depts.sort((t1, t2) => {
  return t1.value - t2.value;
});
export default {
  props: {
    info: {}
  },
  data() {
    let isNumEn = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入数字或英文"));
      } else {
        callback();
      }
    };
    return {
      title: "新增/修改资产大类",
      rowid: null, //每条记录的主键
      editMode: null, //新增或编辑
      deptDisabled: false,
      rules: {
        no: [
          {
            required: true,
            message: "请输入类别编号",
            trigger: ["blur", "change"]
          },
          {
            max: 30,
            message: "长度不能超过30个字符",
            trigger: ["blur", "change"]
          },
          { validator: isNumEn }
        ],
        name: [
          {
            required: true,
            message: "请输入类别名称",
            trigger: ["blur", "change"]
          },
          {
            max: 30,
            message: "长度不能超过30个字符",
            trigger: ["blur", "change"]
          }
        ],
        dept: [
          {
            required: true,
            message: "请选择所属部门",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  watch: {
    // 'info.form.no':function(){
    //   this.info.form.no=this.info.form.no.replace(/[\W]/g,'');
    //   }
  },
  methods: {
    search() {
      this.$emit("search");
    },
    indexMethod(index) {
      return (
        index +
        (this.info.pageInfo.curPage - 1) * this.info.pageInfo.pageSize +
        1
      );
    },
    formatter(row, column) {
      return depts.find(_ => _.value == row.DeptId).label;
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs["myModel"].resetFields();
      });
    },
    handleSizeChange(val) {
      this.$emit("changePageSize", val);
      //this.info.pageSize = val
      this.$emit("getMainTableData");
    },
    handleCurrentChange(val) {
      //this.info.curPage = val;
      this.$emit("changeCurPage", val);
      this.$emit("getMainTableData");
    },
    handleSubmmit() {
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.$emit("addMainCategory");
          } else if (this.editMode == 1) {
            this.$emit("updMainCategory", this.rowid);
          }
          //this.info.dialogFormVisible = false
        }
      });
    },
    handleAdd() {
      this.info.cateDisabled = false;
      this.deptDisabled = false;
      this.title = "新增资产大类";
      this.info.dialogFormVisible = true;
      this.editMode = 0;
      this.rowid = null;
      //this.resetForm()
      this.info.form.no = "";
      this.info.form.name = "";
      this.info.form.dept = null;
      this.$nextTick(() => {
        this.$refs["myModel"].clearValidate();
      });

      //this.info.form = null
      //this.resetForm()
    },
    handleEdit(i, row) {
      this.deptDisabled = true;
      this.title = "编辑资产大类";
      this.editMode = 1;
      this.rowid = row.Id;
      this.info.form.no = row.CategoryNo;
      this.info.form.name = row.CategoryName;
      this.info.form.dept = row.DeptId.toString();
      this.info.dialogFormVisible = true;
      this.info.cateDisabled = true;
      //this.$emit('checkHasModel',row.Id,assetCategoryTypes.LevelOne)
    },
    handleDelete(i, row) {
      this.rowid = row.Id;
      this.$confirm("是否要删除该分类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit("delAssetCategory", this.rowid, assetCategoryTypes.LevelOne);
      });
    }
  }
};
</script>

