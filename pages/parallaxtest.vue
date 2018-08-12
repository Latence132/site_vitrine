<template lang="pug">
v-layout(wrap column)
	v-parallax(src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" :height="screenHeight") {{ screenHeight }}
	v-parallax(src="/mer_ecran1.png" :height="screenHeight") {{ screenHeight }}
	v-parallax(src="/nathan-anderson-218687-unsplash.jpg" :height="screenHeight") {{ screenHeight }}
</template>

<script>
export default {
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
