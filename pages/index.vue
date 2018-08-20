<template lang="pug">
v-layout(wrap column)
	menuNav
	v-parallax(id="slide1" src="/mer_ecran1.png" :height="screenHeight")
		banner
	v-parallax(id="slide2" src="/nathan-anderson-218687-unsplash_1400pxh.jpg" :height="screenHeight")
		presentation
	v-parallax(id="slide3" src="/aerial-aerial-view-architecture-977pxh.jpg" :height="screenHeight")
		OSM
	v-parallax(id="slide4" src="" :height="screenHeight")
		CV
</template>

<script>
import banner from "~/components/banner.vue";
import menuNav from "~/components/menuNav.vue";
import presentation from "~/components/presentation.vue";
import OSM from "~/components/OSM.vue";
import CV from "~/components/CV.vue";
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
      screenWindow: 807
    };
  },
  computed: {
    screenHeight() {
      return this.screenWindow;
    }
  },
  mounted() {
    //console.log( window.innerHeight )
    this.screenWindow = window.innerHeight;
    this.resizeEvent = () => {
      console.log("resize : " + window.innerHeight);
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
