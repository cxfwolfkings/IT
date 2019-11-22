<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>基本信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider>-->
    <el-form
      ref="myForm"
      :model="form"
      :rules="rules"
      label-width="150px"
      style="width:50%;margin-top:50px"
    >
      <el-form-item label="部门">
        <el-col :span="15">
          <el-input :readonly="true" v-model="form.dept"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="工号">
        <el-col :span="15">
          <el-input :readonly="true" v-model="form.accountNo"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="账号名">
        <el-col :span="15">
          <el-input :readonly="true" v-model="form.accountName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="电话号码" prop="phoneNumber">
        <el-col :span="15">
          <el-input v-model.number="form.phoneNumber"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" @click="handleSubmit" style="width:150px">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uService from "../../apis/UserCenterService";
import { mapState } from "vuex";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      form: {
        accountNo: "",
        accountName: "",
        phoneNumber: "",
        dept:""
      },
      rules: {
        phoneNumber: [{ validator: checkPhone, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState({
      auser(state) {
        // console.log("home state", state.user.user)
        return state.user.user;
      }
    })
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let params = {};
      params.AccountNo = this.auser.AccountNo;
      uService.getUserInfo(params).then(res => {
        this.form.phoneNumber = res.PhoneNumber;
        this.form.accountNo = this.auser.AccountNo;
        this.form.accountName = this.auser.AccountName;
        this.form.dept = window.config.depts.find(_=>_.value == res.DepartmentNo).label
      });
    },
    handleSubmit() {
      this.$refs["myForm"].validate(valid => {
        if (valid) {
          let params = {};
          params.AccountNo = this.auser.AccountNo;
          params.PhoneNumber = this.form.phoneNumber;
          uService.setUserInfo(params).then(res => {
            this.$message({ type: "success", message: "操作成功！" });
          });
        }
      });
    }
  }
};
</script>