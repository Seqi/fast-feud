let https = require('https')
let path = require('path')
let cors = require('cors')
let express = require('express')
let app = express()

let log = require('./log')
let initSockets = require('./sockets')

app.use(cors())
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/food', require('./routes/yelp.routes'))

app.get('/ping', (req, res) => {
	res.send('pong')
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

let httpServer = https.createServer(app)
initSockets(httpServer)

let server = httpServer.listen(process.env.PORT || 4500, () => {
	let address = server.address()
	log(null, `Listening on address ${address.address}:${address.port}`)
})
