let express = require('express')
let cors = require('cors')
let app = express()

let socketio = require('socket.io')
let http = require('http').createServer(app)
let io = socketio(http)

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3100'
}))
app.use('/food', require('./routes/yelp.routes'))

let server = http.listen(process.env.PORT || 4500, () => {
    let address = server.address()
    console.log(`Listening on ${address.address}:${address.port}`)
})

io.on('connection', socket => {
    console.log('Connected')
})