<template lang="pug">
v-layout( id="presentation" wrap row :style="texteSize" class='text-xs-center')
  v-flex(xs12 )
    vue-particles(color="#dedede" style="height : 200px;"  :moveSpeed=2 hoverMode="grab" particlesNumber=40)
  v-flex(xs12) Présentation
  v-parallax {{ intro }}
  v-flex(xs12) Application minicarte avec OpenStreetMap

</template>

<script>
export default {
  data() {
    return {
      intro: 'Après avoir travaillé quelques années en tant que prestataire informatique, j\'ai décidé je me reconvertir au métier de développeur web. J\'ai commencé par des cours sur Openclassrooms puis j\'ai continué avec la formation developpeur logiciel de l\'IFPA Bordeaux. Cette page est réalisé avec Nuxt (Vuejs) et Vuetify et présente quelques petits développements.'
    }
  },
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
#presentation
  background-color: rgb(6,19,22)
  color: white
  font-family: 'Dosis', sans-serif

div
  border: 1px solid red



</style>
