<template>
  <div id="app">
    <el-container>
      <el-aside width="300px" class="h-screen"><Aside /> </el-aside>
      <el-main class="p-0 h-screen border border-gray-100 overflow-scroll">
        <Schedule />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "./components/Aside/index.vue";
import Schedule from "./components/Schedule/index.vue";

export default {
  name: "App",
  components: {
    Aside,
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
