<template lang="pug">
v-layout.posRelative(column )
	video(height="100%" width="100%" loop)
		source(src="/bg-2.ogg" type='video/ogg')
		source(src="/bg-2.mp4" type='video/mp4')
		source(src="/bg-2.webm" type='video/webm')
		source(src="/bg-2.avi" type='video/avi')
	v-layout.posAbsolute(row class="text-xs-center ma-0 pa-0" )
		v-flex(class="ma-0 pa-0")
			span(id='titre' :style="texteSize") Bienvenue sur le site de Alexandre Chaumet,<br/>développeur web
</template>

<script>
export default {
  computed: {
    texteSize() {
      switch ( this.$vuetify.breakpoint.name ) {
        case 'xs':
          return 'font-size: 12px;'
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

.posRelative
	position: relative
	width: 100%

#titre
	color: white
	font-family: 'Dosis', sans-serif

.noMargin
	margin: 0
	padding: 0

</style>
