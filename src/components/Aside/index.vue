<template>
  <div>
    <Project
      v-for="(item, index) in getProjects"
      :key="`pj-${index}`"
      :project="item"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PROJECT_GET_LIST } from "../../store/constants/actionTypes";
import Project from "./Project.vue";

export default {
  name: "aside",
  components: {
    Project,
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