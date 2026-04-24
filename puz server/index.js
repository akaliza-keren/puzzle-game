const express = require("express")
const cors = require("cors")
const path = require("path")

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Serve static files from the puzzle game directory
app.use(express.static(path.join(__dirname, "../puzzle game/puzzle game")))

app.get("/", (req, res) => {
  res.send("Server is running ")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})