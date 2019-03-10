const express = require('express')

app = express()

const PORT = 3000

app.get('/', (req, res) => {
  return res.send(`<h1>Flights</h1>`)
})

app.get('*', (req, res) => {
  return res.status(400).send(`<h1>404 Not Found</h1>`)
})

app.listen(PORT, () => {
  console.log(`Flights server running on port: ${PORT}`)
})