<template>
  <div class="fullWidth">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top:10px">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      <el-breadcrumb-item>建议和帮助</el-breadcrumb-item>
    </el-breadcrumb>
    <el-divider class="divider"></el-divider> -->

    <el-form
      ref="myForm"
      :model="form"
      :rules="rules"
      label-width="150px"
      style="width:65%;margin-top:50px"
    >
      <el-form-item label="帮助和建议" prop="content">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="输入一些建议和帮助，能让我们更好的完善系统"
          v-model="form.content"
        ></el-input>
      </el-form-item>
      <el-form-item label>
        <el-button :loading="loading" type="success" plain @click="handleSubmit" style="width:150px">提 交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uService from "../../apis/UserCenterService";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading:false,
      form: {
        accountNo: "",
        accountName: "",
        content: ""
      },
      rules: {
        content: [
          { required: true, message: "请输入一些建议吧( •́ .̫ •̀ )", trigger: "blur" },
          { min: 10,max:500, message: "长度要大于 10 个字符哦", trigger: "blur" }
        ]
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
  mounted() {},
  methods: {
    handleSubmit() {
      this.$refs["myForm"].validate(valid => {
        if (valid) {
          let params = {};
          params.AccountNo = this.auser.AccountNo;
          params.Content = this.form.content
          uService.addSuggestion(params).then(res => {
            this.$message({ type: "success", message: "提交成功！非常感谢您的建议！" });
            this.$refs.myForm.resetFields(); 
          });
          this.loading=true
        }
      });
    }
  }
};
</script>