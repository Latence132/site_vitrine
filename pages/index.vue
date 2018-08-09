<template lang="pug">
v-layout(column)
	menuNav
	banner
	presentation
</template>

<script>
import banner from "~/components/banner.vue"
import menuNav from "~/components/menuNav.vue"
import presentation from "~/components/presentation.vue"
export default {
  components: {
    banner,
    menuNav,
    presentation
  }
}
</script>

<style lang="stylus">
</style>
