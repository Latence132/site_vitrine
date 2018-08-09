<template lang="pug">
v-layout.posFixed(id="toolbar" wrap  v-scroll="onScroll" @mouseover="toolbar = true" @mouseleave="toolbar = false")
	transition(name="fade")
		v-toolbar.transparent(v-if="toolbar")
			v-layout(wrap row justify-space-between align-center )
				v-flex(xs4 sm2 class="text-xs-center ma-0 pa-0")
					v-btn.colorWhite(flat outline  class="ma-0 pa-0" :style="textSize") Acceuil
				v-flex(xs8 sm10 class="text-xs-center ma-0 pa-0")
					v-toolbar-items.transparent.colorWhite
						v-layout(wrap row justify-end align-center )
							v-flex(xs6 sm2  class="text-xs-center mx-auto" :style="flexSize")
								v-btn.colorWhite(flat :style="textSize") Salut
							v-flex(xs6 sm2  class="text-xs-center mx-auto" :style="flexSize")
								v-btn.colorWhite(flat :style="textSize") coucou
							v-flex(xs6 sm2  class="text-xs-center mx-auto" :style="flexSize")
								v-btn.colorWhite(flat :style="textSize") hello
							v-flex(xs6 sm2  class="text-xs-center mx-auto" :style="flexSize")
								v-btn.colorWhite(flat :style="textSize")
									img(src="/linkedin.jpg" :height="iconSize")
</template>

<script>
export default {
  data() {
    return {
      toolbar: true
    }
  },
  methods: {
    onScroll() {
      this.toolbar = !( window.scrollY > 50 )
    }
  },
  computed: {
    iconSize() {
      switch ( this.$vuetify.breakpoint.name ) {
        case 'xs':
          return '20px;'
        default:
          return '35px;'
      }
    },
    flexSize() {
      switch ( this.$vuetify.breakpoint.name ) {
        case 'xs':
          return 'height: 20px;'
        default:
          return 'height: 35px;'
      }
    },
    textSize() {
      switch ( this.$vuetify.breakpoint.name ) {
        case 'xs':
          return 'font-size: 10px; min-width: 0;'
        default:
          return 'font-size: 17px; min-width: 0;'
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
div
  border: 1px solid red




#toolbar
  color: white
  z-index: 99

.colorWhite
  color: white

.transparent
  background-color: transparent !important

.fade-enter-active .fade-leave-active
  transition: opacity .8s

.fade-enter
  opacity: 0

.fade-leave-to
  animation: bounce-out .3s

@keyframes bounce-out
  0%
    transform: scale(1);
  10%
    transform: scale(0.9)
  20%
    transform: scale(0.8)
  30%
    transform: scale(0.4)
  100%
    transform: scale(0)

</style>
