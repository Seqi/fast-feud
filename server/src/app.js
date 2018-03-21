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

        let users = socketutils.getAllUsersInSocketsRoom(io, socket)
        io.to(socket.roomName).emit('voters-updated', users)
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
        console.log('Updating business')
        socket.business = business

        // Reset the votes
        let ids = socketutils.getAllUserIdsInRoom(io, socket.roomName)
        ids.forEach(id => {
            let socket = io.sockets.connected[id]
            socket.vote = undefined
        })

        let users = socketutils.getAllUsersInSocketsRoom(io, socket)

        io.to(socket.roomName).emit('voters-updated', users)
        socket.broadcast.to(socket.roomName).emit('business-updated', business)
    })

    socket.on('options', options => {
        console.log('setting options')
        socket.options = options
    })

    socket.on('vote', vote => {
        if (vote.id !== socket.id) {
            socket.emit('error-occurred', 'Unauthorized.')
        }

        console.log('vote set')
        socket.vote = vote.vote

        // Send back new votes
        let users = socketutils.getAllUsersInSocketsRoom(io, socket)
        socket.broadcast.to(socket.roomName).emit('voters-updated', users)
    })

    socket.on('set-nickname', nickname => {
        console.log('set nickname', nickname)
        socket.nickname = nickname

        // Send back new user list
        let users = socketutils.getAllUsersInSocketsRoom(io, socket)
        io.to(socket.roomName).emit('voters-updated', users)
    })

    socket.on('message', msg => {
        console.log('relaying message', msg)
        io.to(socket.roomName).emit('message', {
            id: socket.id,
            nickname: socket.nickname,
            message: msg
        })
    })

    socket.on('disconnect', _ => {
        console.log('disconnected')
        let users = socketutils.getAllUsersInSocketsRoom(io, socket)
        console.log(users)
        io.to(socket.roomName).emit('voters-updated', users)

        // If the admin disconnects, reassign admin role
        if (socket.isAdmin) {
            console.log('Admin is leaving. Reassigning')

            if (users.length > 0) {
                let newAdminSocket = io.sockets.connected[users[0].id]

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
