<template>
  <div>
    <el-row>
      <el-cascader
        style="width:400px"
        v-model="info.filter"
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
      <el-table-column prop="CategoryNo" label="子类编号" sortable width="180"></el-table-column>
      <el-table-column prop="CategoryName" label="子类名称" sortable width="180"></el-table-column>
      <el-table-column prop="ParentName" label="资产大类" sortable width="180"></el-table-column>
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
        ref="myModel2"
        :model="info.form"
        :rules="rules"
        style="width:400px"
        label-width="100px"
      >
        <el-form-item label="所属分类" prop="filter">
          <el-cascader
            :disabled="info.cateDisabled"
            style="width:300px"
            ref="myCascader"
            @change="cateChange"
            expand-trigger="hover"
            :options="filterOpts"
            v-model="info.form.filter"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="子类编号" prop="no">
          <el-input
            :disabled="info.cateDisabled"
            v-model="info.form.no"
            autocomplete="off"
            style="width:300px"
          >
            <template v-if="editMode==0" slot="prepend">
              <div class="pretext">{{info.form.pretext}}</div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="子类名称" prop="name">
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
    let isNumEn = (rule, value, callback) => {
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入数字或英文"));
      } else {
        callback();
      }
    };
    return {
      filterOpts: [],
      title: "",
      rowid: null, //每条记录的主键
      editMode: null, //新增或编辑
      rules: {
        no: [
          {
            required: true,
            message: "请输入子类编号",
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
            message: "请输入子类名称",
            trigger: ["blur", "change"]
          },
          ,
          {
            max: 30,
            message: "长度不能超过30个字符",
            trigger: ["blur", "change"]
          }
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
    this.$emit("SubPageInit");
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
        this.$refs["myModel2"].resetFields();
      });
    },
    handleSizeChange(val) {
      this.$emit("changePageSize", val);
      //this.info.pageSize = val
      this.$emit("getSubTableData");
    },
    handleCurrentChange(val) {
      //this.info.curPage = val;
      this.$emit("changeCurPage", val);
      this.$emit("getSubTableData");
    },
    handleSubmmit() {
      this.$refs["myModel2"].validate(valid => {
        if (valid) {
          if (this.editMode == 0) {
            this.$emit("addSubCategory");
          } else if (this.editMode == 1) {
            this.$emit("updSubCategory", this.rowid);
          }
          //this.info.dialogFormVisible = false;
        }
      });
    },
    handleAdd() {
      this.info.cateDisabled = false;
      this.filterOpts = this.info.filterOptions;
      this.title = "新增小分类";
      this.editMode = 0;
      this.info.dialogFormVisible = true;
      //this.resetForm();
      this.info.form.pretext = null;
      this.rowid = null;
      this.info.form.no = "";
      this.info.form.name = "";
      this.info.form.filter = null;
      this.$nextTick(() => {
        this.$refs["myModel2"].clearValidate();
      });

      // this.info.filterOptions = this.info.filterOptions.map(_=>{
      //   _.disabled = false
      //   return _
      // })
    },
    handleEdit(i, row) {
      // this.$nextTick(()=>{

      // })
      this.$nextTick(() => {
        this.$refs["myModel2"].clearValidate();
      });
      this.filterOpts = this.info.filterOptions.filter(
        _ => _.value == row.DeptId
      );
      this.title = "编辑小分类";
      this.editMode = 1;
      this.rowid = row.Id;
      this.info.form.no = row.CategoryNo;
      this.info.form.name = row.CategoryName;
      this.info.form.filter = [row.DeptId.toString(), row.ParentId.toString()];
      this.info.dialogFormVisible = true;
      this.info.cateDisabled = true;
      //this.$emit("checkHasModel", row.Id, assetCategoryTypes.LevelTwo);
    },
    handleDelete(i, row) {
      this.rowid = row.Id;
      this.$confirm("是否要删除该子类?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$emit(
            "delAssetCategory",
            this.rowid,
            assetCategoryTypes.LevelTwo
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cateChange(e) {
      if (this.editMode == 0) {
        let no = this.info.filterOptions
          .find(_ => _.value == e[0])
          .children.find(_ => _.value == e[1]).remark;
        this.info.form.pretext = no;
      }
      // let curLabel = this.$refs['myCascader'].getCheckedNodes()[0].pathLabels[1]
      // this.info.form.pretext = curLabel.split('|')[0].trim()
    },
    filterChange(e) {}
  }
};
</script>
<style>
.pretext {
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
