import React from 'react'

import { withSocket } from '@shared/hocs/SocketContext'

class ChatEntry extends React.Component {
	constructor() {
		super()

		this.state = {
			message: ''
		}
	}

	onMessageChange(evt) {
		this.setState({ message: evt.target.value })
	}

	sendMessage(evt) {
		evt.preventDefault()

		this.props.socket.emit('message', this.state.message)
		this.setState({ message: '' })
	}

	render() {
		return (
			<form id="chat-entry" onSubmit={evt => this.sendMessage(evt)}>
				<input
					className="form-control"
					value={this.state.message}
					onChange={evt => this.onMessageChange(evt)}
					placeholder="Type a message"
				/>

				<input disabled={!this.state.message} className="form-control btn" type="submit" value="Send" />
			</form>
		)
	}
}

export default withSocket(ChatEntry)
