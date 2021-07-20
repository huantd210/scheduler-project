<template>
  <div id="app">
    <el-container>
      <el-aside width="auto" class="h-screen text-center border-r">
        <Menu
          :visible="visibleDialogNewProject"
          @onVisible="onVisibleDialogNewProject"
        />
      </el-aside>
      <el-container class="p-0 h-screen overflow-hidden">
        <el-header
          style="height: fit-content"
          class="py-3 block md:flex md:justify-between md:items-center"
        >
          <FilterSchedule />
          <NoteSchedule />
        </el-header>
        <el-main class="p-0 h-full overflow-hidden">
          <Schedule />
        </el-main>
      </el-container>
    </el-container>

    <DialogNewProject
      :visible="visibleDialogNewProject"
      @onVisible="onVisibleDialogNewProject"
    />
    <DialogEditProject />
  </div>
</template>

<script>
import Menu from "./components/Menu/index.vue";
import FilterSchedule from "./components/Filter/index.vue";
import NoteSchedule from "./components/Note/index.vue";
import Schedule from "./components/Schedule/index.vue";
import DialogNewProject from "./components/Form/Create.vue";
import DialogEditProject from "./components/Form/Edit.vue";

export default {
  name: "App",
  components: {
    Menu,
    FilterSchedule,
    NoteSchedule,
    Schedule,
    DialogNewProject,
    DialogEditProject,
  },
  data() {
    return {
      visibleDialogNewProject: false,
    };
  },
  methods: {
    onVisibleDialogNewProject(visible) {
      this.visibleDialogNewProject = visible;
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

.el-dialog {
  border-radius: 0.25rem;
}

.el-dialog .el-dialog__header {
  --tw-bg-opacity: 1;
  background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  border-radius: 0.25rem;
}

.el-dialog .el-dialog__body {
  padding: 20px;
}

.el-dialog .el-dialog__body .el-form .el-form-item {
  margin-bottom: 16px;
}

.el-dialog .el-dialog__body .el-form .el-form-item .el-form-item__label {
  padding: 0;
  line-height: 32px;
}
</style>
