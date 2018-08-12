<template lang="pug">
v-layout.pa-0.ma-0(wrap column)
	menuNav
	v-container.pa-0.ma-0(fluid )
		v-flex.pa-0.ma-0
			v-parallax.pa-0.ma-0(id="slide1" :height="screenHeight")
				banner
	v-container.pa-0.ma-0(fluid )
		v-flex.pa-0.ma-0
			v-parallax.pa-0.ma-0(id="slide2" src="/nathan-anderson-218687-unsplash.jpg" :height="screenHeight")
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
  },
  data() {
    return {
      screenWindow: 500
    }
  },
  computed: {
    screenHeight() {
      return this.screenWindow
    }
  },
  mounted() {
    console.log( window.innerHeight )
    this.screenWindow = window.innerHeight
    this.resizeEvent = () => {
      console.log( 'resize : ' + window.innerHeight )
      this.screenWindow = window.innerHeight
    }
    window.addEventListener( 'resize', this.resizeEvent )
  },
  destroy() {
    window.removeEventListener( 'resize', this.resizeEvent )
  }
}
</script>

<style lang="stylus">

</style>
