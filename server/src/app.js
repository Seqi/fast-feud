let express = require('express')
let app = express()

app.use('/food', require('./routes/yelp.routes'))

let server = app.listen(process.env.PORT || 4500, () => {
    let address = server.address()
    console.log(`Listening on ${address.address}:${address.port}`)
})