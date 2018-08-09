<template lang="pug">
v-layout(wrap row)
  v-flex(xs12) Présentation
  v-flex(xs12) {{ intro }}

</template>

<script>
export default {
  data() {
    return {
      intro: 'bbla blabla'
    }
  }
}
</script>

<style lang="stylus">
</style>
