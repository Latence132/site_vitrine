<template lang="pug">
v-layout.pa-0.ma-0(wrap column)
	menuNav
	// v-parallax.pa-0.ma-0(id="slide1" src="/mer_ecran1.png" :height="screenHeight")
	// 	banner
	// v-parallax(id="slide2" src="/nathan-anderson-218687-unsplash_1400pxh.jpg" :height="screenHeight")
	// 	presentation
	v-parallax.pa-0.ma-0(id="slide3" src="/mer_ecran1.png" :height="screenHeight")
		OSM
</template>

<script>
import banner from "~/components/banner.vue"
import menuNav from "~/components/menuNav.vue"
import presentation from "~/components/presentation.vue"
import OSM from "~/components/OSM.vue"
export default {
  components: {
    banner,
    menuNav,
    presentation,
		OSM
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
    // console.log( window.innerHeight )
    this.screenWindow = window.innerHeight
    this.resizeEvent = () => {
      // console.log( 'resize : ' + window.innerHeight )
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
