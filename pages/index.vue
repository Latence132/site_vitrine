<template lang="pug">
v-layout(wrap column)
	v-layout(wrap column v-touch="{ up: () => swipeTouch('Up'), down: () => swipeTouch('Down') }")
		menuNav(@scrollIS="scrollIndex" v-scroll="onScroll")
		v-parallax(id="slide1" src="/mer_ecran1.jp2" :height="screenHeight")
			banner
		v-parallax(id="slide2" src="/etoile_1400pxh.jp2" :height="screenHeight")
			presentation
		v-parallax(id="slide3" src="/ciel_grand_1400pwh.jp2" :height="screenHeight")
			OSM
	v-layout(wrap)
		CV(id="slide4")
</template>

<script>
import banner from "~/components/banner.vue";
import menuNav from "~/components/menuNav.vue";
import presentation from "~/components/presentation.vue";
import OSM from "~/components/OSM.vue";
import CV from "~/components/CV.vue";
import * as easings from "vuetify/es5/util/easing-patterns";

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
      duration: 300,
      offset: 0,
      easing: "easeInOutCubic",
      easings: Object.keys(easings)
    };
  },
  computed: {
    screenHeight() {
      return this.screenWindow;
    },
    optionsSI() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      };
    },
		index: {
			get: function () {
				return this.$store.state.page.page
			},
			set: function(value){
				console.log('inset set, ', value)
				this.$store.dispatch("page/setPage", value);
			}

		}
  },
  methods: {
    scrollIndex(slide) {
      //console.log("slide :", slide);
      this.$store.dispatch("page/setPage", slide[6]);
			//this.index = slide[6]
			//console.log(slide[6])
      this.$vuetify.goTo(slide, this.optionsSI);
    },
    onScroll() {
      this.$store.dispatch("page/setToolbar",false)
      if (window.scrollY <= this.screenHeight - 50) {
				//console.log('page 1')
        this.$store.dispatch("page/setPage", 1);
      } else if ( window.scrollY >= this.screenHeight - 50 &&  window.scrollY <= (this.screenHeight - 50) * 2) {
				//console.log('page 2')
        this.$store.dispatch("page/setPage", 2);
      } else if ( window.scrollY >= (this.screenHeight - 50) * 2 && window.scrollY <= (this.screenHeight - 50) * 3) {
				//console.log('page 3')
        this.$store.dispatch("page/setPage", 3);
      } else if (  window.scrollY >= (this.screenHeight - 50) * 3 && window.scrollY <= (this.screenHeight - 50) * 4 ) {
				//console.log('page 4')
        this.$store.dispatch("page/setPage", 4);
      }
    },
    swipeTouch(direction) {
			// console.log("swipeTouch start")
			//this.$store.dispatch("page/setToolbar",false)
			let tmp = this.index
      if (direction == "Down") {

				if (tmp-- <= 1 ){ tmp=1}
				//console.log("swipteTouch Down ")
				this.$store.dispatch("page/setPage", tmp);
        // this.$store.dispatch("page/setPage",this.index)
				//console.log("swipteTouch Down ", this.index)

      } else if (direction == "Up") {

				if (tmp++ >= 4 ){ tmp=4}
				//console.log("swipteTouch Up ")
					this.$store.dispatch("page/setPage", tmp);
        // this.$store.dispatch("page/setPage", this.index)

				//console.log("swipteTouch Up ", this.index)
      }
			this.$vuetify.goTo('#slide'+tmp, this.optionsSI)
			//this.handleEnd()
    }
  },
  mounted() {
    //console.log( window.innerHeight )
    this.screenWindow = window.innerHeight;
    this.resizeEvent = () => {
      //console.log("resize : " + window.innerHeight);
      this.screenWindow = window.innerHeight;
    }
    window.addEventListener("resize", this.resizeEvent);
    this.resizeEvent();

		//window.addEventListener("touchmouve", this.handleStart)
  },
  destroy() {
    window.removeEventListener("resize", this.resizeEvent);
  }
};
</script>

<style lang="stylus" scoped>
</style>
