const express = require('express')
const cors = require('cors')

app = express()
app.use(express.json())
app.use(cors())

// express.json() middleware throws an error if the parse fails.
// To return { error: 'Error parsing JSON' } as per challenge,
// we're creating a new middleware to catch the error thrown 
// from express.json()
app.use((error, req, res, next) => {
  if (error.type === 'entity.parse.failed') {
    res.status(error.status).json({ error: 'Error parsing JSON' })
  } else {
    throw new Error(error)
  }
})

app.get('/', (req, res) => {
  return res.send(`<h1>Flights</h1>`)
})

app.post('/flights', (req, res) => {
  if (req.body.flights) {
    const flights = req.body.flights;
    const filteredFlights = flights
      .filter(flight => flight.airline === 'QF')
      .filter(flight => flight.arrival.airport === 'SYD' || flight.departure.airport === 'SYD')
      .map(flight => ({
        flight: `${flight.airline}${flight.flightNumber}`,
        origin: flight.departure.airport,
        destination: flight.arrival.airport,
        departureTime: flight.departure.scheduled,
      }))

    const response = {
      flights: filteredFlights
    }

    res.json(response)
    
  } else {
    res.status(422).json({ error: 'Missing flights array.' })
  }
})

app.get('*', (req, res) => {
  return res.status(404).send(`<h1>404 Not Found</h1>`)
})

module.exports = app
