module.exports = (socket, msg) => {
	let date = new Date().toLocaleString()

	let socketInfo = ''
	if (socket) {
		socketInfo = ` [Room: ${socket.roomName}, Id: ${socket.id}] `
	}

	console.log(`[${date}]${socketInfo}: ${msg}`)
}