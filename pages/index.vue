<template lang="pug">
v-layout(wrap column )
	menuNav(@scrollIS="scrollIndex" :index="indexComp")
	v-parallax(id="slide1" v-observe-visibility="visibilityChanged1" src="/mer_ecran1.png" :height="screenHeight")
		banner
	v-parallax(id="slide2" v-observe-visibility="visibilityChanged2" src="/nathan-anderson-218687-unsplash_1400pxh.jpg" :height="screenHeight")
		presentation
	v-parallax(id="slide3" v-observe-visibility="visibilityChanged3" src="/aerial-aerial-view-architecture-1400pxh.jpg" :height="screenHeight")
		OSM
	CV(id="slide4" v-observe-visibility="visibilityChanged4")
</template>

<script>
import banner from "~/components/banner.vue";
import menuNav from "~/components/menuNav.vue";
import presentation from "~/components/presentation.vue";
import OSM from "~/components/OSM.vue";
import CV from "~/components/CV.vue";
import * as easings from 'vuetify/es5/util/easing-patterns'

export default {
  components: {
    banner,
    menuNav,
    presentation,
    OSM,
		CV
  },
  data() {
    return {
      screenWindow: 807,
			isVisible1: false,
			isVisible2: false,
			isVisible3: false,
			isVisible4: false,
			duration: 300,
			index:1,
      offset: 0,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings)
    }
  },
  computed: {
    screenHeight() {
      return this.screenWindow;
    },
    optionsSI () {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    },
		indexComp() {
			return this.index
		}

  },
	methods:{
		visibilityChanged1( isVisible1, entry ) {
      this.isVisible1 = isVisible1
      console.log( Math.round( entry.intersectionRatio * 100 ) + '%' )
      if ( entry.intersectionRatio * 100 >= 0.8) {
				console.log('visible1')
				this.index = 1
      } else if ( entry.intersectionRatio * 100 <= 0.3) {
				console.log('non visible1')
      }
    },
		visibilityChanged2( isVisible2, entry ) {
      this.isVisible2 = isVisible2
      console.log( Math.round( entry.intersectionRatio * 100 ) + '%' )
      if ( entry.intersectionRatio * 100  >= 0.8) {
				console.log('visible2')
				this.index = 2
      } else if ( entry.intersectionRatio * 100 <= 0.3) {
				console.log('non visible2')
      }
    },
		visibilityChanged3( isVisible3, entry ) {
      this.isVisible3 = isVisible3
      console.log( Math.round( entry.intersectionRatio * 100 ) + '%' )
      if ( entry.intersectionRatio * 100 >= 0.8) {
				console.log('visible3')
				this.index = 3
      } else if ( entry.intersectionRatio * 100 <= 0.3) {
				console.log('non visible3')
      }
    },
		visibilityChanged4( isVisible4, entry ) {
      this.isVisible4 = isVisible4
      console.log( Math.round( entry.intersectionRatio * 100 ) + '%' )
      if ( entry.intersectionRatio * 100 >= 0.8) {
				console.log('visible4')
				this.index = 4
      } else {
				console.log('non visible4')
      }
    },
		scrollIndex(slide) {
			console.log('slide :', slide)
			this.$vuetify.goTo(slide, this.optionsSI)
		}
	},
  mounted() {
    //console.log( window.innerHeight )
    this.screenWindow = window.innerHeight;
    this.resizeEvent = () => {
      //console.log("resize : " + window.innerHeight);
      this.screenWindow = window.innerHeight;
    };
    window.addEventListener("resize", this.resizeEvent);

    this.resizeEvent();
  },
  destroy() {
    window.removeEventListener("resize", this.resizeEvent);
  }
};
</script>

<style lang="stylus">

</style>
