<template>
  <div
    class="
      process__project
      text-sm
      h-4/5
      flex
      justify-center
      items-center
      rounded
      cursor-pointer
      overflow-hidden
    "
    :class="projectClass"
  >
    <span> {{ project.name }}</span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "process-project",
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
  projectStyle() {
    const { timeStart, timeEnd } = this.project;

    const start = moment(timeStart, "YYYY-MM-DD").dayOfYear();
    const end = moment(timeEnd, "YYYY-MM-DD").dayOfYear() + 1;

    return {
      gridColumn: `${start} / ${end}`,
      gridRow: "1 / 2",
    };
  },
  guaranteeStyle() {
    const { timeEnd, guarantee } = this.project;
    if (!guarantee) return;

    const timeGuarantee = moment(timeEnd, "YYYY-MM-DD").add(guarantee, "days");
    const start = moment(timeEnd, "YYYY-MM-DD").dayOfYear();
    const end = moment(timeGuarantee, "YYYY-MM-DD").dayOfYear() + 1;

    return {
      gridColumn: `${start} / ${end}`,
      gridRow: "1 / 2",
    };
  },
};
</script>

<style scoped>
</style>
