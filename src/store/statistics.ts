import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatisticsStore = defineStore("statistics", () => {
  const highestScore = ref(0);
  const currentScore = ref(0);

  return { highestScore, currentScore };
});
