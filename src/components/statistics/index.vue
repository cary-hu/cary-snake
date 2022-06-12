<template>
  <div class="statistics-container">
    <div class="current-score-block">
      <i class="fa-solid fa-award" /> {{ statistics.currentScore }}
    </div>
    <div class="highest-score-block">
      <i class="fa-solid fa-trophy" /> {{ statistics.highestScore }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStatisticsStore } from "../../store/statistics";
const statistics = useStatisticsStore();
</script>

<style lang="less" src="./style.less"></style>
