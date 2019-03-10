const express = require('express')

app = express()
app.use(express.json())

const PORT = 3000

app.get('/', (req, res) => {
  return res.send(`<h1>Flights</h1>`)
})

app.post('/flights', (req, res) => {
  if (req.body.flights) {
    const flights = req.body.flights;
    const filteredFlights = flights
        // code shares do not = QF 
        // but we're returning flights that are not codes shares
        // which would be all QF flights 🤔 double negatives!
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

    res.send(response)
    
  } else {
    res.status(422).send('Missing flights array')
  }

})

app.get('*', (req, res) => {
  return res.status(400).send(`<h1>404 Not Found</h1>`)
})

app.listen(PORT, () => {
  console.log(`Flights server running on port: ${PORT}`)
})