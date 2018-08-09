<template lang="pug">
v-layout(column)
	menuNav
	banner
</template>

<script>
import banner from "~/components/banner.vue"
import menuNav from "~/components/menuNav.vue"
export default {
  components: {
    banner,
    menuNav
  }
}
</script>

<style lang="stylus">
</style>
