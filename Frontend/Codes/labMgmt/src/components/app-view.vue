<template>
  <el-container style=" margin:0 auto; height: 100%">
    <topNav />
    <el-row style="margin-top: 50px; height: 100%">
      <el-col :lg="3" :md="4" style="position:fixed; top: 50px; bottom: 0px">
        <sidebar style="width:auto" />
      </el-col>
      <el-col :lg="21" :md="20" class="mainContent">
        <el-container
          class="main-content"
          style="margin-top: 9px; margin-left: 9px; padding: 0px; height: 90%; overflow-y: auto; overflow-x: hidden"
        >
          <router-view v-if="isRouterAlive" :key="$route.path + $route.query.t"></router-view>
        </el-container>
      </el-col>
    </el-row>
    <p style="height:30px"></p>
    <el-footer class="text-center"></el-footer>
  </el-container>
</template>

<script>
import sidebar from "./shared/sideBar.vue";
import topNav from "./shared/topNav.vue";
import "@/assets/css/site.css";

export default {
  name: "app",
  components: {
    sidebar,
    topNav
  },
  data: () => ({
    show: true,
    isRouterAlive: true
  }),
  mounted() {
    if (window.ActiveXObject || "ActiveXObject" in window) {
      document.querySelector(".mainContent").classList.add("fix");
    }
  },
  watch: {
    // 利用watch方法检测路由变化：
    $route: function(to, from) {
      // 拿到目标参数 to.query.id 去再次请求数据接口
      //console.log(to);
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    }
  }
};
</script>
