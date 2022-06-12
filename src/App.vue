<script setup lang="ts">
import Statistics from "./components/statistics/index.vue";
import Board from "./components/board/index.vue";
</script>
<template>
  <h1>Snake</h1>
  <button>Start</button>
  <Statistics />
  <Board />
</template>

<style lang="less">
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css";
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
