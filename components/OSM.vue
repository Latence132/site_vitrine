<template lang="pug">
v-layout(wrap justify-center align-center)
	v-flex(xs12) {{ X }}, {{ Y }}
	v-flex(xs12 sm6)
		l-map(style="height: 300px" ref="map" :zoom=13 :center="center"  infinite="false" inertia="false")
			l-tile-layer(url="http://{s}.tile.osm.org/{z}/{x}/{y}.png")
				l-marker(:lat-lng="{lat: 44.839213, lng: -0.715537}")
	v-flex(xs12 sm6) Des données vont arrivées !
</template>

<script>
export default {
  data() {
    return {
      X: 44.839213,
      Y: -0.715537,
      zomm: 13
    }
  },
  computed: {
    center() {
      return { lat: this.X,  lng: this.Y  }
    }
  },
  methods: {
    // add all the drones from the API to the store
    // addAll () {
    //   this.$store.dispatch('drones/addAll')
    // },
    // defineMarker( color ) {
    //   return L.divIcon( {
    //     html: '<v-icon class="material-icons"> fas fa-bars </v-icon>',
    //     className: color + "--text"
    //   } );
    // },
    // center the map on the clicked drones
    // focusCenter( Xi, Yi ) {
    //   //  console.log('OSM center ' + Xi + ' ' + Yi)
    //   this.X = Xi
    //   this.Y = Yi
    // },
    // Open the drones Popup
    // openPopup( event ) {
    //   this.$nextTick( () => {
    //     event.target.openPopup();
    //   } )
    // }
  },
  head: {
    link: [ {
      rel: "stylesheet",
      href: "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
    } ]
  }
}
</script>

<style lang="stylus">
</style>
