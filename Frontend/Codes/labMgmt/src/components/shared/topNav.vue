<template>
  <div>
    <el-header style="padding:0; background:#fff; height:50px; position: fixed; width: 100%;">
      <el-row class="topNavRow">
        <el-col :span="2">
          <img
            src="../../assets/logo.png"
            class="logo"
            style="width:80px; height: 50px; margin-left: 40px"
          />
        </el-col>
        <el-col :span="9" style="height:50px; line-height:50px">
          <h3 class="org" style="margin-top:0px">先导智能实验室管理系统</h3>
        </el-col>
        <el-col :span="13" class="text-right" style="height:50px; line-height:50px">
          <el-row>
            <el-col :span="21">
              <el-avatar size="small" :src="avatorUrl" style="margin-top:11px"></el-avatar>
            </el-col>
            <el-col :span="3">
              <el-dropdown
                style="margin-left:10px; margin-right:20px; cursor: pointer;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:93%"
                @command="handleCommand"
              >
                <span class="el-dropdown-link">
                  {{auser.AccountName}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user" v-show="auser.Role.RoleName=='工程师'" command="userCenter">个人中心</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-key" v-show="auser.Role.RoleName!='公共机账号'" command="changePassword">修改密码</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-switch-button" command="logout">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <changePassDia ref="passform" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import changePassDia from "../userDialog/modifyPass";

export default {
  data: () => ({
    avatorUrl:
      "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2554408347,3908110233&fm=26&gp=0.jpg"
  }),
  components: {
    changePassDia
  },
  computed: {
    ...mapState({
      auser(state) {
        //console.log("home state", state.user.user);
        return state.user.user;
      }
    })
  },
  methods: {
    open() {
      this.$refs.passform.$emit("open");
    },
    handleCommand(command) {
      console.log(command);
      switch (command) {
        case "logout":
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          this.$router.push({ name: "login" });
          break;
        case "changePassword":
          this.open();
          break;
        case "userCenter":
          this.$router.push({ name: "ucenter_borrowHistory" });
          break;
      }
    }
  }
};
</script>
