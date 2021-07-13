<template>
  <div class="schedule-gird"></div>
</template>

<script>
export default {
  name: "schedule-gird",
  components: {},
  computed: {},
  methods: {},
  props: {
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      height: 70, // width of cell
      width: 35, // width of cell
    };
  },
};
</script>

<style scoped>
.schedule-gird {
  display: grid;
}
</style>
