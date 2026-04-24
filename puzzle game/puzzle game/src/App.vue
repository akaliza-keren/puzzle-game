//app.vue
<script setup>
import { ref } from 'vue'

const size = ref(3)
const board = ref([])
const moves = ref(0)

function startGame(level) {
  size.value = level
  moves.value = 0

  let nums = []
  for (let i = 1; i < size.value * size.value; i++) {
    nums.push(i)
  }
  nums.push(null)

  nums.sort(() => Math.random() - 0.5)

  board.value = []
  while (nums.length) {
    board.value.push(nums.splice(0, size.value))
  }
}

function moveTile(r, c) {
  const dirs = [[0,1],[1,0],[-1,0],[0,-1]]

  for (let [dr, dc] of dirs) {
    let nr = r + dr
    let nc = c + dc

    if (board.value[nr]?.[nc] === null) {
      board.value[nr][nc] = board.value[r][c]
      board.value[r][c] = null
      moves.value++
      checkWin()
      return
    }
  }
}

function checkWin() {
  let count = 1
  for (let r = 0; r < size.value; r++) {
    for (let c = 0; c < size.value; c++) {
      if (r === size.value - 1 && c === size.value - 1) {
        alert("🎉 You finished the game!")
        return
      }
      if (board.value[r][c] !== count++) return
    }
  }
}
</script>

<template>
  <div>
    <h1>Puzzle Game 🧩</h1>

    <p>Moves: {{ moves }}</p>

    <button @click="startGame(3)">Easy</button>
    <button @click="startGame(4)">Medium</button>
    <button @click="startGame(5)">Hard</button>

    <div class="board">
      <div v-for="(row, r) in board" :key="r">
        <button
          v-for="(cell, c) in row"
          :key="c"
          @click="moveTile(r, c)"
        >
          {{ cell }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.board button {
  width: 60px;
  height: 60px;
  margin: 3px;
  font-size: 18px;
}
</style>