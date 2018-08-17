<script>
import LineChart from "~/components/line-chart";
export default {
  components: {
    LineChart
  },
  inheritAttrs: false,
  props: {
    headline: {
      type: String,
      default: "Type"
    }
  }
};
</script>

<template lang='pug'>
v-card(class='dashboard pa-0 ma-0')
  v-card-title(class='secondary--text pa-0 ma-0')
    .headline {{ headline }}
  v-card-text.pa-0.ma-0
    line-chart(v-bind='$attrs' ref="chart")
</template>
