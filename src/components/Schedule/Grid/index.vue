<template>
  <div class="schedule-gird">
    <Process
      v-for="(item, index) in getProjects"
      :key="`pr-${index}`"
      :project="item"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { PROJECT_GET_LIST } from "../../../store/constants/actionTypes";
import Process from "./Process/index.vue";

export default {
  name: "schedule-gird",
  components: {
    Process,
  },
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("project", ["getProjects"]),
  },
  async created() {
    try {
      await this.$store.dispatch(`project/${PROJECT_GET_LIST}`);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style scoped>
.schedule-gird {
  height: 100%;
  width: 100%;
}
</style>
