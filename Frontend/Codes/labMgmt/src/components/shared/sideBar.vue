<template>
  <el-aside
    class="siderBar"
    style="margin-left:0px;margin-top:9px;height:100%; background-color:#556b80"
  >
    <el-menu
      :default-active="activeName"
      :router="true"
      :unique-opened="true"
      class
      style="background-color:#556b80"
      @select="handleSelect"
    >
      <div v-for="menu in allMenus" :key="menu.id" style="font-size:14px">
        <el-menu-item :index="menu.url" ref="menu" :key="menu.id" v-if="menu.subMenus.length == 0">
          <i :class="menu.icon"></i>
          <span slot="title">{{menu.name}}</span>
        </el-menu-item>
        <el-submenu v-else :index="String(menu.name)">
          <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.name}}</span>
          </template>
          <el-menu-item
            v-for="mn in menu.subMenus"
            :key="mn.id"
            :index="mn.url"
            class="text-left"
            style="padding-left:52px"
          >
            <span style="font-size:14px">{{mn.name}}</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from "vuex";

const activeNames = {
  "/asset/assetEdit": "/asset/regist",
  "/asset/discardEdit": "/asset/discard",
  "/asset/compEdit": "/asset/compose"
};

export default {
  data() {
    return {
      activeName: activeNames[this.$route.path] || this.$route.path
    };
  },
  computed: {
    ...mapState({
      allMenus(state) {
        const menus = state.user.user.Permissions.map(_ => {
          return {
            id: _.Id,
            name: _.PermissionName,
            url: _.PermissionUrl,
            icon: _.PermissionIcon,
            parent: _.ParentId
          };
        });
        const pm = menus.filter(x => (x.parent || 0) === 0);
        pm.forEach(m => {
          m.subMenus = menus.filter(x => x.parent === m.id);
        });
        return pm;
      }
    })
  },
  created: function() {},
  mounted() {},
  watch: {
    $route: function(to, from) {
      if (from.name == "home") {
        this.activeName = activeNames[to.path] || to.path;
      }
      if (to.name == "home") {
        this.activeName = "/";
      }
    }
  },
  methods: {
    handleSelect(index, indexPath, vue) {
      //this.$refs["menu"][0].$el.className = "active1";
      this.activeName = index;
    }
  }
};
</script>
