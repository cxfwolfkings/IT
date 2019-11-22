<template>
  <el-cascader
    v-model="info.filter"
    expand-trigger="hover"
    :options="info.filterOptions"
    :props="{ checkStrictly: true }"
    clearable
    style="width:400px"
    @change="filterChange"
  ></el-cascader>
</template>
<script>
import { assetCategoryTypes } from "../../config/const";
export default {
    data(){
        return{
            info:"",

        }
    }
}
</script>