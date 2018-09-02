<template lang="pug">
v-layout( id="OSM" wrap justify-center align-content-start )
	v-flex(xs12  class="text-xs-center" :style="textSize2").white--text Suivez en directe les relevés météorologiques
	v-flex(xs12)
			v-layout(wrap justify-center)
					v-flex.mt-1.blue(xs12 sm6  :style="divHeight")
						no-ssr
							l-map( ref="map" :zoom="zoom" :center="{ lat: drones[0].main.X, lng: drones[0].main.Y}"  infinite="false" inertia="false" )
								l-tile-layer(:url="url")
								l-marker(v-for="drone in drones" :key="drone.main.id"	:lat-lng="{ lat: drone.main.X, lng: drone.main.Y}"	@click="openPopup")
									l-popup(:content="drone.main.name" :options="{ autoClose: true, closeOnClick: false, autoPan: false }")
					//position relative is for the responsiveness of chartjs
					v-flex.ml-2.mt-1.blue.chart-container(xs10 sm4 style="position: relative" )
						widget-line(id="chart" :chart-data="currentData" :options='optCharts' headline="Relevé météorologique" ref="line" )
	v-flex( xs12 sm10 style="font-family: 'Dosis', sans-serif;" :style="textSize").black--text  La carte est développé avec OpenStreetMap <br/>Le graphique avec chartjs
</template>

<script>
import WidgetLine from "~/components/WidgetLine.vue";
import LineChart from "~/components/line-chart";
export default {
  data() {
    return {
      X: 44.839213,
      Y: -0.715537,
      zoom: 15,
      xi: 0.00001,
      yi: 0.00001,
      working: false,
      currentData: {
        labels: [],
        datasets: []
      },
      options: {
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                beginAtZero: false,
                min: 17,
                max: 32,
                stepSize: 5,
                callback: function(label, index, labels) {
                  return label + "T(°C)"; // just change the '$' to % for percentage
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
    optCharts() {
      return this.options;
    },
    textSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "font-size: 12px;";
        case "sm":
          return "font-size: 12px;";
        case "md":
          return "font-size: 16px;";
        case "lg":
          return "font-size: 20px;";
        case "xl":
          return "font-size: 26px;";
      }
    },
    textSize2() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "font-size: 15px;";
        case "sm":
          return "font-size: 20px;";
        case "md":
          return "font-size: 24px;";
        case "lg":
          return "font-size: 28px;";
        case "xl":
          return "font-size: 32px;";
      }
    },
    divHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          this.options.maintainAspectRatio = true;
          //console.log("xs ", this.options.maintainAspectRatio);
          return "height: 250px;";
        default:
          this.options.maintainAspectRatio = false;
          //console.log("default ", this.options.maintainAspectRatio);
          return "height: auto";
      }
    },
  },
  methods: {
    // Open the drones Popup
    openPopup(event) {
      this.$nextTick(() => {
        event.target.openPopup();
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
        for (var i = 0; i < 1; i++) {
          var data;
          if (this.currentData.datasets[i]) {
            data = this.currentData.datasets[i].data;
          } else {
            data = [];
            data.length = 10;
            data.fill(0);
          }
          data.push(Math.random() * (32 - 17) + 17);
          data.shift();

          tmp.datasets.push({
            showLine: true,
            fill: false,
            label: ["Température"],
            borderColor: color[i],
            borderWidth: 2,
            lineTension: 0.25,
            pointRadius: 0,
            data: data
          });
        }
        this.currentData = tmp;
    }
  },
  mounted() {
    //this.startJoystick();

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
