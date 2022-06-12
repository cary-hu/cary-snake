<template>
  <div class="statistics-container">
    <div class="current-score-block">
      <i class="fa-solid fa-award" /> {{ currentScore }}
    </div>
    <div class="highest-score-block">
      <i class="fa-solid fa-trophy" /> {{ highestScore }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const highestScore = ref(0);
const currentScore = ref(0);
</script>

<style lang="less" src="./style.less"></style>
