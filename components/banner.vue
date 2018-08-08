<template lang="pug">
v-layout.posRelative(column justify-center)
	v-flex(xs12)
		video(height="100%" width="100%" autoplay loop)
			source(src="/bg-2.mp4" type='video/mp4')
			source(src="/bg-2.webm" type='video/webm')
	v-layout.posAbsolute(row style="border: 1px solid green;" class="text-xs-center" )
		v-flex(style="border: 1px solid red;" )
			span(id='titre' style="border: 1px solid blue" :style="texteSize") Bienvenue sur le site de Alexandre Chaumet,<br/>développeur web
</template>

<script>
export default {
	computed: {
		texteSize () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'font-size: 12px;'
        case 'sm': return 'font-size: 20px;'
        case 'md': return 'font-size: 26px;'
        case 'lg': return 'font-size: 38px;'
        case 'xl': return 'font-size: 44px;'
      }
    }
	},
	head: {
		// Open Street Map's CSS
		link: [
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Dosis'
			}
		]
	},
}
</script>

<style lang="stylus" scoped>
.posAbsolute
	position: absolute
	width: 100%
	margin: 0 auto

.posRelative
	position: relative

#titre
	color: white
	font-family: 'Dosis', sans-serif

</style>
