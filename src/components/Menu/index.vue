<template>
  <div class="aside-menu">
    <el-menu class="border-0">
      <el-menu-item class="text-left md:border-b" @click="visibleSync = true">
        <i class="m-0 text-lg md:text-base text-blue-500 el-icon-plus"></i>
        <span slot="title" class="hidden md:inline-block ml-2 text-base">
          Thêm dự án mới
        </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "aside-menu",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    visibleSync: {
      get: function () {
        return this.visible;
      },
      set: function (value) {
        this.$emit("onVisible", value);
      },
    },
  },
};
</script>