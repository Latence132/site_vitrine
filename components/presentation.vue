<template lang="pug">
v-layout(id="presentation" wrap row :style="textSize"  class='text-xs-center color--white')
	//  :style="{ backgroundImage: `url('${bgImage3}')`, backgroundSize: 'cover' }"
	v-flex(id="stars" xs12 )
		vue-particles(color="#dedede" style="height : 300px;" hoverMode="repulse" :moveSpeed="2" :lineLinked="false")
		v-btn( @click="show = !show") {{ show }}
		transition(name="slideIn")
			v-flex(id="penchee" v-if="show") {{ presentation}}<br/>{{ intro }}
</template>

<script>
export default {
  data() {
    return {
      presentation: "Présentation",
      intro: "Après avoir travaillé quelques années en tant que prestataire informatique, j\'ai décidé je me reconvertir au métier de développeur web.\n J\'ai commencé par des leçons sur Openclassrooms puis continué avec l\'IFPA Bordeaux.\n Cette page est réalisée avec Nuxt (Vuejs) et Vuetify et présente quelques petits développements en HTML, CSS, JS",
      isVisible: true,
      show: false,
      bgImage: "/virgil-cayasa-460484-unsplash.jpg",
      bgImage2: "/astronomy-beautiful-constellations-813269.jpg",
      bgImage3: "/nathan-anderson-218687-unsplash.jpg"
    }
  },
  computed: {
    textSize() {
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
  },
  methods: {
    // visibilityChanged( isVisible, entry ) {
    //   this.isVisible = isVisible
    //   console.log( Math.round( entry.intersectionRatio * 100 ) + '%' )
    //   if ( this.isVisible ) {
    //     this.show = true
    //   } else {
    //     this.show = false
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
#presentation
  font-family: 'Dosis', sans-serif

#penchee
  transform-origin: 50% 100%
  transform: perspective(350px) rotateX(25deg)
  // animation-iteration-count: infinite

.slideIn-enter-active
  animation: slidein 1s

  @keyframes slidein
    0%
      transform: translateY(100px)
      opacity: 0

    100%
      transform: perspective(350px) rotateX(25deg)
      transform-origin: 50% 100%
      opacity: 1

.slideIn-leave-active
  animation: slideout 1s

  @keyframes slideout
    0%
      transform: translateY(0px) perspective(350px) rotateX(25deg)
      transform-origin: 50% 100%

    100%
      transform: translateY(-200px) perspective(700px) rotateX(50deg) scale(0.2)
      transform-origin: 50% 100%
      opacity: 0
</style>

<style lang="css" scoped>
#stars{
	background: url('/virgil-cayasa-460484-unsplash.jpg" ') no-repeat center center;
}
</style>
