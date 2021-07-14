<template>
  <div
    class="
      aside__project
      m-1
      flex
      justify-center
      items-center
      border
      rounded
      cursor-pointer
    "
    :class="projectClass"
  >
    <span> {{ project.name }}</span>
  </div>
</template>

<script>
export default {
  name: "process--project",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    projectClass() {
      let cls = "bg-blue-400";
      switch (this.project.type) {
        case "Đàm phán":
          cls = "bg-red-400";
          break;

        case "Đã đàm phán":
          cls = "bg-green-400";
          break;

        case "Bắt đầu":
          cls = "bg-yellow-400";
          break;

        default:
          break;
      }

      return cls;
    },
  },
};
</script>

<style scoped>
.aside__project {
  height: 100px;
}
</style>
