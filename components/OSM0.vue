<template lang="pug">
no-ssr
	v-flex(id="OSM" style="height: 450px; " )
		l-map(ref="map" :zoom="zoom" :center="center"  infinite="false" inertia="false")
			l-tile-layer(:url="url")

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
	computed: {
		center () {
			return { lat: this.drones[0].main.X, lng: this.drones[0].main.Y}
		}
	},
  components: {
    LineChart,
    WidgetLine
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
    }
  },
  mounted() {
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



</style>
