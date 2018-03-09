getAllUsersInRoom = (io, roomName) => {
    let room = io.nsps['/'].adapter.rooms[roomName]
    
    if (!room) {
        return []
    }

    return Object.keys(room.sockets)
}

getRoomCurrentBusiness = (io, roomName)  => {
    let users = getAllUsersInRoom(io, roomName)

    for (let i = 0; i < users.length; i++) {
        let socket = io.sockets.connected[users[i]]

        if (socket && socket.business) {
            return socket.business
        }
    }
}

module.exports.getAllUsersInRoom = getAllUsersInRoom
module.exports.getRoomCurrentBusiness = getRoomCurrentBusiness