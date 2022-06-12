<template>
  <div class="board">
    <span
      v-for="n in 625"
      :key="n"
      class="board-cell"
      :class="{snake: isSnake(n), head: isHead(n), tail: isTail(n)}"
    ><i v-if="foodIndex == n" class="fa-solid fa-bacterium" /></span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStatisticsStore } from "../../store/statistics";
type direction = "up" | "down" | "left" | "right";
const foodIndex = ref(-1);

const snake = ref([5, 4, 3, 2, 1]);
const dir = ref<direction>("right");
const statistics = useStatisticsStore();

const dirQueue = ref<direction[]>([] as Array<direction>);

const isSnake = (index: number) => {
  return snake.value.includes(index);
};
const isHead = (index: number) => {
  return index === snake.value[0];
};
const isTail = (index: number) => {
  return index === snake.value[snake.value.length - 1];
};
const getNextFoodIndex = (): number => {
  const index = (foodIndex.value = Math.floor(Math.random() * 625));
  if (isSnake(index)) return getNextFoodIndex();
  else return index;
};
const gameStart = () => {
  statistics.currentScore = 0;
  snake.value = [5, 4, 3, 2, 1];
  dir.value = "right";
  foodIndex.value = getNextFoodIndex();
};
const gameOver = () => {
  statistics.currentScore = 0;
  statistics.highestScore = Math.max(statistics.highestScore, statistics.currentScore);
  snake.value = [5, 4, 3, 2, 1];
  dir.value = "right";
  foodIndex.value = -1;
};
const snakeMove = (dir: direction) => {
  const head = snake.value[0];
  const nextHead =
    head + (dir === "up" ? -25 : dir === "down" ? 25 : dir === "left" ? -1 : 1);
  if (nextHead < 0 || nextHead > 625) {
    // gameOver();
    return false;
  }
  if (isSnake(nextHead))
    return false;

  const currentRow = Math.floor((head - 1) / 25);
  const nextRow = Math.floor((nextHead - 1) / 25);
  if (currentRow !== nextRow && (dir === "left" || dir === "right"))
    return false;

  if (nextHead < 0 || nextHead > 625) return;
  snake.value.unshift(nextHead);
  const tail = snake.value.pop() as number;
  if (nextHead === foodIndex.value) {
    snake.value.push(tail);
    statistics.currentScore++;
    foodIndex.value = getNextFoodIndex();
  }
};

const moveUp = () => {
  if (dir.value === "down") return;
  dir.value = "up";
  snakeMove("up");
};

setInterval(() => {
  if (dirQueue.value.length)
    dir.value = dirQueue.value.shift() as direction;
  else snakeMove(dir.value);
}, 200);

const attachKeyboard = () => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dir.value !== "down") dir.value = "up";
    else if (e.key === "ArrowDown" && dir.value !== "up") dir.value = "down";
    else if (e.key === "ArrowLeft" && dir.value !== "right") dir.value = "left";
    else if (e.key === "ArrowRight" && dir.value !== "left")
      dir.value = "right";
  });
};
onMounted(() => {
  getNextFoodIndex();
  attachKeyboard();
});
</script>

<style lang="less" src="./style.less"></style>
