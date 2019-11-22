<template>
  <div id="app" style="height:100%; overflow: hidden;">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "app",
  created: function() {
    this.checkState(); // 页面刷新重置store中的数据
    // console.log("app vue created", this.$store.state.user)
  },
  mounted: function() {
    // console.log("app vue mounted")
  },
  methods: {
    ...mapMutations({
      saveUser: "SET_LOGIN_USER"
    }),
    checkState: function() {
      var userInfo = sessionStorage.getItem("user");
      if (userInfo && this.$store.user) return;
      if (userInfo) this.saveUser(JSON.parse(userInfo));
    }
  }
};
</script>
