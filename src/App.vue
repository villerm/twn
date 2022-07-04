<template>
  <router-view />
</template>

<script setup>
</script>

<style>
#app {
  font-family: BoosterNextFY;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: #3a3d57;
  padding: 80px 40px;
  min-height: 100vh;
  background-image: url("./assets/images/bg-deco-left.svg"),
    url("./assets/images/bg-deco-right.svg");
  background-repeat: no-repeat;
  background-position: 0 bottom, 100% 0;
  background-size: 150px, 250px;
}
* {
  box-sizing: border-box;
}
.article p {
  margin: 2.5rem 0;
}
</style>
