<template lang="pug">
  v-container(fluid grid-list-xs justify-center elevation-2 grey)
    v-layout(wrap column justify-center)
      v-card(xs12)
        v-card-media(src="http://flightcam1.pr.erau.edu/mjpg/video.mjpg" height="450px")
        v-divider.grey
        v-card-title( primary-title xs12)
          v-layout(wrap row)
            h3 Hello I am Mr Robot
            v-flex(xs12) Use the joysticks to control me
            v-btn( @click="sendMode") Envoyer le mode: N
        v-divider.grey
        v-card-actions
          v-flex.heightFixed.posRelative.mx-auto(id='joystick1' xs3 )
            v-flex(text-xs-center) Forward : {{yForward}}
          v-flex.heightFixed.posRelative.mx-auto(id='joystick2' xs3 )
            v-flex(text-xs-center) Turn : {{xTurn}}
              coucou
</template>

<style  lang="stylus" scoped>
// div
//   border: 1px solid brown

div >>> .front
  background-image: url('~/static/button.png') !important
  background-size: cover !important
  opacity: 1 !important

#joystick1  >>> .back
  background-image: url('~/static/button_back_up_down.png') !important
  background-size: cover !important
  opacity: 1 !important

#joystick2 >>> .back
  background-image: url('~/static/button_back_left-right.png') !important
  background-size: cover !important
  opacity: 1 !important


.posRelative
  position: relative

.heightFixed
  height: 150px
  width: 150px

</style>


<script>

export default {
  data() {
    return {
      webSocketConnexion: null,
      joy1: null,
      joy2: null,
      xTurn:1400,
      yForward:1400,
      sendingDataBool: false,
      sendingDataTab: [],
      mode: null
    }
  },
  methods: {
    connect() {
      this.webSocketConnexion = new WebSocket(
        "ws://192.168.255.117:8080/ws"
      )
      this.startJoystick()
    },
    close() {
      if (this.webSocketConnexion !== null) {
        this.webSocketConnexion.close()
      }
      if (this.joys !== null) {
        this.joys.destroy()
      }
      this.e1 = 1;
    },
    startJoystick () {
      const create = require("nipplejs").create
      // Joystick 1
      // message sent: c1100 to c1900
      // force-> min:0 , max:1, the force go over 1
      this.joy1 = create({
        color: null,
        zone: document.getElementById("joystick1"),
        mode: "static",
        position: { left: "50%", top:"60%"},
        lockY: true,
        restJoystick: false,
        restOpacity: 1,
        size: 150
      })
      this.joy1.on("move", (evt, data) => {
        if (data.hasOwnProperty("direction")) {
          var y = 1400
          var strenghMoveY = 450
          if (data.direction.angle === "down") {
            y -= data.force * strenghMoveY //distance: 50, 50*80
            // limit the min on down
            if ( y < 1100 ) { y = 1100 }
          } else if (data.direction.angle === "up") {
            y += data.force * strenghMoveY
            // limit the min on up
            if ( y > 1900) { y = 1900  }
          }
            this.yForward = y
            console.log('C' + Math.round(y))
            // this.webSocketConnexion.send('C' + Math.round(y))
        }
      })
      // Joystick 2
      // message sent: f1100 to f1900
      // force-> min:0 , max:1
      this.joy2 = create({
        color: null,
        zone: document.getElementById("joystick2"),
        mode: "static",
        position: { left: "50%", top:"60%"},
        lockX: true,
        restOpacity: 1,
        size: 150
      })
      this.joy2.on("move", (evt, data,sendingDataBool) => {
        if (data.hasOwnProperty("direction")) {
          var x = 1400
          var strenghMoveX = 450
          if (data.direction.angle === "left") {
            x -= data.force * strenghMoveX
            // limit the min on left
            if ( x < 1100 ) {x = 1100}
          } else if (data.direction.angle === "right") {
            x += data.force * strenghMoveX
            // limit the max on right
            if ( x > 1900) { x = 1900 }
          }

          this.xTurn = Math.round(x)

          console.log('F' + Math.round(this.xTurn))
          // this.webSocketConnexion.send('F' + Math.round(this.xTurn) )


        }
      })
      //when the turn left right joystick is realse, put it to the center
      this.joy2.on("end", (evt, data) => {
           this.xTurn = 1400
           console.log('F1400')
           this.sendingDataBool = false
           // this.webSocketConnexion.send('F1400')
      })
    },
    beforeRouteLeave(to, from, next) {
      if (this.webSocketConnexion) {
        this.webSocketConnexion.close()
      }
      next()
    },
   sendMode() {
     console.log('send: N')
     this.webSocketConnexion.send('N')
   }
  },

  mounted() {
    // this.connect()
    this.startJoystick()
  },
  head: {
    title: "Remote control",
    meta: [
      { hid: "description", name: "description", content: "Piloting Page" },
      { hid: "keywords", name: "keywords", content: "remote control panel" }
    ],
    script: [
    ],
    link: [
      { rel:'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css'}
    ]
  }
}
</script>
