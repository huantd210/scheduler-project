<template>
  <div id="app">
    <el-container>
      <el-aside width="200px"><Aside /></el-aside>
      <el-main>Main</el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from "./components/Aside/index.vue";

export default {
  name: "App",
  components: {
    Aside,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
