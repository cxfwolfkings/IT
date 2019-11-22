<template>
  <el-dialog :title="title" :visible="dialogVisible" :show-close="false" width="500px">
    <el-form ref="myModel" :model="form" :rules="rules" size="small" label-width="100px">
      <el-form-item label="账号" prop="AccountNo">
        <el-input v-model="form.AccountNo" autocomplete="off" :maxlength="20" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="显示名称" prop="AccountName">
        <el-input v-model="form.AccountName" autocomplete="off" :maxlength="50" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Password">
        <el-input
          v-model="form.Password"
          autocomplete="off"
          :maxlength="12"
          :minlength="6"
          style="width:300px"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item label="重复密码" prop="RepeatPassword">
        <el-input
          v-model="form.RepeatPassword"
          autocomplete="off"
          :maxlength="12"
          :minlength="6"
          style="width:300px"
          show-password
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visibleSelf = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import AuthorityService from "../../apis/AuthorityService";
import { setTimeout } from "timers";
import { trimForm } from "../../utils/helper";

export default {
  name: "UserDialogCreate",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    account: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      title: "添加",
      form: {
        AccountNo: "",
        AccountName: "",
        Password: "",
        RepeatPassword: ""
      },
      rules: {
        AccountNo: [
          { required: true, message: "请输入账号", trigger: ["blur", "change"] }
        ],
        AccountName: [
          { required: true, message: "请输入名称", trigger: ["blur", "change"] }
        ],
        Password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          { min: 6, message: "最少输入6位密码", trigger: ["blur", "change"] },
          { validator: this.validatePwdRule, trigger: ["blur", "change"] }
        ],
        RepeatPassword: [
          {
            required: true,
            message: "请重复输入密码",
            trigger: ["blur", "change"]
          },
          { validator: this.isvalidatePwd, trigger: ["blur", "change"] }
        ]
      }
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
        const base = this;
        this.title = (this.account && "编辑") || "添加";
        this.form.Id = (this.account && this.account.Id) || 0;
        this.form.AccountNo = this.account && this.account.AccountNo;
        this.form.AccountName = this.account && this.account.AccountName;
        this.form.Password = this.account && this.account.Password;
        this.form.RepeatPassword = this.account && this.account.Password;
        setTimeout(() => {
          base.$refs["myModel"] && base.$refs["myModel"].clearValidate();
        }, 0);
      }
    }
  },
  mounted() {},
  methods: {
    isvalidatePwd(rule, value, callback) {
      if (value !== this.form.Password) {
        callback(new Error("两次输入密码不一致！"));
      } else {
        callback();
      }
    },
    validatePwdRule(rule, value, callback) {
      // const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]");
      const pattern = new RegExp(/[^\a-\z\A-\Z0-9_]/);
      const result = value.match(pattern);
      if (result) {
        callback(new Error("密码只能输入字母、数字和下划线"));
      } else {
        callback();
      }
    },
    handleSubmit() {
      const that = this;
      this.$refs["myModel"].validate(valid => {
        if (valid) {
          trimForm(this.form);
          if (this.account) {
            AuthorityService.updAccount(this.form).then(() => {
              this.visibleSelf = false;
              this.$message({
                type: "success",
                message: "更新成功",
                duration: 1000,
                onClose: function() {
                  that.$emit("refresh");
                }
              });
            });
          } else {
            AuthorityService.addAccount(this.form).then(() => {
              this.visibleSelf = false;
              this.$message({
                type: "success",
                message: "添加成功",
                duration: 1000,
                onClose: function() {
                  that.$emit("refresh");
                }
              });
            });
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 24px;
}
</style>
