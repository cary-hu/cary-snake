<template>
  <div class="board">
    <span
      v-for="n in 625"
      :key="n"
      class="board-cell"
      :class="isSnake(n) ? 'snake' : ''"
    ><i v-if="foodIndex == n" class="fa-solid fa-bacterium" /></span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
type direction = "up" | "down" | "left" | "right";
const foodIndex = ref(-1);

const snake = ref([5, 4, 3, 2, 1]);
const dir = ref<direction>("right");

const isSnake = (index: number) => {
  return snake.value.includes(index);
};
const getNextFoodIndex = (): number => {
  const index = (foodIndex.value = Math.floor(Math.random() * 625));
  if (isSnake(index))
    return getNextFoodIndex();
  else
    return index;
};

const snakeMove = (dir: direction) => {
  const head = snake.value[0];
  const currentRow = Math.floor(head / 25);
  const tail = snake.value.pop() as number;
  const nextHead = head + (dir === "up" ? -25 : dir === "down" ? 25 : dir === "left" ? -1 : 1);
  const nextRow = Math.floor(nextHead / 25);
  if (currentRow !== nextRow && (dir === "left" || dir === "right"))
    return false;

  if (nextHead < 0 || nextHead > 625)
    return;
  snake.value.unshift(nextHead);
  if (nextHead === foodIndex.value) {
    snake.value.push(tail);
    foodIndex.value = -1;
  }
};
setInterval(() => {
  snakeMove(dir.value);
}, 500);

const attachKeyboard = () => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && dir.value !== "down")
      dir.value = "up";
    else if (e.key === "ArrowDown" && dir.value !== "up")
      dir.value = "down";
    else if (e.key === "ArrowLeft" && dir.value !== "right")
      dir.value = "left";
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
