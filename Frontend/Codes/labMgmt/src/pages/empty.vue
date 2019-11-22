<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'empty',
  created () {
    // then replace your route (with same component)
    this.$router.replace({
      name: this.$route.params.name,
      params: this.$route.params.data
    })
  }
}
</script>
