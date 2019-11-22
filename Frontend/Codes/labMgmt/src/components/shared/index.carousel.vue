<template>
  <el-carousel indicator-position="outside"
               :height="bannerHeight + 'px'"
               style="width:100%">
    <el-carousel-item v-for="item in banners"
                      :key="item.id">
      <el-image style="width: 100%; height: 300px"
                :src="item.url"
                fit="cover">
      </el-image>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data: () => ({
    banners: [
      { url: "https://img.tukuppt.com/bg_grid/00/03/30/DSTRZ3a11t.jpg!/fh/350", id: 1 },
      { url: "https://img.tukuppt.com/bg_grid/00/03/67/Fp1rKGBYhX.jpg!/fh/350", id: 2 },
      { url: "https://img.tukuppt.com/bg_grid/00/03/29/4oXYBULioJ.jpg!/fh/350", id: 3 }
    ],
    bannerHeight: 250
  })
}
</script>
