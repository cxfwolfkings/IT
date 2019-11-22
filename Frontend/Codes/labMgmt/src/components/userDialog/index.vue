<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="900px"
  >
    <div class="diaolog-header">
      <el-row>
        <el-col :span="11" :offset="1">
          <el-input
            v-model="searchCondition"
            placeholder="请输入工号或姓名"
            prefix-icon="el-icon-search"
            size="small"
            :clearable="true"
          />
        </el-col>
        <!-- offset属性表示距左侧距离 -->
        <el-col :span="11" :offset="1">
          <el-button
            style="margin-left: 6px"
            size="small"
            type="primary"
            icon="el-icon-search"
            @click="search()"
          >查询</el-button>
        </el-col>
      </el-row>
      <br />
      <el-row v-loading="loading">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="AccountNo" label="工号" width="180"></el-table-column>
          <el-table-column prop="AccountName" label="姓名" width="180"></el-table-column>
          <el-table-column prop="DepartmentName" label="部门" width="180"></el-table-column>
          <el-table-column label="可见部门" width="240">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.AuthorityDepts"
                multiple
                collapse-tags
                clearable
                placeholder="请选择"
                @change="deptChange(scope.row)"
              >
                <el-option
                  v-for="item in depts"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!--Pagination-->
      <div class="pagination-container">
        <el-pagination
          :current-page="listQuery.PageIndex"
          :page-sizes="[10,20,30,50]"
          :page-size="listQuery.PageSize"
          :total="total"
          :background="true"
          :small="true"
          layout="total, sizes, prev, pager, next, jumper"
          style="min-height: 33px; margin-top: 20px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleClear()">取消</el-button>
      <el-button size="small" type="primary" @click="handleSubmit()">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import { trim } from "../../utils/helper";

const depts = window.config.depts.sort((t1, t2) => {
  return t1.value - t2.value;
});

export default {
  name: "UserDialogIndex",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    laboratoryId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      title: "用户选择",
      searchCondition: "",
      depts: depts,
      form: {
        formPrototype: {
          labelWidth: "80px",
          labelPosition: "right",
          inline: false
        }
      },
      tableData: [],
      listQuery: {
        PageIndex: 1,
        PageSize: 10,
        Keywords: "",
        LaboratoryId: this.laboratoryId
      },
      total: 0,
      multipleSelection: [],
      loading: false
    };
  },
  computed: {
    visibleSelf: {
      get: function() {
        return this.dialogVisible;
      },
      set: function(newValue) {
        this.$emit("visible", newValue);
      }
    }
  },
  watch: {
    dialogVisible: function(newVal, oldVal) {
      if (newVal) {
        this.searchCondition = "";
        this.total = 0;
        this.tableData = [];
        this.listQuery.PageIndex = 1;
        this.listQuery.AccountNo = "";
        this.listQuery.AccountName = "";
        this.listQuery.LaboratoryId = this.laboratoryId;
        this.search();
      }
    }
  },
  mounted() {},
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSubmit() {
      // 传参给父组件
      if (this.multipleSelection && this.multipleSelection.length) {
        this.$emit("output-users", this.multipleSelection);
        this.visibleSelf = false;
      } else {
        this.$message({ type: "error", message: "请选择管理员！" });
      }
    },
    handleClear() {
      this.visibleSelf = false;
    },
    search() {
      this.listQuery.Keywords = trim(this.searchCondition);
      this.queryUsers();
    },
    queryUsers() {
      const base = this;
      this.loading = true;
      AuthorityService.getUsers(this.listQuery).then(res => {
        base.loading = false;
        this.total = res.Total;
        res.Data.forEach(_ => {
          _.DepartmentName = depts.find(d => d.value === _.DepartmentNo).label;
        });
        this.tableData = res.Data;
      });
    },
    handleSizeChange(val) {
      this.listQuery.PageSize = val;
      this.queryUsers();
    },
    handleCurrentChange(val) {
      this.listQuery.PageIndex = val;
      this.queryUsers();
    },
    deptChange(row) {
      // console.log(row)
      if (!row.AuthorityDepts.includes(row.DepartmentNo)) {
        row.AuthorityDepts.push(row.DepartmentNo);
      }
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
