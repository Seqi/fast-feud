let socketio = require('socket.io')
let socketutils = require('./socketio-utils')
let log = require('./log')

module.exports = server => {
	let io = socketio(server)

	io.on('connection', socket => {
		socket.join(socket.handshake.query.roomId, err => {
			// TODO: Use socket.io built in namespaces/rooms
			socket.roomName = socket.handshake.query.roomId

			if (err) {
				return log(socket, `Error joining room:  ${err}`)
			}

			log(socket, 'New connection.')

			let users = socketutils.getAllUsersInSocketsRoom(io, socket)

			//TODO : User added/removed to only require one user adding/subtracting
			io.to(socket.roomName).emit('voters-updated', users)

			// If no one is in the room, make admin
			if (users.length <= 1) {
				socket.isAdmin = true
				socket.emit('admin', true)
				log(socket, 'Setting as admin.')

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
			log(socket, `New business: ${business.alias}`)

			// Reset the votes
			let ids = socketutils.getAllUserIdsInRoom(io, socket.roomName)
			ids.forEach(id => {
				let socket = io.sockets.connected[id]
				socket.vote = undefined
			})

			let users = socketutils.getAllUsersInSocketsRoom(io, socket)

			io.to(socket.roomName).emit('voters-updated', users)
			io.to(socket.roomName).emit('votes-reset')
			socket.broadcast.to(socket.roomName).emit('business-updated', business)
		})

		socket.on('options', options => {
			log(socket, `New options received: ${options}`)
			socket.options = options
		})

		socket.on('vote', vote => {
			// TODO: No need to send up socket id?
			if (vote.id !== socket.id) {
				socket.emit('error-occurred', 'Unauthorized.')
			}

			socket.vote = vote.vote
			log(socket, `New vote: ${vote.vote}`)

			// Send back new votes
			let users = socketutils.getAllUsersInSocketsRoom(io, socket)
			socket.broadcast.to(socket.roomName).emit('voters-updated', users)
		})

		socket.on('set-nickname', nickname => {
			socket.nickname = nickname
			log(socket, `Setting new nickname: ${nickname}`)

			// Send back new user list
			let users = socketutils.getAllUsersInSocketsRoom(io, socket)
			io.to(socket.roomName).emit('voters-updated', users)
		})

		socket.on('message', msg => {
			log(socket, 'New message sent.')
			io.to(socket.roomName).emit('message', {
				id: socket.id,
				nickname: socket.nickname,
				message: msg
			})
		})

		socket.on('disconnect', () => {
			log(socket, 'Disconnected')
			let users = socketutils.getAllUsersInSocketsRoom(io, socket)
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
}
