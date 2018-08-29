<template lang="pug">
v-layout(wrap column v-touch="{ up: () => swipeTouch('Down'), down: () => swipeTouch('Up') }")
	menuNav(@scrollIS="scrollIndex" v-scroll="onScroll")
	v-parallax(id="slide1" src="/mer_ecran1.png" :height="screenHeight")
		banner
	v-parallax(id="slide2" src="/nathan-anderson-218687-unsplash_1400pxh.jpg" :height="screenHeight")
		presentation
	v-parallax(id="slide3" src="/ciel_grand_1400pwh.jpg" :height="screenHeight")
		OSM
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
      index: 1,
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
  },
  methods: {
    scrollIndex(slide) {
      //console.log("slide :", slide);
      this.$store.dispatch("page/setPage", slide[6]);
			this.index = slide[6]
			//console.log(slide[6])
      this.$vuetify.goTo(slide, this.optionsSI);
    },
    onScroll() {
      //this.toolbar = false;
      if (window.scrollY <= this.screenHeight - 50) {
        this.$store.dispatch("page/setPage", 1);
      } else if ( window.scrollY >= this.screenHeight - 50 &&  window.scrollY <= (this.screenHeight - 50) * 2) {
        this.$store.dispatch("page/setPage", 2);
      } else if ( window.scrollY >= (this.screenHeight - 50) * 2 && window.scrollY <= (this.screenHeight - 50) * 3) {
        this.$store.dispatch("page/setPage", 3);
      } else if (  window.scrollY >= (this.screenHeight - 50) * 3 && window.scrollY <= (this.screenHeight - 50) * 4 ) {
        this.$store.dispatch("page/setPage", 4);
      }
    },
    swipeTouch(direction) {
      if (direction == "Down") {
				//console.log("swipteTouch Down ")
				this.index++
				if (this.index >= 5 ){ this.index=5}
        this.$store.dispatch("page/setPage",this.index)
				//console.log("swipteTouch Down ", this.index)

      } else if (direction == "Up") {
				this.index--
				if (this.index <= 0 ){ this.index=0}
        this.$store.dispatch("page/setPage", this.index)
				//console.log("swipteTouch Up ", this.index)
      }
			this.$vuetify.goTo('#slide'+this.index, this.optionsSI);
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

<style lang="stylus" scoped>
</style>
