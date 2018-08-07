<template lang="pug">
v-container(fluid grid-list-xs justify-center elevation-2 grey)
  v-layout(wrap column justify-center)
    v-card(xs12)
      v-card-media(src="http://192.168.255.111:8081/" height="450px")
      v-divider.grey
      v-card-title( primary-title xs12)
        v-layout(wrap row)
          v-flex(xs6)
            h3 Hello I am Kobuki
            p Use the joystick to control me
          v-flex(xs6)
            div Time elapsed: {{secondsElapsed}}
            div Traveled distance: {{travelDone.toFixed(3)}}

      v-divider
      v-card-actions
        v-flex.heightFixed.posRelative.mx-auto(id='joystick' xs2 )

</template>

<style lang="stylus" scoped>
 //div
//   border: 1px solid red

div >>> .front
  background-image: url('~/static/button.png') !important
  background-size: cover !important
  opacity: 1 !important

div >>> .back
  background-image: url('~/static/button_back.png') !important
  background-size: cover !important
  opacity: 1 !important


.posRelative
  position: relative

.heightFixed
  height: 150px
  width: 150px

</style>

<script>
// import { getRobot } from '../api'
import ROSLIB from "roslib";
export default {
  data() {
    return {
      e1: 1,
      choice: "",
      robots: [],
      ros: null,
      joy: null,
      robotsList: ["kobuki"],
      secondsElapsed: 0,
      travelDone: 0
    }
  },
  methods: {
    connect() {
      this.ros = new ROSLIB.Ros({
        // "ws://192.168.255.105:9090"
        // "wss://192.168.255.111:9090"
        url: "ws://192.168.255.111:9090"
      })

      this.ros.on("error", () => {
        console.log("errored")
      })

      this.ros.on("connection", () => {
        console.log("connected")
        this.startJoystick('/cmd_vel_mux/keyboard_teleop')
      })
    },
    startJoystick(topicPrefx) {
      const create = require("nipplejs").create;
      var linVelStep = 0.2;
      var angularVelStep = 0.66;
      var cmdVel = new ROSLIB.Topic({
        ros: this.ros,
        name: topicPrefx, //+ 'mobile_base/commands/velocity',
        messageType: "geometry_msgs/Twist"
      })
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
          var twist = new ROSLIB.Message({
            linear: { x: x, y: y, z: z },
            angular: { x: 0, y: 0, z: z }
          })
          // Uncomment for the demo
          // cmdVel.publish(twist)
          // to calculate the traveled distance
          // this.travelDone += Math.sqrt(twist.linear.x*twist.linear.x + twist.linear.y*twist.linear.y)
          // console.log(twist)
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.ros) {
      this.ros.close()
    }
    next();
  },
  mounted() {
    // Uncomment for the demo
    this.connect()
    // this.startJoystick('/cmd_vel_mux/keyboard_teleop')
    // Timer for display the secondsElapsed
    setInterval ( () => {
      this.secondsElapsed++
    },1000)
  },
  head: {
    title: "Remote control",
    meta: [
      { hid: "description", name: "description", content: "Piloting Page" },

      { hid: "keywords", name: "keywords", content: "remote control panel" }
    ],
    script: [
      { type:'text/javascript' , src:'http://cdn.robotwebtools.org/keyboardteleopjs/current/keyboardteleop.min.js'}
    ],
    link: [
      { rel:'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css'}
    ]
  }
}
</script>
