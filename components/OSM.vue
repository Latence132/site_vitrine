<template lang="pug">
v-layout(wrap justify-center align-center)
	v-flex(xs12 sm6)
		no-ssr
			l-map(style="height: 450px; " ref="map" :zoom="zoom" :center="{ lat: drones[0].main.X, lng: drones[0].main.Y}"  infinite="false" inertia="false")
				l-tile-layer(:url="url")
				l-marker(v-for="drone in drones" :key="drone.main.id"	:lat-lng="{ lat: drone.main.X, lng: drone.main.Y}"	@click="openPopup")
					l-popup(:content="drone.main.name" :options="{ autoClose: false, closeOnClick: false, autoPan: false }")
		v-flex(id='joystick' style="border: 1px solid green" ).posRelative.heightFixed
		v-flex
			v-btn(@click="xi = 0, yi = 0" class='red') Stop
</template>

<script>
let L = {};
if (process.browser) {
  L = require("leaflet");
}

export default {
  data() {
    return {
      X: 44.839213,
      Y: -0.715537,
      zoom: 13,
      xi: 0,
      yi: 0,
      manuel: false,
      drones: [
        {
          main: {
            id: 0,
            name: "Drone Bryant",
            purpose: "delivery",
            color: "red",
            number: 24,
            X: 44.839213,
            Y: -0.715537,
            power: 100,
            workingTime: 0,
            timeBeforeMaintenance: 14000,
            signalPower: "",
            reach: 1,
            moving: false
          },
          job: {
            deliveryWeight: "2 kg",
            travelLength: "2 km",
            estimedTime: 300,
            remaningTravel: "1.2 km"
          }
        }
      ],
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    };
  },
  computed: {
    center() {
      return {
        lat: this.X,
        lng: this.Y
      };
    }
  },
  methods: {
    // Open the drones Popup
    openPopup(event) {
      this.$nextTick(() => {
        event.target.openPopup();
      });
    },
    startJoystick() {
      const create = require("nipplejs").create;
      var linVelStep = 0.000001;
      var angularVelStep = 0.000001;
      this.joy = create({
        color: null,
        zone: document.getElementById("joystick"),
        mode: "static",
        position: {
          left: "50%",
          top: "50%"
        },
        size: 150,
        restOpacity: 1
      });
      this.joy.on("move", (evt, data) => {
        if (data.hasOwnProperty("direction")) {
          var dataDist = data.distance;
          var angle = data.angle.radian;
          this.xi = Math.cos(angle) * dataDist * linVelStep;
          this.yi = Math.sin(angle) * dataDist * linVelStep;
          // this.mouveDrone(this.xi, this.yi);
        }
      });
    },
    mouveDrone(xi, yi) {
      this.drones[0].main.Y += xi;
      this.drones[0].main.X += yi;
    }
  },
  mounted() {
    this.startJoystick();
    // Simulate moving and refresh positions
    setInterval(() => {
      this.mouveDrone(this.xi, this.yi);
    }, 100);
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://unpkg.com/leaflet@1.3.1/dist/leaflet.css"
      }
    ]
  }
};
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

#joystick
    border-radius: 50%

</style>
