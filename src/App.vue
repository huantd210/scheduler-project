<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" class="h-screen text-center border-r">
        <el-menu class="border-0">
          <el-menu-item
            class="text-left border-b"
            @click.native="visibleFormCreate = true"
          >
            <i class="el-icon-plus"></i>
            Thêm dự án mới
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container class="p-0 h-screen overflow-hidden">
        <el-header class="flex justify-between items-center">
          <FilterSchedule />

          <NoteSchedule />
        </el-header>
        <el-main class="p-0 h-full overflow-hidden">
          <Schedule />
        </el-main>
      </el-container>
    </el-container>

    <FormCreate :visible="visibleFormCreate" @onVisible="onVisibleCreate" />
    <FormEdit />
  </div>
</template>

<script>
import FilterSchedule from "./components/Filter/index.vue";
import NoteSchedule from "./components/Note/index.vue";
import Schedule from "./components/Schedule/index.vue";
import FormCreate from "./components/Form/Create.vue";
import FormEdit from "./components/Form/Edit.vue";

export default {
  name: "App",
  components: {
    FilterSchedule,
    NoteSchedule,
    Schedule,
    FormCreate,
    FormEdit,
  },
  data() {
    return {
      visibleFormCreate: false,
    };
  },
  methods: {
    onVisibleCreate(visible) {
      this.visibleFormCreate = visible;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.el-dialog .el-dialog__body {
  padding: 20px;
}

.el-dialog .el-dialog__body .el-form .el-form-item {
  margin-bottom: 16px;
}

.el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__label {
  padding: 0;
}
</style>
