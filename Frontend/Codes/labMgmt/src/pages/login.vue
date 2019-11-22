<template>
  <div class="fullscreen">
    <div class="bgContainer">
      <div class="login-box">
        <div class="logorow" style="overflow:hidden;">
          <div
            style="text-align: center; width:70px; float:left; margin-top: 10px; margin-left:15px"
          >
            <img src="../assets/logo.png" alt style="width:70px;" />
          </div>
          <p
            class="text-tips"
            style="margin-top:26px;font-size:24px; text-align:left; font-weight: bold"
          >先导实验室管理系统</p>
        </div>
        <form
          action
          class="login-form"
          style="padding-left:10px;padding-right:10px; margin-top: 10px"
        >
          <div class="m-list-group">
            <div class="m-list-group-item">
              <input
                type="text"
                placeholder="请输入用户名"
                class="m-input"
                v-model="username"
                style="background: #e7e7e7"
              />
              <span class="el-input__prefix">
                <i class="el-input__icon el-icon-name"></i>
              </span>
            </div>
            <div class="m-list-group-item" style="margin-top: 24px">
              <input
                type="password"
                placeholder="请输入密码"
                class="m-input"
                v-model="password"
                style="background: #e7e7e7"
              />
              <span class="el-input__prefix">
                <i class="el-input__icon el-icon-pwd"></i>
              </span>
            </div>
            <div
              class="m-list-group-item"
              style="margin-top: 24px; background-color: white; border: 0; padding-left: 0px"
            >
              <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
          </div>
          <button class="m-btn sub select-none" @click.prevent="handleLogin" v-loading="isLoging">登录</button>
        </form>
        <div style="margin-top: 30px"></div>
        <p class="text-tips">
          <!-- <i class="fa fa-meetup" style="color: #29ABE2"></i>&nbsp;
          <span class="footer-text">
            {{appName}} &nbsp;
            <el-tag size="mini">{{version}}</el-tag>
            <br />
            ©make by {{author}}
          </span>-->
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import AuthorityService from "../apis/AuthorityService";
import { setCookie, getCookie, delCookie } from "../utils/helper";
import "../assets/css/pages/login.css";

export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      isLoging: false,
      author: window.APP_INFO.author,
      version: window.APP_INFO.version,
      appName: window.APP_INFO.appName,
      checked: false
    };
  },
  mounted() {
    var userInfo = getCookie("labAccount");
    if (userInfo && userInfo.indexOf("|") > 0) {
      this.username = userInfo.split("|")[0];
      this.password = userInfo.split("|")[1];
    }
  },
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      if (!this.username || !this.password) {
        return this.$message.warning("用户名和密码不能为空");
      }
      this.isLoging = true;
      AuthorityService.login({
        username: this.username,
        password: this.password
      }).then(
        res => {
          // this.$message.success('登录成功')
          this.login(res);
          if (this.checked) {
            setCookie("labAccount", this.username + "|" + this.password);
          }
          this.$router.push({ name: "home" });
          this.isLoging = false;
        },
        err => {
          // this.$message.error(err)
          console.log(err);
          delCookie("labAccount");
          this.isLoging = false;
        }
      );
    }
  }
};
</script>
