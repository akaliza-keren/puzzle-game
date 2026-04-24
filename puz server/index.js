const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())

// Serve static files from the puzzle game directory
app.use(express.static(path.resolve("C:/Users/hp/Documents/puzzle game/puzzle game")))

app.get("/", (req, res) => {
  res.send("Server is running ")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})