getAllUserIdsInRoom = (io, roomName) => {
    let room = io.nsps['/'].adapter.rooms[roomName]

    if (!room) {
        return []
    }

    return Object.keys(room.sockets)
}

getAllUsersInSocketsRoom = (io, socket) => {
    return getAllUserIdsInRoom(io, socket.roomName)
        .map(id => {            
            let thisSocket = io.sockets.connected[id]
            return {
                id, 
                nickname: thisSocket.nickname,
                vote: thisSocket.vote
            }
        })
}

getRoomCurrentBusiness = (io, roomName) => {
    let users = getAllUserIdsInRoom(io, roomName)

    for (let i = 0; i < users.length; i++) {
        let socket = io.sockets.connected[users[i]]

        if (socket && socket.business) {
            return socket.business
        }
    }
}

module.exports.getAllUserIdsInRoom = getAllUserIdsInRoom
module.exports.getAllUsersInSocketsRoom = getAllUsersInSocketsRoom
module.exports.getRoomCurrentBusiness = getRoomCurrentBusiness