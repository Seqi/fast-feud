import React from 'react'

import { withSocket } from 'components/room/SocketContext'

class ChatEntry extends React.Component {

	constructor() {
		super()

		this.state = {
			message: ''
		}
	}

	onMessageChange(evt){
		this.setState({ message: evt.target.value })
	}

	sendMessage(evt){
		evt.preventDefault()

		this.props.socket.emit('message', this.state.message)
		this.setState({message: ''})
	}

	render() {
		return (
			<form id="chat-entry" onSubmit={evt => this.sendMessage(evt)}>
				<div className="input-row row">
					<div className="col-11 message-input">
						<input  className="form-control"
							value={this.state.message}
							onChange={evt => this.onMessageChange(evt)}
							placeholder="Type a message" />
					</div>

					<div className="col-1 message-send">
						<input className="form-control btn" type="submit" value="Send" />
					</div>
				</div>
			</form>
		)
	}
}

export default withSocket(ChatEntry)