<template>
  <div>
    <Timeline :start="start" :end="end" />
    <Grid :start="start" :end="end" />
  </div>
</template>
<script>
import Timeline from "./Timeline/index.vue";
import Grid from "./Grid/index.vue";

export default {
  name: "schedule",
  components: {
    Timeline,
    Grid,
  },
  data() {
    return {
      start: 1,
      end: 12, // 12 months
      // slice: 4, // 4 weeks
    };
  },
};
</script>
<style scoped>
</style>