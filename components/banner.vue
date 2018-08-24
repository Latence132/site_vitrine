<template lang="pug">
v-layout(id="banner" class="ma-0 pa-0 posAbsoluteVideo")
	v-flex(xs12 class="ma-0 pa-0")
		video-bg(class="ma-0 pa-0" :sources="['/bg-2.ogg','/bg-2.mp4','/bg-2.webm']" img="/mer_ecran1.png")
			v-flex(xs12 class="text-xs-center ma-0 pa-0 posAbsolute"  :style="textSize") Bienvenue sur le site de Alexandre Chaumet,<br/>développeur web

</template>

<script>
import VideoBg from 'vue-videobg/src/VideoBackground.vue'

export default {
	components: {
		VideoBg
	},
  computed: {
    textSize() {
      switch ( this.$vuetify.breakpoint.name ) {
        case 'xs':
          return 'font-size: 18px;'
        case 'sm':
          return 'font-size: 20px;'
        case 'md':
          return 'font-size: 26px;'
        case 'lg':
          return 'font-size: 38px;'
        case 'xl':
          return 'font-size: 44px;'
      }
    }
	}
}
</script>

<style lang="stylus" scoped>
.posAbsolute
	position: absolute
	width: 100%
	margin: 0 auto
	top: 42%

#banner
	width: 100%
	color: white
	font-family: 'Dosis', sans-serif

.posAbsoluteVideo
	position: absolute
	top: 0
	left: 0

</style>
