<template lang="pug">
v-layout(wrap justify-center align-center)
	v-flex(xs12) {{ X }}, {{ Y }}
	v-flex(xs12 sm6)
		l-map(style="height: 300px" ref="map" :zoom="zoom" :center="center"  infinite="false" inertia="false")
			l-tile-layer(:url="url")
			l-marker(v-for="drone in drones" :key="drone.main.id"	:lat-lng="{ lat: drone.main.X, lng: drone.main.Y}"	@click="openPopup")
				l-popup(:content="drone.main.name" :options="{ autoClose: false, closeOnClick: false, autoPan: false }")
		v-flex( id='joystick' style="border: 1px solid green" ).posRelative.heightFixed
</template>

<script>

let L = {}
if (process.browser) {
  L = require('leaflet')
}


export default {
  data() {
    return {
      X: 44.839213,
      Y: -0.715537,
      zoom: 13,
			drones: [
				{ main: {id: 0, name: 'Drone Bryant', purpose: 'delivery', color: 'red', number: 24, X: 44.839213, Y: -0.715537, power: 100, workingTime: 0, timeBeforeMaintenance: 14000, signalPower: '', reach: 1, moving: false }, job: { deliveryWeight: '2 kg', travelLength: '2 km', estimedTime: 300, remaningTravel: '1.2 km'}},
	      { main: {id: 1, name: 'Drone Jordan', purpose: 'photos/videos', color: 'green', number: 23, X: 44.8, Y: -0.715537, power: 90, workingTime: 600, timeBeforeMaintenance: 13400, signalPower: '', reach: 2, moving: false }, job: { nbPictures: 15, resolution: '4 k', remaningSpace: '8 go', videoRecordedTime: '3 min'}},
	      { main: {id: 2, name: 'Drone Curry', purpose: 'watching', color: 'yellow', number: 30, X: 44.839213, Y: -0.719537, power: 20, workingTime: 600, timeBeforeMaintenance: 13400, signalPower: '', reach: 3, moving: false }, job: { checkingDone: 5, anomalies: 1,checkingOk:4, nbToCheck: 10 }},
			],
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
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
    defineMarker( color ) {
      return L.divIcon( {
        html: '<v-icon class="material-icons"> place </v-icon>',
        className: color + "--text"
      } );
    },
    // center the map on the clicked drones
    focusCenter( Xi, Yi ) {
      //  console.log('OSM center ' + Xi + ' ' + Yi)
      this.X = Xi
      this.Y = Yi
    },
    // Open the drones Popup
    openPopup( event ) {
      this.$nextTick( () => {
        event.target.openPopup();
      } )
    },
		startJoystick() {
      const create = require("nipplejs").create;
      var linVelStep = 0.2;
      var angularVelStep = 0.66;
      this.joy = create({
        color: null,
        zone: document.getElementById("joystick"),
        mode: "static",
        position: { left: "50%", top: "50%" },
        size: 150,
        restOpacity: 1
      })
      this.joy.on("move", (evt, data) => {
        if (data.hasOwnProperty("direction")) {
          var x = 0;
          var y = 0;
          var z = 0;
          if (data.direction.angle === "down") {
            x = -linVelStep
          } else if (data.direction.angle === "up") {
            x = linVelStep
          } else if (data.direction.angle === "left") {
            z = angularVelStep
          } else if (data.direction.angle === "right") {
            z = -angularVelStep
          }
          // Uncomment for the demo
          // cmdVel.publish(twist)
          // to calculate the traveled distance
          // this.travelDone += Math.sqrt(twist.linear.x*twist.linear.x + twist.linear.y*twist.linear.y)
          // console.log(twist)
        }
      })
    }
  },
	mounted() {
		this.startJoystick()
	},
  head: {
    link: [
			{ rel: "stylesheet",href: "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" } ]
  }
}
</script>

<style lang="stylus" scoped>
div >>> .front
  background-image: url('/button.png') !important
  background-size: cover !important
  opacity: 1 !important

div >>> .back
  background-image: url('/button_back.png') !important
  background-size: cover !important
  opacity: 1 !important

.posRelative
  position: relative

.heightFixed
  height: 150px
  width: 150px

</style>
