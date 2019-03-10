const express = require('express')

app = express()
app.use(express.json())

const PORT = 3000

app.get('/', (req, res) => {
  return res.send(`<h1>Flights</h1>`)
})

app.post('/flights', (req, res) => {
  console.log(req.body)
})

app.get('*', (req, res) => {
  return res.status(400).send(`<h1>404 Not Found</h1>`)
})

app.listen(PORT, () => {
  console.log(`Flights server running on port: ${PORT}`)
})