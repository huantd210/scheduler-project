<template>
  <div id="app">
    <el-container>
      <el-aside width="200px" class="h-screen text-center">Menu</el-aside>
      <el-main class="p-0 h-screen border border-gray-100 overflow-hidden">
        <el-header class="flex justify-between items-center">
          <Note />
        </el-header>
        <Schedule />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Note from "./components/Note/index.vue";
import Schedule from "./components/Schedule/index.vue";

export default {
  name: "App",
  components: {
    Note,
    Schedule,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
