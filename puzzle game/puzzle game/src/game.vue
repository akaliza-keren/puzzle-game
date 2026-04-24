<script setup>
import { ref, onMounted } from 'vue'

const size = ref(3)
const board = ref([])
const moves = ref(0)
const startTime = ref(0)
const time = ref(0)
let timer = null

function startGame(level) {
  size.value = level
  moves.value = 0
  time.value = 0
  startTime.value = Date.now()
  createBoard()
  startTimer()
}

function createBoard() {
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
      if (r === size.value - 1 && c === size.value - 1) return win()
      if (board.value[r][c] !== count++) return
    }
  }
}

function win() {
  clearInterval(timer)
  const player = prompt("Enter your name")
  submitScore(player)
}

function startTimer() {
  clearInterval(timer)
  timer = setInterval(() => {
    time.value = Math.floor((Date.now() - startTime.value)/1000)
  }, 1000)
}

async function submitScore(name) {
  await fetch("http://localhost:3000/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      moves: moves.value,
      time: time.value,
      difficulty: size.value
    })
  })
}
</script>

<template>
  <div>
    <h2>Moves: {{ moves }} | Time: {{ time }}</h2>

    <button @click="startGame(3)">Easy</button>
    <button @click="startGame(4)">Medium</button>
    <button @click="startGame(5)">Hard</button>

    <div class="board">
      <div v-for="(row, r) in board" :key="r">
        <button v-for="(cell, c) in row"
                :key="c"
                @click="moveTile(r,c)">
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
}
</style>