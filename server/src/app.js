let express = require('express')
let cors = require('cors')
let app = express()

app.use(cors())
app.use('/food', require('./routes/yelp.routes'))

let server = app.listen(process.env.PORT || 4500, () => {
    let address = server.address()
    console.log(`Listening on ${address.address}:${address.port}`)
})