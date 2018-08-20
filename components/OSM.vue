<template lang="pug">
v-layout( id="OSM" wrap justify-center align-content-start )
	v-flex(xs12 style="height: 93px; bottom: 0px;" class="text-xs-center" :style="textSize2")
		v-layout( align-end justify-center row fill-height)
			v-flex.black--text Suivez et pilotez les relevés météorologiques
	v-flex(xs6 )
			v-layout(wrap align-content-space-around)
				no-ssr
					v-flex(xs12)
						l-map(style="height: 450px;" ref="map" :zoom="zoom" :center="{ lat: drones[0].main.X, lng: drones[0].main.Y}"  infinite="false" inertia="false")
							l-tile-layer(:url="url")
							l-marker(v-for="drone in drones" :key="drone.main.id"	:lat-lng="{ lat: drone.main.X, lng: drone.main.Y}"	@click="openPopup")
								l-popup(:content="drone.main.name" :options="{ autoClose: true, closeOnClick: false, autoPan: false }")
				v-flex.mx-auto.mt-5( xs6 id='joystick')
				v-flex.mx-auto(xs6)
					v-btn.red(@click="xi = 0, yi = 0, working = false" ) Stop
	v-flex(xs6)
		widget-line(:chart-data="currentData" :options='options' headline="Relevé météorologique" :style="textSize" ref="line")
		v-flex(style="font-family: 'Dosis', sans-serif;" :style="textSize") La carte est développé avec OpenStreetMap <br/> le joystick avec nipplejs <br/> le graphique avec chartjs
</template>

<script>


import WidgetLine from "~/components/WidgetLine.vue";
import LineChart from "~/components/line-chart";
export default {
  data() {
    return {
      X: 44.839213,
      Y: -0.715537,
      zoom: 13,
      xi: 0,
      yi: 0,
      working: false,
      currentData: {
        labels: [],
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: false,
                min: 1020,
                max: 1032,
                stepSize: 5,
                callback: function(label, index, labels) {
                  return label + " Pa"; // just change the '$' to % for percentage
                }
              },
              gridLines: {
                display: true
              }
            }
          ],
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false
              },
              time: {
                unit: "second"
              }
            }
          ]
        }
      },
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
  components: {
    LineChart,
    WidgetLine
  },
  computed: {
    textSize() {
      switch ( this.$vuetify.breakpoint.name ) {
        case 'xs':
          return 'font-size: 10px;'
        case 'sm':
          return 'font-size: 12px;'
        case 'md':
          return 'font-size: 16px;'
        case 'lg':
          return 'font-size: 20px;'
        case 'xl':
          return 'font-size: 26px;'
      }
    },
		textSize2() {
			switch ( this.$vuetify.breakpoint.name ) {
				case 'xs':
					return 'font-size: 15px;'
				case 'sm':
					return 'font-size: 20px;'
				case 'md':
					return 'font-size: 24px;'
				case 'lg':
					return 'font-size: 28px;'
				case 'xl':
					return 'font-size: 32px;'
			}
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
          left: "15%",
          top: "75%"
        },
        size: 150,
        restOpacity: 1
      });
      this.joy.on("move", (evt, data) => {
        this.working = true;
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
    },
    updateChart() {
      var tmp = {};
      var color = ["blue"];
      tmp.labels = [];
      tmp.labels.length = 10;
      tmp.labels.fill(0);
      tmp.datasets = [];
      if (this.working) {
        for (var i = 0; i < 1; i++) {
          var data;
          if (this.currentData.datasets[i]) {
            data = this.currentData.datasets[i].data;
          } else {
            data = [];
            data.length = 10;
            data.fill(0);
          }
          data.push(Math.random() * (1032 - 1022) + 1022);
          data.shift();

          tmp.datasets.push({
            showLine: true,
            fill: false,
            label: ["Pression atmosphérique"],
            borderColor: color[i],
            borderWidth: 2,
            lineTension: 0.25,
            pointRadius: 0,
            data: data
          });
          // updateSignalStr update to the drone done on OSM_explorer
          // let tmpSignalPower = {id: i, data: data[0]}
          // this.$store.dispatch('drones/updateSignalStr', tmpSignalPower)
        }
        this.currentData = tmp;
      }
    }
  },
  mounted() {
    this.startJoystick();

    // Simulate moving and refresh positions
    setInterval(() => {
      this.mouveDrone(this.xi, this.yi);
    }, 100);
    // update the chart
    setInterval(() => {
      this.updateChart();
    }, 750);
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

div >>> #joystick
	border-radius: 50%
	// border: 1px solid green
	height: 5px
	width: 5px


</style>
