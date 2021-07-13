<template>
  <div>
    <Timeline :start="start" :end="end" :height="height" />
  </div>
</template>
<script>
import Timeline from "./Timeline/index.vue";

export default {
  name: "schedule",
  components: {
    Timeline,
  },
  data() {
    return {
      start: 1,
      end: 12, // 12 months
      // slice: 4, // 4 weeks
      height: 120,
      // width: 200, // width of block
    };
  },
};
</script>
<style scoped>
</style>