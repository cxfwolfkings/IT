<template>
  <el-dialog title="修改密码" :visible.sync="dialogVisible" width="500px">
    <el-form ref="myModel" :model="form" :rules="rules" status-icon label-width="100px">
      <el-form-item label="旧密码" prop="OldPassword">
        <el-input v-model="form.OldPassword" autocomplete="off" style="width:300px" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="NewPassword">
        <el-input v-model="form.NewPassword" autocomplete="off" style="width:300px" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="RepeatPassword">
        <el-input
          v-model="form.RepeatPassword"
          autocomplete="off"
          style="width:300px"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import { mapState } from "vuex";
import { setTimeout } from "timers";
export default {
  props: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.RepeatPassword !== "") {
          this.$refs.myModel.validateField("RepeatPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.NewPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      dialogVisible: false,
      form: {
        OldPassword: "",
        NewPassword: "",
        RepeatPassword: ""
      },
      rules: {
        OldPassword: [
          {
            required: true,
            message: "请输入旧密码",
            trigger: ["blur", "change"]
          }
        ],
        NewPassword: [
          { validator: validatePass, trigger: "blur" }
          // {
          //   required: true,
          //   message: "请输入新密码",
          //   trigger: ["blur", "change"]
          // }
        ],
        RepeatPassword: [
          { validator: validatePass2, trigger: "blur" }
          // {
          //   required: true,
          //   message: "请重复输入新密码",
          //   trigger: ["blur", "change"]
          // }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          let params = {
            Id: this.auser.Id,
            Password: this.form.OldPassword,
            NewPassword: this.form.NewPassword,
            RepeatPassword: this.form.RepeatPassword
          };
          AuthorityService.changePassword(params).then(res => {
            debugger;
            this.$message({ type: "success", message: "修改成功！" });
            this.dialogVisible = false;
          });
        }
      });
    }
  },
  created() {
    this.$on("open", function() {
      debugger
      this.dialogVisible = true;
      if(this.$refs["myModel"]!==undefined)
      {
        this.$refs["myModel"].resetFields();
      }
      
    });
  },
  computed: {
    ...mapState({
      auser(state) {
        // console.log("home state", state.user.user)
        return state.user.user;
      }
    })
  }
};
</script>