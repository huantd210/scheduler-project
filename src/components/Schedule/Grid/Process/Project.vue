<template>
  <div
    class="
      process__project
      h-full
      flex
      justify-center
      items-center
      bg-transparent
      cursor-pointer
      text-sm
      overflow-hidden
    "
  >
    <div class="process__project--dev" :class="developmentClass">
      <span> {{ project.name }}</span>
    </div>
    <div
      v-if="project.status === 'Kết thúc'"
      class="process__project--guar bg-green-100"
    >
      <span> Bảo trì </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "process-project",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  computed: {
    developmentClass() {
      let devClass = "bg-blue-400";
      switch (this.project.status) {
        case "Đàm phán":
          devClass = "bg-red-400";
          break;

        case "Đã đàm phán":
          devClass = "bg-green-400";
          break;

        case "Bắt đầu":
          devClass = "bg-yellow-400";
          break;

        default:
          break;
      }

      return devClass;
    },
  },
};
</script>

<style scoped>
.process__project--dev {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  height: 100%;
}

.process__project--guar {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  height: 100%;
}
</style>
