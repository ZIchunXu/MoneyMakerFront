<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      note: {
        backgroundImage: "url(" + require("./assets/background.jpg") + ")",
      },
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-menu {
  font-weight: bold;
  border-right: 0;
}
html,
body {
  background: url("./assets/background.jpg");
  margin: 0;
  background-size: cover;
  background-position-y: -600px;

}
</style>