<template lang="pug">
v-layout(wrap column fullpage-wp)
	menuNav
	v-parallax.page.page-1(id="slide1" src="/mer_ecran1.png" :height="screenHeight")
		banner
	v-parallax.page.page-2(id="slide2" src="/nathan-anderson-218687-unsplash_1400pxh.jpg" :height="screenHeight")
		presentation
	v-parallax.page.page-3(id="slide3" src="/aerial-aerial-view-architecture-1400pxh.jpg" :height="screenHeight")
		OSM
	CV.page.page-4(id="slide4")
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
			index: 0,
      pageNum: 0,
      screenWindow: 807
    };
  },
	methods:{
		moveTo(index) {
        this.$refs.fullpage.$fullpage.moveTo(index, true);
    }
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
