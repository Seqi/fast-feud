let express = require('express')
let cors = require('cors')
let app = express()

let socketio = require('socket.io')
let http = require('http').createServer(app)
let io = socketio(http)

let socketutils = require('./socketio-utils')

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
    console.log('connected')

    socket.join(socket.handshake.query.roomId, err => {
        if (err) {
            return console.log('Error joining room ', err)
        }

        socket.roomName = socket.handshake.query.roomId

        let users = socketutils.getAllUsersInRoom(io, socket.roomName)
        io.to(socket.roomName).emit('users-updated', users)
        console.log(users)

        // If no one is in the room, make admin
        let isAdmin = users.length <= 1
        if (users.length <= 1) {
            socket.isAdmin = true
            socket.emit('admin', true)

            // If they're not an admin, send them the current business
        } else {
            socket.emit('admin', false)

            let business = socketutils.getRoomCurrentBusiness(io, socket.roomName)
            if (!business) {
                socket.emit('error-occurred', 'Could not retrieve room.')
            } else {
                socket.emit('business-updated', business)
            }
        }
    })

    socket.on('business', business => {
        socket.business = business
        socket.broadcast.to(socket.roomName).emit('business-updated', business)
    })

    socket.on('options', options => {
        socket.options = options
    })

    socket.on('disconnect', _ => {
        console.log('disconnected')
        let users = socketutils.getAllUsersInRoom(io, socket.roomName)
        console.log(users)
        socket.emit('users-updated', users)

        // If the admin disconnects, reassign admin role
        if (socket.isAdmin) {
            console.log('Admin is leaving. Reassigning')

            if (users.length > 0) {
                let newAdminSocket = io.sockets.connected[users[0]]

                // Pass through all the admin properties
                newAdminSocket.business = socket.business
                newAdminSocket.options = socket.options
                newAdminSocket.isAdmin = true
                newAdminSocket.emit('admin-transfer')
                newAdminSocket.emit('options', socket.options)
            }
        }
    })
})
